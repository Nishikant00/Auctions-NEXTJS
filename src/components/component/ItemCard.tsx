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
import { formatCurrency } from "@/app/items/[itemid]/page"

export const ItemCard = ({item}:{item:Item}) => {
  return (

    <Card className="m-2 p-5 self-start">
        <CardContent >
        <Image className="pt-2 mx-auto" src={getURLImg(item.fileName)} alt="Item image" height="200" width="200" loading="lazy" />
        </CardContent>
        <CardHeader>
            <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight text-wrap">
            {item.name}
            </CardTitle>
            <CardDescription>
            Starting price: {formatCurrency(item.startPrice)}
            </CardDescription>
            <Button asChild><Link href={`/items/${item.id}`}>Place Bid</Link></Button>
        </CardHeader>
    </Card>
  )
}
