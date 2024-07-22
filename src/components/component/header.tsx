import { validateRequest } from '@/app/(auth)/validate-request';
import { logout } from '../../app/(auth)/logout';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image  from 'next/image'; 
export default async function Header() {
    const {user}=await validateRequest()
  if (!user) return null;
  if (!user.username) return null;
    return (
      <div className='bg-gray-300'>
        <nav className="container  flex justify-between mx-auto py-2">
      <Link href="/"><Image width="50" height="50" src="auction.svg" alt="logo"/></Link>
        <div className='flex gap-5 content-center items-center'>
      <Link href="/items/create" className='px-8 hover:underline'>Post Item</Link>
      {user?.username}
      {user && <form action={logout}><Button>logout</Button></form>}
      {!user && <Link href='/signup'><Button>signup</Button></Link>}
      {!user && <Link href='/login'><Button>login</Button></Link>} 
        </div>
        </nav>
        </div>
    );
}