"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ProjectCard } from "./project-card";
import type { PlaygroundProject } from "@/data/playground-projects";

interface InfiniteCanvasProps {
  projects: PlaygroundProject[];
}

// Card dimensions for collision detection
const CARD_WIDTH = 320;
const CARD_HEIGHT = 240;
const CARD_MARGIN = 60; // Space between cards

export function InfiniteCanvas({ projects }: any) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [cards, setCards] = useState<
    Array<{
      project: PlaygroundProject;
      position: { x: number; y: number };
      rotation: number;
      id: string;
    }>
  >([]);

  // Track the last update time to throttle updates
  const lastUpdateRef = useRef<number>(0);
  // Track animation frame for cleanup
  const animationFrameRef = useRef<number | null>(null);

  // Check if a new card position would overlap with existing cards
  const wouldOverlap = useCallback(
    (newX: number, newY: number, existingCards: typeof cards) => {
      // Add some buffer around each card to ensure they don't touch
      const totalWidth = CARD_WIDTH + CARD_MARGIN;
      const totalHeight = CARD_HEIGHT + CARD_MARGIN;

      return existingCards.some((card) => {
        return (
          Math.abs(card.position.x - newX) < totalWidth &&
          Math.abs(card.position.y - newY) < totalHeight
        );
      });
    },
    []
  );

  // Find a valid position for a new card that doesn't overlap
  const findValidPosition = useCallback(
    (
      baseX: number,
      baseY: number,
      existingCards: typeof cards,
      maxAttempts = 10
    ) => {
      // Try the base position first
      if (!wouldOverlap(baseX, baseY, existingCards)) {
        return { x: baseX, y: baseY };
      }

      // If base position overlaps, try nearby positions in increasing radius
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const radius = attempt * (CARD_WIDTH / 2);

        // Try positions in a circle around the base position
        for (let angle = 0; angle < 360; angle += 45) {
          const radians = (angle * Math.PI) / 180;
          const testX = baseX + radius * Math.cos(radians);
          const testY = baseY + radius * Math.sin(radians);

          if (!wouldOverlap(testX, testY, existingCards)) {
            return { x: testX, y: testY };
          }
        }
      }

      // If we couldn't find a non-overlapping position, try a random far position
      const randomX =
        baseX +
        (Math.random() > 0.5 ? 1 : -1) * (CARD_WIDTH * 2 + Math.random() * 200);
      const randomY =
        baseY +
        (Math.random() > 0.5 ? 1 : -1) *
          (CARD_HEIGHT * 2 + Math.random() * 200);

      return { x: randomX, y: randomY };
    },
    [wouldOverlap]
  );

  // Generate initial card positions - memoized to run only once
  useEffect(() => {
    const initialCards = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Create a grid of cards with non-overlapping positions
    const gridSize = 2; // -2 to 2
    const gridSpacing = Math.max(CARD_WIDTH, CARD_HEIGHT) + CARD_MARGIN * 2;

    for (let i = -gridSize; i <= gridSize; i++) {
      for (let j = -gridSize; j <= gridSize; j++) {
        const projectIndex = Math.floor(Math.random() * projects.length);
        const project = projects[projectIndex];

        // Base position with grid spacing to avoid initial overlaps
        const baseX = centerX + i * gridSpacing;
        const baseY = centerY + j * gridSpacing;

        // Add some randomness to position and rotation
        const randomOffsetX = Math.random() * CARD_MARGIN - CARD_MARGIN / 2;
        const randomOffsetY = Math.random() * CARD_MARGIN - CARD_MARGIN / 2;
        const x = baseX + randomOffsetX;
        const y = baseY + randomOffsetY;
        const rotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees

        initialCards.push({
          project,
          position: { x, y },
          rotation,
          id: `initial-${i}-${j}-${Math.random().toString(36).substr(2, 9)}`,
        });
      }
    }

    setCards(initialCards);
  }, [projects]);

  // Memoize the visible cards calculation to avoid recalculating on every render
  const visibleCards = useMemo(() => {
    if (!canvasRef.current) return cards;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buffer = 500; // Reduced buffer distance

    return cards.filter((card) => {
      const absoluteX = card.position.x + position.x;
      const absoluteY = card.position.y + position.y;

      return (
        absoluteX > -buffer - CARD_WIDTH &&
        absoluteX < viewportWidth + buffer &&
        absoluteY > -buffer - CARD_HEIGHT &&
        absoluteY < viewportHeight + buffer
      );
    });
  }, [cards, position]);

  // Optimized mouse/touch event handlers
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      // Use requestAnimationFrame to throttle updates
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const newX = e.clientX - startPosition.x;
        const newY = e.clientY - startPosition.y;
        setPosition({ x: newX, y: newY });
      });
    },
    [isDragging, startPosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true);
        setStartPosition({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        });
      }
    },
    [position]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;

      // Use requestAnimationFrame to throttle updates
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const newX = e.touches[0].clientX - startPosition.x;
        const newY = e.touches[0].clientY - startPosition.y;
        setPosition({ x: newX, y: newY });
      });

      e.preventDefault(); // Prevent scrolling
    },
    [isDragging, startPosition]
  );

  // Set up event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);

      // Cancel any pending animation frames
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
  ]);

  // Throttled function to add new cards as needed
  const updateCardsIfNeeded = useCallback(() => {
    // Throttle updates to once every 500ms
    const now = Date.now();
    if (now - lastUpdateRef.current < 500) return;
    lastUpdateRef.current = now;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buffer = 800; // Distance from edge to start adding new cards

    // Check if we need to add cards in any direction
    let needsCardsLeft = false;
    let needsCardsRight = false;
    let needsCardsTop = false;
    let needsCardsBottom = false;

    // Check if we need cards in any direction
    for (const card of cards) {
      const absoluteX = card.position.x + position.x;
      const absoluteY = card.position.y + position.y;

      if (absoluteX < buffer && absoluteX > 0) needsCardsLeft = true;
      if (absoluteX > viewportWidth - buffer && absoluteX < viewportWidth)
        needsCardsRight = true;
      if (absoluteY < buffer && absoluteY > 0) needsCardsTop = true;
      if (absoluteY > viewportHeight - buffer && absoluteY < viewportHeight)
        needsCardsBottom = true;

      // If we need cards in all directions, no need to check further
      if (
        needsCardsLeft &&
        needsCardsRight &&
        needsCardsTop &&
        needsCardsBottom
      )
        break;
    }

    // Only add cards if we need them and don't have too many already
    if (cards.length > 80) {
      // If we have too many cards, clean up far away ones first
      const farBuffer = 2000;
      const visibleCards = cards.filter((card) => {
        const absoluteX = card.position.x + position.x;
        const absoluteY = card.position.y + position.y;

        return (
          absoluteX > -farBuffer &&
          absoluteX < viewportWidth + farBuffer &&
          absoluteY > -farBuffer &&
          absoluteY < viewportHeight + farBuffer
        );
      });

      if (visibleCards.length < cards.length) {
        setCards(visibleCards);
        return; // Don't add new cards this cycle
      }
    }

    // Add new cards only in the directions we need them
    const newCards = [...cards];
    const maxNewCards = 5; // Limit how many cards we add per update
    let addedCards = 0;

    if (needsCardsLeft && addedCards < maxNewCards) {
      for (let i = 0; i < 2 && addedCards < maxNewCards; i++) {
        const projectIndex = Math.floor(Math.random() * projects.length);
        const project = projects[projectIndex];
        const baseY = Math.random() * viewportHeight;
        const baseX = -buffer / 2;

        // Find a position that doesn't overlap with existing cards
        const { x, y } = findValidPosition(
          baseX - position.x,
          baseY - position.y,
          newCards
        );

        const rotation = Math.random() * 10 - 5;

        newCards.push({
          project,
          position: { x, y },
          rotation,
          id: `left-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        });
        addedCards++;
      }
    }

    if (needsCardsRight && addedCards < maxNewCards) {
      for (let i = 0; i < 2 && addedCards < maxNewCards; i++) {
        const projectIndex = Math.floor(Math.random() * projects.length);
        const project = projects[projectIndex];
        const baseY = Math.random() * viewportHeight;
        const baseX = viewportWidth + buffer / 2;

        // Find a position that doesn't overlap with existing cards
        const { x, y } = findValidPosition(
          baseX - position.x,
          baseY - position.y,
          newCards
        );

        const rotation = Math.random() * 10 - 5;

        newCards.push({
          project,
          position: { x, y },
          rotation,
          id: `right-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        });
        addedCards++;
      }
    }

    if (needsCardsTop && addedCards < maxNewCards) {
      for (let i = 0; i < 2 && addedCards < maxNewCards; i++) {
        const projectIndex = Math.floor(Math.random() * projects.length);
        const project = projects[projectIndex];
        const baseX = Math.random() * viewportWidth;
        const baseY = -buffer / 2;

        // Find a position that doesn't overlap with existing cards
        const { x, y } = findValidPosition(
          baseX - position.x,
          baseY - position.y,
          newCards
        );

        const rotation = Math.random() * 10 - 5;

        newCards.push({
          project,
          position: { x, y },
          rotation,
          id: `top-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        });
        addedCards++;
      }
    }

    if (needsCardsBottom && addedCards < maxNewCards) {
      for (let i = 0; i < 2 && addedCards < maxNewCards; i++) {
        const projectIndex = Math.floor(Math.random() * projects.length);
        const project = projects[projectIndex];
        const baseX = Math.random() * viewportWidth;
        const baseY = viewportHeight + buffer / 2;

        // Find a position that doesn't overlap with existing cards
        const { x, y } = findValidPosition(
          baseX - position.x,
          baseY - position.y,
          newCards
        );

        const rotation = Math.random() * 10 - 5;

        newCards.push({
          project,
          position: { x, y },
          rotation,
          id: `bottom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        });
        addedCards++;
      }
    }

    if (addedCards > 0) {
      setCards(newCards);
    }
  }, [cards, position, projects, findValidPosition]);

  // Update cards when position changes, but throttled
  useEffect(() => {
    updateCardsIfNeeded();
  }, [position, updateCardsIfNeeded]);

  // Set cursor style based on dragging state
  const cursorStyle = isDragging ? "cursor-grabbing" : "cursor-grab";

  return (
    <div
      ref={canvasRef}
      className={`relative h-screen w-screen overflow-hidden bg-white ${cursorStyle}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 50%, #f8f8f8 0%, #ffffff 100%)",
        backgroundSize: "100px 100px",
        backgroundPosition: `${position.x % 100}px ${position.y % 100}px`,
      }}
    >
      {/* Grid lines for visual reference - using CSS variables for better performance */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          backgroundPosition: `${position.x}px ${position.y}px`,
        }}
      />

      {/* Project cards - only render visible ones */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {visibleCards.map((card) => (
          // console.log({visibleCards})
          <div
            key={card.id}
            className="absolute will-change-transform"
            style={{
              left: card.position.x,
              top: card.position.y,
              transform: `rotate(${card.rotation}deg)`,
              transition: "transform 0.1s ease-out",
              zIndex: 10,
            }}
          >
            <ProjectCard project={card.project} rotation={card.rotation} />
          </div>
        ))}
      </div>
    </div>
  );
}
