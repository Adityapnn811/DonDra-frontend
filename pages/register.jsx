import Card from '../components/Card';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login(){
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fotoKTP, setFotoKTP] = useState('');
    const [error, setError] = useState('')
    const router = useRouter()

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const imageInBase64 = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
        imageInBase64.then((imageData) => {
            setFotoKTP(imageData);
            console.log(imageData)
        }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        const userData = {
            nama: name,
            username: username,
            password: password,
            fotoKTP: fotoKTP
        }

        const JSONdata = JSON.stringify(userData);
        const endpoint = 'https://dondra-backend.herokuapp.com/register';
        // const endpoint = 'http://localhost:3001/register';

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
        if (response.status === 200) {
            alert('Register Success. You will be redirected to the login page')
            router.push('/login');
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
                <div className='w-full px-2 text-slate-800 font-bold'>Create your account here!</div>
                <div className="w-full">
                    <form className="rounded px-2 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-slate-800 text-md font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Gojo Tukang Begal" required onChange={handleNameChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-slate-800 text-md font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" required onChange={handleUsernameChange}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-slate-800 text-md font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="***************" required onChange={handlePasswordChange}/>
                            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                        </div>
                        <div className='mb-6'>
                            <label className="block text-slate-800 text-md font-bold mb-2" htmlFor="file_input">Upload file</label>
                            <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept='image/*' onChange={handleUploadImage} required></input>
                        </div>
                        <div className="flex items-center justify-left">
                            <button className="bg-button-bg hover:bg-button-bg-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4" type="submit" >
                                Register!
                            </button>
                            <div className='font-bold'>OR</div>
                            <Link href='/login'>
                                <button className="bg-button-bg hover:bg-button-bg-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4" type="button">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className='w-full px-2 text-red-800 bg-red-100 rounded font-bold'>{error}</div>
                </Card>
                {fotoKTP ? <img src={fotoKTP} /> : <></>}
            </main>
        </div>
    )
}
