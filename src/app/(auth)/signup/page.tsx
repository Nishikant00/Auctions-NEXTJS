"use client"
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "./actions";
export default function Page() {
	const [state,action]=useFormState(signup,{
		message:"",
		error:true,
	})
	const formStatus=useFormStatus()
	return (
		<>
			<h1>Create an account</h1>
			<form action={action}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				{state.error ?<span></span> :<span>{state.message}</span>}
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				{formStatus.pending ? <button>Loading</button> :<button>Continue</button>}
			</form>
		</>
	);
}
