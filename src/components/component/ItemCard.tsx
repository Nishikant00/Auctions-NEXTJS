import { getURLImg } from "@/app/page"
import { Item } from "@/db/schema"
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export const ItemCard = ({item}:{item:Item}) => {
  return (

    <Card className="m-2 p-5">
        <CardContent >
        <Image className="pt-2 mx-auto" src={getURLImg(item.fileName)} alt="Item image" height="200" width="200" />
        </CardContent>
        <CardHeader>
            <CardTitle>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-wrap">{item.name}</h3>
            </CardTitle>
            <CardDescription>
            <p>Starting price: ${item.startPrice/100}</p>
            </CardDescription>
            <Button asChild><Link href={`/items/${item.id}`}>Place Bid</Link></Button>
        </CardHeader>
    </Card>
  )
}
