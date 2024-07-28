
import { validateRequest } from '@/app/(auth)/validate-request';
import PostForm from '@/components/component/postForm';

export default async function CreateItems() {
  const {user}=await validateRequest()
  if (!user) return null;
  if (!user.username) return null;
  
  return (
    <main className="container mx-auto py-8 space-y-4">
      <h1 className='font-bold text-4xl'>Post an Item</h1>
      <PostForm/>
    </main>
  );
}