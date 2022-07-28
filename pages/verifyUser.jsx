import Card from '../components/Card';
import VerifyingUserCard from '../components/VerifyingUserCard';
import { Navbar } from '../components/Navbar';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { getCookie, hasCookie } from 'cookies-next';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const role = getCookie('role');

function getUnverifiedUsers(){
    return fetch('https://dondra-backend.herokuapp.com/getUnverifiedUsers', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`,
            'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
        },
    }).then(res => res.json())
}

export default function VerifyUser(){
    const router = useRouter()
    const [unverifiedUsers, setUnverifiedUsers] = useState(null);
    const [loading, setLoading] = useState('')
    useEffect(() => {
        setLoading(true)
        if (!hasCookie('token')) {
            router.push("/login")
        } else {
            fetch('https://dondra-backend.herokuapp.com/getUnverifiedUsers', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`,
                    'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
                },
            }).then(res => res.json())
            .then(data => {
                setUnverifiedUsers(data)
                setLoading(false)
            })
        }
    })

    console.log(unverifiedUsers)

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

            <main className={styles.main}>
                <div className='flex-1 w-full'>
                <Navbar />
                <VerifyingUserCard/>
                </div>
            </main>
    </div>
    )
}