/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface MCCSDLogoProps {
  className?: string;
  variant?: "full" | "icon" | "footer";
  color?: string; // Optional custom color override
}

export default function MCCSDLogo({ className = "h-14", variant = "full", color }: MCCSDLogoProps) {
  const brandBlue = color || "#002060"; // The official deep navy blue code

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');
          .brand-mccsd-icon-text {
            font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
            font-weight: 900;
          }
        `}} />
        {/* Background rounded rect */}
        <rect width="100" height="100" rx="20" fill={brandBlue} />
        {/* Only the letter M inside the badge */}
        <text 
          x="50" 
          y="76" 
          textAnchor="middle" 
          fill="white" 
          className="brand-mccsd-icon-text" 
          fontSize="75px"
        >
          M
        </text>
      </svg>
    );
  }

  // Full bilingual brand identity with emblem deleted and only letter M centered
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <svg
        viewBox="0 0 520 185"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style dangerouslySetInnerHTML={{ __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@750;850;950&family=Inter:wght@450;550;650;750&family=Playfair+Display:wght@900&display=swap');
            .brand-mccsd-text {
              font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
              font-weight: 950;
              letter-spacing: -2px;
            }
            .brand-arabic-text {
              font-family: 'Cairo', system-ui, -apple-system, sans-serif;
              font-weight: 850;
              letter-spacing: -0.2px;
            }
            .brand-english-text {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              font-weight: 600;
              letter-spacing: 0.2px;
            }
          `}} />
        </defs>

        {/* Centered focal letters MCCSD */}
        <g id="BrandLetters" fill={brandBlue}>
          <text 
            x="260" 
            y="98" 
            textAnchor="middle" 
            className="brand-mccsd-text" 
            fontSize="85px"
          >
            MCCSD
          </text>
        </g>

        {/* Separator line beneath the letters */}
        <line x1="15" y1="124" x2="505" y2="124" stroke={brandBlue} strokeWidth="2.5" />

        {/* Arabic Subtitle: مركز مساواة لتنمية المجتمع المدني - Centered for symmetric balance */}
        <text
          x="260"
          y="152"
          fill={brandBlue}
          textAnchor="middle"
          className="brand-arabic-text"
          style={{
            fontSize: "23px",
          }}
        >
          مركز مساواة لتنمية المجتمع المدني
        </text>

        {/* English Subtitle: Mossawah Center for Civil Society Development - Centered for symmetric balance */}
        <text
          x="260"
          y="178"
          fill={brandBlue}
          textAnchor="middle"
          className="brand-english-text"
          style={{
            fontSize: "14.5px",
          }}
        >
          Mossawah Center for Civil Society Development
        </text>
      </svg>
    </div>
  );
}
