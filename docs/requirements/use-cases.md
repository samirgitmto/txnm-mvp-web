# Use Cases

## 1. User Authentication and Registration

### 1.1 Google OAuth Login
**Primary Actor**: User
**Preconditions**: User has a Google account
**Main Flow**:
1. User clicks "Login with Google"
2. System redirects to Google OAuth
3. User authorizes the application
4. System creates/retrieves user account
5. System assigns FREE tier
6. System redirects to dashboard

**Alternative Flows**:
- A1: User denies authorization
- A2: User's email is already registered
- A3: Network error during OAuth

### 1.2 Guest Session
**Primary Actor**: Guest User
**Preconditions**: None
**Main Flow**:
1. User clicks "Continue as Guest"
2. System creates temporary session
3. System initializes Redis cache
4. System redirects to guest dashboard

**Alternative Flows**:
- A1: Session creation fails
- A2: Redis connection error

## 2. Bank Statement Processing

### 2.1 PDF Upload and Processing
**Primary Actor**: User/Guest
**Preconditions**: User is logged in or in guest session
**Main Flow**:
1. User uploads bank statement PDF
2. System validates file format and size
3. System processes PDF for data extraction
4. System categorizes transactions
5. System stores data (DB/Redis)
6. System generates initial analytics

**Alternative Flows**:
- A1: Invalid file format
- A2: File size exceeds limit
- A3: Processing fails
- A4: Tier limit reached (for registered users)

### 2.2 Statement Analysis
**Primary Actor**: User/Guest
**Preconditions**: Statement is processed
**Main Flow**:
1. User selects analysis period
2. System retrieves transaction data
3. System generates analytics
4. System displays results

**Alternative Flows**:
- A1: No data for selected period
- A2: Analysis generation fails

## 3. Premium Features

### 3.1 AI Chat Interaction
**Primary Actor**: Premium User
**Preconditions**: User has PREMIUM tier
**Main Flow**:
1. User initiates chat
2. System loads user context
3. User asks financial question
4. AI processes query
5. System generates response
6. System displays answer

**Alternative Flows**:
- A1: Query not understood
- A2: Context loading fails
- A3: AI service unavailable

### 3.2 Business Bill Analysis
**Primary Actor**: Premium Business User
**Preconditions**: User has PREMIUM tier and business account
**Main Flow**:
1. User uploads business bills
2. System processes bills
3. System generates business analytics
4. System sends email report
5. System updates dashboard

**Alternative Flows**:
- A1: Invalid bill format
- A2: Processing fails
- A3: Email delivery fails

## 4. Subscription Management

### 4.1 Tier Upgrade
**Primary Actor**: User
**Preconditions**: User has FREE or BASIC tier
**Main Flow**:
1. User selects new tier
2. System validates eligibility
3. System processes payment
4. System updates user tier
5. System enables new features

**Alternative Flows**:
- A1: Payment fails
- A2: Tier upgrade not available
- A3: System update fails

### 4.2 Usage Tracking
**Primary Actor**: System
**Preconditions**: User is active
**Main Flow**:
1. System tracks feature usage
2. System updates usage counters
3. System checks against limits
4. System sends notifications if needed

**Alternative Flows**:
- A1: Usage tracking fails
- A2: Limit exceeded
- A3: Notification delivery fails 