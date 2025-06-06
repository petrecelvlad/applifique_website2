import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSignupSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist signup endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistSignupSchema.parse(req.body);
      const signup = await storage.createWaitlistSignup(validatedData);
      res.json({ 
        success: true, 
        message: "Successfully joined the waitlist!",
        id: signup.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else if (error instanceof Error && error.message.includes("unique")) {
        res.status(409).json({ 
          success: false, 
          message: "This email is already on our waitlist!" 
        });
      } else {
        console.error("Waitlist signup error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to join waitlist. Please try again." 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
