import { getURLImg } from "@/app/page"
import { Item } from "@/db/schema"
import Image from 'next/image'
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
    <Card>
        <CardContent >
        <Image className="pt-2 mx-auto" src={getURLImg(item.fileName)} alt="Item image" height="200" width="200" />
        </CardContent>
        <CardHeader>
            <CardTitle>
            {item.name} 
            </CardTitle>
            <CardDescription>
            Starting price: ${item.startPrice/100}
            </CardDescription>
        </CardHeader>
    </Card>
  )
}
