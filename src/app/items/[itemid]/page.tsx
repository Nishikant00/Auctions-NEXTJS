import { validateRequest } from "@/app/(auth)/validate-request";
import {database} from '@/db/index'
import { bidItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function ItemDetails({params:{itemid}}:{params:{itemid:number}}) {
    const user=validateRequest()
    const item= await database.query.bidItems.findFirst({
        where:eq(bidItems.id,itemid)
    })
    if(!user){
        return redirect('/login')
    }
    if (!item){
        return(
            <main className="space-y-8 flex flex-col items-center">
                <Image  src="/notfound.svg" height='300' width="300" alt="logo"/> 
                <h1 className="scroll-m-20 font-extrabold tracking-tight text-5xl">Item not found</h1>
                <p className="font-bold">Item is not available maybe try a different one</p>
                <Button asChild>
                    <Link href='/'>
                    Go back
                    </Link>
                </Button>
            </main>
        )
    }
    return (
        <main>
            
        </main>
    );
}


