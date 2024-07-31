"use client"
import { useFormState, useFormStatus } from "react-dom";
import { login } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { redirect} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
export default function Page() {
	
	const formRef=useRef(null)
	const [state,action]=useFormState(login,{
		message:"",
		error:false,
		errorPass:false
	})
	useEffect(()=>{
		if (state.message=="success"){
			return redirect('/')
		}
	},[state])
	return (
		<>
			<div className="grid content-center h-screen p-2">
			<Image className="mx-auto my-2" src="auction.svg" height='50' width='50' alt='logo'></Image>
			<form action={action} className="flex flex-col gap-4 mx-auto">
			<Input type="text" name="username" placeholder="username"></Input>
			{state.error&&<span className='text-red-700'>{state.message}</span>}
			<Input type="Password" name="password" placeholder="password"></Input>
			{state.errorPass &&<span className='text-red-700'>{state.message}</span>}
			<Button className="w-20 " type="submit">Submit</Button>
			<Link className="text-sm hover:text-gray-500" href='/signup'>Dont have an account?</Link>
			</form>
			</div>
		</>
	);
}
