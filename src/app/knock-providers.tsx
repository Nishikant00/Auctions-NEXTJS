"use client"
import { env } from "@/env";
import {
    KnockFeedProvider,
    KnockProvider,
  } from "@knocklabs/react";
  // Required CSS import, unless you're overriding the styling
import { useEffect, useRef, useState } from "react";
export function AppProviders({children}:{children:React.ReactNode}){
    const [userId, setUserId] = useState("");
    useEffect(()=>{
        const fetchUser=async ()=>{
            const response=await fetch("/api/validate",{
              headers:{
                Accept:"application/json",
                method:"GET",
              },
            })
            const usersId:string=await response.json()
            setUserId(usersId)
        }
        fetchUser()
    },[])
    if(!userId){
        return null
    }
    return (
      <>
      <KnockProvider apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} userId={userId}>
        {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
        <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
          {children}
        </KnockFeedProvider>
      </KnockProvider>
      </>
    );
  };