/* eslint-disable react/prop-types */
import { Share2 } from "lucide-react";

const ShareButton = ({ pattern, colorScheme }) => {
  const handleShare = async () => {
    // Get current URL with parameters
    const shareUrl = `${window.location.origin}/?pattern=${pattern}&colors=${colorScheme}`;

    // Title based on current settings
    const shareTitle = `${
      pattern.charAt(0).toUpperCase() + pattern.slice(1)
    } Kaleidoscope - ${
      colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)
    } Theme`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: "來看看這個酷東西！",
          url: shareUrl,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert("URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback if share fails
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("URL copied to clipboard!");
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="share-button"
      aria-label="Share kaleidoscope"
    >
      <Share2 size={24} />
    </button>
  );
};

export default ShareButton;
