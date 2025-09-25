"use client";

import { useState, useEffect } from "react";
import CreatorsPage from "./Creators_Page";
import { User } from "@/types/user_type";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

export default function UsersManage() {
  const [creators, setCreators] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetch(
          "https://content-creator-service.vercel.app/get-all-users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setCreators(data.users ?? []);
      } catch (err) {
        setCreators([]);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const handleSetCreators = (newCreators: User[]) => {
    setCreators(newCreators);
  };

  if (isLoading) {
    return <FullScreenLoader isLoading={true} message="Loading users..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return <CreatorsPage creators={creators} onSetCreators={handleSetCreators} />;
}
