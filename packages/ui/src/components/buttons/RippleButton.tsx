import React, { useState } from "react";
import "./style.scss";
// Define the shape of the ripple state
interface RippleState {
  x: number;
  y: number;
  size: number;
}

// Define the props for the RippleButton component
interface RippleButtonProps {
  children: React.ReactNode; // Content inside the button
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional click handler
  size?: "sm" | "md" | "lg"; // Optional size prop with specific literal values
}

// RippleButton component: A reusable button with a ripple effect and sizing options
export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  size = "md",
}) => {
  // State to manage the ripple's position and size
  const [ripple, setRipple] = useState<RippleState | null>(null);

  // Handle click event for the button
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    // Calculate the size of the ripple (ensure it covers the button)
    const sizeVal = Math.max(rect.width, rect.height);

    // Calculate the x and y coordinates relative to the button
    const x = event.clientX - rect.left - sizeVal / 2;
    const y = event.clientY - rect.top - sizeVal / 2;

    // Set the ripple state, which triggers its rendering and animation
    setRipple({ x, y, size: sizeVal });

    // Call the onClick prop if provided
    if (onClick) {
      onClick(event);
    }
  };

  // Function to clear the ripple after its animation ends
  const handleAnimationEnd = () => {
    setRipple(null); // Remove the ripple from the DOM
  };

  // Determine button padding based on the 'size' prop
  const sizeClasses: { [key: string]: string } = {
    sm: "py-2 px-6 text-sm", // Small button
    md: "py-2.5 px-6.5 text-base", // Medium button (default)
    lg: "py-6 px-12 text-lg", // Large button
  };

  return (
    <button
      onClick={handleClick}
      className={`
        animate-ripple
        relative                         // Needed for absolute positioning of ripple
        overflow-hidden                  // Hides the ripple outside the button
        bg-[var(--tg-theme-button-color)]
        font-semibold                    // Font weight
        rounded-xl                       // Large rounded corners
        transition-all                   // Smooth transitions for other properties
        duration-150                     // Transition duration
        ease-in-out                      // Easing function
        active:scale-98                  // Slightly scale down when active (clicked)
        active:brightness-90             // Slight brightness reduction when active
        min-w-[150px]                    // Minimum width for consistency
        flex items-center justify-center // To center children vertically and horizontally
        w-full
        ${
          sizeClasses[size] || sizeClasses.md
        } // Apply dynamic sizing classes or default to md
      `}
    >
      {children} {/* Render children (e.g., "CONTINUE" text) */}
      {/* Ripple Effect Element */}
      {/* {ripple && (
        <span
          className={`
            absolute
            rounded-full
            opacity-75                     // Initial ripple opacity
            transform                      // Enable CSS transforms
            animate-ripple                 // Apply the ripple animation
          `}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          onAnimationEnd={handleAnimationEnd} // Clear ripple after animation
        ></span>
      )} */}
    </button>
  );
};
