import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      {/* Navbar */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Image 
            src="/farm-logo.svg" 
            alt="Farm NFT" 
            width={40} 
            height={40} 
            className="dark:filter dark:brightness-110"
          />
          <span className="text-xl font-bold text-green-800 dark:text-green-300">FarmVerse</span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-green-700 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">Home</Link>
            <Link href="/claim" className="text-green-700 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">Claim</Link>
            <Link href="/shop" className="text-green-700 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">Shop</Link>
          </nav>
          <ConnectButton client={client} />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-6 md:p-16">
        <div className="flex flex-col gap-6 max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 dark:text-green-300">
            Grow, Harvest, <span className="text-amber-600 dark:text-amber-400">Earn</span>
          </h1>
          <p className="text-lg text-green-700 dark:text-green-400">
            Own digital farmland, grow virtual crops, and earn real rewards in this
            immersive NFT farming experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-8 py-6">
              <Link href="/claim">
                Start Farming
              </Link>
            </Button>
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-900 px-8 py-6">
              Explore Marketplace
            </Button>
          </div>
        </div>

        <div className="relative h-64 w-64 md:h-96 md:w-96 bg-gradient-to-br from-amber-400 to-green-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0xMCAyMGgyMHYyMGgtMjB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PHBhdGggZD0iTTIwIDEwaDEwdjEwaC0xMHoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48cGF0aCBkPSJNMTAgMTBoMTB2MTBoLTEweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
          <Image 
            src="/farm-logo.svg"
            alt="Farm NFT Illustration" 
            width={200} 
            height={200}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150"
          />
        </div>
      </main>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-16 bg-white/70 dark:bg-black/20">
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-black/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Virtual Farming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 dark:text-green-500">Cultivate digital crops and tend to your virtual farm in a relaxing gameplay experience.</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-black/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              NFT Marketplace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 dark:text-green-500">Buy, sell, and trade unique farming assets as NFTs on our decentralized marketplace.</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-black/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Earn Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600 dark:text-green-500">Harvest your crops to earn in-game tokens that can be converted to real-world value.</p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 px-6 md:px-12 border-t border-green-200 dark:border-green-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm text-center text-green-700 dark:text-green-400">
        <p>© 2025 FarmVerse NFT Game. All rights reserved.</p>
      </footer>
    </div>
  );
}
