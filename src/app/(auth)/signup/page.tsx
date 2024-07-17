"use client"
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { redirect } from "next/navigation";

export default function Page() {
	const formRef=useRef(null)
	const [state,action]=useFormState(signup,{
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
			<form action={action} className="flex flex-col gap-4 mx-auto">
			<h1 className="text-center">Create an account</h1>
			<Input type="text" name="username" placeholder="username"></Input>
			{state.error&&<span className='text-red-700'>{state.message}</span>}
			<Input type="Password" name="password" placeholder="password"></Input>
			{state.errorPass &&<span className='text-red-700'>{state.message}</span>}
			<Button className="w-20 " type="submit">Submit</Button>
			</form>
			</div>
		</>
	);
}
