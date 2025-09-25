import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldOff, Lock, Zap, Rocket } from "lucide-react";
import { creators, fetchCreators } from "./creators/page";

import { Menu, X } from "lucide-react";
import Header from "@/components/ui/Header";
// ...existing imports...
// const creators = [
//   {
//     name: "Aitana Lopez",
//     description: "AI Creator | 350k+ followers",
//     image: "https://picsum.photos/seed/1/400/600",
//     slug: "camila-hot",
//     dataAiHint: "female creator",
//   },
//   {
//     name: "Darren Till",
//     description: "UFC Title Contender",
//     image: "https://picsum.photos/seed/2/400/600",
//     slug: "camila-hot",
//     dataAiHint: "male boxer",
//   },
//   {
//     name: "Lana Scolaro",
//     description: "DJ | 2.1m followers",
//     image: "https://picsum.photos/seed/3/400/600",
//     slug: "camila-hot",
//     dataAiHint: "female dj",
//   },
//   {
//     name: "Chesca",
//     description: "Music Artist | 480k followers",
//     image: "https://picsum.photos/seed/4/400/600",
//     slug: "camila-hot",
//     dataAiHint: "female singer",
//   },
//   {
//     name: "Ben Morris",
//     description: "YouTube | 770k subscribers",
//     image: "https://picsum.photos/seed/5/400/600",
//     slug: "camila-hot",
//     dataAiHint: "male youtuber",
//   },
// ];

const faqItems = [
  {
    question: "What is dFans?",
    answer:
      "dFans is a decentralized content subscription service. It allows creators to earn money from their fans by providing exclusive content. Unlike other platforms, dFans is built on a decentralized model, offering more freedom and less censorship.",
  },
  {
    question: "How do I become a creator?",
    answer:
      "Becoming a creator is easy and free. Simply click on the 'Become a creator' button, fill out your profile, and you can start uploading content and earning from your fans immediately.",
  },
  {
    question: "What are the fees?",
    answer:
      "dFans offers one of the most competitive fee structures in the industry. We believe in creators keeping the majority of their earnings. For a detailed breakdown, please visit our pricing page.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, privacy and security are at the core of dFans. Our decentralized nature means your data is not stored on a central server, giving you more control and protection against data breaches.",
  },
];

const features = [
  {
    icon: <ShieldOff className="w-10 h-10 text-[#ff699f]" />,
    title: "Less Censorship",
    description:
      "Our decentralized platform means more freedom of expression for creators.",
    borderColor: "#ff699f",
  },
  {
    icon: <Lock className="w-10 h-10 text-[#fcc841]" />,
    title: "More Privacy",
    description:
      "Protect your data and content with the power of decentralization.",
    borderColor: "#fcc841",
  },
  {
    icon: <Zap className="w-10 h-10 text-[#ff699f]" />,
    title: "Faster Payouts",
    description:
      "Get your earnings quickly and efficiently, without long waiting periods.",
    borderColor: "#ff699f",
  },
  {
    icon: <Rocket className="w-10 h-10 text-[#fcc841]" />,
    title: "Future-Ready",
    description:
      "Built on modern technology, dFans is ready for the future of the creator economy.",
    borderColor: "#fcc841",
  },
];

