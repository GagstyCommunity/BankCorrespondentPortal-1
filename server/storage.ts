import { 
  users, User, InsertUser, 
  csps, CSP, InsertCSP,
  transactions, Transaction, InsertTransaction,
  alerts, Alert, InsertAlert,
  audits, Audit, InsertAudit,
  complaints, Complaint, InsertComplaint,
  checkIns, CheckIn, InsertCheckIn,
  systemStatus, SystemStatusItem,
  warMode, WarModeStatus
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, desc, and, like } from 'drizzle-orm';

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  
  // CSP operations
  getCSP(id: number): Promise<CSP | undefined>;
  getCSPByUserId(userId: number): Promise<CSP | undefined>;
  createCSP(csp: InsertCSP): Promise<CSP>;
  updateCSP(id: number, data: Partial<CSP>): Promise<CSP | undefined>;
  listCSPs(filters?: Partial<CSP>): Promise<CSP[]>;
  
  // Transaction operations
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByCSP(cspId: number, limit?: number): Promise<Transaction[]>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  
  // Alert operations
  createAlert(alert: InsertAlert): Promise<Alert>;
  getAlert(id: number): Promise<Alert | undefined>;
  getAlertsByCSP(cspId: number): Promise<Alert[]>;
  listAlerts(limit?: number): Promise<Alert[]>;
  updateAlert(id: number, data: Partial<Alert>): Promise<Alert | undefined>;
  
  // Audit operations
  createAudit(audit: InsertAudit): Promise<Audit>;
  getAudit(id: number): Promise<Audit | undefined>;
  getAuditsByCSP(cspId: number): Promise<Audit[]>;
  getAuditsByAuditor(auditorId: number): Promise<Audit[]>;
  updateAudit(id: number, data: Partial<Audit>): Promise<Audit | undefined>;
  
  // Complaint operations
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  getComplaint(id: number): Promise<Complaint | undefined>;
  getComplaintsByCSP(cspId: number): Promise<Complaint[]>;
  updateComplaint(id: number, data: Partial<Complaint>): Promise<Complaint | undefined>;
  
  // Check-in operations
  createCheckIn(checkIn: InsertCheckIn): Promise<CheckIn>;
  getCheckInsByCSP(cspId: number, limit?: number): Promise<CheckIn[]>;
  getLatestCheckInByCSP(cspId: number): Promise<CheckIn | undefined>;
  
  // System status operations
  getSystemStatus(): Promise<SystemStatusItem[]>;
  updateSystemStatus(service: string, data: Partial<SystemStatusItem>): Promise<SystemStatusItem | undefined>;
  
  // War mode operations
  getWarModeStatus(): Promise<WarModeStatus | undefined>;
  updateWarMode(data: Partial<WarModeStatus>): Promise<WarModeStatus | undefined>;
}

