'use client'
import { Button } from '@/components/ui/button';
import { PostItem } from '@/app/items/create/actions';
import { supabase } from '@/lib/sup';
import { Input } from '../ui/input';
export default function PostForm() {
    return (
        <div>
            <form className='flex flex-col space-y-4 border p-8 max-w-[750px]' onSubmit={
         async (e) =>
        {
          e.preventDefault()
          const form=e.currentTarget as HTMLFormElement
          const formData=new FormData(form)
          
          const file=formData.get('file') as File
          const name=formData.get('name') as string
          const { data, error } = await supabase.storage.from('auction-images').upload(`${file.name}`, file)
          if (error) {
            console.log(file.name,error)
          } else {
            console.log('success')
          }
          const fileName=file.name
          const startPrice=formData.get('startPrice') as string
          const cents=Math.floor(parseInt(startPrice)*100) 
          await PostItem({name,startingPrice:cents,fileName:fileName})
        }
        }>
        <Input type="text" name="name" placeholder='Post Item' required/>
        <Input type="number" step='0.01' name="startPrice" placeholder='Starting price for your Item' required/>
        <Input type="file" name='file' required/>
        <Button className='self-end'>Post item</Button>
      </form>
        </div>
    );
}