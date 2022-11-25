import type { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Form } from '../../components/Form';
import { useWeb3Context } from '../../context';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Upload: NextPage = () => {
    const {web3Provider, address, connect} = useWeb3Context();
    const router = useRouter();

    const [shouldDisplay, setShouldDisplay] = useState(true);

    const connectWallet = async () =>{
        if (!web3Provider) {
            if (connect) {
                try {
                    await connect();
                } catch (e: any) {
                    toast.error(e.message);
                }
            }
            else toast.error('No web3 provider found');
        } else {
            toast('Wallet connected');
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>, newFormData: any) => {
        toast("hello")
    }

    return (
        <div className="flex h-screen flex-col">
            <Head>
                <title>Upload</title>
            </Head>
            <nav className="flex flex-row justify-between p-4">
                <h1 className="text-lg font-light text-green-900">Starting AI Generation</h1>
            </nav>
            <main className="grow self-center p-8">
                <Form address={address} connectWallet={connectWallet} onSubmit={onSubmit} />
            </main>
        </div>
    );
}

export default Upload