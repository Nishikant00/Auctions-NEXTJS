import { validateRequest } from '@/app/(auth)/validate-request';
import { logout } from '../../app/(auth)/logout';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image  from 'next/image'; 
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default async function Header() {
    const {user}=await validateRequest()
  if (!user) return null;
  if (!user.username) return null;
    return (
      <div>
        <div>
        <nav className="container flex justify-between mx-auto py-2 bg-transparent mt-2 rounded-sm">
      <Link href="/"><Image width="50" height="50" src="/auction.svg" alt="logo"/></Link>
        <div className='content-center hidden md:block'>
        <Link href="/" className='px-3 hover:text-gray-500'>SHOP</Link>
        <Link href="/items/create" className='px-3 hover:text-gray-500'>CREATE</Link>
        <Link href="/auctions" className='px-3 hover:text-gray-500'>MY AUCTIONS</Link>
        </div>
        <div className='flex gap-5 content-center items-center'>
      {user?.username}
      {user && <form action={logout}><Button >logout</Button></form>}
      {!user && <Link href='/signup'><Button>signup</Button></Link>}
      {!user && <Link href='/login'><Button>login</Button></Link>} 
        </div>
        <div className='md:hidden'>
        <Menubar>
        <MenubarMenu>
          <MenubarTrigger>↓</MenubarTrigger>
          <MenubarContent>
            <MenubarItem className='mx-3'>
            {user?.username}

            </MenubarItem>
            <MenubarItem><Link href="/" className='px-3 hover:text-gray-500'>SHOP</Link>
        </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
        <Link href="/items/create" className='px-3 hover:text-gray-500'>CREATE</Link>
        </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
        <Link href="/auctions" className='px-3 hover:text-gray-500'>MY AUCTIONS</Link></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

        </div>
        </nav>
        </div>
        </div>
    );
}