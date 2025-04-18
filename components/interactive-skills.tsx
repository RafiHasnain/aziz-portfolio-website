"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Matter from "matter-js";

// Define the skills data with colors
const skills = [
  {
    id: 1,
    name: "Web Design",
    color: "bg-purple-500",
    textColor: "text-white",
  },
  {
    id: 2,
    name: "Landing Page",
    color: "bg-blue-500",
    textColor: "text-white",
  },
  { id: 3, name: "Branding", color: "bg-blue-400", textColor: "text-white" },
  {
    id: 4,
    name: "Product Design",
    color: "bg-purple-400",
    textColor: "text-white",
  },
  {
    id: 5,
    name: "Design Thinker",
    color: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: 6,
    name: "Mobile App UI",
    color: "bg-blue-400",
    textColor: "text-white",
  },
  {
    id: 7,
    name: "No Code Development",
    color: "bg-purple-500",
    textColor: "text-white",
  },
  {
    id: 8,
    name: "Brand Guidelines",
    color: "bg-blue-500",
    textColor: "text-white",
  },
];

export function InteractiveSkills() {
  const [isMounted, setIsMounted] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const worldRef = useRef<Matter.World | null>(null);
  const bodiesRef = useRef<{ [key: string]: Matter.Body }>({});
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  // Use intersection observer to detect when the component is in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Initialize physics engine
  useEffect(() => {
    setIsMounted(true);

    return () => {
      if (engineRef.current && renderRef.current) {
        Matter.Render.stop(renderRef.current);
        Matter.Engine.clear(engineRef.current);
        renderRef.current.canvas.remove();
        renderRef.current.textures = {};
      }
    };
  }, []);

  // Setup physics world when component is mounted
  useEffect(() => {
    if (!isMounted || !sceneRef.current || !skillsContainerRef.current) return;

    // Module aliases
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.5 },
    });
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: 300,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;
    canvasRef.current = render.canvas;

    // Make canvas visible but transparent to capture mouse events
    render.canvas.style.opacity = "0.01"; // Almost invisible but still captures events
    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.zIndex = "20"; // Above the DOM elements to capture events
    render.canvas.style.pointerEvents = "auto"; // Enable pointer events

    // Store world reference
    worldRef.current = engine.world;

    // Create walls to keep objects in view
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };

    const ground = Bodies.rectangle(
      render.options.width! / 2,
      render.options.height! + 50,
      render.options.width! * 2,
      100,
      wallOptions
    );
    const leftWall = Bodies.rectangle(
      -50,
      render.options.height! / 2,
      100,
      render.options.height! * 2,
      wallOptions
    );
    const rightWall = Bodies.rectangle(
      render.options.width! + 50,
      render.options.height! / 2,
      100,
      render.options.height! * 2,
      wallOptions
    );

    World.add(engine.world, [ground, leftWall, rightWall]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    mouseConstraintRef.current = mouseConstraint;

    World.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the engine
    Engine.run(engine);
    Render.run(render);

    // Update DOM elements to follow physics bodies
    const updateDOMElements = () => {
      if (!skillsContainerRef.current) return;

      Object.entries(bodiesRef.current).forEach(([id, body]) => {
        const skillElement = document.getElementById(`skill-${id}`);
        if (skillElement) {
          const { x, y } = body.position;
          const angle = body.angle * (180 / Math.PI);

          skillElement.style.transform = `translate(${
            x - skillElement.offsetWidth / 2
          }px, ${y - skillElement.offsetHeight / 2}px) rotate(${angle}deg)`;
        }
      });

      requestAnimationFrame(updateDOMElements);
    };

    updateDOMElements();

    // Handle window resize
    const handleResize = () => {
      if (sceneRef.current && renderRef.current) {
        renderRef.current.options.width = sceneRef.current.clientWidth;
        renderRef.current.options.height = 300;
        renderRef.current.canvas.width = sceneRef.current.clientWidth;
        renderRef.current.canvas.height = 300;

        // Update wall positions
        if (worldRef.current) {
          Matter.Body.setPosition(ground, {
            x: renderRef.current.options.width / 2,
            y: renderRef.current.options.height + 50,
          });
          Matter.Body.setPosition(rightWall, {
            x: renderRef.current.options.width + 50,
            y: renderRef.current.options.height / 2,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted]);

  // Add or remove skill bodies based on inView state
  useEffect(() => {
    if (
      !worldRef.current ||
      !engineRef.current ||
      !renderRef.current ||
      !skillsContainerRef.current
    )
      return;

    if (inView) {
      // Add skill bodies when in view
      skills.forEach((skill, index) => {
        if (!bodiesRef.current[skill.id]) {
          // Create DOM element for the skill
          const skillElement = document.createElement("div");
          skillElement.id = `skill-${skill.id}`;
          skillElement.className = `${skill.color} ${skill.textColor} px-4 py-2 rounded-full shadow-md whitespace-nowrap absolute`;
          skillElement.textContent = skill.name;
          skillElement.style.position = "absolute";
          skillElement.style.zIndex = "10";
          skillElement.style.transform = "translate(-9999px, -9999px)"; // Hide initially
          skillElement.style.pointerEvents = "none"; // Disable pointer events on DOM elements
          skillsContainerRef.current?.appendChild(skillElement);

          // Get dimensions
          const width = skillElement.offsetWidth;
          const height = skillElement.offsetHeight;

          // Create physics body with visible but semi-transparent fill
          const body = Matter.Bodies.rectangle(
            Math.random() * (renderRef.current?.options.width! - width) +
              width / 2,
            -100 - index * 50, // Start above the canvas
            width,
            height,
            {
              restitution: 0.6,
              friction: 0.1,
              frictionAir: 0.01,
              chamfer: { radius: height / 2 },
              render: {
                fillStyle: getColorFromClass(skill.color) + "10", // Very transparent fill
                strokeStyle: getColorFromClass(skill.color) + "30",
                lineWidth: 1,
              },
            }
          );

          // Add to world and store reference
          Matter.World.add(worldRef.current!, body);
          bodiesRef.current[skill.id] = body;
        }
      });
    } else {
      // Remove skill bodies when out of view
      Object.entries(bodiesRef.current).forEach(([id, body]) => {
        Matter.World.remove(worldRef.current!, body);
        const skillElement = document.getElementById(`skill-${id}`);
        if (skillElement && skillsContainerRef.current) {
          skillsContainerRef.current.removeChild(skillElement);
        }
      });
      bodiesRef.current = {};
    }
  }, [inView]);

  return (
    <div ref={inViewRef} className="w-full">
      <div ref={sceneRef} className="w-full h-[300px] relative">
        <div
          ref={skillsContainerRef}
          className="w-full h-full absolute top-0 left-0"
        ></div>
      </div>
    </div>
  );
}

// Helper function to convert Tailwind color classes to hex colors
function getColorFromClass(colorClass: string): string {
  const colorMap: { [key: string]: string } = {
    "bg-purple-500": "#a855f7",
    "bg-purple-400": "#c084fc",
    "bg-blue-500": "#3b82f6",
    "bg-blue-400": "#60a5fa",
  };
  return colorMap[colorClass] || "#6366f1";
}
