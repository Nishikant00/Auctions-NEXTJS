import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {database} from '@/db/index'
import { auctions, bidItems } from '@/db/schema';
import { validateRequest } from './(auth)/validate-request';
import { logout } from './(auth)/logout';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
export default async function Home() {
  const {user}=await validateRequest()
  const items=await database.query.bidItems.findMany()
  if (!user) return null;
  if (!user.username) return null;
  
  return (
    <main className="container mx-auto py-8">
      {user?.username}
      <form action={async(formData:FormData)=>{
        'use server'
        await database.insert(bidItems).values({name: formData.get('name') as string, userId:user.id})
        revalidatePath('/')
      }}>
        <Input type="text" name="name" placeholder='Post Item'/>
        <Button >Set price</Button>
      </form>
      <ul>
        {
          items.map((item)=>(
            <li key={item.id}>{item.id}</li>
          ))
        }
      </ul>
      {user && <form action={logout}><Button>logout</Button></form>}
      {!user && <Link href='/signup'><Button>signup</Button></Link>}
      {!user && <Link href='/login'><Button>login</Button></Link>}
    </main>
  );
}