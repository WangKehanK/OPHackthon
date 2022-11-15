import type { NextPage } from 'next'
import { NFTCard } from '../components/NFTCard';
import { useState } from 'react'
import { useWeb3Context } from '../context/'
import { toast } from 'react-toastify'
import { Web3Address } from '../components';

const Home: NextPage = () => {
  const {web3Provider, address, connect} = useWeb3Context();
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])

  const fetchNFTs = async() => {

    if (!web3Provider) {
      if (connect) await connect();
      else toast.error("No web3 provider found");
    } else {
      let nfts; 
      console.log("fetching nfts");
      const api_key = "4isvRXMrm4Rwdws4Wb1tJxPmkOvCN1i0"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

      if (!collection.length) {
        var requestOptions = {
          method: 'GET'
        };
      
        const fetchURL = `${baseURL}?owner=${address}`;
        nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      } else {
        var requestOptions = {
          method: 'GET'
        };
        console.log("fetching nfts for collection owned by address")
        const fetchURL = `${baseURL}?owner=${address}&contractAddresses%5B%5D=${collection}`;
        nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
      }
      if (nfts) {
        console.log("nfts:", nfts)
        setNFTs(nfts.ownedNfts)
      }
  }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <Web3Address />
        {/* <input disabled={fetchForCollection}  className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input> */}
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            fetchNFTs()
          }
        }>Search NFT </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home;