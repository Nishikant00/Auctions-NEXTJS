'use server'
import { validateRequest } from '@/app/(auth)/validate-request';
import {database} from '@/db/index'
import { bidItems } from '@/db/schema';
import { redirect } from 'next/navigation';

export const PostItem = async (formData:FormData)=>{
    const fileName = formData.get('file') as File
    console.log(fileName.name)
    const {user}=await validateRequest()

    if (!user || !user.id) {
        throw new Error("Unauthorized")
    }
        
    if (!user.username) return null;
    const startPrice=formData.get('startPrice') as string
    const cents=Math.floor(parseFloat(startPrice)*100) 
    await database.insert(bidItems).values(
        {
        name: formData.get('name') as string, 
        userId:user.id, 
        startPrice:cents,

     })
    redirect('/')
}