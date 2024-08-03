import { validateRequest } from "@/app/(auth)/validate-request";
import {database} from '@/db/index'
import { bidItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Image from 'next/image'
export default function ItemDetails({params:itemid}:{params:number}) {
    const user=validateRequest()
    const item=database.query.bidItems.findFirst({
        where:eq(bidItems.id,itemid)
    })
    if(!user){
        return redirect('/login')
    }
    if (!item){
        return(
            <div className="container flex content-center items-center">
            <Image src="notfound.svg" height='500' width="500" alt="logo"/> 
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Item not found</h1>
            </div>
        )
    }
    return (
        <main>
            
        </main>
    );
}


