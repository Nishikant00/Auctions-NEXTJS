import {database} from '@/db/index'
import { validateRequest } from '@/app/(auth)/validate-request';
import { supabase } from '@/lib/sup';
import { ItemCard } from '@/components/component/ItemCard';
import { bidItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getURLImg =(fileName:string):string=> {
  const { data } = supabase.storage.from('auction-images').getPublicUrl(fileName)
  return data.publicUrl
}
export default async function Home() {
  const {user}=await validateRequest()
  if (!user) return null;
  if (!user.username) return null;
  const items=await database.query.bidItems.findMany({
    where: eq(bidItems.userId,user.id)
  })

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