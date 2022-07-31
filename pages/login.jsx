import Card from '../components/Card';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const router = useRouter()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        const userData = {
            username: username,
            password: password,
        }

        const JSONdata = JSON.stringify(userData);
        const endpoint = 'https://dondra-backend.herokuapp.com/login';

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSONdata
        }

        const response = await fetch(endpoint, options);
        const data = await response.json();
        console.log(data);
        // if success, set cookies and redirect to home
        if (data.success){
            // set token from data response
            console.log(data.token);
            setCookie('token', data.token);
            setCookie('role', data.user.role);
            setCookie('nama', data.user.nama);
            setCookie('saldo', data.user.saldo)
            setCookie('id', data.user.id)
            router.push('/')
        } else {
            setError(data.error)
        }
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

            <main className={styles.main}>
                <Card className="bg-secondary text-slate-800" title="Welcome to DonDra Financial Management System!">
                    <div className='w-full px-2 text-slate-800 font-bold'>You can login here if you already have an account</div>
                    <div className="w-full">
                        <form className="rounded px-2 pt-6 pb-8" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-slate-800 text-md font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" required onChange={handleUsernameChange}/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-slate-800 text-md font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="***************" required onChange={handlePasswordChange}/>
                            </div>
                            <div className="flex items-center justify-left">
                                <button className="bg-button-bg hover:bg-button-bg-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4" type="submit">
                                    Login
                                </button>
                                <div className='font-bold'>OR</div>
                                <Link href='/register'>
                                    <button className="bg-button-bg hover:bg-button-bg-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4" type="button">
                                        Register Here
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className='w-full px-2 text-red-800 bg-red-100 rounded font-bold'>{error}</div>
                </Card>
            </main>
        </div>
    )
}
