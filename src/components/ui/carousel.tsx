"use client"; // if you're using Next.js 13+ with App Router

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css"; // basic styles
import "swiper/css/navigation"; // optional: navigation styles
import "swiper/css/pagination"; // optional: pagination styles

import { Navigation, Pagination } from "swiper/modules";
import { Section, Heart, ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  images,
  closeModal,
  username,
}: {
  images: string[];
  closeModal?: () => void;
  username: string;
}) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(images);
  }, [images]);
  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-70">
      <div className="relative h-screen">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-6 text-white text-2xl font-bold z-50"
        >
          ✕
        </button>

        {/* Left Navigation Button */}
        <button
          ref={navigationPrevRef}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          onClick={() => swiper?.slidePrev()}
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>

        {/* Main carousel container */}
        <div
          className="
        absolute 
        top-1/2 
        left-1/2 
        -translate-x-1/2 
        -translate-y-1/2 
        w-[75vw] 
        h-[80vh] 
        max-w-6xl 
        rounded-2xl 
        overflow-hidden 
        shadow-lg 
        flex
        bg-black
      "
        >
          {/*  bg-green-500 */}
          <div className="relative w-full h-full">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              onSwiper={setSwiper}
              loop={true} // Add this to enable infinite loop
              className="w-full h-full"
            >
              {images.length === 0 ? (
                <p className="text-white">No images to display</p>
              ) : (
                images.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex w-full h-full">
                      {/*  bg-pink-500 */}
                      <img
                        src={src}
                        alt={`Slide ${index}`}
                        className="w-[50%] object-contain mx-auto flex-1 "
                      />

                      <aside className="flex-1 bg-white flex flex-col border-l border-gray-100">
                        {/* User header */}
                        <div className="p-6 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                  src="https://cdn.openart.ai/uploads/image_9YFkLViJ_1757401222855_raw.jpg"
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="font-medium text-gray-900">
                                {username || "Username"}
                              </p>
                            </div>
                            <button className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
                              Follow
                            </button>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="flex-1 p-6 overflow-y-auto">
                          <p className="text-gray-700 leading-relaxed">
                            This is a description of the post, like Instagram's
                            caption.
                          </p>
                        </div>

                        {/* Heart button */}
                        <div className="p-6 border-t border-gray-100">
                          <button
                            className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
                            onClick={() => {
                              /* Add your like logic here */
                            }}
                          >
                            <Heart className="w-7 h-7 text-gray-900 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-gray-900">
                              1.2k
                            </span>
                            {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform"
                            >
                              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                            <span className="font-medium text-gray-900">
                              1.2k
                            </span> */}
                          </button>
                        </div>
                      </aside>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>

        {/* Right Navigation Button - Outside carousel */}
        <button
          ref={navigationNextRef}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
          onClick={() => swiper?.slideNext()}
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
