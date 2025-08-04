# Applifique - Landing Page Application

## Overview

Applifique is a modern landing page application for a blueprint-based app development tool. The application features an elegant, professional design showcasing the power of AI-driven architectural planning and blueprint generation. Built with React, TypeScript, and modern web technologies, it provides an interactive experience with animated SVG demonstrations and a waitlist signup system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Component-based architecture using functional components and hooks
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, elegant design
- **Animation**: Framer Motion for smooth page transitions and GSAP for complex SVG animations
- **State Management**: React Query (TanStack Query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Express.js**: Lightweight Node.js server with RESTful API endpoints
- **TypeScript**: Full-stack type safety with shared schemas
- **Development Mode**: Vite integration with hot module replacement
- **Error Handling**: Centralized error middleware with structured error responses
- **Request Logging**: Custom middleware for API request monitoring

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Development Storage**: In-memory storage implementation for development/testing
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment

### Key Features
- **Waitlist System**: Complete signup flow with email collection and validation
- **Interactive Animations**: Custom SVG blueprint animations using GSAP
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Form Handling**: React Hook Form with Zod validation schemas
- **Toast Notifications**: User feedback system for form submissions

### Component Structure
- **Landing Page Sections**: Modular components (Hero, Features, Demo, Contact, Footer)
- **UI Components**: Reusable shadcn/ui components with custom theming
- **Animation Components**: Specialized components for blueprint visualization
- **Form Components**: Controlled form inputs with validation and error handling

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing solution
- **framer-motion**: Animation library for smooth transitions
- **gsap**: Professional animation library for complex SVG animations

### UI and Styling
- **tailwindcss**: Utility-first CSS framework
- **@radix-ui**: Headless UI components for accessibility
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Backend Services
- **express**: Node.js web framework
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **zod**: Runtime type validation

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **esbuild**: Fast JavaScript bundler for production builds

### Database and Storage
- **PostgreSQL**: Primary database (configured for Neon serverless)
- **connect-pg-simple**: PostgreSQL session store
- **drizzle-kit**: Database migration and introspection tool