'use server'
import { validateRequest } from '@/app/(auth)/validate-request';
import {database} from '@/db/index'
import { auctions, bidItems } from '@/db/schema';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'
import { env } from '@/env';


export const PostItem = async (formData:FormData)=>{
    const supabaseUrl = 'https://zklhjcdtvthcfwlgujgy.supabase.co'
    const supabaseKey = env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    // async function uploadFile(file) {
    //     const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
    //     if (error) {
    //       // Handle error
    //     } else {
    //       // Handle success
    //     }
    //   }
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