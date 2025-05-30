"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectButton, MediaRenderer, useActiveAccount, useReadContract, TransactionButton } from "thirdweb/react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../client";
import Image from "next/image";
import Link from "next/link";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFTs, claimTo } from "thirdweb/extensions/erc1155";
import { balanceOf, transfer, allowance } from "thirdweb/extensions/erc20";
import { useState } from "react";

const NFT_CONTRACT_ADDRESS = "0xabC0584956BfFe644dd4CbF35bF3b9e4979c71C6";
const TOKEN_CONTRACT_ADDRESS = "0x095289680547950706329440B80998Af9B900C5B";
const MARKETPLACE_WALLET = "0xB4C55CeAa993F5D7A2Ac02c67dA1c8F76D67A19a"; // Replace with the address that will receive the FARM tokens

// NFT prices in FARM tokens
const NFT_PRICES = {
  "0": 10, // 10 FARM
  "1": 20, // 20 FARM
  "2": 30, // 30 FARM
  "3": 50, // 50 FARM
};

export default function ShopPage() {
  const [claimingNftId, setClaimingNftId] = useState<bigint | null>(null);
  const [approvingToken, setApprovingToken] = useState<boolean>(false);
  const account = useActiveAccount();
  const contract = getContract({
    address: NFT_CONTRACT_ADDRESS, 
    chain: sepolia,
    client: client,
  });
  
  const tokenContract = getContract({
    address: TOKEN_CONTRACT_ADDRESS,
    chain: sepolia,
    client: client,
  });

  const { data: contractMetadata } = useReadContract(
    getContractMetadata, 
    {
      contract: contract,
    }
  );

  const { data: nfts, isLoading, refetch: refetchNFTs } = useReadContract(
    getNFTs,
    {
      contract,
    }
  );

  const { data: tokenBalance, refetch: refetchBalance } = useReadContract(
    balanceOf,
    {
      contract: tokenContract,
      address: account?.address || "",
    }
  );

  // Check token allowance
  const { data: tokenAllowance, refetch: refetchAllowance } = useReadContract(
    allowance,
    {
      contract: tokenContract,
      owner: account?.address || "",
      spender: MARKETPLACE_WALLET,
    }
  );

  // Get NFT price in FARM tokens
  const getNftPrice = (nftId: string): number => {
    return NFT_PRICES[nftId as keyof typeof NFT_PRICES] || 10; // Default to 10 FARM
  };

  // Format token balance to human-readable format
  const formatTokenAmount = (amount: bigint | undefined): number => {
    if (!amount) return 0;
    return Number(amount) / 10**18;
  };

  // Check if user has enough FARM tokens
  const hasEnoughBalance = (nftId: string): boolean => {
    if (!tokenBalance) return false;
    const price = getNftPrice(nftId);
    return formatTokenAmount(tokenBalance) >= price;
  };

  // Check if user has approved enough tokens
  const hasApprovedEnough = (nftId: string): boolean => {
    if (!tokenAllowance) return false;
    const priceInWei = BigInt(getNftPrice(nftId) * 10**18);
    return tokenAllowance >= priceInWei;
  };

  // For demonstration purposes, directly claim NFT without token payment
  const handleClaimNft = async (tokenId: bigint) => {
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setClaimingNftId(tokenId);
      
      // This will use claimTo function from ERC1155 extension
      // which will create a direct claim transaction without payment
      const transaction = await claimTo({
        contract,
        to: account.address,
        tokenId,
        quantity: BigInt(1),
      });
      
      // The transaction will trigger MetaMask directly
      await transaction;
      
      alert("NFT claimed successfully!");
      refetchNFTs();
    } catch (error) {
      console.error("Error claiming NFT:", error);
      alert("Failed to claim NFT: " + (error as Error).message);
    } finally {
      setClaimingNftId(null);
    }
  };

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

      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-300 mb-2">NFT Marketplace</h1>
              <p className="text-green-700 dark:text-green-400">Claim unique farming tools and assets</p>
            </div>
            
            <div className="mt-4 md:mt-0 px-6 py-3 bg-white/80 dark:bg-black/40 rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-2">
              <span className="text-green-800 dark:text-green-300 font-medium">Balance:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {tokenBalance ? formatTokenAmount(tokenBalance) : '0'} FARM
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : !nfts || (Array.isArray(nfts) && nfts.length === 0) ? (
            <div className="text-center py-16">
              <h3 className="text-xl text-green-800 dark:text-green-300 mb-2">No NFTs available yet</h3>
              <p className="text-green-700 dark:text-green-400 mb-6">Check back soon for new items in our marketplace</p>
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/claim">
                  Claim Free Farmer NFT
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.isArray(nfts) && nfts.map((nft, index) => {
                const tokenId = BigInt(nft.id);
                const nftIdStr = nft.id.toString();
                const nftPrice = getNftPrice(nftIdStr);
                const isPurchasing = claimingNftId === tokenId;
                
                return (
                  <Card key={index} className="border-green-200 dark:border-green-800 bg-white/90 dark:bg-black/60 backdrop-blur-sm overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-square bg-gradient-to-br from-amber-400 to-green-500 relative">
                      <MediaRenderer 
                        client={client}
                        src={nft.metadata.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-green-800 dark:text-green-300">{nft.metadata.name}</CardTitle>
                      <CardDescription className="text-green-600 dark:text-green-500">
                        {nft.metadata.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      {nft.metadata.attributes && 
                        Array.isArray(nft.metadata.attributes) && 
                        nft.metadata.attributes.map((attribute: {trait_type: string, value: string}, attrIndex: number) => (
                          <div key={attrIndex} className="flex justify-between text-sm mb-1">
                            <span className="text-green-700 dark:text-green-400">{attribute.trait_type}:</span>
                            <span className="font-medium">{attribute.value}</span>
                          </div>
                        ))
                      }
                    </CardContent>
                    <CardFooter>
                      {!account ? (
                        <Button 
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          Connect Wallet First
                        </Button>
                      ) : (
                        <TransactionButton
                          transaction={() => claimTo({
                            contract,
                            to: account.address,
                            tokenId,
                            quantity: BigInt(1),
                          })}
                          onTransactionConfirmed={() => {
                            alert("NFT claimed successfully!");
                            refetchNFTs();
                            setClaimingNftId(null);
                          }}
                          onError={(error) => {
                            console.error("Error claiming NFT:", error);
                            alert("Failed to claim NFT. Please try again.");
                            setClaimingNftId(null);
                          }}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                          disabled={isPurchasing}
                        >
                          {isPurchasing ? 'Claiming...' : 'Claim NFT'}
                        </TransactionButton>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <footer className="w-full py-6 px-6 md:px-12 border-t border-green-200 dark:border-green-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm text-center text-green-700 dark:text-green-400">
        <p>© 2025 FarmVerse NFT Game. All rights reserved.</p>
      </footer>
    </div>
  );
} 