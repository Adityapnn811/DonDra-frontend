import { deleteCookie, removeCookies } from "cookies-next";

export default function deleteAllCookie(){
    deleteCookie('nama')
    deleteCookie('token')
    deleteCookie('saldo')
    deleteCookie('id')
    deleteCookie('role')
}