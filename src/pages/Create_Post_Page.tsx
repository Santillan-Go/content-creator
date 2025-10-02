"use client";

import { useState, useRef, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

import { ImagePlus, X, UserCircle2, MapPin } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "@/styles/video-player.css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css"; // basic styles
import "swiper/css/navigation"; // optional: navigation styles
import "swiper/css/pagination"; // optional: pagination styles
import { CreatePostRightSide } from "@/components/ui/Create_Post_Right_Side";
import { Dialog } from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/ui/Video_Player";
import FullScreenLoader from "@/components/ui/FullScreenLoader";
import { uploadToCloudinary } from "@/services/cloudinary";
import { useRouter } from "next/navigation";
import { getImageDimensions } from "@/lib/utils";
interface MediaPreview {
  src: string;
  type: string;
  thumbnail: string;
}

export default function CreatePost({
  userImage,
  username,
}: {
  userImage?: string;
  username?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [previews, setPreviews] = useState<MediaPreview[]>([]);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Update handleFileSelect to include validation
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError(""); // Reset error state

    try {
      // Validate each image
      for (const file of files) {
        if (file.type.startsWith("image/")) {
          const { width, height } = await getImageDimensions(file);

          if (width < 1000 || height < 1000) {
            setError(`${file.name} must be at least 1000x1000 pixels`);
            setSelectedFiles([]);
            setPreviews([]);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            return;
          }
        }
      }

      setSelectedFiles(files);

      // Create preview URLs with type detection
      const newPreviews = files.map((file) => {
        const isVideo = file.type.startsWith("video/");

        return {
          src: URL.createObjectURL(file),
          type: isVideo ? "video" : "image",
          thumbnail: isVideo
            ? URL.createObjectURL(file)
            : URL.createObjectURL(file),
        };
      });
      setPreviews(newPreviews);
    } catch (err) {
      console.error("Error processing images:", err);
      setError("Error processing images. Please try again.");
      setSelectedFiles([]);
      setPreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Clean up URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.src));
    };
  }, [previews]);

  const handlePublish = async () => {
    if (
      description.length > 0 &&
      description.length < 300 &&
      selectedFiles.length > 0
    ) {
      setIsLoading(true);

      try {
        //
        const uploadPromises = selectedFiles.map(async (file) => {
          const isVideo = file.type.startsWith("video/");
          const uploadedUrl = await uploadToCloudinary(file, false);

          // Extract the fileName (public_id + extension)
          const fileName = uploadedUrl.split("/").pop().split(".")[0];

          //url, thumbnail, type
          return {
            url: uploadedUrl,
            type: isVideo ? "video" : "image",
            thumbnail: isVideo
              ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/so_2/${fileName}.jpg`
              : uploadedUrl,
          };
        });

        const uploadedMedia = await Promise.all(uploadPromises);

        // Send to backend
        const response = await fetch(
          "https://content-creator-service.vercel.app/create-post",
          {
            method: "POST",
            body: JSON.stringify({
              username,
              caption: description,
              media: uploadedMedia,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Success - close modal and reset state
        setIsModalOpen(false);
        setSelectedFiles([]);
        setPreviews([]);
        setDescription("");
        setError("");

        router.refresh();
      } catch (error) {
        console.error("Error publishing post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  return (
    <>
      <Button
        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-primary/25 rounded-2xl"
        onClick={() => setIsModalOpen(true)}
      >
        <ImagePlus className="w-4 h-4 mr-2" />
        Create Post
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFiles([]);
          setPreviews([]);
          setDescription("");
          setError("");
        }}
      >
        <div className="flex flex-col sm:flex-row h-[80vh]">
          {/* Left side - Image upload/preview */}

          {!previews.length ? (
            <>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              <DropZone
                onClick={() => fileInputRef.current?.click()}
                error={error}
              />
            </>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop={previews.length > 1}
              className=" !w-[50%] !h-full bg-black/95"
              onSlideChange={handleSlideChange}
            >
              {previews.map((preview, index) => (
                <SwiperSlide
                  key={index}
                  className="!flex !items-center !justify-center"
                >
                  <MediaContent
                    src={preview.src}
                    type={preview.type}
                    thumbnail={preview.thumbnail}
                    index={index}
                    currentSlideIndex={currentSlideIndex}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Right side - Description and publish */}
          <CreatePostRightSide
            userImage={userImage}
            username={username}
            description={description}
            setDescription={setDescription}
            selectedFiles={selectedFiles}
            handlePublish={handlePublish}
          />
        </div>
      </Modal>
      <FullScreenLoader isLoading={isLoading} message="Uploading..." />
    </>
  );
}

const MediaContent = ({
  src,
  type,
  thumbnail,
  index,
  currentSlideIndex,
}: {
  src: string;
  type: string;
  thumbnail: string;
  index: number;
  currentSlideIndex: number;
}) => {
  if (type === "video") {
    return (
      <VideoPlayer
        src={src}
        thumbnail={thumbnail}
        index={index}
        currentSlideIndex={currentSlideIndex}
      />
    );
  }

  return (
    <img
      src={src}
      alt="Media content"
      className=" w-full h-full object-cover"
    />
  );
};

// ...existing CreatePost component code...

const DropZone = ({
  onClick,
  error,
}: {
  onClick: () => void;
  error?: string;
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-3 gap-2">
      {error && (
        <div className="w-full max-w-md p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <div
        className="sm:w-4/5 w-[70%] p-5 rounded-xl border-2 hover:border-dashed 
           border-secondary hover:border-secondary transition-all  cursor-pointer 
           bg-secondary/5 backdrop-blur-sm group hover:bg-secondary/10"
        onClick={onClick}
      >
        <Button
          // variant="ghost"
          className="w-full flex flex-col items-center gap-4 text-secondary 
            h-auto py-8 px-4 hover:bg-secondary hover:bg-opacity-40
            transition-all duration-300 group-hover:scale-105 hover:text-secondary rounded-3xl"
        >
          <ImagePlus className="w-12 h-12 opacity-90" />
          <div className="space-y-2 text-center">
            <h3 className="font-semibold text-lg">Drop your content here</h3>
            <p className="text-sm text-secondary/70">Share photos and videos</p>
          </div>
        </Button>
      </div>
    </div>
  );
};
