'use server'
import { validateRequest } from '@/app/(auth)/validate-request';
import {database} from '@/db/index'
import { bidItems } from '@/db/schema';
import { redirect } from 'next/navigation';

export const PostItem = async ({name,startingPrice,fileName}:{name:string,startingPrice:number,fileName:string})=>{
    
    const {user}=await validateRequest()

    if (!user || !user.id) {
        throw new Error("Unauthorized")
    }
        
    if (!user.username) return null;
    
    await database.insert(bidItems).values(
        {
        name: name,
        userId:user.id, 
        startPrice:startingPrice,
        fileName:fileName
     })

    redirect('/')
}