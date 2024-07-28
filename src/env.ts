import { createEnv } from "@t3-oss/env-nextjs";
import {z} from 'zod'

export const env=createEnv({
    server:{
        DATABASE_URL:z.string().url(),
        NODE_ENV:z.string().min(1),
    },
    client:{
        NEXT_PUBLIC_SUPABASE_KEY:z.string(),
        NEXT_PUBLIC_SUPABASE_URL:z.string(),
        
    },
    runtimeEnv:{
        NEXT_PUBLIC_SUPABASE_URL:process.env.NEXT_PUBLIC_SUPABASE_URL,
        DATABASE_URL:process.env.DATABASE_URL,
        NEXT_PUBLIC_SUPABASE_KEY:process.env.NEXT_PUBLIC_SUPABASE_KEY,
        NODE_ENV:process.env.NODE_ENV,
    }
})