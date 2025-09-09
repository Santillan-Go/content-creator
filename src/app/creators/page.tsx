
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const creators = [
  {
    name: 'Aitana Lopez',
    slug: 'camila-hot',
    category: 'AI Creator',
    followers: '350K',
    profilePic: 'https://picsum.photos/seed/1/200/200',
    coverImage: 'https://picsum.photos/seed/11/600/200',
    dataAiHint: 'female creator',
  },
  {
    name: 'Darren Till',
    slug: 'camila-hot',
    category: 'Athlete',
    followers: '1.2M',
    profilePic: 'https://picsum.photos/seed/2/200/200',
    coverImage: 'https://picsum.photos/seed/12/600/200',
    dataAiHint: 'male boxer',
  },
  {
    name: 'Lana Scolaro',
    slug: 'camila-hot',
    category: 'DJ',
    followers: '2.1M',
    profilePic: 'https://picsum.photos/seed/3/200/200',
    coverImage: 'https://picsum.photos/seed/13/600/200',
    dataAiHint: 'female dj',
  },
  {
    name: 'Chesca',
    slug: 'camila-hot',
    category: 'Musician',
    followers: '480K',
    profilePic: 'https://picsum.photos/seed/4/200/200',
    coverImage: 'https://picsum.photos/seed/14/600/200',
    dataAiHint: 'female singer',
  },
  {
    name: 'Ben Morris',
    slug: 'camila-hot',
    category: 'YouTuber',
    followers: '770K',
    profilePic: 'https://picsum.photos/seed/5/200/200',
    coverImage: 'https://picsum.photos/seed/15/600/200',
    dataAiHint: 'male youtuber',
  },
  {
    name: 'Sophie Rain',
    slug: 'camila-hot',
    category: 'Model',
    followers: '5.6M',
    profilePic: 'https://picsum.photos/seed/6/200/200',
    coverImage: 'https://picsum.photos/seed/16/600/200',
    dataAiHint: 'female model',
  },
   {
    name: 'Alex Hormozi',
    slug: 'camila-hot',
    category: 'Entrepreneur',
    followers: '2.5M',
    profilePic: 'https://picsum.photos/seed/7/200/200',
    coverImage: 'https://picsum.photos/seed/17/600/200',
    dataAiHint: 'male entrepreneur',
  },
  {
    name: 'Lea Martinez',
    slug: 'camila-hot',
    category: 'Dancer',
    followers: '1.8M',
    profilePic: 'https://picsum.photos/seed/8/200/200',
    coverImage: 'https://picsum.photos/seed/18/600/200',
    dataAiHint: 'female dancer',
  }
];

export default function CreatorsPage() {
  return (
    <div className="bg-[#161618] min-h-screen text-white">
       <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" aria-label="Home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12a10 10 0 0 0-10 10z"></path></svg>
                </div>
                <span className="text-xl font-bold">Winkermind</span>
              </Link>
              <nav className="hidden md:flex items-center gap-4 text-sm">
                <Link href="/creators" className="text-white hover:text-gray-300 transition-colors">Creadores</Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">Videos</Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">FAQ</Link>
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">Log in</Link>
                <Button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-6 hover:from-pink-600 hover:to-yellow-500">
                  Sign up
                </Button>
              </nav>
              <Button className="md:hidden" variant="ghost" size="icon">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
              </Button>
          </div>
        </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <h1 className="text-4xl font-black">Explore Creators</h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Input 
                            type="search" 
                            placeholder="Search creators..." 
                            className="bg-black/20 border-white/20 pl-10 text-white placeholder:text-gray-400"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <Button variant="outline" className="bg-transparent border-white/20 hover:bg-white/20 w-full sm:w-auto">
                        Categories <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <Link href={`/creators/${creator.slug}`} key={creator.name}>
                <Card className="bg-white/5 border-white/10 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:border-white/30 hover:-translate-y-1">
                    <div className="relative h-24">
                        <Image
                            src={creator.coverImage}
                            alt={`${creator.name}'s cover`}
                            fill
                            className="object-cover"
                            data-ai-hint="abstract background"
                        />
                    </div>
                    <div className="p-4 flex flex-col items-center text-center -mt-12">
                         <div className="relative w-24 h-24 rounded-full border-4 border-[#161618] overflow-hidden shadow-lg">
                            <Image
                                src={creator.profilePic}
                                alt={creator.name}
                                fill
                                className="object-cover"
                                data-ai-hint={creator.dataAiHint}
                            />
                        </div>
                        <h3 className="font-bold text-lg mt-3">{creator.name}</h3>
                        <Badge variant="secondary" className="mt-1 bg-pink-500/20 text-pink-300 border-none">{creator.category}</Badge>
                        <p className="text-sm text-gray-400 mt-2">{creator.followers} followers</p>
                        <Button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full hover:from-pink-600 hover:to-yellow-500">
                           <UserPlus className="mr-2 h-4 w-4"/> Follow
                        </Button>
                    </div>
                </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

