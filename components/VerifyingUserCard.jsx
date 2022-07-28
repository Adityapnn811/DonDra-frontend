
export default function VerifyingUserCard({className, photo, bankName, cardNumber, cardName, currency, width, height, bankTextSize, textSize}){
    return (
        <div className={className ? `p-4 flex flex-row ${className}` : "bg-white flex w-full m-3 pr-5"}>
            <div className="align-center">
                {photo ? <image src={photo} width={width} height={height} className="mr-2 rounded-lg"/> : <>photo</>}
            </div>
            <div className={`ml-4 flex flex-1 flex-col content-between w-auto`}>
                <div className="flex flex-row flex-1 w-full justify-between">
                    <h1 className={` ${bankTextSize} font-bold`}>{bankName}</h1>
                    <div>
                        <button className="mr-2">Verify</button>
                    </div>
                </div>
                <div className="flex flex-col content-between">
                    <p className={` ${textSize} text-gray-500`}>{cardNumber} - {cardName}</p>
                    <p className={` ${textSize} text-gray-500`}>{currency}</p>
                </div>
            </div>
        </div>
    )
}