import { getCookie } from "cookies-next"
import { useState } from "react"
import Router from "next/router"

export default function VerifyingMoneytoringCard({nama, id, username, isIncome, idTransaction, nominal, date, balance}){
    const [verifying, setVerifying] = useState(false)
    const handleVerify = async () => {
        const data = {
            isRejected: false,
        }
        const JSONData = JSON.stringify(data)
        setVerifying(true)
        await fetch(`https://dondra-backend.herokuapp.com/verifyMoneytoring/${idTransaction}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`,
                'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
            },
            body: JSONData
        }).then(res => {
            res.json().then(result => {
                if (result.success) {
                    Router.replace(Router.asPath)
                } else {
                    alert('User failed to verify')
                }
            })
        })
        setVerifying(false)
    }

    const handleVerifyReject = async () => {
        setVerifying(true)
        const data = {
            isRejected: true,
        }
        const JSONData = JSON.stringify(data)
        setVerifying(true)
        await fetch(`https://dondra-backend.herokuapp.com/verifyMoneytoring/${idTransaction}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`,
                'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
            },
            body: JSONData
        }).then(res => {
            res.json().then(result => {
                if (result.success) {
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
            <div className={`ml-4 flex flex-1 flex-row content-between w-auto`}>
                <div className="flex flex-col content-between m-3 grow">
                <h1 className="text-2xl font-semibold mb-2">{isIncome ? "Add Balance Request" : "Substract Balance Request"}</h1>
                <h1 className="text-2xl font-semibold mb-2">{nama}</h1>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Transaction ID</div><div>: {idTransaction}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Rekening</div><div>: {id}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Username</div><div>: {username}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Nominal</div><div>: {nominal}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Date</div><div>: {date}</div></p>
                    <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Balance</div><div>: {balance}</div></p>
                </div>
                <div className="flex ">
                    {!verifying ?
                    <div className="flex flex-col gap-y-2">
                        <button className="flex-1 text-xl mx-4 mt-4 bg-green-500 py-2 px-4 rounded-lg hover:bg-emerald-500 text-white font-semibold border-green-500 border-2" onClick={handleVerify}>Accept</button>
                        <button className="flex-1 text-xl mx-4 mb-4 bg-red-500 py-2 px-4 rounded-lg hover:bg-red-400 text-white font-semibold border-red-500 border-2" onClick={handleVerifyReject}>Reject</button>
                    </div> 
                    :
                    <div className="flex flex-col gap-y-2">
                        <button className="flex-1 text-xl mx-4 mt-4 bg-green-500 py-2 px-4 rounded-lg text-white font-semibold border-green-500 border-2" disabled>Verifying, please wait</button>
                        <button className="flex-1 text-xl mx-4 mb-4 bg-red-400 py-2 px-4 rounded-lg text-white font-semibold border-red-500 border-2" disabled>Verifying, please wait</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}