import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(), // 'admin', 'csp', 'fi', 'auditor', 'bank', 'customer'
  status: text("status").notNull().default('active'), // 'active', 'inactive', 'suspended', 'pending'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login"),
  profileImage: text("profile_image"),
  additionalDetails: jsonb("additional_details"),
});

// CSP table
export const csps = pgTable("csps", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  cspId: text("csp_id").notNull().unique(),
  address: text("address").notNull(),
  district: text("district").notNull(),
  state: text("state").notNull(),
  riskScore: integer("risk_score").default(100),
  lastCheckIn: timestamp("last_check_in"),
  deviceId: text("device_id"),
  status: text("status").notNull().default('active'), // 'active', 'inactive', 'suspended', 'flagged'
  lastAudit: timestamp("last_audit"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  isRedZone: boolean("is_red_zone").default(false),
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull().unique(),
  cspId: integer("csp_id").notNull().references(() => csps.id),
  customerName: text("customer_name").notNull(),
  type: text("type").notNull(), // 'AEPS', 'mATM', 'BBPS', etc.
  amount: integer("amount").notNull(),
  status: text("status").notNull(), // 'completed', 'failed', 'pending'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  location: jsonb("location"),
  deviceInfo: jsonb("device_info"),
  receipt: text("receipt"),
});

// Alerts table
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  alertId: text("alert_id").notNull().unique(),
  cspId: integer("csp_id").references(() => csps.id),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  severity: text("severity").notNull(), // 'high', 'medium', 'low'
  status: text("status").notNull().default('pending'), // 'pending', 'resolved', 'escalated'
  resolvedBy: integer("resolved_by").references(() => users.id),
  resolvedAt: timestamp("resolved_at"),
});

// Audits table
export const audits = pgTable("audits", {
  id: serial("id").primaryKey(),
  cspId: integer("csp_id").notNull().references(() => csps.id),
  auditorId: integer("auditor_id").notNull().references(() => users.id),
  scheduledDate: timestamp("scheduled_date").notNull(),
  completedDate: timestamp("completed_date"),
  status: text("status").notNull(), // 'scheduled', 'completed', 'missed', 'priority'
  findings: jsonb("findings"),
  images: jsonb("images"),
  locationVerified: boolean("location_verified").default(false),
  faceVerified: boolean("face_verified").default(false),
});

// Complaints table
export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  contact: text("contact"),
  cspId: integer("csp_id").references(() => csps.id),
  description: text("description").notNull(),
  transactionId: text("transaction_id"),
  status: text("status").notNull().default('open'), // 'open', 'in-progress', 'resolved', 'escalated'
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
  resolvedBy: integer("resolved_by").references(() => users.id),
});

// System Status table
export const systemStatus = pgTable("system_status", {
  id: serial("id").primaryKey(),
  service: text("service").notNull().unique(), // 'Fraud Engine', 'AEPS', 'mATM', etc.
  status: text("status").notNull(), // 'operational', 'degraded', 'down'
  performance: integer("performance").default(100), // Percentage of normal operation
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  details: text("details"),
});

// War Mode table
export const warMode = pgTable("war_mode", {
  id: serial("id").primaryKey(),
  isActive: boolean("is_active").default(false),
  level: integer("level").default(1), // 1-3, with 3 being highest alert
  activatedBy: integer("activated_by").references(() => users.id),
  activatedAt: timestamp("activated_at"),
  deactivatedAt: timestamp("deactivated_at"),
  affectedAreas: jsonb("affected_areas"),
  instructions: jsonb("instructions"),
});

// Check-ins table
export const checkIns = pgTable("check_ins", {
  id: serial("id").primaryKey(),
  cspId: integer("csp_id").notNull().references(() => csps.id),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  location: jsonb("location"),
  deviceInfo: jsonb("device_info"),
  faceImageUrl: text("face_image_url"),
  verified: boolean("verified").default(false),
  verificationMethod: text("verification_method"), // 'face', 'location', 'both'
});

// Insertion schemas

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  role: true,
  status: true,
});

export const insertCspSchema = createInsertSchema(csps).pick({
  userId: true,
  cspId: true,
  address: true,
  district: true,
  state: true,
  deviceId: true,
  latitude: true,
  longitude: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  transactionId: true,
  cspId: true,
  customerName: true,
  type: true,
  amount: true,
  status: true,
  location: true,
  deviceInfo: true,
});

export const insertAlertSchema = createInsertSchema(alerts).pick({
  alertId: true,
  cspId: true,
  description: true,
  severity: true,
  status: true,
});

export const insertAuditSchema = createInsertSchema(audits).pick({
  cspId: true,
  auditorId: true,
  scheduledDate: true,
  status: true,
});

export const insertComplaintSchema = createInsertSchema(complaints).pick({
  customerName: true,
  contact: true,
  cspId: true,
  description: true,
  transactionId: true,
});

export const insertCheckInSchema = createInsertSchema(checkIns).pick({
  cspId: true,
  location: true,
  deviceInfo: true,
  faceImageUrl: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type CSP = typeof csps.$inferSelect;
export type InsertCSP = z.infer<typeof insertCspSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type Audit = typeof audits.$inferSelect;
export type InsertAudit = z.infer<typeof insertAuditSchema>;

export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;

export type CheckIn = typeof checkIns.$inferSelect;
export type InsertCheckIn = z.infer<typeof insertCheckInSchema>;

export type SystemStatusItem = typeof systemStatus.$inferSelect;
export type WarModeStatus = typeof warMode.$inferSelect;
