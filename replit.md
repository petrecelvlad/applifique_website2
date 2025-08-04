# Overview

Applifique is a modern full-stack web application that helps users transform complex app ideas into structured blueprints through AI-powered architecture generation. The platform features an elegant landing page with interactive demos, waitlist functionality, and a focus on simplifying the development planning process. Built as a rebranded evolution from "Blueprint Builder," Applifique aims to make app development planning more accessible and systematic.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React + TypeScript**: Modern React application using TypeScript for type safety and better developer experience
- **Vite Build System**: Fast development server and optimized production builds with hot module replacement
- **Component Architecture**: Modular component structure using shadcn/ui design system with Radix UI primitives
- **Styling Strategy**: Tailwind CSS with custom design tokens for elegant, professional aesthetics using neutral color palette
- **State Management**: TanStack Query for server state management with React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Animation**: Framer Motion for smooth, interactive animations and transitions

## Backend Architecture
- **Express.js Server**: RESTful API server with middleware for logging, error handling, and request processing
- **Development/Production Split**: Vite integration for development with static file serving for production
- **Storage Abstraction**: Interface-based storage layer with in-memory implementation for development
- **API Design**: Clean REST endpoints with proper HTTP status codes and JSON responses
- **Error Handling**: Centralized error handling with custom error responses and validation

## Data Layer
- **Database**: PostgreSQL configured through Drizzle ORM for type-safe database operations
- **Schema Definition**: Shared schema definitions using Drizzle with Zod validation
- **Migration System**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless connection for scalable PostgreSQL hosting
- **Validation**: Runtime validation using Zod schemas derived from database schema

## External Dependencies
- **Database**: Neon Database (PostgreSQL) for production data storage
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS for utility-first styling approach
- **Form Handling**: React Hook Form with Hookform Resolvers for form validation
- **Development Tools**: Replit-specific plugins for development environment integration
- **Font Loading**: Google Fonts (Inter and JetBrains Mono) for typography
- **Icons**: Lucide React for consistent iconography
- **Social Icons**: React Icons for social media integration