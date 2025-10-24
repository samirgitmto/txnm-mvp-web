# Sequence Diagrams

## 1. User Authentication Flow

### 1.1 Google OAuth Login
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Google
    participant Database
    participant Redis

    User->>Frontend: Click "Login with Google"
    Frontend->>Google: Redirect to OAuth
    Google->>User: Show consent screen
    User->>Google: Authorize
    Google->>Frontend: Return auth code
    Frontend->>Backend: Send auth code
    Backend->>Google: Verify token
    Google->>Backend: Return user info
    Backend->>Database: Check user exists
    alt New User
        Database->>Backend: User not found
        Backend->>Database: Create user (FREE tier)
    else Existing User
        Database->>Backend: Return user data
    end
    Backend->>Redis: Create session
    Backend->>Frontend: Return session token
    Frontend->>User: Redirect to dashboard
```

### 1.2 Guest Session
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Redis

    User->>Frontend: Click "Continue as Guest"
    Frontend->>Backend: Request guest session
    Backend->>Redis: Create temporary session
    Redis->>Backend: Session created
    Backend->>Frontend: Return session token
    Frontend->>User: Redirect to guest dashboard
```

## 2. Bank Statement Processing

### 2.1 PDF Upload and Analysis
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant PDFProcessor
    participant Database
    participant Redis
    participant Analytics

    User->>Frontend: Upload PDF
    Frontend->>Backend: Send PDF
    Backend->>Backend: Validate file
    alt Guest User
        Backend->>Redis: Store PDF data
    else Registered User
        Backend->>Database: Store PDF data
    end
    Backend->>PDFProcessor: Process PDF
    PDFProcessor->>Backend: Return extracted data
    Backend->>Analytics: Generate insights
    Analytics->>Backend: Return analytics
    alt Guest User
        Backend->>Redis: Store analytics
    else Registered User
        Backend->>Database: Store analytics
    end
    Backend->>Frontend: Return results
    Frontend->>User: Display dashboard
```

## 3. Premium Features

### 3.1 AI Chat Interaction
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant AIService
    participant Database
    participant Cache

    User->>Frontend: Ask question
    Frontend->>Backend: Send query
    Backend->>Database: Load user context
    Backend->>Cache: Check cached response
    alt Cached Response
        Cache->>Backend: Return cached answer
    else No Cache
        Backend->>AIService: Process query
        AIService->>Backend: Generate response
        Backend->>Cache: Cache response
    end
    Backend->>Frontend: Return answer
    Frontend->>User: Display response
```

### 3.2 Business Bill Analysis
```mermaid
sequenceDiagram
    participant Business
    participant Frontend
    participant Backend
    participant BillProcessor
    participant AIService
    participant EmailService
    participant Database

    Business->>Frontend: Upload bills
    Frontend->>Backend: Send bills
    Backend->>BillProcessor: Process bills
    BillProcessor->>Backend: Return data
    Backend->>AIService: Generate insights
    AIService->>Backend: Return analytics
    Backend->>Database: Store results
    Backend->>EmailService: Send report
    EmailService->>Business: Deliver report
    Backend->>Frontend: Update dashboard
    Frontend->>Business: Show analytics
```

## 4. Subscription Management

### 4.1 Tier Upgrade
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant PaymentGateway
    participant Database
    participant Redis

    User->>Frontend: Select new tier
    Frontend->>Backend: Request upgrade
    Backend->>PaymentGateway: Process payment
    PaymentGateway->>Backend: Payment success
    Backend->>Database: Update user tier
    Backend->>Redis: Update cache
    Backend->>Frontend: Confirm upgrade
    Frontend->>User: Show new features
``` 