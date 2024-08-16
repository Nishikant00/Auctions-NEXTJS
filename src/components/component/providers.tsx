"use client"
import { env } from "@/env";
import {
    KnockFeedProvider,
    KnockProvider,
    NotificationFeedPopover,
    NotificationIconButton,
  } from "@knocklabs/react";
  // Required CSS import, unless you're overriding the styling
import { useEffect, useRef, useState } from "react";
export const Providers =  ({children}:{children:React.ReactNode}) => {
    const [userId, setUserId] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);

    useEffect(()=>{
        const fetchUser=async ()=>{
            const response=await fetch("/api/validate",{
              headers:{
                Accept:"application/json",
                method:"GET",
              },
            })
            const usersId:string=await response.json()
            if (!usersId){
                return <div>{children}</div>
            }
            setUserId(usersId)
        }
        fetchUser()
    },[])
    if (!userId){
        return <div>{children}</div>
    }
    return (
      <KnockProvider apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} userId={userId}>
        {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
        <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
          <div>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
          </div>
          {children}
        </KnockFeedProvider>
      </KnockProvider>
    );
  };