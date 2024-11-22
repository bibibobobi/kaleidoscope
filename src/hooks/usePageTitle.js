import { useEffect } from "react";

export function usePageTitle(pattern, colorScheme) {
  useEffect(() => {
    // Create a descriptive title based on current settings
    const title =
      pattern && colorScheme
        ? `${
            pattern.charAt(0).toUpperCase() + pattern.slice(1)
          } Kaleidoscope - ${
            colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)
          } Theme`
        : "Kaleidoscope Art Generator";

    document.title = title;
  }, [pattern, colorScheme]);
}