// Memory storage implementation for development and testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private csps: Map<number, CSP>;
  private transactions: Map<number, Transaction>;
  private alerts: Map<number, Alert>;
  private audits: Map<number, Audit>;
  private complaints: Map<number, Complaint>;
  private checkIns: Map<number, CheckIn>;
  private systemStatusList: Map<number, SystemStatusItem>;
  private warModeStatus: WarModeStatus | undefined;
  
  private userId: number = 1;
  private cspId: number = 1;
  private transactionId: number = 1;
  private alertId: number = 1;
  private auditId: number = 1;
  private complaintId: number = 1;
  private checkInId: number = 1;
  private systemStatusId: number = 1;
  private warModeId: number = 1;

  constructor() {
    this.users = new Map();
    this.csps = new Map();
    this.transactions = new Map();
    this.alerts = new Map();
    this.audits = new Map();
    this.complaints = new Map();
    this.checkIns = new Map();
    this.systemStatusList = new Map();
    
    // Initialize with sample data for development
    this.initializeData();
  }

  private initializeData() {
    // Add sample system status
    const services = ['Fraud Engine', 'AEPS Services', 'mATM Services', 'Facial Recognition', 'Notification System'];
    services.forEach(service => {
      const id = this.systemStatusId++;
      const status: SystemStatusItem = {
        id,
        service,
        status: service === 'mATM Services' ? 'degraded' : 'operational',
        performance: service === 'mATM Services' ? 87 : 95 + Math.floor(Math.random() * 5),
        lastUpdated: new Date(),
        details: null
      };
      this.systemStatusList.set(id, status);
    });

    // Initialize war mode as inactive
    this.warModeStatus = {
      id: this.warModeId++,
      isActive: false,
      level: 1,
      activatedBy: null,
      activatedAt: null,
      deactivatedAt: null,
      affectedAreas: null,
      instructions: null
    };
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      lastLogin: null,
      profileImage: null,
      additionalDetails: null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // CSP operations
  async getCSP(id: number): Promise<CSP | undefined> {
    return this.csps.get(id);
  }

  async getCSPByUserId(userId: number): Promise<CSP | undefined> {
    return Array.from(this.csps.values()).find(
      (csp) => csp.userId === userId
    );
  }

  async createCSP(insertCSP: InsertCSP): Promise<CSP> {
    const id = this.cspId++;
    const csp: CSP = {
      ...insertCSP,
      id,
      riskScore: 100,
      lastCheckIn: null,
      status: 'active',
      lastAudit: null,
      isRedZone: false
    };
    this.csps.set(id, csp);
    return csp;
  }

  async updateCSP(id: number, data: Partial<CSP>): Promise<CSP | undefined> {
    const csp = this.csps.get(id);
    if (!csp) return undefined;
    
    const updatedCSP = { ...csp, ...data };
    this.csps.set(id, updatedCSP);
    return updatedCSP;
  }

  async listCSPs(filters?: Partial<CSP>): Promise<CSP[]> {
    let csps = Array.from(this.csps.values());
    
    if (filters) {
      csps = csps.filter(csp => {
        for (const [key, value] of Object.entries(filters)) {
          if (csp[key as keyof CSP] !== value) return false;
        }
        return true;
      });
    }
    
    return csps;
  }

  // Transaction operations
  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      timestamp: new Date(),
      receipt: null
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getTransactionsByCSP(cspId: number, limit: number = 10): Promise<Transaction[]> {
    const allTransactions = Array.from(this.transactions.values())
      .filter(tx => tx.cspId === cspId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return allTransactions.slice(0, limit);
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  // Alert operations
  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = this.alertId++;
    const alert: Alert = {
      ...insertAlert,
      id,
      timestamp: new Date(),
      resolvedBy: null,
      resolvedAt: null
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async getAlert(id: number): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }

  async getAlertsByCSP(cspId: number): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .filter(alert => alert.cspId === cspId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async listAlerts(limit: number = 10): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async updateAlert(id: number, data: Partial<Alert>): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updatedAlert = { ...alert, ...data };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  // Audit operations
  async createAudit(insertAudit: InsertAudit): Promise<Audit> {
    const id = this.auditId++;
    const audit: Audit = {
      ...insertAudit,
      id,
      completedDate: null,
      findings: null,
      images: null,
      locationVerified: false,
      faceVerified: false
    };
    this.audits.set(id, audit);
    return audit;
  }

  async getAudit(id: number): Promise<Audit | undefined> {
    return this.audits.get(id);
  }

  async getAuditsByCSP(cspId: number): Promise<Audit[]> {
    return Array.from(this.audits.values())
      .filter(audit => audit.cspId === cspId)
      .sort((a, b) => {
        const dateA = a.completedDate || a.scheduledDate;
        const dateB = b.completedDate || b.scheduledDate;
        return dateB.getTime() - dateA.getTime();
      });
  }

  async getAuditsByAuditor(auditorId: number): Promise<Audit[]> {
    return Array.from(this.audits.values())
      .filter(audit => audit.auditorId === auditorId)
      .sort((a, b) => {
        const dateA = a.completedDate || a.scheduledDate;
        const dateB = b.completedDate || b.scheduledDate;
        return dateB.getTime() - dateA.getTime();
      });
  }

  async updateAudit(id: number, data: Partial<Audit>): Promise<Audit | undefined> {
    const audit = this.audits.get(id);
    if (!audit) return undefined;
    
    const updatedAudit = { ...audit, ...data };
    this.audits.set(id, updatedAudit);
    return updatedAudit;
  }

  // Complaint operations
  async createComplaint(insertComplaint: InsertComplaint): Promise<Complaint> {
    const id = this.complaintId++;
    const complaint: Complaint = {
      ...insertComplaint,
      id,
      status: 'open',
      submittedAt: new Date(),
      resolvedAt: null,
      resolvedBy: null
    };
    this.complaints.set(id, complaint);
    return complaint;
  }

  async getComplaint(id: number): Promise<Complaint | undefined> {
    return this.complaints.get(id);
  }

  async getComplaintsByCSP(cspId: number): Promise<Complaint[]> {
    return Array.from(this.complaints.values())
      .filter(complaint => complaint.cspId === cspId)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  async updateComplaint(id: number, data: Partial<Complaint>): Promise<Complaint | undefined> {
    const complaint = this.complaints.get(id);
    if (!complaint) return undefined;
    
    const updatedComplaint = { ...complaint, ...data };
    this.complaints.set(id, updatedComplaint);
    return updatedComplaint;
  }

  // Check-in operations
  async createCheckIn(insertCheckIn: InsertCheckIn): Promise<CheckIn> {
    const id = this.checkInId++;
    const checkIn: CheckIn = {
      ...insertCheckIn,
      id,
      timestamp: new Date(),
      verified: false,
      verificationMethod: null
    };
    this.checkIns.set(id, checkIn);
    return checkIn;
  }

  async getCheckInsByCSP(cspId: number, limit: number = 10): Promise<CheckIn[]> {
    return Array.from(this.checkIns.values())
      .filter(checkIn => checkIn.cspId === cspId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getLatestCheckInByCSP(cspId: number): Promise<CheckIn | undefined> {
    return Array.from(this.checkIns.values())
      .filter(checkIn => checkIn.cspId === cspId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  }

  // System status operations
  async getSystemStatus(): Promise<SystemStatusItem[]> {
    return Array.from(this.systemStatusList.values());
  }

  async updateSystemStatus(service: string, data: Partial<SystemStatusItem>): Promise<SystemStatusItem | undefined> {
    const status = Array.from(this.systemStatusList.values()).find(s => s.service === service);
    if (!status) return undefined;
    
    const updatedStatus = { ...status, ...data, lastUpdated: new Date() };
    this.systemStatusList.set(status.id, updatedStatus);
    return updatedStatus;
  }

  // War mode operations
  async getWarModeStatus(): Promise<WarModeStatus | undefined> {
    return this.warModeStatus;
  }

  async updateWarMode(data: Partial<WarModeStatus>): Promise<WarModeStatus | undefined> {
    if (!this.warModeStatus) return undefined;
    
    this.warModeStatus = { ...this.warModeStatus, ...data };
    return this.warModeStatus;
  }
}

// Database implementation using Drizzle ORM
export class DrizzleStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  private client: ReturnType<typeof postgres>;

  constructor() {
    // Initialize database connection
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    try {
      this.client = postgres(process.env.DATABASE_URL, { max: 10 });
      this.db = drizzle(this.client);
      console.log('Database connection initialized successfully');
    } catch (error) {
      console.error('Error initializing database connection:', error);
      throw error;
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await this.db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await this.db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const result = await this.db.insert(users).values({
        ...insertUser,
        status: insertUser.status || 'active',
        createdAt: new Date(),
        lastLogin: null,
        profileImage: null,
        additionalDetails: null
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    try {
      const result = await this.db.update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  // CSP operations
  async getCSP(id: number): Promise<CSP | undefined> {
    try {
      const result = await this.db.select().from(csps).where(eq(csps.id, id));
      return result[0];
    } catch (error) {
      console.error('Error getting CSP:', error);
      return undefined;
    }
  }

  async getCSPByUserId(userId: number): Promise<CSP | undefined> {
    try {
      const result = await this.db.select().from(csps).where(eq(csps.userId, userId));
      return result[0];
    } catch (error) {
      console.error('Error getting CSP by user ID:', error);
      return undefined;
    }
  }

  async createCSP(insertCSP: InsertCSP): Promise<CSP> {
    try {
      const result = await this.db.insert(csps).values({
        ...insertCSP,
        riskScore: 100,
        lastCheckIn: null,
        status: 'active',
        lastAudit: null,
        isRedZone: false,
        deviceId: insertCSP.deviceId || null,
        latitude: insertCSP.latitude || null,
        longitude: insertCSP.longitude || null
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating CSP:', error);
      throw error;
    }
  }

  async updateCSP(id: number, data: Partial<CSP>): Promise<CSP | undefined> {
    try {
      const result = await this.db.update(csps)
        .set(data)
        .where(eq(csps.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating CSP:', error);
      return undefined;
    }
  }

  async listCSPs(filters?: Partial<CSP>): Promise<CSP[]> {
    try {
      let query = this.db.select().from(csps);
      
      if (filters) {
        if (filters.status) {
          query = query.where(eq(csps.status, filters.status));
        }
        if (filters.district) {
          query = query.where(eq(csps.district, filters.district));
        }
        if (filters.state) {
          query = query.where(eq(csps.state, filters.state));
        }
        if (filters.isRedZone !== undefined) {
          // Handle boolean comparison safely
          query = query.where(filters.isRedZone ? 
            eq(csps.isRedZone, true) : 
            eq(csps.isRedZone, false));
        }
      }
      
      return await query;
    } catch (error) {
      console.error('Error listing CSPs:', error);
      return [];
    }
  }

  // Transaction operations
  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    try {
      const result = await this.db.insert(transactions).values({
        ...insertTransaction,
        timestamp: new Date(),
        receipt: null,
        location: insertTransaction.location || {},
        deviceInfo: insertTransaction.deviceInfo || {}
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  async getTransactionsByCSP(cspId: number, limit: number = 10): Promise<Transaction[]> {
    try {
      return await this.db.select()
        .from(transactions)
        .where(eq(transactions.cspId, cspId))
        .orderBy(desc(transactions.timestamp))
        .limit(limit);
    } catch (error) {
      console.error('Error getting transactions by CSP:', error);
      return [];
    }
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    try {
      const result = await this.db.select().from(transactions).where(eq(transactions.id, id));
      return result[0];
    } catch (error) {
      console.error('Error getting transaction:', error);
      return undefined;
    }
  }

  // Alert operations
  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    try {
      const result = await this.db.insert(alerts).values({
        ...insertAlert,
        status: insertAlert.status || 'open',
        cspId: insertAlert.cspId || null,
        timestamp: new Date(),
        resolvedBy: null,
        resolvedAt: null
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating alert:', error);
      throw error;
    }
  }

  async getAlert(id: number): Promise<Alert | undefined> {
    try {
      const result = await this.db.select().from(alerts).where(eq(alerts.id, id));
      return result[0];
    } catch (error) {
      console.error('Error getting alert:', error);
      return undefined;
    }
  }

  async getAlertsByCSP(cspId: number): Promise<Alert[]> {
    try {
      return await this.db.select()
        .from(alerts)
        .where(eq(alerts.cspId, cspId))
        .orderBy(desc(alerts.timestamp));
    } catch (error) {
      console.error('Error getting alerts by CSP:', error);
      return [];
    }
  }

  async listAlerts(limit: number = 10): Promise<Alert[]> {
    try {
      return await this.db.select()
        .from(alerts)
        .orderBy(desc(alerts.timestamp))
        .limit(limit);
    } catch (error) {
      console.error('Error listing alerts:', error);
      return [];
    }
  }

  async updateAlert(id: number, data: Partial<Alert>): Promise<Alert | undefined> {
    try {
      const result = await this.db.update(alerts)
        .set(data)
        .where(eq(alerts.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating alert:', error);
      return undefined;
    }
  }

  // Audit operations
  async createAudit(insertAudit: InsertAudit): Promise<Audit> {
    try {
      const result = await this.db.insert(audits).values({
        ...insertAudit,
        completedDate: null,
        findings: null,
        images: null,
        locationVerified: false,
        faceVerified: false
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating audit:', error);
      throw error;
    }
  }

  async getAudit(id: number): Promise<Audit | undefined> {
    try {
      const result = await this.db.select().from(audits).where(eq(audits.id, id));
      return result[0];
    } catch (error) {
      console.error('Error getting audit:', error);
      return undefined;
    }
  }

  async getAuditsByCSP(cspId: number): Promise<Audit[]> {
    try {
      return await this.db.select()
        .from(audits)
        .where(eq(audits.cspId, cspId))
        .orderBy(desc(audits.scheduledDate));
    } catch (error) {
      console.error('Error getting audits by CSP:', error);
      return [];
    }
  }

  async getAuditsByAuditor(auditorId: number): Promise<Audit[]> {
    try {
      return await this.db.select()
        .from(audits)
        .where(eq(audits.auditorId, auditorId))
        .orderBy(desc(audits.scheduledDate));
    } catch (error) {
      console.error('Error getting audits by auditor:', error);
      return [];
    }
  }

  async updateAudit(id: number, data: Partial<Audit>): Promise<Audit | undefined> {
    try {
      const result = await this.db.update(audits)
        .set(data)
        .where(eq(audits.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating audit:', error);
      return undefined;
    }
  }

  // Complaint operations
  async createComplaint(insertComplaint: InsertComplaint): Promise<Complaint> {
    try {
      const result = await this.db.insert(complaints).values({
        ...insertComplaint,
        status: 'open',
        cspId: insertComplaint.cspId || null,
        transactionId: insertComplaint.transactionId || null,
        contact: insertComplaint.contact || null,
        submittedAt: new Date(),
        resolvedAt: null,
        resolvedBy: null
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating complaint:', error);
      throw error;
    }
  }

  async getComplaint(id: number): Promise<Complaint | undefined> {
    try {
      const result = await this.db.select().from(complaints).where(eq(complaints.id, id));
      return result[0];
    } catch (error) {
      console.error('Error getting complaint:', error);
      return undefined;
    }
  }

  async getComplaintsByCSP(cspId: number): Promise<Complaint[]> {
    try {
      return await this.db.select()
        .from(complaints)
        .where(eq(complaints.cspId, cspId))
        .orderBy(desc(complaints.submittedAt));
    } catch (error) {
      console.error('Error getting complaints by CSP:', error);
      return [];
    }
  }

  async updateComplaint(id: number, data: Partial<Complaint>): Promise<Complaint | undefined> {
    try {
      const result = await this.db.update(complaints)
        .set(data)
        .where(eq(complaints.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating complaint:', error);
      return undefined;
    }
  }

  // Check-in operations
  async createCheckIn(insertCheckIn: InsertCheckIn): Promise<CheckIn> {
    try {
      const result = await this.db.insert(checkIns).values({
        ...insertCheckIn,
        timestamp: new Date(),
        verified: false,
        verificationMethod: null,
        location: insertCheckIn.location || {},
        deviceInfo: insertCheckIn.deviceInfo || {},
        faceImageUrl: insertCheckIn.faceImageUrl || null
      }).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating check-in:', error);
      throw error;
    }
  }

  async getCheckInsByCSP(cspId: number, limit: number = 10): Promise<CheckIn[]> {
    try {
      return await this.db.select()
        .from(checkIns)
        .where(eq(checkIns.cspId, cspId))
        .orderBy(desc(checkIns.timestamp))
        .limit(limit);
    } catch (error) {
      console.error('Error getting check-ins by CSP:', error);
      return [];
    }
  }

  async getLatestCheckInByCSP(cspId: number): Promise<CheckIn | undefined> {
    try {
      const results = await this.db.select()
        .from(checkIns)
        .where(eq(checkIns.cspId, cspId))
        .orderBy(desc(checkIns.timestamp))
        .limit(1);
      return results[0];
    } catch (error) {
      console.error('Error getting latest check-in by CSP:', error);
      return undefined;
    }
  }

  // System status operations
  async getSystemStatus(): Promise<SystemStatusItem[]> {
    try {
      return await this.db.select().from(systemStatus);
    } catch (error) {
      console.error('Error getting system status:', error);
      return [];
    }
  }

  async updateSystemStatus(service: string, data: Partial<SystemStatusItem>): Promise<SystemStatusItem | undefined> {
    try {
      const result = await this.db.update(systemStatus)
        .set({ ...data, lastUpdated: new Date() })
        .where(eq(systemStatus.service, service))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating system status:', error);
      return undefined;
    }
  }

  // War mode operations
  async getWarModeStatus(): Promise<WarModeStatus | undefined> {
    try {
      const results = await this.db.select().from(warMode).limit(1);
      return results[0];
    } catch (error) {
      console.error('Error getting war mode status:', error);
      return undefined;
    }
  }

  async updateWarMode(data: Partial<WarModeStatus>): Promise<WarModeStatus | undefined> {
    try {
      const warModeStatus = await this.getWarModeStatus();
      
      if (!warModeStatus) {
        const result = await this.db.insert(warMode)
          .values({
            isActive: data.isActive || false,
            level: data.level || 1,
            activatedBy: data.activatedBy || null,
            activatedAt: data.activatedAt || null,
            deactivatedAt: data.deactivatedAt || null,
            affectedAreas: data.affectedAreas || null,
            instructions: data.instructions || null
          })
          .returning();
        return result[0];
      }

      const result = await this.db.update(warMode)
        .set(data)
        .where(eq(warMode.id, warModeStatus.id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating war mode status:', error);
      return undefined;
    }
  }

  // Close database connection
  async close() {
    await this.client.end();
  }
}

// Initialize the database storage
let storage: IStorage;

// Use memory storage for now until we resolve database connectivity issues
console.log('Using MemStorage while database connectivity is being resolved');
storage = new MemStorage();

export { storage };
