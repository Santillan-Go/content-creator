"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const creators = [
  {
    name: 'Aitana Lopez',
    description: 'AI Creator | 350k+ followers',
    image: 'https://picsum.photos/seed/1/400/600',
    slug: 'camila-hot',
    dataAiHint: 'female creator'
  },
  {
    name: 'Darren Till',
    description: 'UFC Title Contender',
    image: 'https://picsum.photos/seed/2/400/600',
    slug: 'camila-hot',
    dataAiHint: 'male boxer'
  },
  {
    name: 'Lana Scolaro',
    description: 'DJ | 2.1m followers',
    image: 'https://picsum.photos/seed/3/400/600',
    slug: 'camila-hot',
    dataAiHint: 'female dj'
  },
  {
    name: 'Chesca',
    description: 'Music Artist | 480k followers',
    image: 'https://picsum.photos/seed/4/400/600',
    slug: 'camila-hot',
    dataAiHint: 'female singer'
  },
  {
    name: 'Ben Morris',
    description: 'YouTube | 770k subscribers',
    image: 'https://picsum.photos/seed/5/400/600',
    slug: 'camila-hot',
    dataAiHint: 'male youtuber'
  },
];

const DFansLogo = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0Z" fill="url(#paint0_linear_1_2)"/>
        <path d="M20.7383 14.1621C22.0135 14.1621 23.078 14.3364 23.9318 14.6851C24.7856 15.0253 25.4357 15.5249 25.8821 16.1836C26.3371 16.8423 26.5646 17.6426 26.5646 18.584C26.5646 19.5253 26.3371 20.3257 25.8821 20.9844C25.4357 21.643 24.7856 22.1426 23.9318 22.4828C23.078 22.823 22.0135 22.9928 20.7383 22.9928H18.8244V28H14.8831V11.2H20.7383C22.0135 11.2 23.078 11.3698 23.9318 11.7099C24.7856 12.0501 25.4357 12.5498 25.8821 13.2085C26.3371 13.8672 26.5646 14.6675 26.5646 15.6089C26.5646 16.3271 26.4389 16.9631 26.1874 17.5168C25.936 18.062 25.5786 18.5084 25.1153 18.8552C25.4299 19.004 25.7275 19.221 26.0082 19.5064C26.2974 19.7833 26.5441 20.1235 26.7481 20.5269C27.182 21.3662 27.4299 22.2876 27.4299 23.291C27.4299 24.3219 27.1691 25.2346 26.6465 26.0293C26.124 26.8239 25.3934 27.4443 24.4549 27.8904C23.5164 28.3364 22.4184 28.5594 21.1611 28.5594H12V8.2H20.7383C22.5643 8.2 24.0859 8.54877 25.3032 9.24632C26.5291 9.94387 27.3989 10.9231 27.9128 12.184C28.4268 13.4364 28.6838 14.8925 28.6838 16.5523C28.6838 17.7058 28.4883 18.7367 28.1057 19.6445C28.5397 19.9572 28.9108 20.3257 29.2191 20.75C29.5359 21.1743 29.7783 21.6544 29.9464 22.19C30.4014 23.4779 30.6288 24.8997 30.6288 26.4555C30.6288 27.8858 30.3479 29.1428 29.7854 30.226C29.2229 31.3092 28.3606 32.1763 27.2068 32.8273C26.053 33.4783 24.6409 33.8038 22.9705 33.8038H14.8831L14.8916 31.0118H21.1611C22.9128 31.0118 24.3207 30.5901 25.3838 29.7466C26.4555 28.8946 26.9918 27.7698 26.9918 26.3721C26.9918 25.3326 26.7026 24.4823 26.124 23.821C25.5539 23.1597 24.7771 22.6934 23.7925 22.422C23.7925 22.3945 23.801 22.3754 23.801 22.3479C24.8584 21.9906 25.6889 21.4172 26.292 20.6277C26.9036 19.8296 27.2094 18.8828 27.2094 17.7871C27.2094 16.3721 26.763 15.2214 25.8701 14.335C24.9859 13.4485 23.7832 12.8721 22.2617 12.6064C22.2532 12.615 22.2447 12.615 22.2277 12.615H18.8244V14.1621H20.7383Z" fill="#F7F7F8"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF5C01"/>
                <stop offset="1" stop-color="#FFD600"/>
            </linearGradient>
        </defs>
    </svg>
);

export default function LandingPage() {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <div className="bg-[#161618] text-white">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center gap-2">
                <DFansLogo />
                <span className="font-bold text-xl">dfans.co</span>
              </div>
              <nav className="hidden md:flex items-center gap-8 text-sm">
                <Link href="#" className="hover:text-gray-300">dFans AI</Link>
                <Link href="#" className="hover:text-gray-300">Video Guide</Link>
                <Link href="#" className="hover:text-gray-300">FAQ</Link>
                <Link href="#" className="hover:text-gray-300">Log in</Link>
                <Button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-6 hover:from-[#FF2541] hover:to-[#FF9A02]">
                  Sign up
                </Button>
              </nav>
              <Button className="md:hidden bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-4">
                Sign up
              </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="flex -space-x-3">
                  {creators.slice(0, 5).map((creator, index) => (
                    <Image key={creator.name} src={creator.image} alt={creator.name} width={48} height={48} className="rounded-full border-2 border-[#111111]" data-ai-hint={creator.dataAiHint} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6">Loved by 100,000+ Creators</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">The Decentralized<br />Creator's Platform</h1>
              <p className="text-gray-400 mb-8 max-w-md mx-auto md:mx-0">Less Censorship. More Privacy. Faster Payouts. Future-Ready.</p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                <Button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold rounded-full px-8 py-6 text-lg hover:from-[#FF2541] hover:to-[#FF9A02] hover:text-white">Become a creator</Button>
                <Link href="#" className="text-white font-semibold text-lg">Sign up as a Fan</Link>
              </div>
              <p className="text-xs text-gray-500 mt-2">It's free and takes less than a minute!</p>
            </div>
            <div className="relative h-full hidden md:block">
              <Image src="https://dfans.co/assets/top-dark.1.0.113.DwGjhX2l.avif" alt="App screenshot" width={450} height={644} className="mx-auto object-contain h-full w-auto" data-ai-hint="app screenshot" />
            </div>
          </div>
        </main>
      </div>

      {/* Top Creators Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">TOP CREATORS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {creators.map((creator) => (
              <Link href={`/creators/${creator.slug}`} key={creator.name}>
                <Card className="overflow-hidden cursor-pointer group">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={creator.image}
                      alt={creator.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={creator.dataAiHint}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{creator.name}</h3>
                    <p className="text-sm text-gray-500">{creator.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center p-8 text-muted-foreground text-sm mt-10">
        <p>&copy; {new Date().getFullYear()} ModelVerse. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
