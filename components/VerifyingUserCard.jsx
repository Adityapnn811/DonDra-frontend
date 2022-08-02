import { getCookie } from "cookies-next"
import { useState } from "react"
import Router from "next/router"

export default function VerifyingUserCard({photo, nama, id, username}){
    const [verifying, setVerifying] = useState(false)
    const handleVerify = async () => {
        setVerifying(true)
        await fetch(`https://dondra-backend.herokuapp.com/verifyUser/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`,
                'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
            },
        }).then(res => {
            res.json().then(data => {
                if (data.success) {
                    Router.replace(Router.asPath)
                } else {
                    alert('User failed to verify')
                }
            })
        })
        setVerifying(false)
    }


    return (
        <div className="bg-secondary my-4 mx-3 md:mx-10 md:w-2/3 md:self-center rounded-lg flex flex-col md:flex-row">
            <div className="align-center">
                {photo ? <img alt="fotoKTP" src={photo} width="250px" height="30px" className="mr-2 rounded-lg m-3"/> : <>fotoKTP</>}
            </div>
            <div className={`ml-4 flex flex-1 flex-row content-between w-auto`}>
                <div className="flex flex-col content-between m-3 grow">
                <h1 className="text-2xl font-semibold mb-2">{nama}</h1>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Rekening</div><div>: {id}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Username</div><div>: {username}</div></p>
                </div>
                <div className="flex ">
                    {!verifying ? 
                    <button className="text-xl m-4 bg-green-500 py-2 px-4 rounded-lg hover:bg-emerald-500 text-white font-semibold border-green-500 border-2" onClick={handleVerify}>Verify</button>
                    :
                    <button className="text-xl m-4 bg-green-500 py-2 px-4 rounded-lg text-white font-semibold border-green-500 border-2" disabled>Verifying, please wait</button>}
                </div>
            </div>
        </div>
    )
}