"use client";
import ReactPlayer from "react-player";
import "@/styles/video-player.css";
import { useEffect, useRef, useState } from "react";
import { Play, PlayIcon, Volume2, VolumeOffIcon } from "lucide-react";

export function VideoPlayer({
  src,
  thumbnail,
  index,
  currentSlideIndex,
  isCarousel = false, // New prop to distinguish carousel usage
  aspectRatio = "9/16", // Make aspect ratio configurable
}: {
  src: string;
  thumbnail: string;
  index: number;
  currentSlideIndex: number;
  isCarousel?: boolean;
  aspectRatio?: string;
}) {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleMuteUnmute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
  };

  useEffect(() => {
    console.log({ index, currentSlideIndex });
    if (index !== currentSlideIndex) {
      setIsPlaying(false);
    }
  }, [currentSlideIndex, isPlaying]);

  // Different styling for carousel vs regular usage
  const containerStyle = isCarousel
    ? "relative w-full h-full bg-black flex items-center justify-center cursor-pointer overflow-hidden"
    : "relative w-full h-full bg-black flex items-center justify-center cursor-pointer overflow-hidden";

  const videoStyle = isCarousel
    ? "!object-contain w-full h-full" // Use contain for carousel to fit within container
    : "!object-cover";

  return (
    <div
      className={containerStyle}
      style={!isCarousel ? { aspectRatio } : {}} // Only apply aspect ratio when not in carousel
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <ReactPlayer
        src={src}
        playing={isPlaying}
        controls={false}
        width="100%"
        height="100%"
        muted={muted}
        loop={false}
        className={videoStyle}
      />

      {/* Center play overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handleTogglePlay}
            className="bg-black bg-opacity-50 rounded-full p-4"
          >
            <Play size={32} className="text-white font-normal" />
          </button>
        </div>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          className="bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors w-10 h-10"
          onClick={handleMuteUnmute}
        >
          {muted ? (
            <VolumeOffIcon className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
