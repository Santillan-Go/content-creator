
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Eye } from 'lucide-react';
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
  },
  {
    name: 'Noah Beck',
    slug: 'camila-hot',
    category: 'Influencer',
    followers: '33.8M',
    profilePic: 'https://picsum.photos/seed/9/200/200',
    coverImage: 'https://picsum.photos/seed/19/600/200',
    dataAiHint: 'male influencer',
  },
  {
    name: 'James Charles',
    slug: 'camila-hot',
    category: 'Beauty Guru',
    followers: '35.9M',
    profilePic: 'https://picsum.photos/seed/10/200/200',
    coverImage: 'https://picsum.photos/seed/20/600/200',
    dataAiHint: 'male makeup',
  },
  {
    name: 'Brent Rivera',
    slug: 'camila-hot',
    category: 'Comedian',
    followers: '45.1M',
    profilePic: 'https://picsum.photos/seed/21/200/200',
    coverImage: 'https://picsum.photos/seed/31/600/200',
    dataAiHint: 'male comedian',
  },
  {
    name: 'Dixie D\'Amelio',
    slug: 'camila-hot',
    category: 'Singer',
    followers: '57.4M',
    profilePic: 'https://picsum.photos/seed/22/200/200',
    coverImage: 'https://picsum.photos/seed/32/600/200',
    dataAiHint: 'female singer',
  },
  {
    name: 'Bella Poarch',
    slug: 'camila-hot',
    category: 'Creator',
    followers: '92.8M',
    profilePic: 'https://picsum.photos/seed/23/200/200',
    coverImage: 'https://picsum.photos/seed/33/600/200',
    dataAiHint: 'female creator',
  },
  {
    name: 'Sommer Ray',
    slug: 'camila-hot',
    category: 'Fitness Model',
    followers: '26.4M',
    profilePic: 'https://picsum.photos/seed/24/200/200',
    coverImage: 'https://picsum.photos/seed/34/600/200',
    dataAiHint: 'female fitness',
  },
  {
    name: 'David Dobrik',
    slug: 'camila-hot',
    category: 'Vlogger',
    followers: '25.9M',
    profilePic: 'https://picsum.photos/seed/25/200/200',
    coverImage: 'https://picsum.photos/seed/35/600/200',
    dataAiHint: 'male vlogger',
  },
  {
    name: 'Emma Chamberlain',
    slug: 'camila-hot',
    category: 'Lifestyle',
    followers: '16.2M',
    profilePic: 'https://picsum.photos/seed/26/200/200',
    coverImage: 'https://picsum.photos/seed/36/600/200',
    dataAiHint: 'female lifestyle',
  },
  {
    name: 'PewDiePie',
    slug: 'camila-hot',
    category: 'Gamer',
    followers: '111M',
    profilePic: 'https://picsum.photos/seed/27/200/200',
    coverImage: 'https://picsum.photos/seed/37/600/200',
    dataAiHint: 'male gamer',
  },
  {
    name: 'Jeffree Star',
    slug: 'camila-hot',
    category: 'Entrepreneur',
    followers: '15.9M',
    profilePic: 'https://picsum.photos/seed/28/200/200',
    coverImage: 'https://picsum.photos/seed/38/600/200',
    dataAiHint: 'makeup entrepreneur',
  },
  {
    name: 'Ninja',
    slug: 'camila-hot',
    category: 'Pro Gamer',
    followers: '19M',
    profilePic: 'https://picsum.photos/seed/29/200/200',
    coverImage: 'https://picsum.photos/seed/39/600/200',
    dataAiHint: 'male pro gamer',
  },
  {
    name: 'Pokimane',
    slug: 'camila-hot',
    category: 'Streamer',
    followers: '9.4M',
    profilePic: 'https://picsum.photos/seed/30/200/200',
    coverImage: 'https://picsum.photos/seed/40/600/200',
    dataAiHint: 'female streamer',
  },
  {
    name: 'Amouranth',
    slug: 'camila-hot',
    category: 'Cosplayer',
    followers: '6.4M',
    profilePic: 'https://picsum.photos/seed/41/200/200',
    coverImage: 'https://picsum.photos/seed/51/600/200',
    dataAiHint: 'female cosplayer',
  },
  {
    name: 'Logan Paul',
    slug: 'camila-hot',
    category: 'Boxer',
    followers: '23.6M',
    profilePic: 'https://picsum.photos/seed/42/200/200',
    coverImage: 'https://picsum.photos/seed/52/600/200',
    dataAiHint: 'male boxer',
  },
  {
    name: 'MrBeast',
    slug: 'camila-hot',
    category: 'Philanthropist',
    followers: '250M',
    profilePic: 'https://picsum.photos/seed/43/200/200',
    coverImage: 'https://picsum.photos/seed/53/600/200',
    dataAiHint: 'male philanthropist',
  },
  {
    name: 'Tana Mongeau',
    slug: 'camila-hot',
    category: 'Storyteller',
    followers: '5.4M',
    profilePic: 'https://picsum.photos/seed/44/200/200',
    coverImage: 'https://picsum.photos/seed/54/600/200',
    dataAiHint: 'female storyteller',
  },
  {
    name: 'Corinna Kopf',
    slug: 'camila-hot',
    category: 'Gamer',
    followers: '6.7M',
    profilePic: 'https://picsum.photos/seed/45/200/200',
    coverImage: 'https://picsum.photos/seed/55/600/200',
    dataAiHint: 'female gamer',
  },
  {
    name: 'Alissa Violet',
    slug: 'camila-hot',
    category: 'Model',
    followers: '11.8M',
    profilePic: 'https://picsum.photos/seed/46/200/200',
    coverImage: 'https://picsum.photos/seed/56/600/200',
    dataAiHint: 'female model',
  },
  {
    name: 'Valkyrae',
    slug: 'camila-hot',
    category: 'Gamer',
    followers: '4.1M',
    profilePic: 'https://picsum.photos/seed/47/200/200',
    coverImage: 'https://picsum.photos/seed/57/600/200',
    dataAiHint: 'female gamer',
  },
  {
    name: 'Dr Disrespect',
    slug: 'camila-hot',
    category: 'Streamer',
    followers: '4.5M',
    profilePic: 'https://picsum.photos/seed/48/200/200',
    coverImage: 'https://picsum.photos/seed/58/600/200',
    dataAiHint: 'male streamer',
  },
  {
    name: 'xQc',
    slug: 'camila-hot',
    category: 'Streamer',
    followers: '11.9M',
    profilePic: 'https://picsum.photos/seed/49/200/200',
    coverImage: 'https://picsum.photos/seed/59/600/200',
    dataAiHint: 'male streamer',
  },
  {
    name: 'Adebisi',
    slug: 'camila-hot',
    category: 'Athlete',
    followers: '1.1M',
    profilePic: 'https://picsum.photos/seed/50/200/200',
    coverImage: 'https://picsum.photos/seed/60/600/200',
    dataAiHint: 'male athlete',
  },
  {
    name: 'Nadia',
    slug: 'camila-hot',
    category: 'Gamer',
    followers: '1.3M',
    profilePic: 'https://picsum.photos/seed/61/200/200',
    coverImage: 'https://picsum.photos/seed/71/600/200',
    dataAiHint: 'female gamer',
  },
  {
    name: 'Kylie Jenner',
    slug: 'camila-hot',
    category: 'Entrepreneur',
    followers: '398M',
    profilePic: 'https://picsum.photos/seed/62/200/200',
    coverImage: 'https://picsum.photos/seed/72/600/200',
    dataAiHint: 'female entrepreneur',
  },
  {
    name: 'Kim Kardashian',
    slug: 'camila-hot',
    category: 'Celebrity',
    followers: '363M',
    profilePic: 'https://picsum.photos/seed/63/200/200',
    coverImage: 'https://picsum.photos/seed/73/600/200',
    dataAiHint: 'female celebrity',
  },
  {
    name: 'Selena Gomez',
    slug: 'camila-hot',
    category: 'Musician',
    followers: '427M',
    profilePic: 'https://picsum.photos/seed/64/200/200',
    coverImage: 'https://picsum.photos/seed/74/600/200',
    dataAiHint: 'female musician',
  },
  {
    name: 'The Rock',
    slug: 'camila-hot',
    category: 'Actor',
    followers: '388M',
    profilePic: 'https://picsum.photos/seed/65/200/200',
    coverImage: 'https://picsum.photos/seed/75/600/200',
    dataAiHint: 'male actor',
  },
  {
    name: 'Ariana Grande',
    slug: 'camila-hot',
    category: 'Musician',
    followers: '378M',
    profilePic: 'https://picsum.photos/seed/66/200/200',
    coverImage: 'https://picsum.photos/seed/76/600/200',
    dataAiHint: 'female musician',
  },
  {
    name: 'Cristiano Ronaldo',
    slug: 'camila-hot',
    category: 'Athlete',
    followers: '600M',
    profilePic: 'https://picsum.photos/seed/67/200/200',
    coverImage: 'https://picsum.photos/seed/77/600/200',
    dataAiHint: 'male athlete',
  },
  {
    name: 'Lionel Messi',
    slug: 'camila-hot',
    category: 'Athlete',
    followers: '482M',
    profilePic: 'https://picsum.photos/seed/68/200/200',
    coverImage: 'https://picsum.photos/seed/78/600/200',
    dataAiHint: 'male athlete',
  },
  {
    name: 'Beyonce',
    slug: 'camila-hot',
    category: 'Musician',
    followers: '315M',
    profilePic: 'https://picsum.photos/seed/69/200/200',
    coverImage: 'https://picsum.photos/seed/79/600/200',
    dataAiHint: 'female musician',
  },
  {
    name: 'Justin Bieber',
    slug: 'camila-hot',
    category: 'Musician',
    followers: '292M',
    profilePic: 'https://picsum.photos/seed/70/200/200',
    coverImage: 'https://picsum.photos/seed/80/600/200',
    dataAiHint: 'male musician',
  }
];

