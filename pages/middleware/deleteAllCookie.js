import { deleteCookie } from "cookies-next";

export default function deleteAllCookie(){
    deleteCookie('role')
    deleteCookie('nama')
    deleteCookie('token')
    deleteCookie('saldo')
}