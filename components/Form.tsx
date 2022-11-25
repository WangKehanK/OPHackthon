import { DragAndDrop } from "./DragAndDrop";
import { useEffect, useState } from "react";

type FormProps = {
    onSubmit?: (event: React.FormEvent<HTMLFormElement>, newFormData: any) => void;
    address?: string | null;
    connectWallet?: () => void;
}

export function Form({onSubmit, address, connectWallet} : FormProps) {

    const [shouldDisplay, setShouldDisplay] = useState(true);

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            const newFormData: any = {};
            // @ts-ignore
            for (let i = 0; i < e.target.length; i++) {
                // @ts-ignore
                const element = e.target[i];
                if (!element.id || element.type === 'file') continue ;
                // @ts-ignore
                newFormData[element.id] = element.value
            }
            if (onSubmit) onSubmit(e, newFormData);
        }} className='w-full max-w-lg'>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3 mb-3'>
                    <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='campaignDescription'>
                        Prompt
                    </label>
                    <textarea className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none' id='campaignDesc' />
                </div>
                <div className='w-full px-3 mb-3'>
                    <label className='block tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='artwork'>
                        Upload your own Photo
                    </label>
                    <div className="flex w-full">
                        <DragAndDrop setShouldDisplay={setShouldDisplay} className="pr-2" id="artwork" />                        
                    </div>
                </div>
                <div className='w-full px-3 flex justify-between mb-3'>
                    <div>
                        <label className='block tracking-wide text-gray-700 text-xs font-light mb-2' htmlFor='blockchain'>
                            Blockchain
                        </label>
                        <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='blockchain'>
                            <option>Choose a blockchain</option>
                            <option>ETH</option>
                            <option>AVAX</option>
                            <option>Polygon</option>
                            <option>BSC</option>
                        </select>
                    </div>
                </div>
                <div className='w-full px-3 mb-3'>
                    <label className='block tracking-wide text-gray-700 text-xs font-light mb-2' htmlFor='foundraiser'>
                        Target Wallet
                    </label>
                    <div className='flex w-full items-center justify-between align-middle'>
                        <input value={address === null ? '' : address} className='appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white cursor-not-allowed grow' disabled id='wallet' type='text' />
                        <button style={{
                            backgroundColor: '#7ED957',
                        }} className='text-white font-bold ml-2 py-3 px-4 mb-3 rounded-full' type='button' onClick={connectWallet}>Connect</button>
                    </div>
                </div>

                <div className='w-full px-3 mb-3'>
                    <input type='checkbox' id='terms' name='terms' value='terms' />
                    <label className='ml-2' htmlFor='terms'>I agree to the <a href='#' className='text-green-900'>Terms of Service</a></label>
                </div>
                <div className='w-full px-3 flex mt-5 mb-3'>
                    <button style={{
                            backgroundColor: '#7ED957',
                        }}  className='bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-4 mb-3 rounded-full' type='submit'>Launch -{'>'}</button>
                    <button style={{
                            backgroundColor: '#7ED957',
                        }} className='bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-4 mb-3 mx-4 rounded-full' type='button'>Save As Draft</button>
                </div>
            </div>
        </form>
    )
}