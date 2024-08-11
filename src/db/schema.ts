import { pgTable,serial, text, timestamp,integer} from "drizzle-orm/pg-core";


export const bidItems=pgTable("bidItems",{
	id:serial('id').primaryKey(),
	userId:text("userId").notNull().references(()=>userTable.id,{onDelete:"cascade"}),
	name:text("name").notNull(),
	startPrice:integer("startPrice").notNull().default(0),
	fileName:text("fileName").notNull(),
	bidInterval: integer('bidInterval').notNull().default(100),
	currentBid:integer('currentBid').notNull().default(0)
})

export const auctions=pgTable('auctions',{
	id: serial('id').primaryKey(),
	amount:integer('amount').notNull(),
	itemId:serial('itemId').notNull().references(()=>bidItems.id,{onDelete:'cascade'}),
	userId:text('userId').notNull().references(()=>userTable.id,{onDelete:'cascade'}),
	timestamp:timestamp("timestamp",{mode:"date"}).notNull()
});
export type Item=typeof bidItems.$inferSelect;
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