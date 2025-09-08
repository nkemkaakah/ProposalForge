# Email Demo Generator Tool

## Overview

This is a full-stack web application designed to generate demo versions of customer digest emails for showcasing to potential clients. The tool allows users to customize company names and send professional-looking email reports via a clean web interface. It's built as an internal sales tool to help demonstrate email capabilities to prospects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Single-page application using React 18+ with TypeScript for type safety
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for consistent, accessible interface components
- **Styling**: Tailwind CSS with CSS variables for theming, following a "new-york" design system
- **State Management**: React Query (TanStack Query) for server state management and API interactions
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Express.js Server**: Node.js backend using Express with TypeScript support
- **Email Service Integration**: Resend API for reliable email delivery
- **Database Layer**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Storage Strategy**: Dual storage approach - in-memory storage for development/testing and PostgreSQL for production
- **API Design**: RESTful endpoints with structured error handling and request validation

### Authentication & Security
- **Rate Limiting**: IP-based rate limiting (5 requests per minute) to prevent abuse
- **Input Validation**: Zod schemas for request validation on both client and server
- **Error Handling**: Centralized error handling with structured error responses

### Email Template System
- **React Email Components**: Uses @react-email/components for rendering consistent HTML emails
- **Template Replication**: Exact replication of existing customer digest email template with customizable company names
- **Email Logging**: Comprehensive logging of all email send attempts with status tracking

### Database Schema
- **Users Table**: Basic user management with role-based access controls
- **Email Logs Table**: Audit trail for all email operations including success/failure tracking
- **Migration System**: Drizzle migrations for schema version control

### Development Environment
- **Vite Build Tool**: Fast development server with HMR and optimized production builds
- **TypeScript Configuration**: Strict type checking with path mapping for clean imports
- **Development Tools**: Integrated with Replit-specific tooling for cloud development

## External Dependencies

### Core Services
- **Resend API**: Email delivery service for sending demo emails to prospects
- **PostgreSQL Database**: Primary data storage via Neon Database serverless solution

### UI/UX Libraries
- **Radix UI**: Accessible component primitives for building the interface
- **Shadcn/ui**: Pre-built component library based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

### Development Dependencies
- **React Query**: Server state synchronization and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date manipulation utilities
- **Class Variance Authority**: Utility for creating component variants