"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { ProjectCard } from "./project-card";
import { LoadingScreen } from "./loading-screen";

// Card dimensions for collision detection
const CARD_WIDTH = 600; // Increased from 420
const CARD_HEIGHT = 400; // Increased from 350
const CARD_MARGIN = 200; // Increased from 100

// Track used project IDs globally to prevent repetition across renders
const usedProjectIds = new Set<string>();

// Cache for images
const imageCache = new Map<string, HTMLImageElement>();

// Track image loading state
const imageLoadingState = new Map<string, boolean>();

export function InfiniteCanvas({ projects }: { projects: any[] }) {
  console.log({ projects });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [cards, setCards] = useState<
    Array<{
      project: any;
      position: { x: number; y: number };
      rotation: number;
      id: string;
    }>
  >([]);

  // Track animation frame for cleanup
  const animationFrameRef = useRef<number | null>(null);
  // Track if initial cards have been created
  const initializedRef = useRef(false);
  // Track last update time for throttling
  const lastUpdateTimeRef = useRef(0);
  // Track if we're currently adding cards
  const isAddingCardsRef = useRef(false);
  // Track last drag position to detect significant movements
  const lastDragPositionRef = useRef({ x: 0, y: 0 });

  // Add lazy loading threshold
  const LAZY_LOADING_THRESHOLD = 500; // pixels

  // Add viewport detection
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        top: window.scrollY,
        left: window.scrollX,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isImageInViewport = useCallback((position: { x: number; y: number }) => {
    const { width, height, top, left } = viewport;
    const cardCenterX = position.x + CARD_WIDTH / 2;
    const cardCenterY = position.y + CARD_HEIGHT / 2;

    return (
      cardCenterX > left - LAZY_LOADING_THRESHOLD &&
      cardCenterX < left + width + LAZY_LOADING_THRESHOLD &&
      cardCenterY > top - LAZY_LOADING_THRESHOLD &&
      cardCenterY < top + height + LAZY_LOADING_THRESHOLD
    );
  }, [viewport]);

  // Deduplicate projects array to prevent repetition
  const uniqueProjects = useMemo(() => {
    if (!projects || !Array.isArray(projects)) return [];

    // Create a map to deduplicate by ID
    const projectMap = new Map();

    projects.forEach((project) => {
      const id = project.id || Math.random().toString(36).substring(2, 9);
      if (!projectMap.has(id)) {
        projectMap.set(id, project);
      }
    });

    return Array.from(projectMap.values());
  }, [projects]);

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

  // Get a random project that hasn't been used recently
  const getRandomProject = useCallback(() => {
    if (!uniqueProjects || uniqueProjects.length === 0) return null;

    // If we've used most of the projects, reset the used IDs
    if (usedProjectIds.size >= uniqueProjects.length * 0.8) {
      usedProjectIds.clear();
    }

    // Try to find an unused project
    let attempts = 0;
    let selectedProject = null;

    while (attempts < 15 && !selectedProject) {
      const index = Math.floor(Math.random() * uniqueProjects.length);
      const project = uniqueProjects[index];
      const projectId = project.id || `index-${index}`;

      if (!usedProjectIds.has(projectId)) {
        usedProjectIds.add(projectId);
        selectedProject = project;
        break;
      }

      attempts++;
    }

    // If we couldn't find an unused project, just return any project
    if (!selectedProject && uniqueProjects.length > 0) {
      selectedProject =
        uniqueProjects[Math.floor(Math.random() * uniqueProjects.length)];
    }

    return selectedProject;
  }, [uniqueProjects]);

  // Find a valid position for a new card that doesn't overlap
  const findValidPosition = useCallback(
    (
      baseX: number,
      baseY: number,
      existingCards: typeof cards,
      maxAttempts = 20
    ) => {
      // Try the base position first
      if (!wouldOverlap(baseX, baseY, existingCards)) {
        return { x: baseX, y: baseY };
      }

      // If base position overlaps, try nearby positions in increasing radius
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const radius = attempt * (CARD_WIDTH / 2);

        // Try positions in a circle around the base position
        for (let angle = 0; angle < 360; angle += 20) {
          // More angles for better coverage
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
        (Math.random() > 0.5 ? 1 : -1) * (CARD_WIDTH * 5 + Math.random() * 500);
      const randomY =
        baseY +
        (Math.random() > 0.5 ? 1 : -1) *
          (CARD_HEIGHT * 5 + Math.random() * 500);

      return { x: randomX, y: randomY };
    },
    [wouldOverlap]
  );

  // Generate initial card positions - only run once
  useEffect(() => {
    if (
      !uniqueProjects ||
      uniqueProjects.length === 0 ||
      initializedRef.current
    )
      return;
    initializedRef.current = true;

    const initialCards = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Create a grid of cards with non-overlapping positions
    const gridSize = 2; // -2 to 2
    const gridSpacing = Math.max(CARD_WIDTH, CARD_HEIGHT) + CARD_MARGIN * 2;

    // Create a set to track used indices for initial cards
    const usedInitialIndices = new Set<number>();

    for (let i = -gridSize; i <= gridSize; i++) {
      for (let j = -gridSize; j <= gridSize; j++) {
        // Skip some positions to create a more organic layout
        if (Math.random() < 0.2) continue;

        // Get a random project that hasn't been used yet
        let projectIndex;
        do {
          projectIndex = Math.floor(Math.random() * uniqueProjects.length);
        } while (
          usedInitialIndices.has(projectIndex) &&
          usedInitialIndices.size < uniqueProjects.length
        );

        usedInitialIndices.add(projectIndex);
        const project = uniqueProjects[projectIndex];

        // Track this project ID globally
        if (project.id) {
          usedProjectIds.add(project.id);
        }

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
  }, [uniqueProjects, findValidPosition]);

  // Memoize the visible cards calculation to avoid recalculating on every render
  const visibleCards = useMemo(() => {
    if (!canvasRef.current) return cards;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buffer = 1000; // Buffer distance for smoother experience

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
      lastDragPositionRef.current = { x: e.clientX, y: e.clientY };
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      // Skip small movements to reduce unnecessary updates
      const dx = e.clientX - lastDragPositionRef.current.x;
      const dy = e.clientY - lastDragPositionRef.current.y;
      const movementDistance = Math.sqrt(dx * dx + dy * dy);

      // Only update if movement is significant (more than 2 pixels)
      if (movementDistance < 2) return;

      // Update last drag position
      lastDragPositionRef.current = { x: e.clientX, y: e.clientY };

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
        lastDragPositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    },
    [position]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;

      // Skip small movements to reduce unnecessary updates
      const dx = e.touches[0].clientX - lastDragPositionRef.current.x;
      const dy = e.touches[0].clientY - lastDragPositionRef.current.y;
      const movementDistance = Math.sqrt(dx * dx + dy * dy);

      // Only update if movement is significant (more than 2 pixels)
      if (movementDistance < 2) return;

      // Update last drag position
      lastDragPositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

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

  // Throttled function to add new cards as needed - with debounce
  const updateCardsIfNeeded = useCallback(() => {
    // Prevent concurrent updates
    if (isAddingCardsRef.current) return;
    isAddingCardsRef.current = true;

    try {
      // Throttle updates to once every 3000ms (3 seconds)
      const now = Date.now();
      if (now - lastUpdateTimeRef.current < 3000) {
        isAddingCardsRef.current = false;
        return;
      }
      lastUpdateTimeRef.current = now;

      // Don't add cards if we don't have projects
      if (!uniqueProjects || uniqueProjects.length === 0) {
        isAddingCardsRef.current = false;
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const buffer = 1200; // Distance from edge to start adding new cards

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
      if (cards.length > 30) {
        // If we have too many cards, clean up far away ones first
        const farBuffer = 3000;
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
          isAddingCardsRef.current = false;
          return; // Don't add new cards this cycle
        }
      }

      // Add new cards only in the directions we need them
      const newCards = [...cards];
      const maxNewCards = 2; // Limit how many cards we add per update
      let addedCards = 0;

      if (needsCardsLeft && addedCards < maxNewCards) {
        const project = getRandomProject();
        if (project) {
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
        const project = getRandomProject();
        if (project) {
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
            id: `right-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
          });
          addedCards++;
        }
      }

      if (needsCardsTop && addedCards < maxNewCards) {
        const project = getRandomProject();
        if (project) {
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
        const project = getRandomProject();
        if (project) {
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
            id: `bottom-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
          });
          addedCards++;
        }
      }

      if (addedCards > 0) {
        setCards(newCards);
      }
    } finally {
      isAddingCardsRef.current = false;
    }
  }, [cards, position, uniqueProjects, findValidPosition, getRandomProject]);

  // Update cards when position changes, but with a debounce
  // Only run when the user stops dragging
  useEffect(() => {
    if (!isDragging) {
      const timer = setTimeout(() => {
        updateCardsIfNeeded();
      }, 800); // Increased debounce time
      return () => clearTimeout(timer);
    }
  }, [position, updateCardsIfNeeded, isDragging]);

  // Set cursor style based on dragging state
  const cursorStyle = isDragging ? "cursor-grabbing" : "cursor-grab";

  // Loading state
  const [totalImages, setTotalImages] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Preload and cache images
  useEffect(() => {
    console.log({isInitialLoading})
    if (!isInitialLoading) return;

    const preloadImages = async () => {
      const imageUrls = projects
        .map((project) => project?.properties?.image?.files?.[0]?.file?.url)
        .filter((url): url is string => url !== undefined);

      setTotalImages(imageUrls.length);

      const preloadPromises = imageUrls.map(async (url) => {
        if (imageCache.has(url)) {
          setLoadedImages((prev) => prev + 1);
          return;
        }

        try {
          // Create image element
          const img = new window.Image();
          img.crossOrigin = "anonymous"; // Enable CORS
          img.src = url;
          
          // Track loading state
          imageLoadingState.set(url, true);

          // Wait for image to load
          await new Promise((resolve, reject) => {
            img.onload = () => {
              imageCache.set(url, img);
              imageLoadingState.set(url, false);
              setLoadedImages((prev) => prev + 1);
              resolve(img);
            };
            img.onerror = () => {
              imageLoadingState.set(url, false);
              setLoadedImages((prev) => prev + 1);
              reject(new Error(`Failed to load image: ${url}`));
            };
          });

        } catch (error) {
          console.error(`Failed to preload image: ${url}`, error);
          imageLoadingState.set(url, false);
          setLoadedImages((prev) => prev + 1);
        }
      });

      // Wait for all images to load
      await Promise.all(preloadPromises);
      setIsInitialLoading(false);
    };

    preloadImages().catch(error => {
      console.error("Error preloading images:", error);
      setIsInitialLoading(false);
    });
  }, [projects, isInitialLoading]);

  // Check if all images are loaded
  const areAllImagesLoaded = useCallback(() => {
    return [...imageLoadingState.values()].every(state => !state);
  }, []);

  // Get image URL safely with a fallback
  const getImageUrl = useCallback((project: any) => {
    const url = project?.properties?.image?.files?.[0]?.file?.url;
    return url || "/placeholder.svg";
  }, []);

  // Use cached image if available
  const getCachedImage = useCallback((url: string) => {
    return imageCache.get(url);
  }, []);

  return (
    <>
      {isInitialLoading && (
        <LoadingScreen 
          totalImages={totalImages} 
          loadedImages={loadedImages} 
        />
      )}
      
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
              <ProjectCard
  project={card.project}
  rotation={card.rotation}
  imageUrl={getImageUrl(card.project)}
/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
