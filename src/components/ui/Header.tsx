"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PlusCircle } from "lucide-react";
import { useState } from "react";
import CreatePost from "@/pages/Create_Post_Page";

export default function Header({
  userImage,
  username,
  checkIfAdmin,
}: {
  userImage?: string;
  username?: string;
  checkIfAdmin: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreatePost = () => setIsOpen(!isOpen);
  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" aria-label="Home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                <path d="M12 12a10 10 0 0 0-10 10z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">Winkermind</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link
              href="/creators"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Creadores
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Videos
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              FAQ
            </Link>
            {/* <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Log in</Link>
            <Button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-6 hover:from-pink-600 hover:to-yellow-500">
              Sign up
            </Button> */}

            {/* <Button
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              onClick={handleCreatePost}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Post
            </Button> */}
            {/*SHOW THE <CreatePost />*/}
            {checkIfAdmin && (
              <CreatePost userImage={userImage} username={username} />
            )}
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-4">
                <Link
                  href="/creators"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Creadores
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Videos
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Log in
                </Link>
                <Button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-6 hover:from-pink-600 hover:to-yellow-500">
                  Sign up
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
