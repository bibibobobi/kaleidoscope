/* eslint-disable react/prop-types */
import { AtSign, MessageCircle, Share2 } from "lucide-react";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
  </svg>
);

const SocialShareButtons = ({ pattern, colorScheme }) => {
  const getShareContent = () => {
    const shareUrl = `${window.location.origin}/?pattern=${pattern}&colors=${colorScheme}`;
    const shareTitle = `${
      pattern.charAt(0).toUpperCase() + pattern.slice(1)
    } Kaleidoscope - ${
      colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)
    } Theme`;
    const shareText = "來看看這個酷東西！";

    return { url: shareUrl, title: shareTitle, text: shareText };
  };

  const handleShare = async () => {
    const { url, title, text } = getShareContent();
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      try {
        await navigator.clipboard.writeText(url);
        alert("URL copied to clipboard!");
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError);
      }
    }
  };

  const handleLineShare = () => {
    const { url, text } = getShareContent();
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  };

  const handleThreadsShare = () => {
    const { url, text } = getShareContent();
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(
        `${text} ${url}`
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleFacebookShare = () => {
    const { url } = getShareContent();
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(fbUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleShare}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share kaleidoscope"
      >
        <Share2 size={24} />
      </button>

      <button
        onClick={handleLineShare}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share on Line"
      >
        <MessageCircle size={24} />
      </button>

      <button
        onClick={handleThreadsShare}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share on Threads"
      >
        <AtSign size={24} />
      </button>

      <button
        onClick={handleFacebookShare}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share on Facebook"
      >
        <FacebookIcon />
      </button>
    </div>
  );
};

export default SocialShareButtons;
