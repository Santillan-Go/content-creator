"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Eye, Menu, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User } from "@/types/user_type";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

interface CreatorsPageProps {
  creators: User[];
  onSetCreators: (creators: User[]) => void; // Changed from setCreators;
}

export default function CreatorsPage({
  creators,
  onSetCreators,
}: CreatorsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // MAKE SURE TO SHOW DELETE BUTTON ONLY IF THE USER IS ADMIN AND IT'S ON ADMIN ROOT
  // const { data: session, status } = useSession();
  // const checkIfAdmin =
  //   status === "authenticated" && session?.user?.name === "admin";
  // const session = useSession();
  // const checkIfAdmin = session.data?.user?.name === "admin";
  const pathname = usePathname();
  const isAdminRoot = pathname === "/admin";
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status || "loading";
  const checkIfAdmin =
    status === "authenticated" && session?.user?.name === "admin";

  const filteredCreators = useMemo(() => {
    if (!searchQuery) {
      return creators ?? [];
    }
    return creators.filter((creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, creators]);

  const deleteUser = async (userID: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://content-creator-service.vercel.app/delete-user/${userID}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Immediately update the UI by removing the user from the state
      // setCreators((prevCreators) =>
      //   prevCreators.filter((creator) => creator.id !== userID)
      // );
      onSetCreators(creators.filter((creator) => creator.id !== userID)); // Changed from setCreators

      // Optional: Show success message
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      // Optional: Show error message to user
      alert("Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <FullScreenLoader isLoading={isDeleting} message="Deleting user..." />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="text-4xl font-black text-gray-900">
              Explore Creators
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Input
                  type="search"
                  placeholder="Search creators..."
                  className="bg-gray-100 border-gray-200 pl-10 text-gray-900 placeholder:text-gray-500 focus:ring-pink-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {/* <Button
                variant="outline"
                className="bg-white border-gray-200 hover:bg-gray-100 w-full sm:w-auto text-gray-700"
              >
                Categories <ChevronDown className="ml-2 h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCreators.map((creator) => (
            <Link href={`/creators/${creator.username}`} key={creator.id}>
              <Card className="relative bg-white border-gray-200 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {isAdminRoot && checkIfAdmin && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      deleteUser(creator.id);
                    }}
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 absolute top-2 right-2 w-7 h-7 z-10 rounded-full font-medium border-red-200"
                    disabled={isDeleting}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}

                <div className="relative h-24">
                  <Image
                    src={creator.coverPhoto}
                    alt={`${creator.name}'s cover`}
                    fill
                    className="object-cover"
                    data-ai-hint="abstract background"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-4 flex flex-col items-center text-center -mt-12">
                  <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                    <Image
                      src={creator.profilePicture}
                      alt={creator.name}
                      fill
                      className="object-cover"
                      data-ai-hint={creator.dataAiHint}
                    />
                  </div>
                  <h3 className="font-bold text-lg mt-3 text-gray-900">
                    {creator.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-pink-100 text-pink-700 border-none font-medium"
                  >
                    {creator.category ?? "Unknown"}
                  </Badge>
                  {/* <p className="text-sm text-gray-500 mt-2">
                    {creator.stats.followers} followers
                  </p> */}
                  <Button className="mt-4 w-full bg-gradient-to-r from-[#ff699f] to-[#fcc841] text-white rounded-full hover:from-pink-600 hover:to-yellow-500 shadow-md hover:shadow-lg transition-shadow">
                    <Eye className="mr-2 h-4 w-4" /> Ver contenido
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
