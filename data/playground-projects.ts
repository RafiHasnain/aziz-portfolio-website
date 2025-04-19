export interface PlaygroundProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  date: string;
}

export const playgroundProjects: PlaygroundProject[] = [
  {
    id: "project-1",
    title: "Neural Interface",
    description:
      "Experimental UI concept for direct brain-computer interaction",
    image: "/placeholder.svg?height=600&width=800",
    category: "UI Concept",
    link: "/playground/neural-interface",
    date: "2023",
  },
  {
    id: "project-2",
    title: "Quantum Visualizer",
    description: "Visual representation of quantum computing principles",
    image: "/placeholder.svg?height=600&width=800",
    category: "Data Visualization",
    link: "/playground/quantum-visualizer",
    date: "2023",
  },
  {
    id: "project-3",
    title: "Holographic Display",
    description: "Simulated 3D holographic interface with gesture control",
    image: "/placeholder.svg?height=600&width=800",
    category: "3D / WebGL",
    link: "/playground/holographic-display",
    date: "2023",
  },
  {
    id: "project-4",
    title: "Biometric Authentication",
    description:
      "Facial recognition and fingerprint simulation for secure access",
    image: "/placeholder.svg?height=600&width=800",
    category: "Security",
    link: "/playground/biometric-auth",
    date: "2022",
  },
  {
    id: "project-5",
    title: "Augmented Reality HUD",
    description: "Heads-up display concept for AR glasses",
    image: "/placeholder.svg?height=600&width=800",
    category: "AR / VR",
    link: "/playground/ar-hud",
    date: "2022",
  },
  {
    id: "project-6",
    title: "Neomorphic Controls",
    description: "Soft UI controls with realistic light and shadow effects",
    image: "/placeholder.svg?height=600&width=800",
    category: "UI Design",
    link: "/playground/neomorphic-controls",
    date: "2022",
  },
  {
    id: "project-7",
    title: "Voice Command System",
    description: "Natural language processing for voice-controlled interfaces",
    image: "/placeholder.svg?height=600&width=800",
    category: "AI / ML",
    link: "/playground/voice-commands",
    date: "2022",
  },
  {
    id: "project-8",
    title: "Cybernetic Organisms",
    description: "Generative art simulating artificial life forms",
    image: "/placeholder.svg?height=600&width=800",
    category: "Generative Art",
    link: "/playground/cybernetic-organisms",
    date: "2021",
  },
  {
    id: "project-9",
    title: "Neural Network Playground",
    description: "Interactive visualization of neural network training",
    image: "/placeholder.svg?height=600&width=800",
    category: "AI / ML",
    link: "/playground/neural-network",
    date: "2021",
  },
  {
    id: "project-10",
    title: "Spatial Audio Experience",
    description: "3D audio environment with interactive sound sources",
    image: "/placeholder.svg?height=600&width=800",
    category: "Audio",
    link: "/playground/spatial-audio",
    date: "2021",
  },
  {
    id: "project-11",
    title: "Gesture Recognition",
    description:
      "Camera-based hand gesture detection for touchless interaction",
    image: "/placeholder.svg?height=600&width=800",
    category: "Computer Vision",
    link: "/playground/gesture-recognition",
    date: "2021",
  },
  {
    id: "project-12",
    title: "Autonomous Systems",
    description: "Simulation of self-organizing robotic swarms",
    image: "/placeholder.svg?height=600&width=800",
    category: "Simulation",
    link: "/playground/autonomous-systems",
    date: "2020",
  },
];

export const categories = [
  "All",
  "UI Concept",
  "Data Visualization",
  "3D / WebGL",
  "Security",
  "AR / VR",
  "UI Design",
  "AI / ML",
  "Generative Art",
  "Audio",
  "Computer Vision",
  "Simulation",
];
