"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Eye, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { creators } from "@/app/creators/page";

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCreators = useMemo(() => {
    if (!searchQuery) {
      return creators;
    }
    return creators.filter((creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
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
              <Button
                variant="outline"
                className="bg-white border-gray-200 hover:bg-gray-100 w-full sm:w-auto text-gray-700"
              >
                Categories <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCreators.map((creator) => (
            <Link href={`/creators/${creator.username}`} key={creator.name}>
              <Card className="bg-white border-gray-200 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-24">
                  <Image
                    src={creator.coverImage}
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
                      src={creator.profilePic}
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
                    {creator.category}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-2">
                    {creator.followers} followers
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full hover:from-pink-600 hover:to-yellow-500 shadow-md hover:shadow-lg transition-shadow">
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
