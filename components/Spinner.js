"use client";
import React from "react";

/**
 * Reusable, responsive glowing Spinner component styled with MovieNoah's red accent theme.
 *
 * @param {Object} props
 * @param {"xs" | "sm" | "md" | "lg" | "xl"} [props.size="md"] - Size preset
 * @param {string} [props.text] - Optional loading description text
 * @param {boolean} [props.fullPage=false] - Whether to occupy full section/page height centered
 * @param {"accent" | "white" | "current"} [props.color="accent"] - Color scheme
 * @param {boolean} [props.inline=false] - Display inline with text
 * @param {string} [props.className=""] - Additional container classes
 */
export default function Spinner({
  size = "md",
  text,
  fullPage = false,
  color = "accent",
  inline = false,
  className = "",
}) {
  const sizeMap = {
    xs: "h-4 w-4",
    sm: "h-5 w-5",
    md: "h-8 w-8 sm:h-9 sm:w-9",
    lg: "h-12 w-12 sm:h-14 sm:w-14",
    xl: "h-16 w-16 sm:h-20 sm:w-20",
  };

  const textSizeMap = {
    xs: "text-xs",
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
    xl: "text-lg sm:text-xl",
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;
  const textSize = textSizeMap[size] || textSizeMap.md;

  const colorStyles = {
    accent: {
      track: "text-accent-color-900/20",
      indicator: "text-accent-color-900",
      glow: "drop-shadow-[0_0_10px_rgba(243,63,63,0.55)]",
    },
    white: {
      track: "text-white/20",
      indicator: "text-white",
      glow: "drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]",
    },
    current: {
      track: "opacity-25",
      indicator: "currentColor",
      glow: "",
    },
  };

  const selectedColor = colorStyles[color] || colorStyles.accent;

  const spinnerSvg = (
    <div
      className={`relative flex shrink-0 items-center justify-center ${spinnerSize} ${selectedColor.glow}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="h-full w-full animate-spin"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Track Circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          className={selectedColor.track}
        />
        {/* Animated Spinning Arc */}
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="85, 200"
          strokeDashoffset="0"
          className={selectedColor.indicator}
        />
      </svg>
      {/* Center glowing ping for larger sizes */}
      {(size === "lg" || size === "xl") && (
        <span className="absolute h-2 w-2 rounded-full bg-accent-color-900/70 animate-ping pointer-events-none" />
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (inline) {
    return (
      <span
        className={`inline-flex items-center gap-2 font-medium ${className}`}
      >
        {spinnerSvg}
        {text && <span className={textSize}>{text}</span>}
      </span>
    );
  }

  const containerClasses = fullPage
    ? "flex min-h-[50vh] sm:min-h-[60vh] w-full flex-col items-center justify-center p-4 sm:p-8 text-center"
    : "flex w-full flex-col items-center justify-center py-6 sm:py-8 text-center";

  return (
    <div className={`${containerClasses} ${className}`}>
      {spinnerSvg}
      {text && (
        <p
          className={`mt-3 sm:mt-4 font-medium text-secondary-text animate-pulse ${textSize}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
