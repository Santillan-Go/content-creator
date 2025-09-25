"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, ImageIcon, Video, Copy, Verified } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import Carousel from "@/components/ui/carrusel";
import { useEffect, useState } from "react";

import { User } from "@/types/user_type";
import { creators } from "@/app/creators/page";
import { Post, Media, MediaType } from "@/types/post_type";

import Header from "./Header";
import { useSession } from "next-auth/react";

// TODO- MAKE THE LOGIC FOR CAROUSEL - ONE IMAGE & VIDEO
const modelProfile: {
  name: string;
  bio: string;
  agency: string;
  profilePicture: string;
  coverPhoto: string;
  stats: {
    posts: number;
    videos: number;
    views: string;
  };
  posts: Post[];
} = {
  name: "Camila Hot",
  bio: "International Model | Victoria's Secret Angel | L'Oréal Paris Ambassador. Spreading positivity one post at a time.",
  agency: "IMG Models",
  profilePicture:
    "https://cdn.openart.ai/uploads/image_9YFkLViJ_1757401222855_raw.jpg",
  coverPhoto: "https://picsum.photos/1600/600",
  stats: {
    posts: 1240,
    videos: 150,
    views: "1.2B",
  },
  posts: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    media: Array.from({ length: 3 + (i % 2) }, (__, j) => {
      const isVideo = (i + j) % 4 === 0; // or any rule you want

      const media: Media = isVideo
        ? {
            url: `https://assets.mixkit.co/videos/34562/34562-720.mp4`,
            type: "video",
            // width: 1080,
            // height: 1080,
            thumbnail: `https://picsum.photos/seed/${i * 4 + j + 1}/1080/1080`, // Placeholder thumbnail
          }
        : {
            url: `https://picsum.photos/seed/${i * 4 + j + 1}/1080/1080`,
            type: "image",
            // width: 1080,
            // height: 1080,
          };

      return media;
    }),
    caption: "Fashion shoot in Paris ✨",
    createdAt: new Date(2024, 0, i + 1).toISOString(),
    likes: Math.floor(Math.random() * 10000),
    comments: Math.floor(Math.random() * 1000),
    isCarousel: 3 + (i % 2) > 1,
    userId: 1,
    tags: ["fashion", "paris", "modeling"],
  })),
};

export default function CreatorProfile({
  username,
  creator,
  posts,
}: {
  username: string;
  creator: User;
  posts: Post[];
}) {
  const [carouselState, setCarouselState] = useState<{
    isOpen: boolean;
    startIndex: number;
  }>({
    isOpen: false,
    startIndex: 0,
  });
  const session = useSession();
  const checkIfAdmin = session.data?.user?.name === "admin";

  console.log("Session:", session.data?.user?.name);

  const [userInfo, setUserInfo] = useState<User>(
    creator ?? {
      name: "Unknown User",
      username: "unknown",
      category: "Unknown",
      followers: "0",
      profilePicture: "",
      coverPhoto: "",
      dataAiHint: "unknown",
      bio: "No description available",

      verify: false,
      id: "0",
      stats: {
        posts: 0,
        videos: 0,
        views: 0,
        followers: 0,
      },
      createdAt: {
        _seconds: 0,
        _nanoseconds: 0,
      },
    }
  );

  const closeModal = () =>
    setCarouselState({ ...carouselState, isOpen: false });

  // useEffect(() => {
  //   console.log(modelProfile, "this is the model profile");
  //   const found = creators.find((creator) => creator.username === username);
  //   if (found) {
  //     setUserInfo(found);
  //   }
  // }, [username]);

  const allPostImages = modelProfile.posts
    .map((post) => ({
      images: post.media.map((media) => media.url),
      id: post.id,
    }))
    .flat();

  // we need to get the post selected to show in the carrusel, and from there show
  return (
    <>
      <Header
        username={username}
        userImage={userInfo.profilePicture}
        checkIfAdmin={checkIfAdmin}
      />
      <div className="bg-background">
        <main className="max-w-7xl mx-auto">
          <div className="relative">
            <Card className="rounded-none sm:rounded-b-lg overflow-hidden border-x-0 border-t-0 sm:border-x">
              <div className="relative w-full h-48 sm:h-64 md:h-80">
                <Image
                  src={userInfo.coverPhoto}
                  alt="Cover photo"
                  fill
                  priority
                  className="object-cover sm:rounded-2xl "
                  data-ai-hint="fashion runway"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:rounded-2xl" />
              </div>
            </Card>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background shadow-lg">
                <AvatarImage
                  src={userInfo.profilePicture}
                  alt={userInfo.name}
                  className="object-cover"
                  data-ai-hint="female model"
                />
                <AvatarFallback>{userInfo?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl md:text-4xl font-bold font-headline">
                {userInfo?.name || modelProfile.name}
              </h1>
              <Verified className="text-[#0095F6]" />
            </div>
            <p className="text-muted-foreground mt-1">
              Category:{" "}
              <span className="text-foreground">{userInfo.category}</span>
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base">
              {userInfo.bio}
            </p>
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <Card className="p-4">
              <div className="flex justify-around items-center text-center">
                <div className="flex flex-col items-center gap-1">
                  <ImageIcon className="h-6 w-6 text-secondary" />
                  <p className="font-semibold text-lg">
                    {userInfo.stats.posts}
                  </p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Video className="h-6 w-6 text-secondary" />
                  <p className="font-semibold text-lg">
                    {userInfo.stats.videos}
                  </p>
                  <p className="text-xs text-muted-foreground">Videos</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Eye className="h-6 w-6 text-secondary" />
                  <p className="font-semibold text-lg">
                    {userInfo.stats.views}
                  </p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="p-4 sm:px-6 lg:px-8">
            <Separator className="my-6" />

            <div className="grid grid-cols-3 gap-1">
              {posts.map((post, postIndex) => (
                <Dialog key={post.id}>
                  <DialogTrigger asChild>
                    <Card
                      className="overflow-hidden group relative cursor-pointer"
                      onClick={() => {
                        setCarouselState({
                          isOpen: true,
                          startIndex: postIndex,
                        });
                      }}
                    >
                      <div className="absolute top-2 right-2 z-10 text-white">
                        <Copy size={16} />
                      </div>
                      <div className="aspect-[3/4]">
                        <Image
                          src={post.media[0].thumbnail ?? post.media[0].url} // Show first image as thumbnail
                          alt={`Post ${post.id}`}
                          width={600}
                          height={800}
                          className="w-full h-full object-cover"
                          data-ai-hint="fashion model"
                        />
                      </div>
                    </Card>
                  </DialogTrigger>
                </Dialog>
              ))}
            </div>
            {carouselState.isOpen && (
              <Carousel
                image={userInfo.profilePicture}
                media={posts.map((post) => ({
                  url: post.media[0].url,
                  type: post.media[0].type,
                  thumbnail: post.media[0].thumbnail ?? post.media[0].url,
                  // width: post.media[0].width,
                  // height: post.media[0].height,
                }))}
                allPosts={posts}
                username={username}
                initialSlide={carouselState.startIndex}
                closeModal={closeModal}
              />
            )}
          </div>
        </main>

        <footer className="text-center p-8 text-muted-foreground text-sm mt-10">
          <p>
            &copy; {new Date().getFullYear()} ModelVerse. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
