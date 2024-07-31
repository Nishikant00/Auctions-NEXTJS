import { bidItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import {database} from '@/db/index'
export default async function ItemPage({params:{itemid}}:{params:{itemid:number}}) {
    const item=await database.query.bidItems.findFirst({
        where:eq(bidItems.id,itemid)
    })
    if (!item){
        return (<div>ITEM NOT FOUND</div>)
    }
    return (
        <main>


        </main>
    );
}