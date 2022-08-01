import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, hasCookie } from 'cookies-next';
import UserCard from "./UserCard";
import useSWR from "swr";

// DONT FORGET TO RETURN in fetcher
const id = getCookie('id')
const fetcher = async () => {
    return fetch(`https://dondra-backend.herokuapp.com/getAllUsers/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`,
            'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
        },
    }).then(res =>
        res.json()
    )
}
const url = `https://dondra-backend.herokuapp.com/getAllUsers/${id}`

export default function UserDashboard(){
    const router = useRouter()
    useEffect(() => {
        if (!hasCookie('token')) {
            router.push("/login")
        }
    })
    // Get users data from API using SWR
    const {data: user, _error} = useSWR(url, fetcher)

    return(
        <div className="my-4 justify-center md:mx-10 md:w-2/3 md:self-center rounded-lg flex flex-col">
            {user? 
            <UserCard nama={user.nama} id={user.id} photo={user.fotoKTP} username={user.username} saldo={user.saldo} isVerified={user.isVerified} key={user.id}/> 
            : <></>}
        </div>
    )
}