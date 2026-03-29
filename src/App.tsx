import React, { useState, useEffect, useRef } from 'react';
import { HUD } from './components/HUD';
import { fishList, AlertLevel } from './types';
import { GoogleGenAI } from "@google/genai";
import { Camera, Square, Fish, Loader2 } from 'lucide-react';

export default function App() {
  const [depth, setDepth] = useState(0);
  const [species, setSpecies] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [alertLevel, setAlertLevel] = useState<AlertLevel>('normal');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showSafetyInfo, setShowSafetyInfo] = useState(false);
  const [currentFishData, setCurrentFishData] = useState<any>(null);

  const isAlertDismissedRef = useRef(isAlertDismissed);
  useEffect(() => {
    isAlertDismissedRef.current = isAlertDismissed;
  }, [isAlertDismissed]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation loop for Video Mode
  useEffect(() => {
    if (isLiveMode) return;
    
    const video = videoRef.current;
    if (!video) return;

    const updateSimulation = () => {
      if (isLiveMode) return;
      const seconds = video.currentTime;
      
      let currentDepth = 0;
      if (seconds < 15) {
        currentDepth = seconds * 4;
      } else {
        currentDepth = 60 - (seconds - 15) * 0.5;
      }
      setDepth(currentDepth);

      if (seconds >= 5 && seconds < 10) {
        updateHUD("Lionfish", currentDepth);
      } else if (seconds >= 15 && seconds < 20) {
        updateHUD("Box Jellyfish", currentDepth);
      } else if (seconds >= 25 && seconds < 30) {
        updateHUD("Great White", currentDepth);
      } else if (seconds >= 32 && seconds < 37) {
        updateHUD("Clownfish", currentDepth);
      } else {
        setSpecies(null);
        setWarning(null);
        setAlertLevel('normal');
        setIsAlertDismissed(false);
        setCurrentFishData(null);
      }

      requestAnimationFrame(updateSimulation);
    };

    video.addEventListener('play', () => requestAnimationFrame(updateSimulation));
    return () => video.removeEventListener('play', updateSimulation);
  }, [isLiveMode]);

  // Camera Setup
  useEffect(() => {
    if (!isLiveMode) {
      if (cameraRef.current && cameraRef.current.srcObject) {
        const stream = cameraRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        cameraRef.current.srcObject = null;
      }
      return;
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' },
          audio: false 
        });
        if (cameraRef.current) {
          cameraRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setIsLiveMode(false);
        alert("Camera access denied or not available.");
      }
    };

    startCamera();
  }, [isLiveMode]);

  const identifyFish = async () => {
    if (!cameraRef.current || !canvasRef.current || isScanning) return;
    
    setIsScanning(true);
    setIsAlertDismissed(false);
    setSpecies("ANALYZING...");
    setAlertLevel('warning');

    try {
      const canvas = canvasRef.current;
      const video = cameraRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(video, 0, 0);
      const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];

      // Use the provided API key and the 3-flash-preview model
      const ai = new GoogleGenAI({ apiKey: "AIzaSyDG1xu8uMs6L2aEL6lNinqptcy-RbrFU8M" });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            { text: "Identify the fish or sea creature in this image. Return ONLY a JSON object with 'name' (string) and 'isDangerous' (boolean). Be specific (e.g., 'Tiger Shark' instead of just 'Shark'). If no fish is found, return { 'name': 'None', 'isDangerous': false }." },
            { inlineData: { mimeType: "image/jpeg", data: base64Image } }
          ]
        },
        config: { responseMimeType: "application/json" }
      });

      const result = JSON.parse(response.text || '{}');
      
      if (result.name && result.name !== 'None') {
        updateHUD(result.name, depth);
      } else {
        setSpecies("NO TARGET");
        setWarning(null);
        setAlertLevel('normal');
      }
    } catch (err) {
      console.error("AI Identification failed:", err);
      setSpecies("SCAN ERROR");
    } finally {
      setIsScanning(false);
    }
  };

  const updateHUD = (name: string, currentDepth: number) => {
    const lowerName = name.toLowerCase();
    const fish = fishList.find(f => 
      lowerName.includes(f.name.toLowerCase()) || 
      f.name.toLowerCase().includes(lowerName) ||
      (f.scientificName && lowerName.includes(f.scientificName.toLowerCase()))
    );
    
    // If we've dismissed an alert, we stay in "NO TARGET" mode for THIS encounter
    if (isAlertDismissedRef.current) {
      setSpecies(name);
      setWarning(null);
      setAlertLevel('normal');
      return;
    }

    setSpecies(name);
    setCurrentFishData(fish || null);
    
    if (fish) {
      setWarning(fish.warning || null);
      
      // Determine alert level based on warning content or species name
      const isDanger = 
        fish.warning.includes('🚨') || 
        fish.warning.includes('💀') || 
        lowerName.includes('shark') || 
        lowerName.includes('jellyfish') ||
        lowerName.includes('lionfish') ||
        lowerName.includes('stonefish') ||
        lowerName.includes('octopus') ||
        lowerName.includes('eel') ||
        lowerName.includes('barracuda') ||
        lowerName.includes('puffer');

      if (isDanger) {
        setAlertLevel('danger');
      } else if (fish.warning && fish.warning.trim() !== "") {
        setAlertLevel('warning');
      } else {
        setAlertLevel('normal');
      }
    } else {
      // Default for unknown but identified fish
      setWarning(null);
      setAlertLevel('normal');
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Video (Simulation) */}
      {!isLiveMode && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="https://assets.mixkit.co/videos/preview/mixkit-scuba-diver-swimming-underwater-with-fish-41231-large.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Live Camera Feed */}
      {isLiveMode && (
        <video
          ref={cameraRef}
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-x-[-1]"
          autoPlay
          muted
          playsInline
        />
      )}

      {/* Hidden Canvas for Frame Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* AR HUD Overlay */}
      <HUD 
        depth={depth} 
        species={species} 
        warning={isAlertDismissed ? null : warning} 
        alertLevel={alertLevel}
        isFadingOut={isFadingOut}
        onDismissAlert={() => {
          setIsAlertDismissed(true);
          setIsFadingOut(true);
          setAlertLevel('normal');
          setWarning(null);
          setTimeout(() => {
            setIsFadingOut(false);
          }, 2000);
        }}
        onShowInfo={() => setShowSafetyInfo(true)}
        safetySteps={currentFishData?.safetySteps || null}
        showSafetyInfo={showSafetyInfo}
        onCloseSafetyInfo={() => setShowSafetyInfo(false)}
      />

      {/* Controls Overlay - Moved to bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-row gap-8 pointer-events-auto z-50">
        <button 
          onClick={() => setIsLiveMode(!isLiveMode)}
          className={`w-16 h-16 rounded-full flex items-center justify-center font-bold border-2 transition-all shadow-lg active:scale-90 ${
            isLiveMode ? 'bg-red-600 border-red-400 text-white' : 'bg-cyan-600 border-cyan-400 text-white'
          }`}
          title={isLiveMode ? 'Stop Live' : 'Start Live Cam'}
        >
          {isLiveMode ? (
            <Square size={24} strokeWidth={3} />
          ) : (
            <Camera size={24} strokeWidth={3} />
          )}
        </button>
        
        {isLiveMode && (
          <button 
            onClick={identifyFish}
            disabled={isScanning}
            className={`w-16 h-16 rounded-full flex items-center justify-center font-bold border-2 bg-white text-black border-gray-300 transition-all shadow-lg active:scale-90 ${
              isScanning ? 'opacity-50 cursor-not-allowed animate-pulse' : 'hover:bg-gray-100'
            }`}
            title="Identify Fish"
          >
            {isScanning ? (
              <Loader2 size={24} strokeWidth={3} className="animate-spin" />
            ) : (
              <Fish size={24} strokeWidth={3} />
            )}
          </button>
        )}
      </div>

      {/* Vignette Overlay for Goggles Effect */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}
