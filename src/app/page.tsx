import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {database} from '@/db/index'
import { auctions, bidItems } from '@/db/schema';
import { validateRequest } from './(auth)/validate-request';

import { revalidatePath } from 'next/cache';
export default async function Home() {
  const {user}=await validateRequest()
  if (!user) return null;
  if (!user.username) return null;
  const items=await database.query.bidItems.findMany()
  
  return (
    <main className="container mx-auto py-8 space-y-4">
      <h1 className='font-bold text-4xl'>Post an Item</h1>
      <form className='flex flex-col space-y-4 border p-8 max-w-[750px]' action={async(formData:FormData)=>{
        'use server'
        await database.insert(bidItems).values({name: formData.get('name') as string, userId:user.id})
        revalidatePath('/')
      }}>
        <Input type="text" name="name" placeholder='Post Item'/>
        <Button className='self-end'>Post item</Button>
      </form>
      <h1 className='font-bold text-2xl'>Listings</h1>
      <ul>
        {
          items.map((item)=>(
            <li key={item.id}>{item.name}</li>
          ))
        }
      </ul>
     
    </main>
  );
}