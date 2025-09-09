"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShieldOff, Lock, Zap, Rocket } from 'lucide-react';

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

const faqItems = [
  {
    question: "What is dFans?",
    answer: "dFans is a decentralized content subscription service. It allows creators to earn money from their fans by providing exclusive content. Unlike other platforms, dFans is built on a decentralized model, offering more freedom and less censorship."
  },
  {
    question: "How do I become a creator?",
    answer: "Becoming a creator is easy and free. Simply click on the 'Become a creator' button, fill out your profile, and you can start uploading content and earning from your fans immediately."
  },
  {
    question: "What are the fees?",
    answer: "dFans offers one of the most competitive fee structures in the industry. We believe in creators keeping the majority of their earnings. For a detailed breakdown, please visit our pricing page."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, privacy and security are at the core of dFans. Our decentralized nature means your data is not stored on a central server, giving you more control and protection against data breaches."
  }
];

const features = [
  {
    icon: <ShieldOff className="w-10 h-10 text-pink-500" />,
    title: "Less Censorship",
    description: "Our decentralized platform means more freedom of expression for creators."
  },
  {
    icon: <Lock className="w-10 h-10 text-yellow-400" />,
    title: "More Privacy",
    description: "Protect your data and content with the power of decentralization."
  },
  {
    icon: <Zap className="w-10 h-10 text-pink-500" />,
    title: "Faster Payouts",
    description: "Get your earnings quickly and efficiently, without long waiting periods."
  },
  {
    icon: <Rocket className="w-10 h-10 text-yellow-400" />,
    title: "Future-Ready",
    description: "Built on modern technology, dFans is ready for the future of the creator economy."
  }
];


export default function LandingPage() {
  return (
    <div className="bg-[#161618] text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black via-black to-[#161618]">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" aria-label="Home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12a10 10 0 0 0-10 10z"></path></svg>
                </div>
                <span className="text-xl font-bold">Winkermind</span>
              </Link>
              <nav className="hidden md:flex items-center gap-4 text-sm">
                <Link href="#" className="text-white hover:text-gray-300 transition-colors">Creadores</Link>
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

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-24">
              <div className="text-center md:text-left md:w-1/2">
                  <div className="flex justify-center md:justify-start mb-4">
                      <div className="flex -space-x-3">
                          {creators.slice(0, 5).map((creator) => (
                              <div key={creator.name} className="w-10 h-10 rounded-full border-2 border-[#161618] overflow-hidden">
                                  <Image src={creator.image} alt={creator.name} width={40} height={40} className="object-cover w-full h-full" data-ai-hint={creator.dataAiHint} />
                              </div>
                          ))}
                      </div>
                  </div>
                <p className="text-sm text-gray-400 mb-4">Más de +1,000 Creadores disponibles</p>
                <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">Encuentra cientos de creadores</h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto md:mx-0">Sin censura, alta privacidad y acceso gratuito.</p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full px-8 py-6 text-lg hover:from-yellow-500 hover:to-orange-600">Explorar Creadores</Button>
                  <Button variant="link" className="text-white font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 rounded-full py-3 px-5 transition-colors">Registrate</Button>
                </div>
                <p className="text-xs text-gray-500 mt-4">*Registrate sin costo para poder ver más contenido exclusivo*</p>
              </div>
              <div className="relative mt-12 md:mt-0 md:w-1/2">
                <Image src="https://dfans.co/assets/top-dark.1.0.113.DwGjhX2l.avif" alt="App screenshot" width={700} height={644} className="mx-auto object-contain" data-ai-hint="app screenshot" />
              </div>
          </div>
        </main>
      </div>
      
      <div className="bg-white text-black">
        {/* Top Creators Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">TOP CREATORS</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {creators.map((creator) => (
                <Link href={`/creators/${creator.slug}`} key={creator.name}>
                  <Card className="overflow-hidden cursor-pointer group border-none shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={creator.image}
                        alt={creator.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={creator.dataAiHint}
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-lg">{creator.name}</h3>
                      <p className="text-sm text-gray-500">{creator.description}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Why dFans is Different</h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">We're building a fairer, more open platform for creators and their fans.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-white p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex justify-center mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
              <Image src="https://picsum.photos/1920/1080" alt="background" fill objectFit="cover" className="opacity-20" data-ai-hint="abstract background"/>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Join the Revolution</h2>
              <p className="text-lg text-gray-300 mb-8">Ready to take control of your content and earnings? Join dFans today and be part of the future.</p>
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-10 py-7 text-xl font-bold hover:from-[#FF2541] hover:to-[#FF9A02]">
                  Get Started for Free
              </Button>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-lg font-semibold">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <footer className="text-center p-8 text-gray-400 text-sm mt-10 bg-[#161618]">
          <p>&copy; {new Date().getFullYear()} dFans. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}
