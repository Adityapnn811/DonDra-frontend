export default function Card({className, children, title, button, buttonClassName}){
    return (
        <div className={className ? `p-4 drop-shadow rounded-md ${className}` : "bg-black flex w-full"}>
            <div className="flex flex-col ml-3 my-4">
                <div className="flex flex-1 justify-center text-center mb-3">
                    {title ? <h1 className="font-bold text-2xl w-full">{title}</h1> : <h1 className="font-bold text-lg mb-2">Judul</h1>}
                </div>
                
                <div className="flex flex-1 justify-end pr-3">
                {
                    button ? 
                        <button className={buttonClassName}>
                            {button}
                        </button>
                    :
                    <></>
                }
                </div>
            </div>
            {children}
        </div>
    )
}