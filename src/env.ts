import { createEnv } from "@t3-oss/env-nextjs";
import {z} from 'zod'

export const env=createEnv({
    server:{
        DATABASE_URL:z.string().url(),
        SUPABASE_KEY:z.string(),
        NODE_ENV:z.string().min(1),
    },
    client:{

    },
    runtimeEnv:{
        DATABASE_URL:process.env.DATABASE_URL,
        SUPABASE_KEY:process.env.SUPABASE_KEY,
        NODE_ENV:process.env.NODE_ENV,
    }
})