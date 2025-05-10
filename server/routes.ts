import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCspSchema, insertTransactionSchema, insertAlertSchema, insertAuditSchema, insertComplaintSchema, insertCheckInSchema } from "@shared/schema";
import { zodValidator } from "@shared/utils";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Middleware to check if user has specific role
  const hasRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userRole = req.user?.role;
      if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      next();
    };
  };

  // User routes
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const validation = zodValidator(insertUserSchema, req.body);
      
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }
      
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(req.body);
      
      // Don't send password back to client
      const { password, ...safeUser } = user;
      
      res.status(201).json(safeUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user", error: (error as Error).message });
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password back to client
      const { password, ...safeUser } = user;
      
      res.status(200).json(safeUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user", error: (error as Error).message });
    }
  });

  // CSP routes
  app.post("/api/csps", isAuthenticated, hasRole(['admin', 'fi']), async (req: Request, res: Response) => {
    try {
      const validation = zodValidator(insertCspSchema, req.body);
      
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }
      
      const csp = await storage.createCSP(req.body);
      res.status(201).json(csp);
    } catch (error) {
      res.status(500).json({ message: "Failed to create CSP", error: (error as Error).message });
    }
  });

  app.get("/api/csps", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const filters: any = {};
      
      // Apply filters if provided in query params
      if (req.query.status) filters.status = req.query.status;
      if (req.query.district) filters.district = req.query.district;
      if (req.query.state) filters.state = req.query.state;
      if (req.query.isRedZone === 'true') filters.isRedZone = true;
      
      const csps = await storage.listCSPs(Object.keys(filters).length > 0 ? filters : undefined);
      res.status(200).json(csps);
    } catch (error) {
      res.status(500).json({ message: "Failed to list CSPs", error: (error as Error).message });
    }
  });

  app.get("/api/csps/:id", async (req: Request, res: Response) => {
    try {
      const csp = await storage.getCSP(parseInt(req.params.id));
      
      if (!csp) {
        return res.status(404).json({ message: "CSP not found" });
      }
      
      res.status(200).json(csp);
    } catch (error) {
      res.status(500).json({ message: "Failed to get CSP", error: (error as Error).message });
    }
  });

  app.put("/api/csps/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedCsp = await storage.updateCSP(id, req.body);
      
      if (!updatedCsp) {
        return res.status(404).json({ message: "CSP not found" });
      }
      
      res.status(200).json(updatedCsp);
    } catch (error) {
      res.status(500).json({ message: "Failed to update CSP", error: (error as Error).message });
    }
  });

  // Transaction routes
  app.post("/api/transactions", async (req: Request, res: Response) => {
    try {
      const validation = zodValidator(insertTransactionSchema, req.body);
      
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }
      
      const transaction = await storage.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Failed to create transaction", error: (error as Error).message });
    }
  });

  app.get("/api/transactions/csp/:cspId", async (req: Request, res: Response) => {
    try {
      const cspId = parseInt(req.params.cspId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      const transactions = await storage.getTransactionsByCSP(cspId, limit);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get transactions", error: (error as Error).message });
    }
  });

  // Alert routes
  app.post("/api/alerts", async (req: Request, res: Response) => {
    try {
      const validation = zodValidator(insertAlertSchema, req.body);
      
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }
      
      const alert = await storage.createAlert(req.body);
      res.status(201).json(alert);
    } catch (error) {
      res.status(500).json({ message: "Failed to create alert", error: (error as Error).message });
    }
  });

  app.get("/api/alerts", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const alerts = await storage.listAlerts(limit);
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to list alerts", error: (error as Error).message });
    }
  });

  app.get("/api/alerts/csp/:cspId", async (req: Request, res: Response) => {
    try {
      const cspId = parseInt(req.params.cspId);
      const alerts = await storage.getAlertsByCSP(cspId);
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get alerts", error: (error as Error).message });
    }
  });

  app.put("/api/alerts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedAlert = await storage.updateAlert(id, req.body);
      
      if (!updatedAlert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      
      res.status(200).json(updatedAlert);
    } catch (error) {
      res.status(500).json({ message: "Failed to update alert", error: (error as Error).message });
    }
  });

  // Audit routes
  app.post("/api/audits", async (req: Request, res: Response) => {
    try {
      const validation = zodValidator(insertAuditSchema, req.body);
      
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }
      
      const audit = await storage.createAudit(req.body);
      res.status(201).json(audit);
    } catch (error) {
      res.status(500).json({ message: "Failed to create audit", error: (error as Error).message });
    }
  });

  app.get("/api/audits/csp/:cspId", async (req: Request, res: Response) => {
    try {
      const cspId = parseInt(req.params.cspId);
      const audits = await storage.getAuditsByCSP(cspId);
      res.status(200).json(audits);
    } catch (error) {
      res.status(500).json({ message: "Failed to get audits", error: (error as Error).message });
    }
  });

  app.get("/api/audits/auditor/:auditorId", async (req: Request, res: Response) => {
    try {
      const auditorId = parseInt(req.params.auditorId);
      const audits = await storage.getAuditsByAuditor(auditorId);
      res.status(200).json(audits);
    } catch (error) {
      res.status(500).json({ message: "Failed to get audits", error: (error as Error).message });
    }
  });

  app.put("/api/audits/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedAudit = await storage.updateAudit(id, req.body);
      
      if (!updatedAudit) {
        return res.status(404).json({ message: "Audit not found" });
      }
      
      res.status(200).json(updatedAudit);
    } catch (error) {
      res.status(500).json({ message: "Failed to update audit", error: (error as Error).message });
    }
  });

  // Complaint routes
  app.post("/api/complaints", async (req: Request, res: Response) => {
    try {
      const validation = zodValidator(insertComplaintSchema, req.body);
      
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }
      
      const complaint = await storage.createComplaint(req.body);
      res.status(201).json(complaint);
    } catch (error) {
      res.status(500).json({ message: "Failed to create complaint", error: (error as Error).message });
    }
  });

  app.get("/api/complaints/csp/:cspId", async (req: Request, res: Response) => {
    try {
      const cspId = parseInt(req.params.cspId);
      const complaints = await storage.getComplaintsByCSP(cspId);
      res.status(200).json(complaints);
    } catch (error) {
      res.status(500).json({ message: "Failed to get complaints", error: (error as Error).message });
    }
  });

  app.put("/api/complaints/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedComplaint = await storage.updateComplaint(id, req.body);
      
      if (!updatedComplaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
      
      res.status(200).json(updatedComplaint);
    } catch (error) {
      res.status(500).json({ message: "Failed to update complaint", error: (error as Error).message });
    }
  });

  // Check-in routes
  app.post("/api/check-ins", async (req: Request, res: Response) => {
    try {
      const validation = zodValidator(insertCheckInSchema, req.body);
      
      if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
      }
      
      const checkIn = await storage.createCheckIn(req.body);
      res.status(201).json(checkIn);
    } catch (error) {
      res.status(500).json({ message: "Failed to create check-in", error: (error as Error).message });
    }
  });

  app.get("/api/check-ins/csp/:cspId", async (req: Request, res: Response) => {
    try {
      const cspId = parseInt(req.params.cspId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      const checkIns = await storage.getCheckInsByCSP(cspId, limit);
      res.status(200).json(checkIns);
    } catch (error) {
      res.status(500).json({ message: "Failed to get check-ins", error: (error as Error).message });
    }
  });

  app.get("/api/check-ins/csp/:cspId/latest", async (req: Request, res: Response) => {
    try {
      const cspId = parseInt(req.params.cspId);
      const checkIn = await storage.getLatestCheckInByCSP(cspId);
      
      if (!checkIn) {
        return res.status(404).json({ message: "No check-ins found for this CSP" });
      }
      
      res.status(200).json(checkIn);
    } catch (error) {
      res.status(500).json({ message: "Failed to get latest check-in", error: (error as Error).message });
    }
  });

  // System status routes
  app.get("/api/system-status", async (req: Request, res: Response) => {
    try {
      const status = await storage.getSystemStatus();
      res.status(200).json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to get system status", error: (error as Error).message });
    }
  });

  app.put("/api/system-status/:service", async (req: Request, res: Response) => {
    try {
      const service = req.params.service;
      const updatedStatus = await storage.updateSystemStatus(service, req.body);
      
      if (!updatedStatus) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.status(200).json(updatedStatus);
    } catch (error) {
      res.status(500).json({ message: "Failed to update system status", error: (error as Error).message });
    }
  });

  // War mode routes
  app.get("/api/war-mode", async (req: Request, res: Response) => {
    try {
      const warMode = await storage.getWarModeStatus();
      res.status(200).json(warMode);
    } catch (error) {
      res.status(500).json({ message: "Failed to get war mode status", error: (error as Error).message });
    }
  });

  app.put("/api/war-mode", isAuthenticated, hasRole(['admin']), async (req: Request, res: Response) => {
    try {
      const updatedWarMode = await storage.updateWarMode(req.body);
      
      if (!updatedWarMode) {
        return res.status(404).json({ message: "War mode status not found" });
      }
      
      res.status(200).json(updatedWarMode);
    } catch (error) {
      res.status(500).json({ message: "Failed to update war mode status", error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
