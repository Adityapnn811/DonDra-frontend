import VerifyingMoneytoringCard from '../components/VerifyingMoneytoringCard';
import { Navbar } from '../components/Navbar';
import Head from 'next/head'
import { getCookie, hasCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const role = getCookie('role');

const fetcher = async () => {
    return fetch('https://dondra-backend.herokuapp.com/getUnverifiedMoneytoring', {
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
const url = 'https://dondra-backend.herokuapp.com/getUnverifiedMoneytoring'

export default function VerifyTransaction(){
    const router = useRouter()
    useEffect(() => {
        if (!hasCookie('token')) {
            router.push("/login")
        } 
    })
    // get unverified moneytorings
    const {data: moneytorings, _error} = useSWR(url, fetcher)
    return (
        <div>
            <Head>
                <title>DonDra</title>
                <meta name="description" content="Solving your financial needs" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;500;800&family=Ramaraja&display=swap" rel="stylesheet"/> 
            </Head>

            <main className='flex w-full min-h-screen flex-col'>
                    <Navbar />
                    {moneytorings != null && moneytorings.length > 0 ? moneytorings.map(moneytoring => {
                        return <VerifyingMoneytoringCard nama={moneytoring.user.nama} id={moneytoring.user.id}  username={moneytoring.user.username} isIncome={moneytoring.isIncome} idTransaction={moneytoring.id} nominal={moneytoring.nominal} date={moneytoring.transactionDate} balance={moneytoring.user.saldo} key={moneytoring.id}/>
                    }) : <div className='text-2xl text-white font-bold self-center mt-10'>No Incoming Request</div>}
            </main>
    </div>
    )
}