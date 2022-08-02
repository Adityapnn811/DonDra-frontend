import { getCookie } from "cookies-next"

export default async function getHistory( page){
    // const localUrl = `https://dondra-backend.herokuapp.com/getHistory/${id}?page=${page}`
    const id = getCookie("id")
    const localUrl = `http://localhost:3001/getHistory/${id}?page=${page}`
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`,
            'Access-Control-Allow-Origin': 'https://dondra.vercel.app/'
        }
    }
    // console.log(id)
    const res = await fetch(localUrl, options)
    return await res.json()
}