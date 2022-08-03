import VerifyingUserCard from '../components/VerifyingUserCard';
import { Navbar } from '../components/Navbar';
import Head from 'next/head'
import { getCookie, hasCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import getCurrencies from './api/getCurrencies';
import Card from '../components/Card';
import { isInteger } from 'tls';


export default function Transfer({currencies, rates}) {
    const router = useRouter()
    useEffect( () => {
        if (!hasCookie('token')) {
            router.push("/login")
        } else if (currencies === null || rates === null) {
            router.push("/transfer")
        } else {
            const id = getCookie('id')
            const datas = fetch(`https://dondra-backend.herokuapp.com/getSaldo/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`,
                    'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
                },
            }).then(res =>
                res.json()
            ).then(data => {
                setSaldo(parseFloat(data.saldo))
            })
        }
        
    })
    const [saldo, setSaldo] = useState(0)
    const [userValid, setUserValid] = useState(false);
    const [userName, setUserName] = useState('');
    const [validatingUser, setValidatingUser] = useState(false);
    const [error, setError] = useState('');
    const [rekening, setRekening] = useState('');
    const [nominal, setNominal] = useState(0);
    const [nominalInIDR, setNominalInIDR] = useState(0);
    const [currency, setCurrency] = useState('AED');
    const [buttonValidClicked, setButtonValidClicked] = useState(false);
    const [transferSuccess, setTransferSuccess] = useState(false);

    if (!currencies || !rates) {
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
                <h1 className='self-center font-bold text-white text-2xl mt-2'>Loading</h1>
                
            </main>
        </div>
        )
    }


    // change currency json format
    const currencyList = []
    let currencyInJson = JSON.parse(currencies)
    for (let x in currencyInJson.symbols){
        currencyList.push(x)
    }

    // simpan rates
    const ratesMap = new Map()
    let ratesInJson = JSON.parse(rates)
    for (let x in ratesInJson.rates){
        ratesMap.set(x, ratesInJson.rates[x])
    }

    // handler input
    const handleValidatingUser = async (e) => {
        setError('')
        setUserValid(false)
        setUserName('')
        if (isInteger(parseInt(rekening))){
            setValidatingUser(true)
            await fetch(`https://dondra-backend.herokuapp.com/checkUser/${rekening}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`,
                    'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
                },
            }).then(res =>
                res.json()
                ).then(data => {
                    if (data.success){
                        setUserValid(true)
                        setUserName(data.userName)
                    } else {
                        setError(data.error)
                        setUserValid(false)
                        setUserName('')
                    }
                }
            )
            setValidatingUser(false)
        } else if (e.target.value === '') {
            setUserName('')
            setRekening('')
            setUserValid(false)
        }
        setButtonValidClicked(true)
    }
    const handleRekening = (e) => {
        if (parseFloat(e.target.value) === 1 || parseFloat(e.target.value) === parseFloat(getCookie('id'))) {
            setRekening(0)
        } else {
            setRekening(parseFloat(e.target.value))
        }
        setButtonValidClicked(false)
    }

    const handleNominal = (e) => {
        setNominal(parseFloat(e.target.value))
        setNominalInIDR(parseFloat(e.target.value) / ratesMap.get(currency))
    }

    const handleCurrency = (e) => {
        setCurrency(e.target.value)
        setNominalInIDR(nominal / ratesMap.get(e.target.value))
    }

    const handleSubmit = async (e) => {
        // post method dengan body berisi rekening pengirim, rekening penerima, nominal
        e.preventDefault()
        const url = "https://dondra-backend.herokuapp.com/transfer"
        const bodyData = {
            rekPengirim: getCookie('id'),
            rekPenerima: rekening,
            nominal: nominalInIDR,
        }
        const JSONData = JSON.stringify(bodyData)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`,
                'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
            },
            body: JSONData
        })
        const data = await response.json()
        if (data.success){
            setTransferSuccess(true)
        } else {
            alert("Transfer failed")
            setTransferSuccess(false)
        }
    }

    // Function to decide whether the datas are valid
    const isValid = () => {
        if (userValid && rekening !== '' && nominalInIDR !== 0 && nominalInIDR < saldo && buttonValidClicked){
            return true
        } else {
            return false
        }
    }

    // nanti cek nominal trasnfer cukup atau tidak
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
                <Card className="bg-secondary flex flex-col text-slate-800 m-4 md:w-2/3 md:mx-10 md:w-2/3 md:self-center" title="Transfer Your Money">
                    <div className='flex w-full md:w-2/3 self-center font-bold text-xl flex-col mb-3'>
                        BALANCE : Rp {saldo}
                    </div>
                    <div className='flex w-full md:w-2/3 self-center flex-col mb-4'>
                        <label className="block mb-2 text-lg font-semibold text-black">Receiver&apos;s Account</label>
                        <div className='flex'>
                            <input id="rekening" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 grow-0" placeholder="321" onChange={handleRekening} type="number"/>
                            <button className='bg-blue-600 rounded-md py-2 font-semibold md:ml-3 grow hover:bg-blue-500' onClick={handleValidatingUser}>Check Validity</button>
                        </div>
                        {validatingUser ? <div>Checking Validity</div> : <></>}
                        {userValid ? <div className='mt-2 font-semibold'>Account Name: {userName}</div> : <></>}
                        {!buttonValidClicked ? <div className='font-semibold'>Please click check validity button first</div> : <></>}
                        {error ? <div>{error}</div> : <></>}
                    </div>
                    <div className='flex w-full md:w-2/3 self-center flex-col'>
                        <label className="block mb-2 text-lg font-semibold text-black">Currency and Value</label>
                        <div className='flex flex-col md:flex-row'>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5 flex mb-3 md:mb-0 md:mr-2" onChange={handleCurrency}>
                                {currencyList.map( (x, i) => {
                                    return <option key={i} value={x}>{x}</option>
                                })}
                            </select>
                            <input id="nominal" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="15.5" type='number' onChange={handleNominal} />
                        </div>
                        <div className='mt-2'>In Indonesian Rupiah (IDR) : Rp{!isNaN(nominalInIDR) ? nominalInIDR : 0}</div>
                        {nominalInIDR > saldo ? <div className='text-red-800 font-bold'>You don&apos;t have enough balance</div> : <></>}
                        {isValid() ? <button className='bg-green-800 rounded py-2 hover:bg-green-700 font-semibold my-3 text-white' type='submit' onClick={handleSubmit}>Transfer</button> 
                        : 
                        <button className='bg-green-800 rounded py-2 font-semibold my-3 text-white' type='submit' disabled>Transfer</button>}
                        {transferSuccess ? <div className='text-green-800 font-bold'>Transfer Success</div> : <></>}
                    </div>
                </Card>
            </main>
    </div>
    )
}

export async function getServerSideProps(){
    
    return {
        props: {
            currencies: await getCurrencies(false),
            rates: await getCurrencies(true)
        }
    }
}