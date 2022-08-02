import HistoryCard from '../components/HistoryCard';
import { Navbar } from '../components/Navbar';
import Head from 'next/head'
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const id = parseInt(getCookie('id'))

const fetcher = async (_url, page) => {
    
    const data = await fetch(`https://dondra-backend.herokuapp.com/getHistory/${id}?page=${page}`, {
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
    return data
}

export default function History(){
    const router = useRouter()
    let page
    if (!router.query) {
        page = 1
    } else {
        page = parseInt(router.query.page)
    }
    
    useEffect(() => {
        if (!hasCookie('token')) {
            router.push("/login")
        }
    })
    // set key for content
    let key = 0
    const url = `https://dondra-backend.herokuapp.com/getHistory/${id}?page=${page}`
    // get history
    const {data:history, error} = useSWR([url, page], fetcher)

    // handle if data is not yet fetched or error happened
    if (error || !history) return(
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
                <h1 className='self-center font-bold text-white text-2xl mt-2'>Loading</h1>
                
            </main>
        </div>
    )
    
    // prev or next
    const prev = history.result.prev
    const next = history.result.next
    // populate content
    let content = null
    content = history.result.data.map (item => {
        if (item.isIncome != undefined) {
            // moneytoring
            key++
            return <HistoryCard key={key} isIncome={item.isIncome} nominal={item.nominal} date={item.transactionDate} isMoneytoring={true} isVerified={item.isVerified} isRejected={item.isRejected}/>
        } else {
            // transfer
            const isIncome = item.userIDPengirim != undefined ? true : false
            key++
            if (isIncome){
                return <HistoryCard key={key} isIncome={isIncome} nama={item.userIDPengirim.nama} nominal={item.nominal} date={item.transferDate} />
            } else {
                return <HistoryCard key={key} isIncome={isIncome} nama={item.userIDPenerima.nama} nominal={item.nominal} date={item.transferDate} />
            }
        }
    })

    // handler prev and next
    const handlePrev = () => {
        router.push(`/history?page=${prev}`)
    }
    const handleNext = () => {
        router.push(`/history?page=${next}`)
    }

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
                <h1 className='self-center font-bold text-white text-2xl mt-4'>TRANSACTION HISTORY</h1>
                {content}
                <div className='flex flex-row w-full justify-around mt-3 mb-7'>
                    {prev !== null ? <button className='font-bold text-slate-800 rounded-md py-3 w-20 px-2 bg-secondary hover:bg-gray-300' onClick={handlePrev}>Previous</button> : <></>}
                    {next !== null ? <button className='font-bold text-slate-800 rounded-md py-3 w-20 px-2 bg-secondary hover:bg-gray-300' onClick={handleNext}>Next</button> : <></>}
                </div>
            </main>
        </div>
    )
}