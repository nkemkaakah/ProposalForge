import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { sendEmailSchema, insertEmailLogSchema } from "@shared/schema";
import { sendEmail } from "./utils/resend-client";
import { storage } from "./storage";
import { render } from '@react-email/render';
import DemoDigestEmail from "@shared/email/DemoDigestEmail";

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRateLimit = rateLimitMap.get(ip);
  
  if (!userRateLimit || now > userRateLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userRateLimit.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  userRateLimit.count++;
  return true;
}


export async function registerRoutes(app: Express): Promise<Server> {
  // Send email endpoint
  app.post("/api/send-email", async (req, res) => {
    try {
      console.log('🌐 POST /api/send-email - Request received');
      console.log('📨 Request body:', req.body);
      // Rate limiting
      const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ 
          message: "Rate limit exceeded. Maximum 5 emails per minute." 
        });
      }

      // Validate request body
      const validation = sendEmailSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Validation failed",
          errors: validation.error.errors 
        });
      }

      const { 
        companyName, 
        recipientEmail, 
        customerName1,
        customerName2, 
        customerName3,
        bannerImageUrl, 
        chartImageUrl,
        logoImageUrl,
        complaintChartUrl,
        metricsImageUrl,
        scorecardImageUrl,
        serviceIssuesImageUrl 
      } = validation.data;

      // Generate email HTML using the same React component as preview
      const emailHTML = await render(DemoDigestEmail({
        companyName,
        customerName1,
        customerName2,
        customerName3,
        bannerImageUrl,
        chartImageUrl,
        logoImageUrl,
        complaintChartUrl,
        metricsImageUrl,
        scorecardImageUrl,
        serviceIssuesImageUrl
      }));

      // Send email via Resend
      const emailResult = await sendEmail({
        from: "Rulebase Reports <reports@rulebase.co>",
        to: recipientEmail,
        subject: `Customer Digest Report - ${companyName}`,
        html: emailHTML
      });

      // Log the email attempt
      const logData = {
        companyName,
        recipientEmail,
        status: emailResult.success ? 'sent' : 'failed',
        resendId: emailResult.success ? (emailResult.data?.data?.id || null) : null,
        error: emailResult.success ? undefined : emailResult.error
      };
      console.log('Log data:', logData);

      try {
        await storage.createEmailLog(logData);
      } catch (logError) {
        console.error('Failed to log email:', logError);
      }

      if (!emailResult.success) {
        return res.status(500).json({ 
          message: "Failed to send email",
          error: emailResult.error 
        });
      }

      res.json({ 
        message: "Email sent successfully",
        emailId: emailResult.data?.data?.id 
      });

    } catch (error) {
      console.error('Send email error:', error);
      res.status(500).json({ 
        message: "Internal server error",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Generate email HTML endpoint for copy functionality
  app.post("/api/generate-email", async (req, res) => {
    try {
      const validation = sendEmailSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Validation failed",
          errors: validation.error.errors 
        });
      }

      const { 
        companyName, 
        customerName1,
        customerName2, 
        customerName3,
        bannerImageUrl, 
        chartImageUrl,
        logoImageUrl,
        complaintChartUrl,
        metricsImageUrl,
        scorecardImageUrl,
        serviceIssuesImageUrl 
      } = validation.data;
      const emailHTML = await render(DemoDigestEmail({
        companyName,
        customerName1,
        customerName2,
        customerName3,
        bannerImageUrl,
        chartImageUrl,
        logoImageUrl,
        complaintChartUrl,
        metricsImageUrl,
        scorecardImageUrl,
        serviceIssuesImageUrl
      }));

      res.json({ html: emailHTML });

    } catch (error) {
      console.error('Generate email error:', error);
      res.status(500).json({ 
        message: "Failed to generate email HTML",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get email logs endpoint
  app.get("/api/email-logs", async (req, res) => {
    try {
      const logs = await storage.getEmailLogs();
      res.json(logs);
    } catch (error) {
      console.error('Get email logs error:', error);
      res.status(500).json({ 
        message: "Failed to fetch email logs",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
