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
        <nav className="container  flex justify-between mx-auto py-2">
      <Image width="50" height="50" src="https://static.vecteezy.com/system/resources/thumbnails/022/030/936/small/verified-icon-3d-rendering-illustration-vector.jpg" alt="logo"/>
        <div className='flex gap-5 content-center items-center'>
      {user?.username}
      {user && <form action={logout}><Button>logout</Button></form>}
      {!user && <Link href='/signup'><Button>signup</Button></Link>}
      {!user && <Link href='/login'><Button>login</Button></Link>} 
        </div>
        </nav>
    );
}