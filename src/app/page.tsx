import {database} from '@/db/index'
import { validateRequest } from './(auth)/validate-request';

export default async function Home() {
  const {user}=await validateRequest()
  if (!user) return null;
  if (!user.username) return null;
  const items=await database.query.bidItems.findMany()
  
  return (
    <main className="container mx-auto py-8 space-y-4">

      <ul className='grid grid-cols-4'>
        {
          items.map((item)=>(
            <li className=" border p-4 items-center mr-4 mb-4" key={item.id}>
              {item.name} 
              Starting price: ${item.startPrice/100}</li>
          ))
        }
      </ul>
     
    </main>
  );
}