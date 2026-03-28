import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertLevel } from '../types';

interface HUDProps {
  depth: number;
  species: string | null;
  warning: string | null;
  alertLevel: AlertLevel;
  isFadingOut: boolean;
  onDismissAlert: () => void;
  onShowInfo: () => void;
  safetySteps: string[] | null;
  showSafetyInfo: boolean;
  onCloseSafetyInfo: () => void;
}

export const HUD: React.FC<HUDProps> = ({ 
  depth, 
  species, 
  warning, 
  alertLevel, 
  isFadingOut,
  onDismissAlert, 
  onShowInfo,
  safetySteps,
  showSafetyInfo,
  onCloseSafetyInfo
}) => {
  const getThemeColor = () => {
    switch (alertLevel) {
      case 'danger': return '#FF0000';
      case 'warning': return '#FFFF00';
      default: return '#00FFFF';
    }
  };

  const themeColor = getThemeColor();

  return (
    <div className="absolute inset-0 pointer-events-none font-mono overflow-hidden">
      {/* Screen Border for Danger */}
      <AnimatePresence>
        {((alertLevel === 'danger' && warning) || isFadingOut) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, isFadingOut ? 0.2 : 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className={`absolute inset-0 border-[20px] ${isFadingOut ? 'border-red-600/30' : 'border-red-600'} z-50`}
          />
        )}
      </AnimatePresence>

      {/* Telemetry Display - Top Left */}
      <div className="absolute top-10 left-10 p-4 bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg flex flex-col gap-2">
        <div>
          <div className="text-[10px] opacity-70" style={{ color: themeColor }}>TELEMETRY</div>
          <div className="text-4xl font-bold" style={{ color: themeColor }}>
            DEPTH: {depth.toFixed(1)}m
          </div>
        </div>
        
        {/* System Status - Integrated here */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <div className="text-[10px] uppercase tracking-widest opacity-70" style={{ color: themeColor }}>SYS OK</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-sm bg-cyan-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s`, backgroundColor: themeColor }} />
            ))}
          </div>
        </div>
      </div>

      {/* Scanning Reticle - Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed rounded-full opacity-20"
            style={{ borderColor: themeColor }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-t-2 border-l-2" style={{ borderColor: themeColor, top: 0, left: 0 }} />
            <div className="w-4 h-4 border-t-2 border-r-2" style={{ borderColor: themeColor, top: 0, right: 0 }} />
            <div className="w-4 h-4 border-b-2 border-l-2" style={{ borderColor: themeColor, bottom: 0, left: 0 }} />
            <div className="w-4 h-4 border-b-2 border-r-2" style={{ borderColor: themeColor, bottom: 0, right: 0 }} />
          </div>
          
          {/* Species ID Box */}
          <AnimatePresence>
            {species && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 text-center"
              >
                <div className="bg-black/60 border-2 p-2 rounded" style={{ borderColor: themeColor }}>
                  <div className="text-[10px] uppercase tracking-widest opacity-70" style={{ color: themeColor }}>Species ID</div>
                  <div className="text-lg font-bold" style={{ color: themeColor }}>{species}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Anomaly Alert - Bottom */}
      <AnimatePresence>
        {warning && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-xl px-10"
          >
            <motion.div
              animate={alertLevel === 'danger' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="bg-black/90 border-2 p-6 rounded-xl shadow-2xl relative"
              style={{ borderColor: themeColor }}
            >
              {/* Dismiss Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); onDismissAlert(); }}
                className="absolute -top-3 -right-3 w-8 h-8 bg-black border-2 rounded-full flex items-center justify-center pointer-events-auto hover:bg-gray-900 transition-colors"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                <span className="text-lg font-bold">×</span>
              </button>

              <div className="text-2xl font-black tracking-tighter mb-4 text-center" style={{ color: themeColor }}>
                {warning}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pointer-events-auto">
                <button 
                  onClick={onShowInfo}
                  className="px-4 py-2 text-xs font-bold border rounded uppercase tracking-widest hover:bg-white/10 transition-colors"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  Procedures
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safety Info Modal */}
      <AnimatePresence>
        {showSafetyInfo && safetySteps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-10 pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full border-2 p-8 rounded-2xl bg-black"
              style={{ borderColor: themeColor }}
            >
              <div className="text-xs uppercase tracking-[0.3em] mb-2 opacity-50" style={{ color: themeColor }}>Safety Protocol</div>
              <div className="text-3xl font-black mb-6" style={{ color: themeColor }}>{species?.toUpperCase()}</div>
              
              <ul className="space-y-4 mb-8">
                {safetySteps.map((step, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="font-bold" style={{ color: themeColor }}>0{idx + 1}</span>
                    <span className="text-sm leading-relaxed text-gray-300">{step}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onCloseSafetyInfo}
                className="w-full py-4 font-bold border-2 rounded-xl uppercase tracking-widest hover:bg-white/5 transition-colors"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                Return to HUD
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Indicators Removed */}
    </div>
  );
};
