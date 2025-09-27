"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  ImageIcon,
  Video,
  Copy,
  Verified,
  Edit,
  Camera,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { toast } from "sonner";

import Carousel from "@/components/ui/carrusel";

import { User } from "@/types/user_type";
import { Post, Media, MediaType } from "@/types/post_type";

import Header from "./Header";
import { useSession } from "next-auth/react";
import { uploadToCloudinary } from "@/services/cloudinary";
import FullScreenLoader from "./FullScreenLoader";
import { useRouter } from "next/navigation";

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

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );
  const router = useRouter();

  const [profilePreview, setProfilePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // New state for cover photo
  const [isCoverUpdateModalOpen, setIsCoverUpdateModalOpen] = useState(false);
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  );
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const session = useSession();
  const checkIfAdmin = session.data?.user?.name === "admin";

  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null); // New ref for cover input

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

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedProfileImage(file);
      const objectUrl = URL.createObjectURL(file);
      setProfilePreview(objectUrl);
    }
  };

  // New function for cover photo file change
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCoverImage(file);
      const objectUrl = URL.createObjectURL(file);
      setCoverPreview(objectUrl);
    }
  };

  const handleUpdateProfileImage = async () => {
    if (!selectedProfileImage) {
      toast.error("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setIsUploading(true);
    try {
      const newProfileUrl = await uploadToCloudinary(
        selectedProfileImage,
        true
      );

      // Update the user info
      setUserInfo((prev) => ({
        ...prev,
        profilePicture: newProfileUrl,
      }));

      // Here you would typically send the update to your backend
      const response = await fetch(
        `https://content-creator-service.vercel.app/update-user/${userInfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profilePicture: newProfileUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile image");
      }

      toast.success("Profile image updated successfully!");
      setIsUpdateModalOpen(false);
      setSelectedProfileImage(null);
      setProfilePreview("");
      router.refresh(); // Refresh the page to reflect changes OR  router.reload();
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image. Please try again.");
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  // New function for updating cover photo
  const handleUpdateCoverImage = async () => {
    if (!selectedCoverImage) {
      toast.error("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setIsUploadingCover(true);
    try {
      const newCoverUrl = await uploadToCloudinary(
        selectedCoverImage,
        false // false for cover photo (not profile)
      );

      // Update the user info
      setUserInfo((prev) => ({
        ...prev,
        coverPhoto: newCoverUrl,
      }));

      // Here you would typically send the update to your backend
      const response = await fetch(
        `https://content-creator-service.vercel.app/update-user/${userInfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coverPhoto: newCoverUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cover image");
      }

      toast.success("Cover image updated successfully!");
      setIsCoverUpdateModalOpen(false);
      setSelectedCoverImage(null);
      setCoverPreview("");
      router.refresh();
    } catch (error) {
      console.error("Error updating cover image:", error);
      toast.error("Failed to update cover image. Please try again.");
    } finally {
      setIsLoading(false);
      setIsUploadingCover(false);
    }
  };
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
      <FullScreenLoader isLoading={isLoading} message="Updating profile..." />
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

                {/* Edit Button for Cover Photo - Only show if admin */}
                {checkIfAdmin && (
                  <Dialog
                    open={isCoverUpdateModalOpen}
                    onOpenChange={setIsCoverUpdateModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-secondary hover:bg-secondary/90 shadow-lg "
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Update Cover Image</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="space-y-2 flex flex-col items-center">
                          <Label className="text-sm font-medium text-foreground">
                            New Cover Image
                          </Label>
                          <div
                            onClick={() => coverInputRef.current?.click()}
                            className="w-full h-32 border-2 border-dashed border-primary/50 hover:border-primary bg-secondary/20 hover:bg-secondary/30 transition-all duration-200 cursor-pointer flex items-center justify-center group relative overflow-hidden rounded-lg"
                          >
                            {coverPreview ? (
                              <>
                                <img
                                  src={coverPreview}
                                  alt="Cover preview"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                  <Camera className="w-6 h-6 text-white" />
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-1">
                                <Camera className="w-8 h-8 text-primary" />
                                <span className="text-xs text-muted-foreground">
                                  Upload
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Click to upload new cover image (landscape
                            recommended)
                          </p>
                          <Input
                            ref={coverInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleCoverFileChange}
                            className="hidden"
                          />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsCoverUpdateModalOpen(false);
                              setSelectedCoverImage(null);
                              setCoverPreview("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleUpdateCoverImage}
                            disabled={!selectedCoverImage || isUploadingCover}
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          >
                            {isUploadingCover ? "Updating..." : "Update Image"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </Card>

            {/* Profile Avatar with Edit Button */}
            <div className="absolute bottom-9 sm:bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <div className="relative group">
                <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background shadow-lg">
                  <AvatarImage
                    src={userInfo.profilePicture}
                    alt={userInfo.name}
                    className="object-cover"
                    data-ai-hint="female model"
                  />
                  <AvatarFallback>{userInfo?.name.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* Edit Button - Only show if admin */}
                {checkIfAdmin && (
                  <Dialog
                    open={isUpdateModalOpen}
                    onOpenChange={setIsUpdateModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="absolute bottom-3 sm:-bottom-2 -right-2 h-8 w-8 rounded-full bg-secondary hover:bg-secondary/90 shadow-lg"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Update Profile Image</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="space-y-2 flex flex-col items-center">
                          <Label className="text-sm font-medium text-foreground">
                            New Profile Image
                          </Label>
                          <div
                            onClick={() => profileInputRef.current?.click()}
                            className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 hover:border-primary bg-secondary/20 hover:bg-secondary/30 transition-all duration-200 cursor-pointer flex items-center justify-center group relative overflow-hidden"
                          >
                            {profilePreview ? (
                              <>
                                <img
                                  src={profilePreview}
                                  alt="Profile preview"
                                  className="w-full h-full object-cover rounded-full"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-full">
                                  <Camera className="w-6 h-6 text-white" />
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-1">
                                <Camera className="w-8 h-8 text-primary" />
                                <span className="text-xs text-muted-foreground">
                                  Upload
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Click to upload new profile image (square
                            recommended)
                          </p>
                          <Input
                            ref={profileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleProfileFileChange}
                            className="hidden"
                          />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsUpdateModalOpen(false);
                              setSelectedProfileImage(null);
                              setProfilePreview("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleUpdateProfileImage}
                            disabled={!selectedProfileImage || isUploading}
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                          >
                            {isUploading ? "Updating..." : "Update Image"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>

          <div className="pt-5 sm:pt-20  sm:pb-10 px-4 sm:px-6 lg:px-8 text-center">
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

          <div className="px-4  sm:px-6 lg:px-8">
            <Card className="p-4 pb-0 sm:pb-4 ">
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

          <div className="p-4 pt-0  sm:px-6 lg:px-8">
            <Separator className="my-2 sm:my-6" />

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
