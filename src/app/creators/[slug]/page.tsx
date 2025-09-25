import GetSession from "@/components/GetSession";
import CreatorProfile from "@/components/ui/Profile_User";
import { SessionProvider } from "next-auth/react";

const modelProfile = {
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
    images: Array.from(
      { length: 3 + (i % 2) },
      (v, j) => `https://picsum.photos/seed/${i * 4 + j + 1}/1080/1080`
    ),
  })),
};

const VerifiedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.03 15.44l-4.24-4.24 1.41-1.41 2.83 2.83 5.66-5.66 1.41 1.41-7.07 7.07z"
      fill="#1d9bf0"
    />
  </svg>
);

const fetchCreatorByUsername = async (username: string) => {
  try {
    const response = await fetch(
      `https://content-creator-service.vercel.app/get-user/${username}`
    );
    const data = await response.json();
    return data ?? null;
  } catch (error) {
    console.error("Error fetching creator:", error);
    return null;
  }
};

const fetchPostByUsername = async (username: string) => {
  try {
    const response = await fetch(
      `https://content-creator-service.vercel.app/users/${username}/posts`
    );
    const data = await response.json();
    return data.posts ?? [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
export default async function CreatorProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const username = await params;

  const creator = await fetchCreatorByUsername(username.slug);

  if (!creator) {
    return <div>Creator not found</div>;
  }
  const posts = await fetchPostByUsername(username.slug);
  return (
    <GetSession
      children={
        <CreatorProfile
          username={username.slug}
          creator={creator}
          posts={posts}
        />
      }
    />
    // <SessionProvider>
    //   <CreatorProfile username={username.slug} />
    // </SessionProvider>
  );
}
