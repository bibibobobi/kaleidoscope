/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import "./kaleidoscope.css";
import ShareButton from "./ShareButton";

const colorSchemes = {
  sunset: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"],
  neon: ["#FF00FF", "#00FF00", "#00FFFF", "#FF0000", "#FFFF00"],
  ocean: ["#034F84", "#92A8D1", "#89CFF0", "#4682B4", "#0077BE"],
  forest: ["#228B22", "#32CD32", "#90EE90", "#006400", "#98FB98"],
  fire: ["#FF4500", "#FF6B6B", "#FF8C00", "#FFA500", "#FFD700"],
};

const patterns = {
  crystals: (colors) => `
    <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 0L20 0L40 20L40 40L20 40L0 20Z" fill="${colors[0]}" />
      <path d="M20 0L40 0L40 20L20 20Z" fill="${colors[1]}" />
      <path d="M0 20L20 20L20 40L0 40Z" fill="${colors[2]}" />
    </pattern>
  `,
  waves: (colors) => `
    <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 20C10 10, 30 30, 40 20C30 30, 10 10, 0 20Z" fill="${colors[0]}" />
      <path d="M0 10C10 0, 30 20, 40 10C30 20, 10 0, 0 10Z" fill="${colors[1]}" />
      <path d="M0 30C10 20, 30 40, 40 30C30 40, 10 20, 0 30Z" fill="${colors[2]}" />
    </pattern>
  `,
  starburst: (colors) => `
    <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="20" fill="${colors[0]}" />
      <path d="M20 0L23 17L40 20L23 23L20 40L17 23L0 20L17 17Z" fill="${colors[1]}" />
      <circle cx="20" cy="20" r="5" fill="${colors[2]}" />
    </pattern>
  `,
  mosaic: (colors) => `
    <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="20" height="20" fill="${colors[0]}"/>
      <rect x="20" y="0" width="20" height="20" fill="${colors[1]}"/>
      <rect x="0" y="20" width="20" height="20" fill="${colors[2]}"/>
      <rect x="20" y="20" width="20" height="20" fill="${colors[3]}"/>
    </pattern>
  `,
};

const Tile = ({ pattern, colorScheme }) => {
  const colors = colorSchemes[colorScheme] || colorSchemes.sunset;
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const patternFn = patterns[pattern] || patterns.mosaic;

  return (
    <div className="tile">
      <svg width="100%" height="100%" className="texture">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: colors[0], stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: colors[1], stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: colors[2], stopOpacity: 1 }}
            />
          </linearGradient>
          <g dangerouslySetInnerHTML={{ __html: patternFn(colors) }} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        <rect
          width="100%"
          height="100%"
          fill="url(#pattern)"
          style={{ mixBlendMode: "overlay" }}
        />
      </svg>
    </div>
  );
};

const Container = ({ pattern, colorScheme }) => (
  <div className="container">
    {[...Array(6)].map((_, i) => (
      <Tile key={i} pattern={pattern} colorScheme={colorScheme} />
    ))}
  </div>
);

const Controls = ({ pattern, colorScheme, onChange }) => (
  <div className="controls">
    <select
      className="select-control"
      value={pattern}
      onChange={(e) => onChange("pattern", e.target.value)}
    >
      <option value="starburst">Starburst</option>
      <option value="waves">Waves</option>
      <option value="crystals">Crystals</option>
      <option value="mosaic">Mosaic</option>
    </select>
    <select
      className="select-control"
      value={colorScheme}
      onChange={(e) => onChange("colors", e.target.value)}
    >
      <option value="sunset">Sunset</option>
      <option value="neon">Neon</option>
      <option value="ocean">Ocean</option>
      <option value="forest">Forest</option>
      <option value="fire">Fire</option>
    </select>
  </div>
);

const Kaleidoscope = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pattern, setPattern] = useState(
    searchParams.get("pattern") || "starburst"
  );
  const [colorScheme, setColorScheme] = useState(
    searchParams.get("colors") || "sunset"
  );

  // Update state when URL params change
  useEffect(() => {
    const currentPattern = searchParams.get("pattern");
    const currentColors = searchParams.get("colors");

    if (currentPattern && currentPattern !== pattern) {
      setPattern(currentPattern);
    }
    if (currentColors && currentColors !== colorScheme) {
      setColorScheme(currentColors);
    }
  }, [searchParams, pattern, colorScheme]);

  // Handle direct URL navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const newPattern = params.get("pattern") || "starburst";
      const newColors = params.get("colors") || "sunset";

      setPattern(newPattern);
      setColorScheme(newColors);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleChange = (param, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(param, value);
    setSearchParams(newParams);

    if (param === "pattern") {
      setPattern(value);
    } else if (param === "colors") {
      setColorScheme(value);
    }
  };

  usePageTitle(pattern, colorScheme);

  return (
    <div className="kaleidoscope-container">
      <Controls
        pattern={pattern}
        colorScheme={colorScheme}
        onChange={handleChange}
      />
      <div className="kaleidoscope">
        {[...Array(7)].map((_, i) => (
          <Container key={i} pattern={pattern} colorScheme={colorScheme} />
        ))}
      </div>
      <ShareButton pattern={pattern} colorScheme={colorScheme} />
    </div>
  );
};

export default Kaleidoscope;
