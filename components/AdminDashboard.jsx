import SearchBar from "./SearchBar"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie, hasCookie } from 'cookies-next';
import UserCard from "./UserCard";
import Bluebird from "bluebird";
import redis from 'redis'
import useSWR from "swr";
import next from "next";

// DONT FORGET TO RETURN in fetcher
const fetcher = async () => {
    return fetch('https://dondra-backend.herokuapp.com/getAllUsers', {
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
const url = 'https://dondra-backend.herokuapp.com/getAllUsers'

export default function AdminDashboard(){
    const router = useRouter()
    const [search, setSearch] = useState('')
    useEffect(() => {
        if (!hasCookie('token')) {
            router.push("/login")
        }
    })
    // Get users data from API using SWR
    const {data: unverifiedUsers, _error} = useSWR(url, fetcher)

    return(
        <div className="my-4 justify-center md:mx-10 md:w-2/3 md:self-center rounded-lg flex flex-col">
            <SearchBar onChangeHandler={setSearch}/>
            {unverifiedUsers ? unverifiedUsers.map(user => {
                if (user.nama.includes(search) || user.username.includes(search) || user.id.toString().includes(search)) {
                    return <UserCard nama={user.nama} id={user.id} photo={user.fotoKTP} username={user.username} saldo={user.saldo} isVerified={user.isVerified} key={user.id}/>
                }
            }) : <></>}
        </div>
    )
}