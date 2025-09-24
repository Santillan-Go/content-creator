export type MediaType = "image" | "video";

export interface Media {
  url: string;
  type: MediaType;
  thumbnail?: string;
  width: number;
  height: number;
}

export interface Post {
  id: number;
  media: Media[];
  caption: string;
  createdAt: string;
  likes: number;
  comments: number;
  isCarousel: boolean;
  userId: number;
  tags: string[];
}

// Add default values
export const DEFAULT_POST: Post = {
  id: 0,
  media: [
    {
      url: "",
      type: "image",
      width: 0,
      height: 0,
    },
  ],
  caption: "",
  createdAt: new Date().toISOString(),
  likes: 0,
  comments: 0,
  isCarousel: false,
  userId: 0,
  tags: [],
};
