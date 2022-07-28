import Link from "next/dist/client/link"
import {deleteCookie, getCookie} from 'cookies-next';
import deleteAllCookie from "../pages/middleware/deleteAllCookie";

function NavbarUser(){
    return (
    <div className="flex flex-col">   
        <nav className="bg-primary border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto px-4 md:px-10 py-3">
                <Link href="/" className="flex items-center ">
                    <span className="self-center text-xl md:text-3xl font-semibold whitespace-nowrap text-white hover:cursor-pointer">DonDra</span>
                </Link>
                <div className="flex items-center text-lg">
                    <h3 className="text-white font-semibold mx-5">
                        {getCookie('nama')}
                    </h3>
                    <Link href="#">
                        <button className="bg-red-500 px-3 py-1 text-black font-bold rounded-md hover:bg-red-700" onClick={deleteAllCookie}>
                            Logout  
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
        <nav className="bg-secondary w-full md:mx-10 md:w-2/3 md:self-center rounded-md">
            <div className="py-3 mx-auto">
                <div className="flex items-center justify-center">
                    <ul className="flex flex-row mt-0 mr-6 space-x-2 md:space-x-8 text-sm md:text-lg font-medium">
                        <li>
                            <a href="#" className="text-gray-900 font-semibold p-2 hover:bg-gray-200" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 font-semibold p-2 hover:bg-gray-200">Transfer</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 font-semibold p-2 hover:bg-gray-200">Request</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 font-semibold p-2 hover:bg-gray-200">History</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    )
}

function NavbarAdmin(){
    return (
    <div className="flex flex-col">   
        <nav className="bg-primary border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto px-4 md:px-10 py-3">
                <Link href="/" className="flex items-center ">
                    <span className="self-center text-xl md:text-3xl font-semibold whitespace-nowrap text-white hover:cursor-pointer">DonDra</span>
                </Link>
                <div className="flex items-center text-lg">
                    <h3 className="text-white font-semibold mx-5">
                        Admin
                    </h3>
                    <Link href="#">
                        <button className="bg-red-500 px-3 py-1 text-black font-bold rounded-md hover:bg-red-700" onClick={deleteAllCookie}>
                            Logout  
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
        <nav className="bg-secondary w-full md:mx-10 md:w-2/3 md:self-center rounded-md">
            <div className="py-3 mx-auto">
                <div className="flex items-center justify-center">
                    <ul className="flex flex-row mt-0 mr-6 space-x-2 md:space-x-8 text-sm md:text-lg font-medium">
                        <li>
                            <a href="#" className="text-gray-900 font-semibold p-2 hover:bg-gray-200" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 font-semibold p-2 hover:bg-gray-200">Verify User</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 font-semibold p-2 hover:bg-gray-200">Verify Transaction</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 font-semibold p-2 hover:bg-gray-200">Search</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    )
}

function Navbar({isAdmin}){
    return isAdmin ? <NavbarAdmin/> : <NavbarUser/>
}

export {Navbar, NavbarAdmin, NavbarUser}