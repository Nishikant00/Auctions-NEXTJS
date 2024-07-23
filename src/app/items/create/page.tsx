import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {database} from '@/db/index'
import { validateRequest } from '@/app/(auth)/validate-request';
import { PostItem } from './actions';

export default async function CreateItems() {
  const {user}=await validateRequest()
  if (!user) return null;
  if (!user.username) return null;
  
  return (
    <main className="container mx-auto py-8 space-y-4">
      <h1 className='font-bold text-4xl'>Post an Item</h1>
      <form className='flex flex-col space-y-4 border p-8 max-w-[750px]' action={PostItem}>
        <Input type="text" name="name" placeholder='Post Item' required/>
        <Input type="number" step='0.01' name="startPrice" placeholder='Starting price for your Item' required/>
        
        <Button className='self-end'>Post item</Button>
      </form>
    </main>
  );
}