export default function UserCard({photo, nama, id, username, saldo, isVerified}) {
    return (
        <div className="bg-secondary my-4 mx-3 py-2 md:w-full md:mx-10 md:self-center rounded-lg flex flex-col md:flex-row">
            <div className="align-center">
                {photo ? <img alt="fotoKTP" src={photo} width="250px" height="30px" className="mr-2 rounded-lg m-3"/> : <>fotoKTP</>}
            </div>
            <div className={`ml-4 flex flex-1 flex-row content-between w-auto`}>
                <div className="flex flex-col content-between m-3 grow">
                    <h1 className="text-2xl font-semibold mb-2">{nama}</h1>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Rekening</div><div>: {id}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Username</div><div>: {username}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Saldo</div><div>: {saldo}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Status</div><div>: {isVerified ? "Sudah Terverifikasi" : "Belum Terverifikasi"}</div></p>
                </div>
            </div>
        </div>
    )
}