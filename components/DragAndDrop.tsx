import { useState } from "react";
import Image from "next/image";

type DragAndDropProps = {
    className?: string;
    id?: string;
    disable?: boolean;
    setShouldDisplay?: any;
}
export function DragAndDrop({className, setShouldDisplay, disable=false, id=""}: DragAndDropProps) {
    const [imageURLArray, setImageURLArray] = useState<Array<string>>([]);

    const uploadMultipleImages = (result: FileList) => {
        const urls = Array.from(result).map((file) => {
            const blob = new Blob([file], {type: file.type});
            return URL.createObjectURL(blob);
        });
        setShouldDisplay(false);
        return urls
    };


    const displayAllImages = () => {
        return imageURLArray.map((url, index) => {
            return (
                <div key={index}>
                    <Image
                        src={url}
                        alt="NFT"
                        loading="lazy"
                        width={200}
                        height={200}
                    />
                </div>
            );
        });
    }

    return (
        <div className={className}>
            {imageURLArray.length != 0 ? 
                <div className="flex flex-wrap w-full justify-between">
                    <input type='text' readOnly id={id} className="hidden" value={imageURLArray} multiple />
                    {displayAllImages()}
                </div>
                 :
                <div onDrop={(e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (!files) return ;
                    const allUrls = uploadMultipleImages(files);
                    setImageURLArray([...imageURLArray, ...allUrls]);
                    e.preventDefault();
                }}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                >
                    <label
                            className={`flex justify-center w-full h-32 px-4 transitio border-2 border-gray-300 rounded-md appearance-none ${disable ? "cursor-not-allowed bg-gray-200" : "cursor-pointer bg-whit border-dashed"} hover:border-gray-400 focus:outline-none`}>
                        <span className="flex items-center space-x-2">
                            {
                                !disable && 
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            }
                            {
                                !disable ? 
                                <>
                                    <span className="font-medium text-gray-600">
                                        Drop files to Attach, or &nbsp;
                                        <span className="text-green-900 underline">browse</span>
                                    </span>
                                    <input type="file" onInput={(e) => {
                                        const result = (e.target as HTMLInputElement).files;
                                        const allUrls = uploadMultipleImages(result!);
                                        setImageURLArray([...imageURLArray, ...allUrls]);
                                    }} accept="image/*" name="file_upload" className="hidden" multiple /> 
                                </>
                                :
                                <span className="font-medium text-white">
                                    Generate NFTs Using MonumentDAO AI
                                </span>
                            }
 
                        </span>
                    </label>
                </div>
            }
 
        </div>
    )
}