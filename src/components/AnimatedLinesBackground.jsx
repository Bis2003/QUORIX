import React from "react";
import "./animated-lines.css";

// DNA spiral: 16 dots/lines, animated in a spiral, right side only
export const AnimatedLinesBackground = () => (
  <div className="dna-spiral-bg">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className={`dna-dot dna-dot-${i}`}></div>
    ))}
  </div>
); 