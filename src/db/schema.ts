import { pgTable,serial, text, timestamp } from "drizzle-orm/pg-core";

export const auctions=pgTable('auctions',{
    id: serial('id').primaryKey(),
});

export const bidItems=pgTable("bidItems",{
	id:serial('id').primaryKey(),
	userId:text("userId").notNull().references(()=>userTable.id,{onDelete:"cascade"}),
	name:text("name").notNull()
})

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
    username:text('username').notNull().unique(),
    password_hash:text('password_hash').notNull()
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});