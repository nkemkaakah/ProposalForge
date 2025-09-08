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

// Email template function matching the detailed customer insights specification
function generateEmailHTML(companyName: string, bannerImageUrl?: string, chartImageUrl?: string): string {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Insights - ${companyName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
    <div style="padding: 48px; background-color: #ffffff; max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;">
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            <img src="https://app.rulebase.co/img/rulebase-logo.png" alt="Rulebase" width="64" height="64" style="margin-bottom: 16px;" />
        </p>
        
        <h1 style="color: #181818; font-size: 24px; font-weight: 600;">Customer insights for ${companyName}</h1>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            Here are your customer insights from Rulebase for <strong style="font-weight: 600;">September 1, 2025 - September 7, 2025</strong>.
        </p>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">This week:</p>
        
        <ul style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;">We evaluated <strong style="font-weight: 600;">928 total tickets</strong> (5387 total chats, calls, and emails)</li>
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;">The average QA score was <strong style="font-weight: 600;">95/100</strong> (<strong style="font-weight: 600;">+1</strong> point from last week)</li>
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;">Customers reported <strong style="font-weight: 600;">434 complaints</strong> about <strong style="font-weight: 600;">payment processing issues</strong> (17%), <strong style="font-weight: 600;">account verification problems</strong> (14%), and <strong style="font-weight: 600;">transaction failures</strong> (11%)</li>
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;">Customers reported <strong style="font-weight: 600;">588 service issues</strong> with <strong style="font-weight: 600;">delayed transactions</strong> (24%), <strong style="font-weight: 600;">system downtime</strong> (15%), and <strong style="font-weight: 600;">mobile app errors</strong> (8%)</li>
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;">Customers reported <strong style="font-weight: 600;">8 product issues</strong> with <strong style="font-weight: 600;">loan application failures</strong> and <strong style="font-weight: 600;">card activation problems</strong></li>
        </ul>
        
        ${bannerImageUrl ? `<p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            <img src="${bannerImageUrl}" alt="Weekly Overview Banner" style="max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0;" />
        </p>` : ''}
        
        ${chartImageUrl ? `<p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            <img src="${chartImageUrl}" alt="Weekly Overview Chart" style="max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0;" />
        </p>` : ''}
        
        <hr style="border-color: #f9f9f9; margin: 40px 0; border-width: 1px 0 0 0; border-style: solid;" />
        
        <h2 style="color: #181818; font-size: 18px; font-weight: 500;">Complaints</h2>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            There were <strong style="font-weight: 600;">434 complaints</strong> this week with <strong style="font-weight: 600;">5 high-risk</strong> and <strong style="font-weight: 600;">429 medium-risk</strong>.
        </p>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">These were the most frequent complaints:</p>
        
        <ul style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">75 (17%)</strong> were <strong style="font-weight: 600;">payment processing issues</strong>. For example, <a href="https://app.rulebase.co/conversations/demo1" style="color: #007bff; text-decoration: underline;">customer reported failed transaction with no refund</a></li>
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">60 (14%)</strong> were <strong style="font-weight: 600;">account verification issues</strong>. For example, <a href="https://app.rulebase.co/conversations/demo2" style="color: #007bff; text-decoration: underline;">account locked during KYC process</a></li>
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">47 (11%)</strong> were <strong style="font-weight: 600;">transaction failures</strong>. For example, <a href="https://app.rulebase.co/conversations/demo3" style="color: #007bff; text-decoration: underline;">multiple failed transfer attempts</a></li>
        </ul>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            <strong style="font-weight: 600;">Top service categories mentioned in complaints this week were:</strong> Mobile Banking (75 tickets, 17%), Online Transfers (35 tickets, 8%), Card Services (28 tickets, 6%), and Customer Support (22 tickets, 5%).
        </p>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            <img src="https://email-assets.rulebase.co/demo/complaints-breakdown-chart.png" alt="Complaints Breakdown" style="max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0;" />
        </p>
        
        <h3 style="color: #181818; font-size: 15px; font-weight: 500;">1. <a href="https://app.rulebase.co/conversations/demo-case-1" style="color: #007bff; text-decoration: underline;">Payment processing failure - Account debited without service delivery</a></h3>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Handling agents:</strong> Sarah Johnson, Michael Chen, Rebecca Adams</p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Date:</strong> September 5, 2025</p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Ticket ID:</strong> <a href="https://support.${companyName.toLowerCase().replace(/\s+/g, '')}.com/tickets/925228" style="color: #007bff; text-decoration: underline;">#925228</a></p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Status:</strong> In Progress</p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Summary:</strong></p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            Customer reported being debited ₦75,000 for a bill payment transaction that failed on September 5th, 2025. Despite multiple follow-ups and confirmation that the transaction failed, the customer has not received a reversal. The case has been escalated to the payments team for investigation, with multiple reminder emails sent, but the customer continues to follow up daily requesting resolution.
        </p>
        
        <blockquote style="background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 1em 10px;">
            <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">"When am I going to get my money back? This is very frustrating."</p>
        </blockquote>
        
        <h3 style="color: #181818; font-size: 15px; font-weight: 500;">2. <a href="https://app.rulebase.co/conversations/demo-case-2" style="color: #007bff; text-decoration: underline;">Account verification delays causing business disruption</a></h3>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Handling agents:</strong> David Wilson, Amanda Martinez</p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Date:</strong> September 4, 2025</p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Ticket ID:</strong> <a href="https://support.${companyName.toLowerCase().replace(/\s+/g, '')}.com/tickets/925039" style="color: #007bff; text-decoration: underline;">#925039</a></p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Status:</strong> Resolved</p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">Summary:</strong></p>
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            Business customer reported that their account verification has been pending for over two weeks despite submitting all required documents. This delay has prevented them from processing important business transactions, affecting their operations and client relationships. The verification was eventually completed after escalation to the compliance team.
        </p>
        
        <blockquote style="background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 1em 10px;">
            <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">"This delay is affecting my business operations. I need this resolved urgently."</p>
        </blockquote>
        
        <hr style="border-color: #f9f9f9; margin: 40px 0; border-width: 1px 0 0 0; border-style: solid;" />
        
        <h2 style="color: #181818; font-size: 18px; font-weight: 500;">Service Issues</h2>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            There were <strong style="font-weight: 600;">588 service issues</strong> reported this week, with <strong style="font-weight: 600;">12 critical</strong> and <strong style="font-weight: 600;">576 standard</strong> priority issues.
        </p>
        
        <ul style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">141 (24%)</strong> were related to <strong style="font-weight: 600;">delayed transactions</strong></li>
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">88 (15%)</strong> were related to <strong style="font-weight: 600;">system downtime</strong></li>
            <li style="color: #4b4545; font-size: 14px; line-height: 1.7;"><strong style="font-weight: 600;">47 (8%)</strong> were related to <strong style="font-weight: 600;">mobile app errors</strong></li>
        </ul>
        
        <hr style="border-color: #f9f9f9; margin: 40px 0; border-width: 1px 0 0 0; border-style: solid;" />
        
        <h2 style="color: #181818; font-size: 18px; font-weight: 500;">Product Issues</h2>
        
        <p style="color: #4b4545; font-size: 14px; line-height: 1.7;">
            There were <strong style="font-weight: 600;">8 product issues</strong> reported this week, focusing on loan applications and card services.
        </p>
        
        <div style="text-align: center; margin: 40px 0;">
            <a href="https://app.rulebase.co/reports/${companyName.toLowerCase().replace(/\s+/g, '-')}/detailed" 
               style="background: linear-gradient(135deg, #374151 0%, #4b5563 100%); box-shadow: 0 4px 12px rgba(55, 65, 81, 0.4); color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
                View detailed report
            </a>
        </div>
        
        <hr style="border-color: #f9f9f9; margin: 40px 0; border-width: 1px 0 0 0; border-style: solid;" />
        
        <p style="color: #999; font-size: 12px; line-height: 1.4; text-align: center;">
            This report was generated by Rulebase AI for ${companyName}.<br>
            Questions? Reply to this email or contact support@rulebase.co<br><br>
            © 2025 Rulebase. All rights reserved.
        </p>
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

      const { companyName, recipientEmail, bannerImageUrl, chartImageUrl } = validation.data;

      // Generate email HTML
      const emailHTML = generateEmailHTML(companyName, bannerImageUrl, chartImageUrl);

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

      const { companyName, bannerImageUrl, chartImageUrl } = validation.data;
      const emailHTML = generateEmailHTML(companyName, bannerImageUrl, chartImageUrl);

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
