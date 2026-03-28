export interface Fish {
  name: string;
  scientificName?: string;
  maxDepth: number;
  warning: string;
  safetySteps?: string[];
}

export const fishList: Fish[] = [
  // --- CRITICAL DANGER (Sharks & Deadly Venom) ---
  { 
    name: "Bull shark", scientificName: "Carcharhinus leucas", maxDepth: 150, 
    warning: "🚨 APEX PREDATOR: EXTREME AGGRESSION.",
    safetySteps: ["Maintain eye contact at all times.", "Stay vertical in the water to appear larger.", "Slowly back away towards safety.", "Do not splash or make sudden movements."]
  },
  { 
    name: "Tiger shark", scientificName: "Galeocerdo cuvier", maxDepth: 350, 
    warning: "🚨 APEX PREDATOR: CURIOUS & DANGEROUS.",
    safetySteps: ["Keep the shark in sight.", "Use a dive tool or camera as a buffer if it approaches.", "Stay calm and maintain your position.", "Exit the water slowly and quietly."]
  },
  { 
    name: "Great white shark", scientificName: "Carcharodon carcharias", maxDepth: 1200, 
    warning: "🚨 APEX PREDATOR: MAXIMUM ALERT.",
    safetySteps: ["Stay close to the bottom or reef wall.", "Maintain eye contact.", "Do not act like prey (no rapid swimming).", "Signal for boat pickup immediately."]
  },
  { 
    name: "Box Jellyfish", maxDepth: 5, 
    warning: "💀 DEADLY VENOM: ASCEND IMMEDIATELY!",
    safetySteps: ["Do not touch tentacles.", "Exit the water immediately.", "Apply vinegar to the sting site.", "Seek emergency medical help."]
  },
  { 
    name: "Stonefish", scientificName: "Synanceia", maxDepth: 30, 
    warning: "💀 LETHAL NEUROTOXIN: WATCH YOUR STEP!",
    safetySteps: ["Never touch the seabed or reef.", "If stung, immerse in hot water (45°C) immediately.", "Seek emergency medical care for antivenom."]
  },
  { 
    name: "Blue-Ringed Octopus", maxDepth: 20, 
    warning: "💀 DEADLY TOXIN: DO NOT TOUCH!",
    safetySteps: ["Venom causes total paralysis.", "If bitten, provide artificial respiration immediately.", "Seek emergency medical help."]
  },

  // --- WARNING (Bites, Spines, Aggression) ---
  { 
    name: "Great barracuda", scientificName: "Sphyraena barracuda", maxDepth: 100, 
    warning: "⚠️ SHARP TEETH: AVOID SHINY OBJECTS.",
    safetySteps: ["Remove jewelry and reflective gear.", "Do not spearfish near large individuals.", "Avoid rapid movements."]
  },
  { 
    name: "Titan triggerfish", scientificName: "Balistoides viridescens", maxDepth: 50, 
    warning: "⚠️ EXTREMELY AGGRESSIVE: NESTING SEASON.",
    safetySteps: ["Swim away horizontally, not upwards.", "Keep your fins between you and the fish.", "Avoid the 'cone' above their nest."]
  },
  { 
    name: "Lionfish", scientificName: "Pterois volitans", maxDepth: 50, 
    warning: "⚠️ VENOMOUS SPINES: DO NOT TOUCH.",
    safetySteps: ["Maintain 2m distance.", "If stung, soak in hot water and seek medical help."]
  },
  { 
    name: "Green moray", scientificName: "Gymnothorax funebris", maxDepth: 40, 
    warning: "⚠️ POWERFUL BITE: KEEP HANDS CLEAR.",
    safetySteps: ["Do not reach into reef crevices.", "Do not attempt to feed.", "If bitten, do not pull away forcefully."]
  },
  { 
    name: "Alligator gar", scientificName: "Atractosteus spatula", maxDepth: 10, 
    warning: "⚠️ SHARP TEETH: DO NOT PROVOKE.",
    safetySteps: ["Keep distance in shallow water.", "Do not corner the fish.", "Watch for sudden lunges."]
  },
  { 
    name: "Common stingray", scientificName: "Dasyatis pastinaca", maxDepth: 60, 
    warning: "⚠️ VENOMOUS BARB: DO NOT STEP ON.",
    safetySteps: ["Shuffle feet when walking in sand.", "Do not swim directly over the ray.", "If stung, seek medical attention for barb removal."]
  },

  // --- GENERAL/SAFE (Requested List) ---
  { name: "Freshwater bream", scientificName: "Abramis brama", maxDepth: 20, warning: "" },
  { name: "Sergeant-major", scientificName: "Abudefduf saxatilis", maxDepth: 15, warning: "" },
  { name: "Blackspot sergeant", scientificName: "Abudefduf sordidus", maxDepth: 10, warning: "" },
  { name: "Wahoo", scientificName: "Acanthocybium solandri", maxDepth: 20, warning: "✨ FAST SWIMMER: ENJOY THE VIEW." },
  { name: "Yellowfin bream", scientificName: "Acanthopagrus australis", maxDepth: 15, warning: "" },
  { name: "Doctorfish", scientificName: "Acanthurus chirurgus", maxDepth: 25, warning: "⚠️ SHARP TAIL SPINES." },
  { name: "Blue tang surgeonfish", scientificName: "Acanthurus coeruleus", maxDepth: 40, warning: "⚠️ SHARP TAIL SPINES." },
  { name: "Eastern blue groper", scientificName: "Achoerodus viridis", maxDepth: 35, warning: "✨ FRIENDLY SPECIES." },
  { name: "Lake sturgeon", scientificName: "Acipenser fulvescens", maxDepth: 30, warning: "✨ ANCIENT SPECIES." },
  { name: "Whitespotted eagle ray", scientificName: "Aetobatus narinari", maxDepth: 80, warning: "⚠️ VENOMOUS TAIL SPINE." },
  { name: "Bonefish", scientificName: "Albula vulpes", maxDepth: 5, warning: "" },
  { name: "African pompano", scientificName: "Alectis ciliaris", maxDepth: 60, warning: "" },
  { name: "Thresher", scientificName: "Alopias vulpinus", maxDepth: 500, warning: "🚨 PREDATOR: OBSERVE FROM DISTANCE." },
  { name: "Rock bass", scientificName: "Ambloplites rupestris", maxDepth: 10, warning: "" },
  { name: "Bowfin", scientificName: "Amia calva", maxDepth: 10, warning: "⚠️ SHARP TEETH." },
  { name: "Orange clownfish", scientificName: "Amphiprion percula", maxDepth: 15, warning: "" },
  { name: "European eel", scientificName: "Anguilla anguilla", maxDepth: 100, warning: "⚠️ BITE RISK." },
  { name: "Sheepshead", scientificName: "Archosargus probatocephalus", maxDepth: 15, warning: "" },
  { name: "Hardhead sea catfish", scientificName: "Ariopsis felis", maxDepth: 20, warning: "⚠️ VENOMOUS SPINES." },
  { name: "White-spotted puffer", scientificName: "Arothron hispidus", maxDepth: 50, warning: "💀 TOXIC IF CONSUMED." },
  { name: "Trumpetfish", scientificName: "Aulostomus maculatus", maxDepth: 30, warning: "" },
  { name: "Queen triggerfish", scientificName: "Balistes vetula", maxDepth: 50, warning: "⚠️ BITE RISK." },
  { name: "Mahi Mahi", scientificName: "Coryphaena hippurus", maxDepth: 100, warning: "" },
  { name: "Common carp", scientificName: "Cyprinus carpio", maxDepth: 30, warning: "" },
  { name: "Atlantic cod", scientificName: "Gadus morhua", maxDepth: 600, warning: "" },
  { name: "Nurse shark", scientificName: "Ginglymostoma cirratum", maxDepth: 75, warning: "⚠️ DO NOT PROVOKE: BITE RISK." },
  { name: "Hogfish", scientificName: "Lachnolaimus maximus", maxDepth: 30, warning: "" },
  { name: "Barramundi", scientificName: "Lates calcarifer", maxDepth: 40, warning: "" },
  { name: "Bluegill", scientificName: "Lepomis macrochirus", maxDepth: 10, warning: "" },
  { name: "Murray cod", scientificName: "Maccullochella peelii", maxDepth: 50, warning: "" },
  { name: "Blue marlin", scientificName: "Makaira nigricans", maxDepth: 1000, warning: "✨ MAGNIFICENT SPECIES." },
  { name: "Tarpon", scientificName: "Megalops atlanticus", maxDepth: 30, warning: "" },
  { name: "Largemouth black bass", scientificName: "Micropterus nigricans", maxDepth: 20, warning: "" },
  { name: "Striped bass", scientificName: "Morone saxatilis", maxDepth: 30, warning: "" },
  { name: "Rainbow trout", scientificName: "Oncorhynchus mykiss", maxDepth: 200, warning: "" },
  { name: "Swordfish", scientificName: "Xiphias gladius", maxDepth: 2000, warning: "🚨 PREDATOR: EXTREME SPEED." }
];

export type AlertLevel = 'normal' | 'warning' | 'danger';
