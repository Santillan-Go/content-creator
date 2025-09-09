"use client";

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, ImageIcon, Video, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from 'react';

const modelProfile = {
  name: 'Alexina Graham',
  bio: "International Model | Victoria's Secret Angel | L'Oréal Paris Ambassador. Spreading positivity one post at a time.",
  agency: 'IMG Models',
  profilePicture: 'https://picsum.photos/200/200',
  coverPhoto: 'https://picsum.photos/1600/600',
  stats: {
    posts: 1240,
    videos: 150,
    views: '1.2B',
  },
  posts: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    images: Array.from({ length: 3 + (i % 2) }, (v, j) => `https://picsum.photos/seed/${i * 4 + j + 1}/600/800`),
  })),
};

export default function Home() {
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto">
        <div className="relative">
          <Card className="rounded-none sm:rounded-b-lg overflow-hidden border-x-0 border-t-0 sm:border-x">
            <div className="relative w-full h-48 sm:h-64 md:h-80">
              <Image
                src={modelProfile.coverPhoto}
                alt="Cover photo"
                fill
                priority
                className="object-cover"
                data-ai-hint="fashion runway"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </Card>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background shadow-lg">
              <AvatarImage src={modelProfile.profilePicture} alt={modelProfile.name} data-ai-hint="female model" />
              <AvatarFallback>{modelProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{modelProfile.name}</h1>
          <p className="text-muted-foreground mt-1">
            Agency: <span className="text-foreground">{modelProfile.agency}</span>
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base">{modelProfile.bio}</p>
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
          <Card className="p-4">
            <div className="flex justify-around items-center text-center">
              <div className="flex flex-col items-center gap-1">
                <ImageIcon className="h-6 w-6 text-primary" />
                <p className="font-semibold text-lg">{modelProfile.stats.posts}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Video className="h-6 w-6 text-primary" />
                <p className="font-semibold text-lg">{modelProfile.stats.videos}</p>
                <p className="text-xs text-muted-foreground">Videos</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Eye className="h-6 w-6 text-primary" />
                <p className="font-semibold text-lg">{modelProfile.stats.views}</p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="p-4 sm:px-6 lg:px-8">
          <Separator className="my-6" />
          <div className="grid grid-cols-3 gap-1">
            {modelProfile.posts.map((post, index) => (
              <Dialog key={post.id} onOpenChange={(open) => {
                if (!open) {
                  setSelectedPostIndex(null);
                }
              }}>
                <DialogTrigger asChild onClick={() => setSelectedPostIndex(index)}>
                  <Card className="overflow-hidden group relative">
                     <div className="absolute top-2 right-2 z-10 text-white">
                      <Copy size={16} />
                    </div>
                    <Carousel>
                      <CarouselContent>
                        {post.images.map((image, imgIndex) => (
                          <CarouselItem key={imgIndex}>
                            <div className="aspect-[3/4]">
                              <Image
                                src={image}
                                alt={`Post ${post.id} image ${imgIndex + 1}`}
                                width={600}
                                height={800}
                                className="w-full h-full object-cover"
                                data-ai-hint="fashion model"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </Card>
                </DialogTrigger>
                <DialogContent className="p-0 max-w-4xl">
                  {selectedPostIndex === index && (
                    <Carousel>
                      <CarouselContent>
                        {modelProfile.posts[selectedPostIndex].images.map((image, imgIndex) => (
                          <CarouselItem key={imgIndex}>
                             <div className="aspect-[3/4]">
                               <Image
                                 src={image}
                                 alt={`Post ${post.id} image ${imgIndex + 1}`}
                                 width={600}
                                 height={800}
                                 className="w-full h-full object-cover"
                               />
                             </div>
                           </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center p-8 text-muted-foreground text-sm mt-10">
        <p>&copy; {new Date().getFullYear()} ModelVerse. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
