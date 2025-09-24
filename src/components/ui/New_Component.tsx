"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowLeft, X } from "lucide-react";

import AsideInfoPost, { ProfilePlaceholder } from "./Aside_Info_Post";
import { Media, MediaType, Post, DEFAULT_POST } from "@/types/post_type";
import { useIsMobile } from "@/hooks/use-mobile";
import { VideoPlayer } from "./Video_Player";

export default function Carousel({
  media,
  closeModal,
  username,
  initialSlide = 0,
  allPosts,
}: {
  media: Media[];
  closeModal?: () => void;
  username: string;
  initialSlide?: number;
  allPosts?: Post[];
}) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide);
  const [currentPost, setCurrentPost] = useState<Post>(DEFAULT_POST);
  const [isIndexACarousel, setIsIndexACarousel] = useState(false);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  // Refs for mobile post divs
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getCurrentPost = useCallback(
    (index: number): Post => {
      return (
        allPosts?.find((post, indexIn) => indexIn === index) || {
          ...DEFAULT_POST,
        }
      );
    },
    [allPosts]
  );

  useEffect(() => {
    const post = getCurrentPost(currentSlideIndex);
    setCurrentPost(post);
    setIsIndexACarousel(post.media.length > 1);
  }, [currentSlideIndex, getCurrentPost]);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  const handleSlideChangeByDiv = (newIndex: number) => {
    setCurrentSlideIndex(newIndex);
  };

  // Intersection Observer for mobile viewport detection
  useEffect(() => {
    if (!isMobile || !postRefs.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            handleSlideChangeByDiv(index);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: "0px",
      }
    );

    postRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      postRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile, media.length]);

  // Function to set refs
  const setPostRef = (index: number) => (el: HTMLDivElement | null) => {
    postRefs.current[index] = el;
  };

  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-70">
      <div className="relative h-screen">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 left-6 sm:right-6 text-white text-2xl font-bold z-50"
        >
          {isMobile ? (
            <ArrowLeft className="h-6 w-6" />
          ) : (
            <X className="h-6 w-6" />
          )}
        </button>

        {/* Left Navigation Button */}
        <button
          ref={navigationPrevRef}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 hidden sm:block"
          onClick={() => swiper?.slidePrev()}
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>

        {/* Main carousel container */}
        <div
          className={`
          ${
            isMobile
              ? "w-full h-full"
              : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[80vh] max-w-6xl rounded-2xl overflow-hidden shadow-lg flex"
          } 
          bg-black
        `}
        >
          <div className="relative w-full h-full">
            {isMobile ? (
              <div className="w-full h-full overflow-y-auto snap-y snap-mandatory">
                {media.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-white">No media to display</p>
                  </div>
                ) : (
                  media.map((mediaItem, index) => {
                    const post = getCurrentPost(index);
                    const isCarousel = post.media.length > 1;

                    return (
                      <div
                        key={index}
                        ref={setPostRef(index)}
                        data-index={index}
                        // it was  h-screen
                        className="h-auto flex flex-col snap-start"
                      >
                        {/* Media Container */}
                        <div className="h-[70vh] bg-black flex items-center justify-center relative">
                          <ProfilePlaceholder
                            username={username}
                            className="absolute top-4 flex justify-center gap-12 w-full z-10"
                            colorText={"text-white"}
                          />
                          {isCarousel ? (
                            <div className="w-full h-full relative">
                              <Swiper
                                modules={[Pagination]}
                                spaceBetween={0}
                                slidesPerView={1}
                                pagination={{
                                  clickable: true,
                                  renderBullet: (index, className) => {
                                    return `<span class="${className} bg-white opacity-50 w-2 h-2 rounded-full mx-1"></span>`;
                                  },
                                }}
                                className="w-full h-full"
                              >
                                {post.media.map((item, mediaIndex) => (
                                  <SwiperSlide
                                    key={mediaIndex}
                                    className="flex items-center justify-center"
                                  >
                                    <MobileMediaContent
                                      item={item}
                                      index={index}
                                      currentSlideIndex={currentSlideIndex}
                                    />
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>
                          ) : (
                            <MobileMediaContent
                              item={mediaItem}
                              index={0}
                              currentSlideIndex={index}
                            />
                          )}
                        </div>

                        {/* Info Section */}
                        <AsideInfoPost
                          likes={post.likes}
                          caption={post.caption}
                          username={username}
                          showProfile={false}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                initialSlide={initialSlide}
                onSwiper={setSwiper}
                onSlideChange={handleSlideChange}
                loop={true}
                className="w-full h-full"
              >
                {media.length === 0 ? (
                  <p className="text-white">No media to display</p>
                ) : (
                  media.map((mediaItem, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex w-full h-full">
                        {isIndexACarousel ? (
                          <>
                            <Swiper
                              modules={[Navigation, Pagination]}
                              spaceBetween={10}
                              slidesPerView={1}
                              pagination={{ clickable: true }}
                              loop={true}
                              className="!w-[50%] mx-auto flex-1 bg-pink-500"
                            >
                              {getCurrentPost(index).media.map(
                                (item, mediaIndex) => (
                                  <SwiperSlide key={mediaIndex}>
                                    <MediaContent
                                      item={item}
                                      index={index}
                                      currentSlideIndex={currentSlideIndex}
                                    />
                                  </SwiperSlide>
                                )
                              )}
                            </Swiper>
                          </>
                        ) : (
                          <MediaContent
                            item={mediaItem}
                            index={index}
                            currentSlideIndex={currentSlideIndex}
                          />
                        )}
                        <AsideInfoPost
                          likes={currentPost.likes}
                          caption={currentPost.caption}
                          username={username}
                          className={"flex-1 bg-white"}
                          description={"flex-1"}
                        />
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            )}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          ref={navigationNextRef}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 hidden sm:block"
          onClick={() => swiper?.slideNext()}
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

// Components remain the same...
export const MediaContent = ({
  item,
  index,
  currentSlideIndex = 0,
}: {
  item: Media;
  index: number;
  currentSlideIndex?: number;
}) => {
  if (item.type === "video") {
    return (
      <video src={item.url} className=" object-contain" />

      // <VideoPlayer
      //   src={item.url}
      //   currentSlideIndex={currentSlideIndex}
      //   thumbnail={item.thumbnail || ""}
      //   index={index}
      //   isCarousel={true}
      // />
    );
  }

  return (
    <img src={item.url} alt="Media content" className=" object-contain " />
  );
};

const MobileMediaContent = ({
  item,
  index,
  currentSlideIndex = 0,
}: {
  item: Media;
  index: number;
  currentSlideIndex?: number;
}) => {
  if (item.type === "video") {
    return (
      <VideoPlayer
        src={item.url}
        currentSlideIndex={currentSlideIndex}
        thumbnail={item.thumbnail || ""}
        index={index}
        isCarousel={true}
      />
    );
  }

  return (
    <img
      src={item.url}
      alt="Media content"
      className="w-full h-full object-contain"
    />
  );
};
