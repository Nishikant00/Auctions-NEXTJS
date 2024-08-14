"use server"
import { validateRequest } from "@/app/(auth)/validate-request"
import { database } from "@/db"
import { eq } from "drizzle-orm"
import { auctions, bidItems } from "@/db/schema"
import { revalidatePath } from "next/cache"

export const createBid = async (ItemId:number)=>{
    const {user}=await validateRequest()
    if (!user || !user.username){
        throw new Error('User must be logged in')
    }
    const items=await database.query.bidItems.findFirst({
        where:eq(bidItems.id,ItemId)
    })
    if (!items){
        throw new Error('Item not found')
    }
    const latestBid=items.currentBid+items.bidInterval
    console.log(items)
    await database.insert(auctions).values({
        amount:latestBid,
        itemId:items.id,
        userId:user.id,
        timestamp:new Date()
    })
    await database.update(bidItems).set({currentBid:latestBid}).where(eq(bidItems.id,ItemId))
    revalidatePath(`/items/${ItemId}`)
}