
import { validateRequest } from '@/app/(auth)/validate-request';
import PostForm from '@/components/component/postForm';
import { redirect } from 'next/navigation';

export default async function CreateItems() {
  const {user}=await validateRequest()
  if (!user) return redirect('/login');
  if (!user.username) return redirect('/login');
  
  return (
    <main className="container mx-auto py-8 space-y-4">
      <h1 className='font-bold text-4xl'>POST AN ITEM FOR SALE</h1>
      <PostForm/>
    </main>
  );
}