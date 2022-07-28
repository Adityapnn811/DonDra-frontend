import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
// import {Login} from './Login'
import styles from '../styles/Home.module.css'
import {Navbar} from '../components/Navbar';
import { hasCookie, getCookie } from 'cookies-next';

export default function Home() {
  let page = "aa"
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setLoading(true)
    if (!hasCookie('token')) {
      router.push("/login")
    }
    setLoading(false)
  })
  if (isLoading) return (
      <div>
        <Head>
          <title>DonDra</title>
          <meta name="description" content="Solving your financial needs" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;500;800&family=Ramaraja&display=swap" rel="stylesheet"/> 
        </Head>
      </div>
  )
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

        </div>
      </main>

    </div>
  )
}
