import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {database} from '@/db/index'
import { auctions } from '@/db/schema';
export default async function Home() {
  const bids=await database.query.auctions.findMany()
  return (
    <main className="container mx-auto py-8">
      <form action={async()=>{
        'use server'
        await database.insert(auctions).values({})
      }}>
        <Input type="text" placeholder='Place The Bid'/>
        <Button >Place Bid</Button>
      </form>
      <ul>
        {
          bids.map((bid)=>(
            <li key={bid.id}>{bid.id}</li>
          ))
        }
      </ul>
    </main>
  );
}