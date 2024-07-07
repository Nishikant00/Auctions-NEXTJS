import { pgTable,serial } from "drizzle-orm/pg-core";

export const auctions=pgTable('auctions',{
    id: serial('id').primaryKey(),
});