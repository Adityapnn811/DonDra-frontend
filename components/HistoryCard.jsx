import { getCookie } from "cookies-next"
import { useState } from "react"
import Router from "next/router"

export default function HistoryCard({nama, id, username, isIncome, idTransaction, nominal, date, balance, isMoneytoring, isVerified, isRejected}){

    if (isMoneytoring) {
        // dia ada udah diverif atau belum sama ada di-approve atau ditolak, sama ada masuk atau keluar
        return (
            <div className="bg-secondary my-4 mx-3 md:mx-10 md:w-2/3 md:self-center rounded-lg flex flex-col md:flex-row">
                <div className={`ml-4 flex flex-1 flex-row content-between w-auto`}>
                    <div className="flex flex-col content-between m-3 grow">
                        <h1 className="text-2xl font-semibold mb-2">MONEYTORING</h1>
                        <h1 className="text-xl font-semibold mb-2">{isIncome ? "Add Balance Request" : "Substract Balance Request"}</h1>
                        <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Nominal</div><div>: {nominal}</div></p>
                        <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Date</div><div>: {date}</div></p>
                        <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Verification Status</div><div>: {isVerified ? "Verified" : "Not Verified"}</div></p>
                        {isVerified ? <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Approval Status</div><div>: {isRejected ? "Rejected" : "Approved"}</div></p> : <></>}
                    </div>
                </div>
            </div>
        )
    } else {
        // dia ada transfer masuk atau keluar, cek apakah adanya userPenerima atau userPengirim
        return (
            <div className="bg-secondary my-4 mx-3 md:mx-10 md:w-2/3 md:self-center rounded-lg flex flex-col md:flex-row">
                <div className={`ml-4 flex flex-1 flex-row content-between w-auto`}>
                    <div className="flex flex-col content-between m-3 grow">
                        <h1 className="text-2xl font-semibold mb-2">TRANSFER {isIncome ? "IN" : "OUT"}</h1>
                        <h1 className="text-xl font-semibold mb-2">{isIncome ? "From" : "To"} {nama}</h1>
                        <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Nominal</div><div>: {nominal}</div></p>
                        <p className={`text-md md:text-xl text-black flex`}><div className="w-1/4">Date</div><div>: {date}</div></p>
                    </div>
                </div>
            </div>
        )
    }
}