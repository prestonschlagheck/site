'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridElements, setGridElements] = useState<React.ReactNode[]>([]);
  const gridInfoRef = useRef<{columns: number, rows: number}>({columns: 0, rows: 0});
  const animationFrameRef = useRef<number | null>(null);
  const activePositionsRef = useRef<Set<number>>(new Set());

  // Create static grid of binary characters
  useEffect(() => {
    if (!containerRef.current) return;

    const generateBinaryGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Set character size to 10px - ensure it's consistent
      const charSize = 10;
      
      // Make sure we have whole numbers for grid dimensions
      const columns = Math.floor(width / charSize);
      const rows = Math.floor(height / charSize);
      
      // Store grid dimensions for animation use
      gridInfoRef.current = { columns, rows };
      
      const cells: React.ReactNode[] = [];
      const totalCells = columns * rows;
      
      for (let i = 0; i < totalCells; i++) {
        // Calculate row and column for this index
        const row = Math.floor(i / columns);
        const col = i % columns;
        
        // Randomly generate 0 or 1
        const binary = Math.random() > 0.5 ? '0' : '1';
        cells.push(
          <div 
            key={i} 
            className="binary" 
            data-index={i}
            data-row={row}
            data-column={col}
          >
            {binary}
          </div>
        );
      }
      
      setGridElements(cells);
      
      // Start animation after grid is created
      setTimeout(() => {
        initializeRainAnimation();
      }, 500);
    };

    generateBinaryGrid();
    
    const handleResize = () => {
      // Clear any existing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      activePositionsRef.current.clear();
      generateBinaryGrid();
    };
    
    // Handle orientation changes on mobile
    const handleOrientationChange = () => {
      setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Copy the ref value to a variable for the cleanup function
    const activePositionsRefValue = activePositionsRef.current;
    const animationFrameRefValue = animationFrameRef.current;
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (animationFrameRefValue) {
        cancelAnimationFrame(animationFrameRefValue);
      }
      activePositionsRefValue.clear();
    };
  }, []);
  
  // Initialize rain animation with fading effects
  const initializeRainAnimation = () => {
    if (!containerRef.current) return;
    const { columns, rows } = gridInfoRef.current;
    
    // Rain drop data
    interface RainDrop {
      column: number;
      position: number;
      length: number; // Variable length
      speed: number;
      isRedStreak: boolean; // Some streaks will be red
      lastUpdate: number;
      state: 'fading-in' | 'fading-out' | 'stable'; // Track animation state
      fadeProgress: number; // 0-1
      lastPositions: number[]; // Track last positions for cleanup
    }
    
    // Create more initial rain drops (target around 40 visible drops)
    const rainDrops: RainDrop[] = [];
    const numInitialDrops = Math.min(40, Math.floor(columns * 0.6)); // Either 40 or 60% of columns, whichever is smaller
    
    // Create an array of column indices and shuffle it
    const availableColumns = Array.from({ length: columns }, (_, i) => i);
    for (let i = availableColumns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableColumns[i], availableColumns[j]] = [availableColumns[j], availableColumns[i]];
    }
    
    // Create drops in random columns
    for (let i = 0; i < numInitialDrops; i++) {
      const column = availableColumns[i];
      
      // Ensure column is a whole number
      const safeColumn = Math.floor(column);
      
      rainDrops.push({
        column: safeColumn,
        position: Math.floor(Math.random() * rows), // Random starting position
        length: Math.floor(Math.random() * 16) + 5, // Length 5-20 (varied length)
        speed: Math.random() * 100 + 80, // Update every 80-180ms
        isRedStreak: Math.random() < 0.7, // 70% chance to be a red streak
        lastUpdate: performance.now(),
        state: 'fading-in',
        fadeProgress: 0,
        lastPositions: []
      });
    }
    
    // Function to clear all characters
    const clearAllCharacters = () => {
      const allCells = containerRef.current?.querySelectorAll('.binary') || [];
      allCells.forEach(cell => {
        (cell as HTMLElement).classList.remove('fade-in');
        (cell as HTMLElement).classList.remove('fade-out');
        (cell as HTMLElement).classList.remove('highlight');
        (cell as HTMLElement).classList.remove('highlight-fade');
        (cell as HTMLElement).style.opacity = '1';
        (cell as HTMLElement).style.color = '';
      });
      activePositionsRef.current.clear();
    };

    // Reset a cell to background color
    const resetCell = (cellIndex: number) => {
      if (!activePositionsRef.current.has(cellIndex)) return;
      
      const cell = containerRef.current?.querySelector(`[data-index="${cellIndex}"]`) as HTMLDivElement;
      if (cell) {
        cell.classList.remove('fade-in');
        cell.classList.remove('fade-out');
        cell.classList.remove('highlight');
        cell.classList.remove('highlight-fade');
        cell.style.opacity = '1';
        cell.style.color = '';
      }
      
      activePositionsRef.current.delete(cellIndex);
    };
    
    // Animation function with fading
    const animate = (timestamp: number) => {
      // Update rain drops
      for (let i = 0; i < rainDrops.length; i++) {
        const drop = rainDrops[i];
        
        // Check if it's time to update this drop
        if (timestamp - drop.lastUpdate > drop.speed) {
          drop.lastUpdate = timestamp;
          
          // Clear the cell that's now beyond the tail
          if (drop.lastPositions.length >= drop.length) {
            const oldTailPos = drop.lastPositions.pop();
            if (oldTailPos !== undefined) {
              const oldTailCellIndex = oldTailPos * columns + drop.column;
              resetCell(oldTailCellIndex);
            }
          }
          
          // Handle state transitions
          if (drop.state === 'fading-in') {
            drop.fadeProgress += 0.1;
            if (drop.fadeProgress >= 1) {
              drop.state = 'stable';
              drop.fadeProgress = 1;
            }
          } else if (drop.state === 'fading-out') {
            drop.fadeProgress -= 0.1;
            if (drop.fadeProgress <= 0) {
              // Reset drop when fully faded out
              
              // Clear all positions from this drop
              drop.lastPositions.forEach(pos => {
                const cellIndex = pos * columns + drop.column;
                resetCell(cellIndex);
              });
              
              drop.position = 0;
              drop.length = Math.floor(Math.random() * 16) + 5; // New length 5-20
              drop.speed = Math.random() * 100 + 80; // New random speed
              drop.isRedStreak = Math.random() < 0.7; // 70% chance to be a red streak
              drop.state = 'fading-in';
              drop.fadeProgress = 0;
              drop.lastPositions = [];
              continue; // Skip drawing this frame
            }
          } else if (drop.state === 'stable') {
            // Move drop down
            drop.position += 1;
            
            // Start fading out when near bottom
            if (drop.position > rows - drop.length / 2) {
              drop.state = 'fading-out';
            }
          }
          
          // Add current position to track - ensure they're strictly row positions
          // This ensures vertical movement only
          const currentPosition = Math.floor(drop.position);
          drop.lastPositions.unshift(currentPosition);
          
          // Draw this drop with appropriate fade effect
          for (let j = 0; j < Math.min(drop.length, drop.lastPositions.length); j++) {
            const pos = drop.lastPositions[j];
            if (pos >= 0 && pos < rows) {
              // Ensure we use the exact column for strict vertical movement
              const cellIndex = Math.floor(pos) * columns + Math.floor(drop.column);
              const cell = containerRef.current?.querySelector(`[data-index="${cellIndex}"]`) as HTMLDivElement;
              
              if (cell) {
                // Remove all classes first
                cell.classList.remove('fade-in');
                cell.classList.remove('fade-out');
                cell.classList.remove('highlight');
                cell.classList.remove('highlight-fade');
                
                // Mark this position as active
                activePositionsRef.current.add(cellIndex);
                
                // Calculate a fade factor based on position
                const fadeInOutFactor = drop.fadeProgress;
                
                // Apply color/brightness based on position in streak and if it's a red streak
                if (drop.isRedStreak) {
                  // Red streaks: Red head fading to gray through the streak
                  if (j === 0) {
                    // Head of the streak is bright red
                    cell.classList.add('highlight');
                  } else {
                    // Rest of streak gradually transitions from red to gray
                    // Use a longer transition area - about 75% of the streak length
                    const transitionLength = Math.max(Math.floor(drop.length * 0.75), 3);
                    
                    if (j < transitionLength) {
                      // Calculate position in the transition (0 = start/red, 1 = end/gray)
                      const transitionPos = j / transitionLength;
                      
                      // Create a smoother transition from red to light gray
                      const red = Math.round(255 - transitionPos * 180); // 255 to 75
                      const green = Math.round(transitionPos * 95); // 0 to 95
                      const blue = Math.round(transitionPos * 95); // 0 to 95
                      
                      cell.classList.add('highlight-fade');
                      cell.style.color = `rgba(${red}, ${green}, ${blue}, ${fadeInOutFactor})`;
                    } else {
                      // End of streak is light gray
                      cell.classList.add(drop.state === 'fading-out' ? 'fade-out' : 'fade-in');
                    }
                  }
                } else {
                  // Normal streak: All gray
                  cell.classList.add(drop.state === 'fading-out' ? 'fade-out' : 'fade-in');
                }
                
                // Apply opacity based on fade progress and position
                const positionFactor = 1 - (j / drop.length) * 0.7; // Brighter at the beginning
                const finalOpacity = positionFactor * fadeInOutFactor;
                cell.style.opacity = finalOpacity.toString();
              }
            }
          }
        }
      }
      
      // Add new drops occasionally (maintain ~70% of columns with drops or at least 40)
      if (rainDrops.length < Math.max(40, Math.floor(columns * 0.7)) && Math.random() < 0.04) {
        // Find a column without a drop
        const existingColumns = new Set(rainDrops.map(drop => drop.column));
        let newColumn;
        
        // Try to find an unused column
        const availableColumns = [];
        for (let col = 0; col < columns; col++) {
          if (!existingColumns.has(col)) {
            availableColumns.push(col);
          }
        }
        
        // If there are available columns, pick one randomly
        if (availableColumns.length > 0) {
          newColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
          
          // Add a new drop
          rainDrops.push({
            column: newColumn,
            position: 0,
            length: Math.floor(Math.random() * 16) + 5, // Length 5-20
            speed: Math.random() * 100 + 80,
            isRedStreak: Math.random() < 0.7, // 70% chance to be a red streak
            lastUpdate: performance.now(),
            state: 'fading-in',
            fadeProgress: 0,
            lastPositions: []
          });
        }
      }
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Clear any existing animation state
    clearAllCharacters();
    
    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0 relative">
      {/* Binary grid background */}
      <div 
        ref={containerRef}
        className="binary-grid-container"
      >
        {gridElements}
      </div>

      {/* Content with adjusted text sizes */}
      <div className="z-10 text-center px-4 max-w-3xl">
        <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-tight drop-shadow-lg">
          Preston Schlagheck
        </h1>
        <div className="space-y-4">
          <p className="opacity-80 drop-shadow-lg text-[11px] md:text-xs">
            Finance & Computer Science Student at University of South Carolina, Darla Moore School of Business
          </p>
          <p className="opacity-70 drop-shadow-lg text-[10px] md:text-xs">
            Guilford, Connecticut, United States
          </p>
        </div>
      </div>
    </main>
  );
}
