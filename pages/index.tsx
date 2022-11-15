import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Web3Button, Web3Address } from '../components/'
import { ethers } from "ethers";
import CTDaoABI from "../contracts/CTDao.json";
import { toast } from 'react-toastify'
import { useWeb3Context } from '../context';

const Home: NextPage = () => {
  const {web3Provider, address, connect} = useWeb3Context();
  
  const handleClick = async () =>{
    if (!web3Provider) {
      if (connect) await connect();
      else toast.error("No web3 provider found");
    }else {
      await web3Provider.send("eth_requestAccounts", []);
      const signer = await web3Provider.getSigner();
      const erc1155 = new ethers.Contract(
        "0x99833F5F96ed198E2e7aFb1F6eA9667aCf82b33F", CTDaoABI, signer);
      try {
        await erc1155.mint(0, 1);
      } catch (e: any) {
        toast.error(e.message);
      }
    }
  }

  const handleError = () =>{
    toast.error('Please connect wallet first')
  }
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Web3 Next-Boilerplate</title>
        <meta name="description" content="Boilerplate for Web3 dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex flex-row justify-between p-4">
        <Link href="/about" className="text-lg font-light">
          About
        </Link>
        <Web3Button />
      </nav>

      <main className="grow p-8 text-center">
        <h1 className="pb-8 text-4xl font-bold">Home Page</h1>
        <Web3Address />
        {
          address == null ?
          <button onClick={handleClick}> Disabled Mint</button>
          : <button onClick={handleClick}> Mint</button>
        }
        
      </main>

      <footer className="justify-end p-4">
        <p className="text-lg font-light">Footer</p>
      </footer>
    </div>
  );
}

export default Home
