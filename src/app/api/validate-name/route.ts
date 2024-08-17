import { validateRequest } from "@/app/(auth)/validate-request";
import { NextResponse } from "next/server";

export async function GET(){
    const {user}=await validateRequest();
    if (!user){
        throw new Error("User is invalid")
    }
    return NextResponse.json({'name':user.username})

}