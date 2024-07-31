import {database} from '@/db/index'
import { validateRequest } from '@/app/(auth)/validate-request';
import { supabase } from '@/lib/sup';
import { ItemCard } from '@/components/component/ItemCard';
import { bidItems } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import {Empty} from '@/components/component/empty-state'
export const getURLImg =(fileName:string):string=> {
  const { data } = supabase.storage.from('auction-images').getPublicUrl(fileName)
  return data.publicUrl
}
export default async function Home() {
  const {user}=await validateRequest()
  if (!user) return redirect('/login');
  if (!user.username) return redirect('/login');
  const items=await database.query.bidItems.findMany({
    where: eq(bidItems.userId,user.id)
  })
  const hasItems:boolean=items.length==0
  return (
    <main className="container mx-auto py-8 space-y-4">
      <h1 className='text-4xl font-bold'>MY ITEMS</h1>
      <div className='flex flex-wrap'>
        {
          items.map((item)=>(
            <ItemCard key={item.id} item={item}/>
          ))
        }
      </div>
     {hasItems && <Empty></Empty>}
    </main>
  );
}