# Troubleshooting

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [package.json](file://package.json)
- [server.ts](file://server.ts)
- [index.ts](file://index.ts)
- [vite.config.ts](file://vite.config.ts)
- [scripts/setup-env.js](file://scripts/setup-env.js)
- [scripts/doctor.mjs](file://scripts/doctor.mjs)
- [scripts/setup-check.mjs](file://scripts/setup-check.mjs)
- [scripts/generate-env.mjs](file://scripts/generate-env.mjs)
- [src/App.tsx](file://src/App.tsx)
- [src/main.tsx](file://src/main.tsx)
- [src/agents/base.ts](file://src/agents/base.ts)
</cite>

## Table of Contents
1. Introduction
2. Project Structure
3. Core Components
4. Architecture Overview
5. Detailed Component Analysis
6. Dependency Analysis
7. Performance Considerations
8. Troubleshooting Guide
9. Conclusion
10. Appendices

## Introduction
This document provides comprehensive troubleshooting guidance for the ClientumLatam platform, focusing on environment setup, database connectivity, API integration errors, and performance bottlenecks. It includes diagnostic tool usage, logging configuration, error tracking strategies, step-by-step resolution guides, and debugging techniques for both frontend and backend issues, including memory leak detection and performance profiling approaches.

## Project Structure
The project is a Vite + React frontend with an Express-based Node.js server. Environment setup scripts assist in generating and validating .env files. The server initializes PostgreSQL pools, session stores, and various integrations (AI APIs, email, external services). The frontend mounts the React app and handles authentication state via /api/auth endpoints.

```mermaid
graph TB
subgraph "Frontend"
FE_Main["src/main.tsx"]
FE_App["src/App.tsx"]
end
subgraph "Build & Dev"
ViteCfg["vite.config.ts"]
PkgScripts["package.json"]
end
subgraph "Server"
ServerTS["server.ts"]
IndexTS["index.ts"]
end
subgraph "Environment & Tools"
SetupEnv["scripts/setup-env.js"]
Doctor["scripts/doctor.mjs"]
SetupCheck["scripts/setup-check.mjs"]
GenEnv["scripts/generate-env.mjs"]
end
FE_Main --> FE_App
FE_App --> ServerTS
ViteCfg --> FE_Main
PkgScripts --> ServerTS
IndexTS --> ServerTS
SetupEnv --> ServerTS
Doctor --> ServerTS
SetupCheck --> ServerTS
GenEnv --> ServerTS
```

**Diagram sources**
- [vite.config.ts:1-23](file://vite.config.ts#L1-L23)
- [package.json:1-64](file://package.json#L1-L64)
- [server.ts:1-120](file://server.ts#L1-L120)
- [index.ts:1-20](file://index.ts#L1-L20)
- [scripts/setup-env.js:1-260](file://scripts/setup-env.js#L1-L260)
- [scripts/doctor.mjs:1-271](file://scripts/doctor.mjs#L1-L271)
- [scripts/setup-check.mjs:1-264](file://scripts/setup-check.mjs#L1-L264)
- [scripts/generate-env.mjs:1-73](file://scripts/generate-env.mjs#L1-L73)

**Section sources**
- [README.md:1-21](file://README.md#L1-L21)
- [package.json:1-64](file://package.json#L1-L64)
- [vite.config.ts:1-23](file://vite.config.ts#L1-L23)
- [index.ts:1-20](file://index.ts#L1-L20)

## Core Components
- Express server with session management and PostgreSQL pool initialization
- Authentication endpoints (/api/auth/register, login, logout, me, forgot-password, reset-password)
- AI integration fallback logic for Gemini API calls
- Email sending via SMTP
- Health check and environment validation scripts

Key responsibilities:
- Environment variable loading and validation
- Database connection pooling and session storage
- Secure user registration/login flows with bcrypt hashing
- Robust error handling and fallbacks for external APIs

**Section sources**
- [server.ts:1-120](file://server.ts#L1-L120)
- [server.ts:266-381](file://server.ts#L266-L381)
- [server.ts:832-851](file://server.ts#L832-L851)
- [server.ts:854-978](file://server.ts#L854-L978)
- [server.ts:753-830](file://server.ts#L753-L830)

## Architecture Overview
The application uses a layered architecture:
- Frontend (React/Vite) communicates with the Express server via REST endpoints
- Server manages sessions, database operations, and third-party integrations
- Environment setup scripts ensure required variables are present and valid
- Health checks validate external service connectivity and latency

```mermaid
sequenceDiagram
participant Browser as "Browser (src/App.tsx)"
participant Vite as "Vite Dev Server"
participant Express as "Express Server (server.ts)"
participant DB as "PostgreSQL Pool"
participant AI as "Gemini API"
participant SMTP as "SMTP Service"
Browser->>Vite : Load App (src/main.tsx)
Vite-->>Browser : Render React App
Browser->>Express : GET /api/auth/me
Express->>DB : Query role by userId
DB-->>Express : Role info
Express-->>Browser : {user} or 401
Browser->>Express : POST /api/auth/login
Express->>DB : Lookup user by username/email
DB-->>Express : User record
Express->>Express : bcrypt.compare(password)
Express->>DB : Create session
Express-->>Browser : {user} with cookie
Browser->>Express : POST /api/auth/forgot-password
Express->>DB : Validate email, generate token
Express->>SMTP : Send reset email
SMTP-->>Express : Sent
Express-->>Browser : ok message
Browser->>Express : AI content generation request
Express->>AI : GenerateContent (with fallback models)
AI-->>Express : Response or error
Express-->>Browser : Content or fallback response
```

**Diagram sources**
- [src/App.tsx:50-88](file://src/App.tsx#L50-L88)
- [server.ts:340-381](file://server.ts#L340-L381)
- [server.ts:832-851](file://server.ts#L832-L851)
- [server.ts:753-830](file://server.ts#L753-L830)
- [server.ts:880-971](file://server.ts#L880-L971)

## Detailed Component Analysis

### Environment Setup and Validation
The environment setup process ensures all required variables are configured before running the application. Scripts provide interactive prompts, default values, and validation.

```mermaid
flowchart TD
Start(["Run setup: npm run setup:env"]) --> CheckExample[".env.example exists?"]
CheckExample --> |No| ErrorExit["Exit with error"]
CheckExample --> |Yes| ParseFiles["Parse .env.example and existing .env"]
ParseFiles --> Interactive{"Interactive mode?"}
Interactive --> |Yes| PromptUser["Prompt for missing keys"]
Interactive --> |No| UseDefaults["Use defaults for missing keys"]
PromptUser --> WriteEnv["Write updated .env file"]
UseDefaults --> WriteEnv
WriteEnv --> ValidateSecrets["Run setup-check.mjs to validate secrets"]
ValidateSecrets --> Done(["Setup complete"])
```

**Diagram sources**
- [scripts/setup-env.js:130-254](file://scripts/setup-env.js#L130-L254)
- [scripts/setup-check.mjs:187-261](file://scripts/setup-check.mjs#L187-L261)

**Section sources**
- [scripts/setup-env.js:1-260](file://scripts/setup-env.js#L1-L260)
- [scripts/setup-check.mjs:1-264](file://scripts/setup-check.mjs#L1-L264)
- [scripts/generate-env.mjs:1-73](file://scripts/generate-env.mjs#L1-L73)

### Database Connectivity and Session Management
The server initializes PostgreSQL connections and session storage. When DATABASE_URL is not configured, it falls back to a mock implementation for development.

```mermaid
classDiagram
class DatabasePool {
+connectionString string
+ssl boolean
+query(sql, values) Promise
+connect() Promise
+on(event, handler) void
}
class SessionStore {
+pool DatabasePool
+tableName string
+createTableIfMissing boolean
+get(sessionId) Promise
+set(sessionId, data) Promise
+destroy(sessionId) Promise
}
class ExpressApp {
+use(middleware) void
+post(path, handler) void
+get(path, handler) void
}
DatabasePool <.. SessionStore : "uses"
ExpressApp --> DatabasePool : "initializes"
ExpressApp --> SessionStore : "configures"
```

**Diagram sources**
- [server.ts:24-77](file://server.ts#L24-L77)

**Section sources**
- [server.ts:24-77](file://server.ts#L24-L77)

### Authentication Flow and Security
Authentication endpoints handle user registration, login, logout, and password reset with proper security measures including bcrypt hashing and session management.

```mermaid
sequenceDiagram
participant Client as "Client"
participant Auth as "Auth Endpoints"
participant DB as "Database"
participant Mail as "Email Service"
Client->>Auth : POST /api/auth/register
Auth->>DB : Check if user exists
DB-->>Auth : User status
Auth->>DB : Hash password and insert user
Auth->>Client : 201 Created with user data
Client->>Auth : POST /api/auth/login
Auth->>DB : Find user by username/email
DB-->>Auth : User record
Auth->>Auth : Verify password hash
Auth->>DB : Create session
Auth->>Client : 200 OK with user data
Client->>Auth : POST /api/auth/forgot-password
Auth->>DB : Validate email exists
Auth->>Mail : Send reset email with token
Mail-->>Auth : Email sent
Auth->>Client : 200 OK with success message
```

**Diagram sources**
- [server.ts:266-338](file://server.ts#L266-L338)
- [server.ts:340-381](file://server.ts#L340-L381)
- [server.ts:753-830](file://server.ts#L753-L830)

**Section sources**
- [server.ts:266-381](file://server.ts#L266-L381)
- [server.ts:753-830](file://server.ts#L753-L830)

### AI Integration and Fallback Logic
The server implements robust AI integration with multiple fallback mechanisms for when the primary AI service is unavailable or rate-limited.

```mermaid
flowchart TD
Start(["AI Request Received"]) --> CheckAPI{"GEMINI_API_KEY configured?"}
CheckAPI --> |No| LocalFallback["Use local intelligent fallback"]
CheckAPI --> |Yes| TryModels["Try primary model"]
TryModels --> ModelSuccess{"Model call successful?"}
ModelSuccess --> |Yes| ReturnResponse["Return AI response"]
ModelSuccess --> |No| CheckError{"Error type?"}
CheckError --> |Rate Limit| NextModel["Try next model"]
CheckError --> |Transient| Retry["Retry with backoff"]
CheckError --> |Permanent| LocalFallback
NextModel --> TryModels
Retry --> TryModels
LocalFallback --> ReturnLocal["Return structured fallback response"]
ReturnResponse --> End(["Complete"])
ReturnLocal --> End
```

**Diagram sources**
- [server.ts:854-978](file://server.ts#L854-L978)

**Section sources**
- [server.ts:854-978](file://server.ts#L854-L978)

### Frontend Authentication State Management
The React frontend manages authentication state by checking the current session and handling logout functionality.

```mermaid
sequenceDiagram
participant App as "App Component"
participant API as "/api/auth/me"
participant Storage as "Session Cookie"
App->>API : GET /api/auth/me
API-->>App : {user} or 401
App->>App : Update currentUser state
App->>Storage : Read session cookie
App->>App : Set auth state based on response
App->>API : POST /api/auth/logout
API-->>App : Clear session
App->>App : Reset currentUser state
```

**Diagram sources**
- [src/App.tsx:50-88](file://src/App.tsx#L50-L88)

**Section sources**
- [src/App.tsx:1-177](file://src/App.tsx#L1-L177)

## Dependency Analysis
The application has several key dependencies that can cause issues during setup and runtime:

```mermaid
graph TB
subgraph "Core Dependencies"
Express["express@^4.21.2"]
PG["pg@^8.22.0"]
Session["express-session@^1.19.0"]
ConnectPG["connect-pg-simple@^10.0.0"]
end
subgraph "AI & External Services"
GoogleGenAI["@google/genai@^2.4.0"]
Nodemailer["nodemailer@^9.0.3"]
Firebase["firebase@^12.17.0"]
Supabase["@supabase/supabase-js@^2.111.0"]
end
subgraph "Development Tools"
Vite["vite@^6.2.3"]
TSX["tsx@^4.1.1"]
TypeScript["typescript~5.8.2"]
end
Express --> Session
Session --> ConnectPG
ConnectPG --> PG
GoogleGenAI --> Express
Nodemailer --> Express
Firebase --> Express
Supabase --> Express
```

**Diagram sources**
- [package.json:15-46](file://package.json#L15-L46)

**Section sources**
- [package.json:1-64](file://package.json#L1-L64)

## Performance Considerations
Key performance considerations include:
- Database connection pooling configuration
- AI API rate limiting and fallback mechanisms
- Session storage efficiency
- Frontend bundle optimization
- Memory management for long-running processes

Common performance bottlenecks:
- Insufficient database connection limits
- Missing indexes on frequently queried tables
- Inefficient AI API calls without proper caching
- Large frontend bundles affecting load times

**Section sources**
- [server.ts:24-77](file://server.ts#L24-L77)
- [server.ts:880-971](file://server.ts#L880-L971)

## Troubleshooting Guide

### Environment Setup Issues

#### Problem: Missing or invalid environment variables
**Symptoms:**
- Application fails to start
- Runtime errors about missing configuration
- Mock implementations being used instead of real services

**Resolution Steps:**
1. Run the environment setup script: `npm run setup:env`
2. Verify all required variables are set in `.env` file
3. Use the doctor script to check service connectivity: `node scripts/doctor.mjs`
4. Validate secrets with setup-check script: `node scripts/setup-check.mjs`

**Diagnostic Tools:**
- `scripts/setup-env.js` - Interactive environment setup
- `scripts/doctor.mjs` - Service health checks
- `scripts/setup-check.mjs` - Secret validation

**Section sources**
- [scripts/setup-env.js:130-254](file://scripts/setup-env.js#L130-L254)
- [scripts/doctor.mjs:222-271](file://scripts/doctor.mjs#L222-L271)
- [scripts/setup-check.mjs:187-261](file://scripts/setup-check.mjs#L187-L261)

### Database Connectivity Issues

#### Problem: Cannot connect to PostgreSQL
**Symptoms:**
- Connection timeout errors
- ENOTFOUND DNS resolution failures
- SSL handshake errors
- Maximum connection limit exceeded

**Resolution Steps:**
1. Verify DATABASE_URL format: `postgresql://user:password@host:port/dbname`
2. Check network connectivity to database host
3. Validate SSL configuration for production environments
4. Monitor connection pool usage and adjust limits if needed

**Common Error Patterns:**
- `ENOTFOUND` - Incorrect hostname or DNS resolution failure
- `ECONNREFUSED` - Database server not accepting connections
- `SSL handshake failed` - SSL certificate or configuration issues
- `too many connections` - Connection pool exhaustion

**Diagnostic Commands:**
```bash
# Test database connectivity
node -e "const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL }); pool.query('SELECT 1').then(() => console.log('Connected')).catch(console.error);"

# Check connection pool status
node scripts/doctor.mjs
```

**Section sources**
- [server.ts:24-77](file://server.ts#L24-L77)
- [scripts/doctor.mjs:35-50](file://scripts/doctor.mjs#L35-L50)

### API Integration Errors

#### Problem: Authentication failures
**Symptoms:**
- 401 Unauthorized responses
- Session cookie not being set
- Login/logout not working properly

**Resolution Steps:**
1. Verify SESSION_SECRET is properly configured
2. Check browser cookies and session storage
3. Validate CORS settings if using different domains
4. Ensure secure cookie settings match deployment environment

**Debugging Techniques:**
- Check server logs for authentication errors
- Inspect browser developer tools Network tab
- Verify session middleware configuration
- Test endpoints directly with curl or Postman

**Section sources**
- [server.ts:107-125](file://server.ts#L107-L125)
- [server.ts:340-381](file://server.ts#L340-L381)

#### Problem: AI API integration failures
**Symptoms:**
- Rate limiting errors (429)
- Service unavailable (503)
- Invalid API key errors
- Fallback mechanisms not working

**Resolution Steps:**
1. Verify GEMINI_API_KEY is correctly set
2. Check API quota and billing status
3. Monitor fallback mechanism behavior
4. Implement proper error handling and retry logic

**Diagnostic Approaches:**
- Use doctor script to test AI service connectivity
- Monitor server logs for AI API calls
- Implement request/response logging
- Test with different AI models as fallback

**Section sources**
- [server.ts:854-978](file://server.ts#L854-L978)
- [scripts/doctor.mjs:52-67](file://scripts/doctor.mjs#L52-L67)

### Performance Bottlenecks

#### Problem: Slow database queries
**Symptoms:**
- High query execution times
- Connection pool exhaustion
- Memory pressure on database server

**Resolution Steps:**
1. Enable pg_stat_statements extension for query analysis
2. Add appropriate indexes for frequently queried columns
3. Optimize query patterns and reduce N+1 queries
4. Configure connection pool sizes appropriately

**Performance Monitoring:**
```sql
-- Enable query statistics
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find slow queries
SELECT query, calls, mean_exec_time 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;

-- Monitor connection usage
SELECT count(*), state FROM pg_stat_activity GROUP BY state;
```

**Section sources**
- [.agents/skills/supabase-postgres-best-practices/references/monitor-pg-stat-statements.md:1-56](file://.agents/skills/supabase-postgres-best-practices/references/monitor-pg-stat-statements.md#L1-L56)

#### Problem: Frontend performance issues
**Symptoms:**
- Slow page loads
- High memory usage in browser
- Unresponsive UI interactions

**Resolution Steps:**
1. Analyze bundle size and implement code splitting
2. Optimize images and static assets
3. Implement proper React component lifecycle management
4. Use browser developer tools for performance profiling

**Diagnostic Tools:**
- Chrome DevTools Performance tab
- React Developer Tools Profiler
- Bundle analyzer for dependency analysis

**Section sources**
- [vite.config.ts:14-20](file://vite.config.ts#L14-L20)

### Memory Leak Detection

#### Common Memory Leak Sources:
- Unclosed database connections
- Event listeners not being removed
- Large object references in components
- Improper cleanup in async operations

**Detection Techniques:**
1. Use Node.js heap snapshots for backend analysis
2. Monitor browser memory usage with Chrome DevTools
3. Implement memory profiling in development
4. Track connection pool usage over time

**Prevention Strategies:**
- Always close database connections properly
- Remove event listeners in component cleanup
- Use WeakRef for large object caches
- Implement proper error handling to prevent resource leaks

**Section sources**
- [src/agents/base.ts:53-73](file://src/agents/base.ts#L53-L73)

### Logging Configuration and Error Tracking

#### Backend Logging Strategy:
- Structured logging with timestamps and context
- Error categorization and severity levels
- Request correlation IDs for tracing
- Performance metrics collection

#### Frontend Error Tracking:
- Global error boundaries
- API error handling with user feedback
- Console logging for development
- Performance monitoring integration

**Best Practices:**
- Log meaningful error messages with context
- Avoid logging sensitive information
- Implement log rotation and retention policies
- Use centralized logging for distributed systems

**Section sources**
- [server.ts:1-120](file://server.ts#L1-L120)

## Conclusion
This troubleshooting guide provides comprehensive coverage of common issues encountered when setting up and running the ClientumLatam platform. By following the diagnostic steps, utilizing the provided tools, and implementing the recommended solutions, users can effectively resolve environment setup problems, database connectivity issues, API integration errors, and performance bottlenecks. Regular monitoring, proper logging, and proactive maintenance will help ensure optimal platform performance and reliability.

## Appendices

### Quick Reference Commands

#### Development Commands
```bash
# Install dependencies
npm install

# Setup environment
npm run setup:env

# Start development server
npm run dev

# Build for production
npm run build

# Run health checks
node scripts/doctor.mjs

# Validate secrets
node scripts/setup-check.mjs
```

#### Environment Variables Checklist
- **Required:** DATABASE_URL, SESSION_SECRET, GEMINI_API_KEY
- **Optional:** SMTP_USER, SMTP_PASS, CRM_INTERNAL_TOKEN, SANTI_API_KEY
- **External Services:** NEON_DATABASE_URL, APIFY_API_TOKEN, GOOGLE_MAPS_PLATFORM_KEY

**Section sources**
- [package.json:6-14](file://package.json#L6-L14)
- [scripts/setup-env.js:14-85](file://scripts/setup-env.js#L14-L85)