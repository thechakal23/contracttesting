"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectButton, MediaRenderer, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../client";
import Image from "next/image";
import Link from "next/link";
import { getContractMetadata } from "thirdweb/extensions/common";
import { claimTo } from "thirdweb/extensions/erc1155";
import { balanceOf } from "thirdweb/extensions/erc20";

export default function ClaimPage() {
  const account = useActiveAccount();
  const contract = getContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string, 
    chain: sepolia,
    client: client,
  });
  
  const tokenContract = getContract({
    address: "0x095289680547950706329440B80998Af9B900C5B",
    chain: sepolia,
    client: client,
  });

  const {data: contactMetadata} = useReadContract(
    getContractMetadata, 
    {
      contract: contract,
    }
  )

  const { data: tokenBalance } = useReadContract(
    balanceOf,
    {
      contract: tokenContract,
      address: account?.address || "",
    }
  );

  console.log(contactMetadata);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      {/* Navbar */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/farm-logo.svg" 
            alt="Farm NFT" 
            width={40} 
            height={40} 
            className="dark:filter dark:brightness-110"
          />
          <span className="text-xl font-bold text-green-800 dark:text-green-300">FarmVerse</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-green-700 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">Home</Link>
            <Link href="/claim" className="text-green-700 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">Claim</Link>
            <Link href="/shop" className="text-green-700 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium">Shop</Link>
          </nav>
          <ConnectButton client={client} />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md border-green-200 dark:border-green-800 bg-white/90 dark:bg-black/60 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">Claim Your Farmer NFT</CardTitle>
            <CardDescription className="text-green-600 dark:text-green-500">
              Get started with your virtual farming journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="relative h-48 w-48 bg-gradient-to-br from-amber-400 to-green-500 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0xMCAyMGgyMHYyMGgtMjB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PHBhdGggZD0iTTIwIDEwaDEwdjEwaC0xMHoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48cGF0aCBkPSJNMTAgMTBoMTB2MTBoLTEweiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
              <MediaRenderer
                client={client}
                src={contactMetadata?.image}
                className="w-full h-full object-cover"
              />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-medium text-green-800 dark:text-green-300">Beginner Farmer NFT</h3>
              <p className="text-sm text-green-600 dark:text-green-500">Start with basic farming tools </p>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between text-sm">
                <span className="text-green-700 dark:text-green-400">Price:</span>
                <span className="font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700 dark:text-green-400">Abilities:</span>
                <span className="font-medium">Basic Farming, Seed Collection</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-700 dark:text-green-400">Land Size:</span>
                <span className="font-medium">3 x 3 Plot</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <TransactionButton
              transaction={()=> claimTo({
                contract: contract,
                to: account?.address as string,
                quantity: BigInt(1),
                tokenId: BigInt(0),
              })}
              onTransactionConfirmed={async () => alert("Transaction Confirmed")}
            >
              Claim Farmer NFT
            </TransactionButton>
            
            <div className="w-full border-t border-green-200 dark:border-green-800 pt-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-green-700 dark:text-green-400 font-medium">Your Token Balance:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {tokenBalance ? Number(tokenBalance) / 10**18 : '0'} FARM
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="w-full py-6 px-6 md:px-12 border-t border-green-200 dark:border-green-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm text-center text-green-700 dark:text-green-400">
        <p>© 2025 FarmVerse NFT Game. All rights reserved.</p>
      </footer>
    </div>
  );
} 