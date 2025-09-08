import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { sendEmailSchema, insertEmailLogSchema } from "@shared/schema";
import { sendEmail } from "./utils/resend-client";
import { storage } from "./storage";
import { render } from '@react-email/render';

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

// Email template function matching the specification exactly
function generateEmailHTML(companyName: string): string {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Closure Report - ${companyName}</title>
</head>
<body style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Ubuntu,sans-serif; line-height: 1.4; color: #374151; margin: 0; padding: 20px; background-color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto;">
        <img src="https://app.rulebase.co/img/rulebase-logo.png" alt="Rulebase" width="64" height="64" style="margin-bottom: 16px;" />
        
        <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; line-height: 1.25; margin: 0 0 16px 0;">
            Account closure report for ${companyName} - July 2025
        </h1>
        
        <p style="margin: 0 0 16px 0;">
            In July 2025, there were <strong style="font-weight: 600;">115</strong> account closure requests. The key reasons for requesting closure were:
        </p>
        
        <ol style="margin: 0 0 16px 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;"><strong style="font-weight: 600;">Unspecified reasons</strong> (~35%) - Customers requesting closure without providing detailed explanations</li>
            <li style="margin-bottom: 8px;"><strong style="font-weight: 600;">Banking consolidation</strong> (~25%) - Customers closing accounts because they have multiple banks and want to reduce the number of accounts they maintain</li>
            <li style="margin-bottom: 8px;"><strong style="font-weight: 600;">Account restrictions/liens</strong> (~20%) - Customer frustration with account restrictions due to erroneous transfer disputes</li>
            <li style="margin-bottom: 8px;"><strong style="font-weight: 600;">Account setup issues</strong> (~10%) - Problems completing account creation, BVN/NIN mismatches, or profile setup</li>
            <li style="margin-bottom: 8px;"><strong style="font-weight: 600;">Service dissatisfaction</strong> (~7%) - General dissatisfaction with customer service and resolution processes</li>
            <li style="margin-bottom: 8px;"><strong style="font-weight: 600;">Overdraft disputes</strong> (~3%) - Issues with overdraft interest calculations and repayment terms</li>
        </ol>
        
        <p style="margin: 0 0 24px 0;">
            Click "View full report" to see all customer interactions.
        </p>
        
        <div style="text-align: center; margin-top: -24px;">
            <a href="https://app.rulebase.co/reports/demo" 
               style="background: linear-gradient(135deg, #374151 0%, #4b5563 100%); box-shadow: 0 4px 12px rgba(55, 65, 81, 0.4); color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
                View full report
            </a>
        </div>
    </div>
</body>
</html>`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Send email endpoint
  app.post("/api/send-email", async (req, res) => {
    try {
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

      const { companyName, recipientEmail } = validation.data;

      // Generate email HTML
      const emailHTML = generateEmailHTML(companyName);

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

      const { companyName } = validation.data;
      const emailHTML = generateEmailHTML(companyName);

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
