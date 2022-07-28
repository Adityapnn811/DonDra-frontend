import { useRouter } from "next/router";
import Link from "next/link";

export default function Layout({ children }){
    return (
        <main className="flex-1 bg-primary">
            {children}
        </main>
    )
}