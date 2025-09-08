import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default('user'),
});

export const emailLogs = pgTable("email_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  status: text("status").notNull(), // 'sent', 'failed'
  resendId: text("resend_id"),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertEmailLogSchema = createInsertSchema(emailLogs).pick({
  companyName: true,
  recipientEmail: true,
  status: true,
  resendId: true,
  error: true,
});

export const sendEmailSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  recipientEmail: z.string().email("Please enter a valid email address"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEmailLog = z.infer<typeof insertEmailLogSchema>;
export type EmailLog = typeof emailLogs.$inferSelect;
export type SendEmailRequest = z.infer<typeof sendEmailSchema>;
