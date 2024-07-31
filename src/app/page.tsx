import {database} from '@/db/index'
import { validateRequest } from './(auth)/validate-request';
import Image  from 'next/image';
import { supabase } from '@/lib/sup';
import { ItemCard } from '@/components/component/ItemCard';
import { redirect } from 'next/navigation';

export const getURLImg =(fileName:string):string=> {
  const { data } = supabase.storage.from('auction-images').getPublicUrl(fileName)
  return data.publicUrl
}
export default async function Home() {
  const {user}=await validateRequest()
  if (!user) return redirect('/login');
  if (!user.username) return redirect('/login');
  const items=await database.query.bidItems.findMany()
  

  return (
    <main className="container mx-auto py-8 space-y-4">
      <h1  className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">ALL AUCTIONS</h1>
      <div className='flex flex-wrap justify-center'>
        {
          items.map((item)=>(
            <ItemCard key={item.id} item={item}/>
          ))
        }
      </div>
     
    </main>
  );
}