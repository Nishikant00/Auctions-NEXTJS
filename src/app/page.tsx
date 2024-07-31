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

      <div className='grid grid-cols-4'>
        {
          items.map((item)=>(
            <ItemCard key={item.id} item={item}/>
          ))
        }
      </div>
     
    </main>
  );
}