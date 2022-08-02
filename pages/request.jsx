import VerifyingUserCard from '../components/VerifyingUserCard';
import { Navbar } from '../components/Navbar';
import Head from 'next/head'
import { getCookie, hasCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import getCurrencies from './api/getCurrencies';
import Card from '../components/Card';


export default function Request({currencies, rates}) {
    const router = useRouter()
    useEffect( () => {
        if (!hasCookie('token')) {
            router.push("/login")
        } else if (!currencies || !rates) {
            router.push("/request")
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
    const [error, setError] = useState('');
    const [nominal, setNominal] = useState(0);
    const [nominalInIDR, setNominalInIDR] = useState(0);
    const [currency, setCurrency] = useState('AED');
    const [requestSuccess, setRequestSuccess] = useState(false);
    const [isIncome, setIsIncome] = useState(false);

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
    const handleNominal = (e) => {
        if (parseFloat(e.target.value) < 0) {
            document.getElementById('type').value = 'notIncome'
            setIsIncome(false)
            setNominal(parseFloat(e.target.value) * -1)
            setNominalInIDR(parseFloat(e.target.value) / ratesMap.get(currency) * -1)
        } else {
            setNominal(parseFloat(e.target.value))
            setNominalInIDR(parseFloat(e.target.value) / ratesMap.get(currency))
        }
    }

    const handleCurrency = (e) => {
        setCurrency(e.target.value)
        setNominalInIDR(nominal / ratesMap.get(e.target.value))
    }

    const handleType = (e) => {
        if (e.target.value === 'income') {
            setIsIncome(true)
        } else {
            setIsIncome(false)
        }
    }

    const handleSubmit = async (e) => {
        // post method dengan body berisi isIncome, nominal, rek
        e.preventDefault()
        const url = "https://dondra-backend.herokuapp.com/requestMoneytoring"
        const bodyData = {
            id: getCookie('id'),
            nominal: nominalInIDR,
            isIncome: isIncome
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
            setRequestSuccess(true)
        } else {
            alert("Request failed")
            setRequestSuccess(false)
        }
    }

    // Function to decide whether the datas are valid
    const isValid = () => {
        if (!isIncome) {
            if (nominalInIDR > saldo) {
                return false
            } else {
                return true
            }
        } else {
            return true
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
 
            <main className='flex w-full min-h-screen flex-col'>
                <Navbar />
                <Card className="bg-secondary flex flex-col text-slate-800 m-4 md:w-2/3 md:mx-10 md:w-2/3 md:self-center" title="Request Add or Substract Balance">
                    <div className='flex w-full md:w-2/3 self-center font-bold text-xl flex-col mb-3'>
                        BALANCE : Rp {saldo}
                    </div>
                    <div className='flex-1 w-full md:w-2/3 self-center mb-3'>
                        <label className="block mb-2 text-lg font-semibold text-black">Request Type</label>
                        <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5 w-full mb-3 md:mb-0 md:mr-2" onChange={handleType}>
                            <option key="1" value="notIncome">Substract</option>
                            <option key="2" value="income">Add</option>
                        </select>
                    </div>
                    <div className='flex w-full md:w-2/3 self-center flex-col mt-2'>
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
                        {(nominalInIDR > saldo && !isIncome) ? <div className='text-red-800 font-bold'>You don&apos;t have enough balance</div> : <></>}
                        {isValid() ? <button className='bg-green-800 rounded py-2 hover:bg-green-700 font-semibold my-3 text-white' type='submit' onClick={handleSubmit}>Request</button> 
                        : 
                        <button className='bg-green-800 rounded py-2 font-semibold my-3 text-white' type='submit' disabled>Request</button>}
                        {requestSuccess ? <div className='text-green-800 font-bold'>Request Success</div> : <></>}
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