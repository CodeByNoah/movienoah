import React from "react";

function ScoreSquare({ title, description = "8.6" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-accent-color-900/60 bg-card-background px-4 py-3 sm:px-6 sm:py-4 text-center shadow-md">
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-secondary-text">
        {title}
      </p>
      <p className="text-2xl sm:text-3xl font-extrabold text-accent-color-900">
        {description}
      </p>
    </div>
  );
}

export default ScoreSquare;
