import { OwnedNft } from 'alchemy-sdk';
import React from 'react'

type NFTCardProps = {
    nft : OwnedNft;
}

export function NFTCard({nft}: NFTCardProps) {
  console.log(nft);
  return (
    <div className="w-1/4 flex flex-col ">

    <div className="flex flex-col y-gap-2 px-1 py-3 rounded-b-md h-110 ">
        <li className="list-none">
            <input type="radio" id={nft.tokenId} name="hosting" value={nft.tokenId} className="hidden peer" required />
            <label htmlFor={nft.tokenId} className="inline-flex justify-between items-center p-5 w-full text-black bg-white rounded-lg border cursor-pointer dark:hover:text-black dark:border-white dark:peer-checked:text-blue-500 dark:peer-checked:border-black
            peer-checked:border-black-600 peer-checked:text-black-600 hover:text-gray-600 hover:bg-gray-100 dark:text-black-400 dark:bg-black-800 dark:hover:bg-gray">
                <div className="rounded-md mr-10">
                    <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0]?.gateway} ></img>
                </div>                           
                <div className="block">
                    <div className="w-full text-lg font-semibold">{nft.title}</div>
                    <p className="text-gray-600">Id: {nft.tokenId.substr(nft.tokenId.length - 4)}</p>
                    <p className="text-gray-600" >{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                </div>
                {/* <div className="flex-grow mt-2">
                    <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
                </div> */}
            </label>
        </li>
    </div>
</div>
  )
}
