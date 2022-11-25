import type { NextPage } from 'next'
import { NFTCard } from '../../components/NFTCard';
import { useEffect, useState } from 'react'
import { useWeb3Context } from '../../context'
import { toast } from 'react-toastify'
import { Web3Address } from '../../components';
import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
import Dropdown from '../../components/Dropdown';
import { useRouter } from 'next/router';

const Gallery: NextPage = () => {
  const {web3Provider, address, connect} = useWeb3Context();
  const router = useRouter();

  const settings = {
    network: Network.ETH_GOERLI,
    alchemyKey: '4isvRXMrm4Rwdws4Wb1tJxPmkOvCN1i0',
  }

  let alchemy = new Alchemy(settings);

  const [collection, setCollectionAddress] = useState("");
  const [nerwork, setNetwork] = useState(Network.ETH_MAINNET);
  const [NFTs, setNFTs] = useState<Array<OwnedNft>>([]);

  useEffect(() => {
      settings.network = nerwork;
      alchemy = new Alchemy(settings);
      setNFTs([]);
  }, [nerwork])

  const fetchNFTs = async() => {
    console.log("Fetching NFTs")  
    if (!web3Provider) {
      if (connect) await connect();
      else toast.error("No web3 provider found");
    } else if (address) {
      const nfts = await alchemy.nft.getNftsForOwner(address);
      setNFTs(nfts.ownedNfts);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
          <Dropdown onSelect={(network) => {
            setNetwork(network);
          }} />
      </div>
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <Web3Address />
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            fetchNFTs()
          }
        }>Search NFT </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map((nft, idx) => {
            return (
              <NFTCard key={idx} nft={nft}></NFTCard>
            )
          })
        }
      </div>
      <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            router.push({pathname: '/process/upload', query: {
          }}, "/process/upload");
          }
        }>Next Step -{'>'}</button>
    </div>
  )
}

export default Gallery;