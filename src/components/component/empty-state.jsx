import Image from 'next/image'
export const Empty= () => {
  return (
    <div className='mx-auto space-y-4'>
        <Image src='notfound.svg' alt='undraw' height='300' width='300'></Image>
        <h1 className='text-4xl font-bold'>NO ITEMS FOUND</h1>
    </div>
  )
}