export default function CreatorsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" aria-label="Home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12a10 10 0 0 0-10 10z"></path></svg>
                </div>
                <span className="text-xl font-bold text-gray-800">Winkermind</span>
              </Link>
              <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                <Link href="/creators" className="text-gray-600 hover:text-gray-900 transition-colors">Creadores</Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Videos</Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Log in</Link>
                <Button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-6 hover:from-pink-600 hover:to-yellow-500">
                  Sign up
                </Button>
              </nav>
              <Button className="md:hidden" variant="ghost" size="icon">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
              </Button>
          </div>
        </div>
        </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <h1 className="text-4xl font-black text-gray-900">Explore Creators</h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Input 
                            type="search" 
                            placeholder="Search creators..." 
                            className="bg-gray-100 border-gray-200 pl-10 text-gray-900 placeholder:text-gray-500 focus:ring-pink-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <Button variant="outline" className="bg-white border-gray-200 hover:bg-gray-100 w-full sm:w-auto text-gray-700">
                        Categories <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <Link href={`/creators/${creator.slug}`} key={creator.name}>
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
                        <h3 className="font-bold text-lg mt-3 text-gray-900">{creator.name}</h3>
                        <Badge variant="secondary" className="mt-1 bg-pink-100 text-pink-700 border-none font-medium">{creator.category}</Badge>
                        <p className="text-sm text-gray-500 mt-2">{creator.followers} followers</p>
                        <Button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full hover:from-pink-600 hover:to-yellow-500 shadow-md hover:shadow-lg transition-shadow">
                           <Eye className="mr-2 h-4 w-4"/> Ver contenido
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