export default async function LandingPage() {
  const usersFound = await fetchCreators();

  return (
    <div className="bg-[#161618]  text-white w-full">
      <div>
        <Header
          checkIfAdmin={false}
          isHomePage={true}
          className="bg-[#161618] "
          colorText="text-white"
        />
        <main className="w-full sm:max-w-7xl sm:mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="flex -space-x-3">
                  {[...usersFound ?? []].slice(0, 5).map((creator) => (
                    <div
                      key={creator.name}
                      className="w-12 h-12 rounded-full border-2 border-[#161618] overflow-hidden"
                    >
                      <Image
                        src={creator.profilePicture}
                        alt={creator.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                        data-ai-hint={creator.dataAiHint}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Más de +1,000 Creadores disponibles
              </p>
              <h1 className="text-5xl md:text-5xl font-black leading-tight mb-4">
                Encuentra cientos de creadores
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto md:mx-0">
                Sin censura, alta privacidad y acceso gratuito.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                <Link href="/creators">
                  <Button className="bg-gradient-to-r from-[#ff699f] to-[#fcc841] text-black font-medium rounded-full px-8 py-6 text-lg hover:from-[#e5658b] hover:to-[#e3b638] transition-all duration-300">
                    Explorar Creadores
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative mt-12 md:mt-0">
              <Image
                src="/assets/top-dark.webp"
                alt="App screenshot"
                width={1000}
                height={550}
                className="mx-auto object-contain"
                data-ai-hint="app screenshot"
              />
            </div>
          </div>
        </main>
      </div>

      <div className="bg-white text-black">
        {/* Top Creators Section */}
        <section className="py-8 sm:py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-left mb-6 sm:mb-8">
              TOP CREATORS
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {[...usersFound ?? []].slice(0, 5).map((creator) => (
                <Link
                  href={`/creators/${creator.username}`}
                  key={creator.name}
                  className="w-full"
                >
                  <Card
                    className="overflow-hidden cursor-pointer group border-none 
            shadow-md transition-all duration-300 hover:shadow-xl 
            hover:-translate-y-1 rounded-2xl sm:rounded-2xl h-full"
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={creator.profilePicture}
                        alt={creator.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 
                       (max-width: 768px) 33vw,
                       (max-width: 1024px) 25vw,
                       20vw"
                      />
                    </div>
                    <div className="p-2 sm:p-3 bg-white">
                      <h3 className="font-semibold text-sm sm:text-base truncate">
                        {creator.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {creator.bio}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="bg-gray-50 py-12 sm:py-20">
          <div className="max-w-7xl px-4 w-full mx-auto sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why dFans is Different
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                We're building a fairer, more open platform for creators and
                their fans.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-20 px-4 sm:px-32">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-6 lg:gap-16`}
                >
                  <div className="w-full lg:w-1/2">
                    <Card
                      className="bg-gradient-to-br from-white to-gray-50 
                p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 
                transform hover:-translate-y-1 rounded-2xl sm:rounded-[2rem]
                border-2 hover:border-4 
                border-[${feature.borderColor}]/30
                hover:border-[${feature.borderColor}]/50"
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                        <div className="flex-shrink-0">
                          <div
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl 
                      bg-gradient-to-r from-[${feature.borderColor}]/10 to-[${feature.borderColor}]/5
                      flex items-center justify-center
                      border-2 border-[${feature.borderColor}]/20
                      shadow-lg shadow-[${feature.borderColor}]/10"
                          >
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3
                            className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 
                    bg-gradient-to-r from-pink-500 to-yellow-400 
                    bg-clip-text text-transparent"
                          >
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}

        <section className="relative py-20 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://picsum.photos/1920/1080"
              alt="background"
              fill
              objectFit="cover"
              className="opacity-20"
              data-ai-hint="abstract background"
            />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the Revolution
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Ready to take control of your content and earnings? Join dFans
              today and be part of the future.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-10 py-7 text-xl font-bold hover:from-[#FF2541] hover:to-[#FF9A02]"
            >
              Get Started for Free
            </Button>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {item.question}
                  </AccordionTrigger>
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
{
  /* 
        <header className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
           

          
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link
                href="/creators"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Creadores
              </Link>
              <Link
                href="#"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Videos
              </Link>
              <Link
                href="#"
                className="text-white hover:text-gray-300 transition-colors"
              >
                FAQ
              </Link>
            </nav>

           
            <Button
              className="md:hidden"
             
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

       
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10">
              <nav className="flex flex-col p-4 gap-4">
                <Link
                  href="/creators"
                  className="text-white hover:text-gray-300 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Creadores
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Videos
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </nav>
            </div>
          )}
        </header>
        */
}
