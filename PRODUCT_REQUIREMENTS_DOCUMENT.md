# AgriConnect - Product Requirements Document (PRD)

**Document Version**: 1.0  
**Last Updated**: April 5, 2026  
**Project**: AgriConnect Frontend Application  
**Platform**: Web (React + Vite)

---

## 📋 Executive Summary

AgriConnect is a comprehensive agricultural technology platform designed to bridge the gap between farmers, agricultural experts, and market opportunities. The platform enables farmers to manage their crops, access expert guidance, participate in a secure community, and discover market opportunities. It empowers experts to provide consultation services and reach a broader audience. Administrators can manage users and moderate content.

**Key Metrics**:
- 50,000+ registered farmers
- 1,200+ expert consultants
- 5,000+ learning resources
- 100,000+ community connections

---

## 🎯 Product Vision & Goals

### Vision
Democratize agricultural knowledge and market access by creating a unified platform where farmers can grow sustainably, experts can share knowledge, and market players can connect with producers.

### Goals
1. **Empower Farmers** - Provide tools for crop management, expert advice, and market discovery
2. **Enable Experts** - Create revenue opportunities and knowledge-sharing platform
3. **Facilitate Markets** - Connect buyers, job providers, and grant opportunities with farmers
4. **Build Community** - Foster peer-to-peer learning and support through forums
5. **Simplify Administration** - Provide Admin tools for user management and content moderation

---

## 👥 Target Users & Personas

### User Roles

| Role | Description | Key Needs | Platform Access |
|------|-------------|-----------|-----------------|
| **Farmer** | Individual or small farm operators using AgriConnect to improve yields and market access | Crop management, expert advice, weather info, market prices, employment/sales opportunities | Full platform access |
| **Expert** | Agricultural professionals providing consultation and knowledge | Reach farmers, manage consultations, share resources, build reputation | Community access, consultation management |
| **Administrator** | Platform staff managing users and content | User management, content moderation, platform analytics | Admin dashboard only |
| **Public User** | Prospective users browsing learning resources and community | Free learning access, community participation | Learning and Community features |

---

## 🏗️ Core Features by User Role

### 🚀 **FARMER FEATURES**

#### 1. **Dashboard & Crop Management**
- **Full Crop Lifecycle Management**
  - Add new crops with details (name, type, planted area, variety, planting date)
  - View all crops with health status
  - Update crop information as seasons progress
  - Delete crop records when needed
  - Track crop health metrics

- **Farm Statistics**
  - Real-time dashboard metrics (total crops, farm area, yield data)
  - Task management for farm operations
  - Visual representation of farm data

#### 2. **Weather Integration**
- **Real-Time Weather Data**
  - Current temperature, weather condition, and wind speed
  - Humidity and UV index monitoring
  - Location-based weather tracking (latitude/longitude)
  - 4-day weather forecast with daily breakdowns
  
- **Alert System** (prepared for backend integration)
  - Severe weather notifications
  - Optimal planting window reminders

#### 3. **Market Information & Opportunities**
- **Real-Time Market Prices**
  - Current crop prices (₹/quintal)
  - Price trend visualization (up/down indicators)
  - 4+ major crop types tracked
  - Historical price trends

- **Market Opportunities Discovery**
  - **Buyer Connections** - Find direct buyers for crops
  - **Employment Opportunities** - Agricultural jobs and seasonal work
  - **Grants & Subsidies** - Government schemes and funding
  - **Filtering & Search** - Find opportunities by type, location, deadline
  - **Details View** - Pricing, locations, deadlines, contact information

#### 4. **Expert Consultation**
- **Browse Agricultural Experts**
  - Search experts by specialty (Crop Management, Soil Science, Pest Control, etc.)
  - View expert profiles with ratings and qualifications
  - Review consultation rates

- **Request Consultation**
  - Direct consultation requests to experts
  - Manage ongoing consultations
  - View consultation history and results

#### 5. **Learning Resources**
- **Resource Library Access**
  - Videos (production demos, pest management)
  - Articles (best practices, seasonal guides)
  - Courses (structured learning programs)
  - Webcasts (live specialist sessions)
  
- **Resource Features**
  - Search functionality
  - Filter by type and category
  - View metadata (duration, modules, instructor)
  - Track learning progress
  - Mark resources as complete

#### 6. **Community Forum**
- **Browse Forum Threads**
  - View all community discussions
  - Search and filter threads by topic
  - Pagination support

- **Thread Management**
  - Create new discussion threads
  - Reply to existing threads
  - View thread details with all replies
  - User avatars and information

- **Connect with Farmers**
  - View farmer profiles
  - Send connection requests
  - Build farming network

#### 7. **Profile & Settings**
- **Profile Management**
  - View/update name, email, phone, address
  - Avatar/profile picture upload
  - Role information
  - Farm details (size, location, crops grown, years in farming)

- **Settings**
  - Notification preferences (email, SMS, in-app)
  - Appearance settings (light/dark theme)
  - Security settings (password change, 2FA - prepared)
  - Specialized farm settings (crop focus areas, consultation preferences)

#### 8. **Task Management**
- Create farming tasks/reminders
- Schedule operations (irrigation, fertilization, pest spraying)
- Track task completion
- Set task deadlines

---

### 👨‍🏫 **EXPERT FEATURES**

#### 1. **Expert Profile & Reputation**
- **Professional Profile**
  - Upload credentials and certifications
  - Set consultation specialties (min 1, max 5)
  - Add qualifications and experience
  - Manage consultation rates
  - View rating and reviews from farmers

#### 2. **Consultation Management**
- **Receive Consultation Requests**
  - See incoming farmer consultation requests
  - Review farmer's crop details and questions
  - Accept/decline requests with explanations

- **Manage Active Consultations**
  - View list of active consultations
  - Share advice and recommendations
  - Send follow-up guidance
  - Mark consultation as complete

- **Consultation Analytics**
  - Track total consultations completed
  - View earnings from consultations
  - See farmer ratings and reviews

#### 3. **Community Participation**
- Share expertise in forum threads
- Reply to farmer questions
- Build authority and reputation
- Participate in discussions

#### 4. **Resource Contribution** (prepared for backend)
- Create learning resources
- Publish articles or guides
- Upload tutorial videos
- Earn revenue from resource views

#### 5. **Profile & Settings**
- Consultation specialties management
- Rate/availability management
- Notification preferences
- Account security

---

### 🛡️ **ADMIN FEATURES**

#### 1. **Dashboard & Analytics**
- **Key Metrics**
  - Total users (Farmers, Experts, Admins, Public)
  - Active sessions count
  - Platform engagement metrics
  - Recent activity summary

#### 2. **User Management**
- **User Listing & Search**
  - View all registered users in tabular format
  - Search users by email or name
  - Filter by role (Farmer, Expert, Admin, Public)
  - Pagination support

- **User Actions**
  - View detailed user profiles
  - Deactivate/delete user accounts
  - Reset user passwords (prepared for backend)
  - View user activity logs

- **Bulk Operations** (prepared for backend)
  - Export user lists
  - Send bulk notifications
  - Manage user roles

#### 3. **Content Moderation**
- **Moderation Queue**
  - Review reported forum threads
  - Review reported comments/replies
  - View reported user profiles
  - Reported resource management

- **Moderation Actions**
  - Approve content
  - Reject and remove inappropriate content
  - Issue warnings to users
  - Suspend user accounts for violations
  - Add moderation notes

- **Content Guidelines**
  - Monitor spam postings
  - Check for inappropriate language
  - Verify resource quality
  - Ensure data accuracy

#### 4. **Resource Management** (prepared for backend)
- Approve expert-contributed resources
- Review and publish learning content
- Manage resource categories
- Archive deprecated content

#### 5. **System Monitoring** (prepared for backend)
- API performance metrics
- Database status
- Error rate tracking
- User activity logs

---

### 🌍 **PUBLIC/GUEST USER FEATURES**

#### 1. **Learning Resources Access**
- Browse all learning resources
- Search and filter by type
- View resource details
- Access free educational content
- Track personal learning progress

#### 2. **Community Forums**
- Read forum threads (read-only access planned or limited participation)
- Search discussions
- View expert responses

#### 3. **Platform Information**
- View platform features
- Read testimonials
- Access help documentation
- Contact support

---

## 🎨 Feature Details & Specifications

### PAGE-BY-PAGE BREAKDOWN

#### 1. **Home Page** (`/`)
**Purpose**: Platform introduction and user acquisition  
**Features**:
- Hero banner with main CTA ("Get Started")
- Platform value proposition
- 6 core features showcased:
  1. Expert Guidance - Access agricultural professionals
  2. Learning Resources - 5000+ educational materials
  3. Market Opportunities - Connect with buyers and opportunities
  4. Crop Management - Complete farm tracking
  5. Market Trends - Real-time price insights
  6. Secure Community - Peer-to-peer networking

- **Statistics Section**
  - 50,000+ farmers actively using platform
  - 1,200+ expert consultants
  - 5,000+ learning resources available
  - 100,000+ community connections established

- **Testimonials** (3 featured user stories)
  - Success stories from farmers and experts
  - Real quotes about platform impact
  - User avatars and roles

- **Call-to-Action Buttons**
  - Sign up link
  - Learn more links
  - Browse resources
  - Connect with experts

**Access**: Public (no authentication required)

---

#### 2. **Login/Authentication** (`/login`)
**Purpose**: User authentication and account access  
**Features**:
- **Role-Based Login Tabs** (4 tabs)
  1. **Farmer Tab**
     - Description: "Access your farm dashboard and tools"
     - Login form with email/password
  
  2. **Expert Tab**
     - Description: "Manage consultations and reach farmers"
     - Login form with email/password
  
  3. **Public Tab**
     - Description: "Browse resources and join community"
     - Login form with email/password
  
  4. **Admin Tab**
     - Description: "Access administration dashboard"
     - Login form with email/password

- **Login Form Components**
  - Email input with validation (valid email format required)
  - Password input with mask
  - "Remember me" checkbox
  - "Forgot password?" link (prepared for backend)
  - Login button with loading state
  - Error message display

- **Sign Up Section**
  - Toggle to switch to sign up
  - **Sign Up Form Fields**
    - First Name (required)
    - Last Name (required)
    - Email (required, must be valid)
    - Password (required, min 8 characters)
    - Confirm Password (must match)
    - Account Type dropdown (Farmer, Expert, Admin)
    - Phone number (optional)
    - Address (optional)
  
  - **Validation Rules**
    - Email format validation
    - Password strength (8+ chars prepared)
    - Confirm password matching
    - Required field validation
  
  - **Error Handling**
    - Invalid credentials alert
    - Network error messages
    - Server error responses
    - Duplicate email handling

- **Remember Me Functionality**
  - Persist login state (30 days)
  - Auto-login on return

**Access**: Public (no authentication required)

---

#### 3. **Dashboard** (`/dashboard`) - Farmer Only
**Purpose**: Central hub for farm management  
**Features**:

**Section 1: Farm Overview**
- Quick stats cards showing:
  - Total crops currently growing
  - Total farm area (hectares)
  - Average yield
  - Upcoming tasks count

**Section 2: Crop Management**
- **View Crops List**
  - Card/table view of all crops
  - Crop name, variety, area planted, health status
  - Filter by crop type
  - Sort by date added

- **Add New Crop**
  - Modal dialog form with fields:
    - Crop name (required)
    - Crop type/variety
    - Area planted (sq meters/hectares)
    - Planting date
    - Expected harvest date
    - Soil type
    - Irrigation type
    - Crop image upload
  
  - **Crop Details View**
    - Full crop information
    - Health status with indicators
    - Last care actions
    - Recommendations based on health

- **Update Crop**
  - Edit any crop information
  - Update health status
  - Add care notes

- **Delete Crop**
  - Confirm deletion dialog
  - Soft delete with archive option

**Section 3: Weather Widget**
- **Current Weather Card**
  - Temperature display (large, centered)
  - Weather condition (sunny, rainy, etc.)
  - Location display
  - Wind speed with icon
  - Humidity percentage
  - UV index level

- **4-Day Forecast**
  - Daily cards showing:
    - Day and date
    - High/low temperature
    - Condition icon
    - Precipitation chance
    - Wind direction and speed

- **Location Management**
  - Use GPS location
  - Manual location entry
  - Saved location preferences

**Section 4: Market Prices Widget**
- **Price Table Display**
  - Columns: Crop Name, Current Price (₹/quintal), Price Change (%), Trend (up/down arrow)
  - 4+ major crops shown (Wheat, Rice, Maize, Cotton)
  - Color coding for price changes (green up, red down)
  - Refresh data button
  - Last updated timestamp

- **Price Trends**
  - Mini chart showing price history
  - Weekly average
  - Monthly trends

**Section 5: Tasks/Reminders**
- **Calendar View**
  - Monthly calendar with highlighted task dates
  - Task indicators (color-coded by priority)

- **Task List**
  - Upcoming tasks listed chronologically
  - Task priority levels (High, Medium, Low)
  - Task status (Pending, In Progress, Completed)
  - Mark complete checkbox
  - Edit task button
  - Delete task button

**Create Task Modal**
- Task name/description
- Due date picker
- Priority selector
- Task category (Irrigation, Fertilization, Pest Control, Harvesting, etc.)
- Reminder notification settings

**Access**: Farmer role only, requires authentication

---

#### 4. **Learning Page** (`/learning`)
**Purpose**: Educational resource access for skill development  
**Features**:

**Resource Library**
- **Browse All Resources**
  - Grid/list view toggle
  - Display resource cards with:
    - Thumbnail image
    - Title
    - Instructor/creator name
    - Type badge (Video, Article, Course, Webcast)
    - Duration/length
    - Difficulty level (Beginner, Intermediate, Advanced)
    - Star rating
    - Learner count

**Search & Filter**
- **Search Bar**
  - Real-time search by title or keywords
  - Search suggestions dropdown

- **Filter Options**
  - By Resource Type (Video, Article, Course, Webcast)
  - By Category:
    - Crop Management
    - Soil Science
    - Pest Management
    - Irrigation Techniques
    - Fertilization
    - Weather & Climate
    - Business Skills
    - Technology
  
  - By Difficulty (Beginner, Intermediate, Advanced)
  - By Duration (< 30 min, 30-60 min, > 60 min)
  - By Rating (4.5+, 4.0+, 3.5+)
  - By Newest/Most Popular

**Resource Details Modal**
- Full description
- Instructor profile and credentials
- Module breakdown (for courses)
- Learner reviews and ratings
- Prerequisites (if any)
- Time estimate
- Certificate of completion info

**Learning Progress**
- Mark resource as complete
- Progress bar showing completion percentage
- Save to favorites/bookmarks
- Download option (if available)
- Share resource link

**Recommendations**
- Personalized suggestions based on:
  - User role (Farmer, Expert, Public)
  - Crops they grow
  - Topics they previously viewed
  - Expert recommendations

**Access**: Farmer, Expert, Public users (no authentication required for Public view)

---

#### 5. **Community Forum** (`/community`)
**Purpose**: Peer-to-peer knowledge sharing and networking  
**Features**:

**Forum Threads List**
- **Browse Threads**
  - Thread cards showing:
    - Thread title
    - Author name and avatar
    - Post date
    - Category tags (Crop Disease, Pest Management, Soil Health, Irrigation, etc.)
    - Number of replies/views
    - Last reply date
    - Thread status (Open, Resolved)

- **Thread Sorting**
  - Recently updated first (default)
  - Most replies
  - Newest first
  - By category
  - By author

**Search & Filter**
- **Search**
  - Full-text search in thread titles and content
  - Search suggestions

- **Filter by**
  - Category (Crop Disease, Irrigation, Marketing, Equipment, etc.)
  - Status (Open, Resolved)
  - Author role (Expert, Farmer)
  - Date range (Last week, Last month, Anytime)

**Create New Thread**
- **Thread Creation Modal**
  - Thread title (required, max 200 chars)
  - Category selector (required)
  - Detailed description/content (required)
  - Image/screenshot upload (optional)
  - Tag/topic keywords (optional)
  - Mark as anonymous option

**View Thread Details**
- Full thread content
- Author profile (name, role, avatar, expertise badges if expert)
- Thread creation date and last updated date
- View count and like count

**Reply System**
- **View All Replies**
  - Chronological or useful (likes) sorting
  - Pagination (10 replies per page)
  - Nested replies support

- **Reply Card Content**
  - Author name, role, avatar
  - Reply creation date
  - Reply text content
  - Image/attachments if any
  - Like/helpful button with count
  - Mark as solution (for thread creator)

**Create Reply**
- **Reply Form**
  - Text editor with formatting (bold, italic, lists)
  - @mention username support
  - Image/screenshot attachment
  - Submit button

**Thread Management**
- Edit own posts (for creator)
- Delete own posts (for creator)
- Report inappropriate content
- Watch thread for updates
- Share thread link
- Pin helpful threads (Expert/Admin only)

**Notifications**
- Reply notifications
- Thread starter notifications
- @mention notifications

**Access**: Farmer, Expert, Public users; authentication may be required for creating threads

---

#### 6. **Experts Directory** (`/experts`)
**Purpose**: Connect farmers with agricultural professionals  
**Features**:

**Browse Experts**
- **Expert Listing**
  - Expert cards displaying:
    - Profile picture/avatar
    - Full name
    - Specialties (primary expertise areas)
    - Years of experience
    - Star rating (1-5)
    - Number of consultations completed
    - Consultation rate (₹/hour or per session)
    - Availability status (Available/Unavailable)

- **Grid/List View Toggle**

**Search & Filter**
- **Search Bar**
  - Search by expert name
  - Search by specialty

- **Filter Options**
  - By Specialty (Crop Management, Soil Science, Pest Control, Irrigation, etc.)
  - By Experience (< 5 years, 5-10 years, 10+ years)
  - By Rating (4.5+, 4.0+, 3.5+)
  - By Price Range (₹500-1000, ₹1000-2000, ₹2000+)
  - Availability status
  - Language spoken

**Expert Profile Details**
- **Full Profile View Modal**
  - Professional photo
  - Full name, title, credentials
  - Detailed bio
  - Education and certifications
  - List of specialties with depth in each
  - Years of experience
  - Consultation rates for different types
  - Availability calendar (time slots)
  - 4+ star reviews from farmers
  - Review comments and ratings
  - Success stories/case studies

**Request Consultation**
- **Consultation Request Form**
  - Select consultation duration (30 min, 1 hour, custom)
  - Choose preferred time slot from availability
  - Describe issue/question (required, min 50 chars)
  - Attach relevant photos or documents (optional)
  - Select crop/topic focus area
  - Budget range

- **After Request Submission**
  - Confirmation message
  - Order number
  - Payment details (if applicable)
  - Expert response expected time

**View Consultation Status**
- List of ongoing consultations with expert
- Past consultation history
- Consultation status (Pending, In Progress, Completed)
- Feedback/rating option after consultation

**Connect with Experts**
- Send connection request
- View connection status
- Manage connections list

**Access**: Farmer role (any authenticated user can browse), Expert/Admin visible to appropriate roles

---

#### 7. **Market Opportunities** (`/opportunities`)
**Purpose**: Discover and access market channels and employment  
**Features**:

**Opportunities Categories**
- **Tab Navigation Between:**
  1. Buyer Connections
  2. Employment Opportunities
  3. Grants & Subsidies
  4. Other Market Links

**Buyer Connections**
- **Opportunity Listings**
  - Buyer organization name
  - Crops/products they purchase
  - Minimum quantity required
  - Price offered (₹/unit or per kg)
  - Quality standards required
  - Payment terms (advance, partial, after delivery)
  - Delivery location/reach
  - Contact person details
  - Certification requirements
  - Buy button / Contact button

**Employment Opportunities**
- **Job Listings**
  - Job title/position
  - Employment type (Full-time, Part-time, Seasonal)
  - Location
  - Salary range (if applicable)
  - Job description (2-3 lines)
  - Skills required
  - Experience required
  - Available positions count
  - Application deadline
  - Apply button

**Grants & Subsidies**
- **Government Schemes**
  - Scheme name
  - Providing organization
  - Grant amount
  - Eligibility criteria (land size, crop type, location)
  - Application deadline
  - Benefits/what's covered
  - Application link
  - Contact details

**Search & Filter**
- **Search Bar**
  - Search by keyword, crop, location, organization

- **Advanced Filters**
  - By Crop Type
  - By Location (Pincode/District/State)
  - By Price Range (for purchases)
  - By Salary Range (for jobs)
  - By Grant Amount (for subsidies)
  - By Deadline (upcoming, extended, closed)
  - By Availability (Open, Closing Soon)

**Sorting**
- Newest first
- Most relevant
- Highest price/salary
- Closest deadline
- Most applications/interest

**Opportunity Details Modal**
- Complete information
- Requester/provider profile
- Detailed terms and conditions
- Testimonials from previous transactions
- Verification badges
- Contact information
- Application status tracking

**Save & Compare**
- Favorite opportunities
- Compare multiple opportunities side-by-side
- Save comparison list

**Apply/Contact**
- **Application Form**
  - Enter farming details (if applicable)
  - Quantity available
  - Preferred delivery date
  - Quality certifications
  - Additional questions
  - Submit application

- **Direct Contact**
  - Display contact phone
  - Display contact email
  - Send message/inquiry form

**Track Applications**
- View all submitted applications
- Application status (Submitted, Under Review, Approved, Rejected)
- Response from opportunity provider
- Follow-up actions

**Access**: Farmer role only, requires authentication

---

#### 8. **Admin Dashboard** (`/admin`)
**Purpose**: Platform management and moderation  
**Features**:

**Dashboard Overview Section**
- **Key Statistics Cards**
  - Total users registered
  - Total Farmers
  - Total Experts
  - Total Admins
  - Public users
  - Active users (last 30 days)
  - New registrations (this month)
  - Platform engagement score

**Tabs Navigation**

**Tab 1: Users Management**
- **User Table Display**
  - Columns: User ID, Name, Email, Role, Registration Date, Status, Actions
  - Sorting by any column
  - Pagination (50 users per page)
  - Search bar to filter users by name/email/ID

- **User Actions Dropdown**
  - View full profile
  - View account details
  - Deactivate user
  - Delete user account
  - Reset password (prepared)
  - Change user role (prepared)
  - Send notification (prepared)

- **Bulk Operations** (prepared for backend)
  - Select multiple users
  - Export to CSV
  - Send bulk message
  - Batch change role

- **User Search Filters**
  - By Role (Farmer, Expert, Admin, Public)
  - By Registration Date (Date range picker)
  - By Status (Active, Inactive, Suspended)
  - By Last Login Date

**Tab 2: Content Moderation**
- **Moderation Queue List**
  - Content items pending review
  - Type badges (Forum Thread, Comment/Reply, User Profile, Resource, Image)
  - Status (Pending, Under Review, Approved, Rejected)
  - Reported by (reporter count and names)
  - Report reasons (Spam, Offensive Language, Inappropriate Content, Misinformation, Hate Speech)
  - Date reported and last review date
  - Priority indicator (High, Medium, Low)

- **Content Details Panel**
  - Full text/image of reported content
  - Context (thread details, comment thread, profile info)
  - Reporter information and reasons
  - Reporter comment/explanation
  - Author information
  - Author response/statement (if provided)

- **Moderation Actions**
  - Approve (no action needed)
  - Reject (remove content)
  - Suspend user temporarily (24 hrs, 7 days, 30 days)
  - Issue warning to user
  - Send message to user explaining violation
  - Collect moderator notes
  - Mark as resolved

- **Moderation Filters**
  - By Content Type
  - By Report Reason
  - By Status
  - By Priority
  - By Date Range
  - By Assigned Moderator

- **Quick Actions**
  - Keyboard shortcuts for quick moderation
  - Batch approval/rejection of similar content

**Tab 3: System Monitoring** (prepared for backend)
- API response times
- Error rates
- Database performance
- Server uptime
- User activity graphs

---

#### 9. **User Profile** (`/profile`)
**Purpose**: View and manage user information  
**Features**:

**Profile Information Display**
- **Profile Header**
  - Large profile picture/avatar
  - Full name
  - Role badge (Farmer, Expert, Admin, Public)
  - Member since date
  - Verification badges (Email verified, Phone verified, Expert badge)

- **Account Details Section**
  - Email address
  - Phone number
  - Address/Location
  - City/State/Pincode
  - Member ID/Account ID

- **Role-Specific Information**
  - **For Farmers:**
    - Farm name
    - Farm area (hectares)
    - Crops grown
    - Years farming
    - Certifications (Organic, etc.)
  
  - **For Experts:**
    - Specialties
    - Years of experience
    - Expertise level
    - Consultation rate
    - Active consultations count
    - Completed consultations count
    - Average rating
  
  - **For Admins:**
    - Admin ID
    - Assigned responsibilities
    - Permission level

**Statistics Section**
- **For Farmers:**
  - Crops managed
  - Learning resources completed
  - Forum contributions
  - Expert connections
  - Total consultations taken

- **For Experts:**
  - Active consultations
  - Completed consultations
  - Total earnings (from consultations)
  - Average rating
  - Positive reviews %
  - Resource contributions

**Recent Activity**
- Last login date/time
- Recent forum posts
- Recent expert interactions
- Learning progress

**Edit Profile Button**
- Navigates to Settings > Profile section

**Activity History** (prepared for backend)
- Login history
- Consultation history
- Resource completion history
- Forum participation timeline

**Access**: Authenticated users view their own profile; role-based restrictions for viewing others

---

#### 10. **Settings Page** (`/settings`)
**Purpose**: User preferences and account configuration  
**Features**:

**Tabbed Interface**

**Tab 1: Profile Settings**
- **Edit Profile Information**
  - First Name (input field)
  - Last Name (input field)
  - Bio/About Me (textarea, max 500 chars)
  - Location (text input)
  - City (text/dropdown)
  - State (dropdown)
  - Pincode (input)
  - Phone Number (with country code)
  - Website/Social Links (optional fields)

- **Profile Picture**
  - Upload new picture
  - Crop/adjust
  - Remove picture
  - Set default avatar

- **Save Changes Button**
  - Validation before save
  - Success message with confirmation
  - Error handling

- **Role-Specific Fields**
  - **Farmer Settings:**
    - Farm Name
    - Farm Area (sq meters/hectares)
    - Primary Crops (multi-select)
    - Years in Farming (dropdown)
    - Certifications (checkboxes: Organic, Fair Trade, ISO, etc.)
    - Preferred Language for Resources
    - Farm Photos/Gallery

  - **Expert Settings:**
    - Professional Title
    - Specialties (multi-select, max 5)
    - Qualifications/Certifications (list with ability to add)
    - Years of Experience (number input)
    - Consultation Rate (currency input)
    - Consultation Duration Options (checkboxes)
    - Availability Schedule (time slots)
    - Social Proof Links (Portfolio, Publications)

  - **Admin Settings:**
    - Department/Division
    - Phone Extension
    - Office Location
    - Supervisor Name
    - Responsibilities Managed

**Tab 2: Notifications**
- **Email Notifications**
  - [ ] New consultation request
  - [ ] Consultation response received
  - [ ] Forum replies to my threads
  - [ ] New forum posts in favorite topics
  - [ ] New expert recommendations
  - [ ] Weather alerts
  - [ ] Market price updates
  - [ ] Opportunity alerts
  - [ ] Learning resource recommendations
  - [ ] Weekly digest (enable/disable)
  - [ ] Newsletter subscription

- **SMS Notifications** (if applicable)
  - [ ] Urgent alerts only
  - [ ] Daily summary
  - [ ] Weekly summary
  - [ ] Phone number verification

- **In-App Notifications**
  - [ ] Show desktop notifications
  - [ ] Sound enabled/disabled
  - Quiet hours (time range when no notifications)

- **Notification Frequency**
  - Real-time / Immediate
  - Hourly digest
  - Daily digest
  - Weekly digest
  - Off

**Tab 3: Appearance**
- **Theme Selection**
  - [ ] Light mode (default)
  - [ ] Dark mode
  - [ ] Auto (system preference)
  - Preview of selected theme

- **Language**
  - Dropdown select (English, Hindi, etc.)
  - Apply immediately

- **Font Size**
  - Small / Normal (default) / Large / Extra Large
  - Live preview

- **Accessibility**
  - [ ] High contrast mode
  - [ ] Enable animations
  - [ ] Screen reader optimizations

**Tab 4: Security**
- **Password Management**
  - Change Password button
    - Form: Current Password, New Password, Confirm New Password
    - Password strength indicator
    - Requirements display

- **Login Security**
  - Last login details (date, time, location, device)
  - Active sessions list with ability to logout
  - Two-Factor Authentication (prepared for backend)
    - Enable/disable toggle
    - Setup step-by-step wizard
    - Backup codes

- **Connected Apps/Devices**
  - List of devices with access
  - Device name, type, last accessed
  - Revoke access button for each

- **Account Activity**
  - Recent login attempts
  - Suspicious activity alerts
  - Logout all other sessions button

**Tab 5: Role-Specific Settings**
- **For Farmers:**
  - Preferred expert specialties (multi-select)
  - Consultation preferences (available times)
  - Market alerts (enable for certain opportunities)
  - Weather alert preferences (rain, frost, heat)
  - Resource recommendations (based on crops/interests)

- **For Experts:**
  - Consultation availability calendar
  - Booking rules (cancellation policy, advance booking time)
  - Rate adjustments
  - Service areas (geographic reach)
  - Specialties and expertise levels
  - Response time settings

- **For Admins:**
  - Moderation queue settings
  - Report handling preferences
  - Automation rules
  - Alert thresholds

**Tab 6: Privacy**
- **Data & Privacy**
  - [ ] Show profile publicly
  - [ ] Allow others to contact me
  - [ ] Include in platform statistics
  - [ ] Allow data for research (anonymized)

- **Data Management**
  - Download my data (export as JSON/CSV)
  - Delete account permanently
    - Warning dialog with confirmation
    - Data export before deletion option
    - 7-day cancellation period

- **Blocking & Reporting**
  - Blocked users list
  - Unblock options
  - Report problem form
  - Privacy complaint form

**Save All Changes Button**
- Single save for all tabs
- Success notification
- Error handling with specific field highlighting

**Access**: Authenticated users for own settings; admins can view system-wide settings

---

#### 11. **Help & Support** (`/help`)
**Purpose**: User assistance and support resources  
**Features**:

**Frequently Asked Questions (FAQ) Accordion**
- **FAQ Categories** (collapsible sections)
  1. **Getting Started**
     - How do I create an account?
     - What's the difference between roles?
     - How do I edit my profile?
     - How do I reset my password?
  
  2. **Farming & Crops**
     - How do I add a new crop?
     - How do I track crop health?
     - What do the crop health indicators mean?
     - How do I get weather updates?
  
  3. **Learning Resources**
     - How do I find learning resources?
     - How do I track my learning progress?
     - Can I download resources?
     - Are there certificates?
  
  4. **Community Forum**
     - How do I create a forum thread?
     - How do I find expert answers?
     - Can I delete my posts?
     - What are the community guidelines?
  
  5. **Expert Consultation**
     - How do I find an expert?
     - How do I book a consultation?
     - What's the consultation process?
     - How is payment handled?
  
  6. **Market Opportunities**
     - How do I find buyers?
     - How do I apply for grants?
     - How do I track applications?
     - What are the eligibility criteria?
  
  7. **Technical Support**
     - The app is running slow
     - I can't log in
     - I'm seeing an error
     - I need to report a bug

- **Each FAQ Entry Contains**
  - Clear, concise question (collapsible header)
  - Detailed answer with screenshots/images where helpful
  - Related topics/see also links
  - Was this helpful? (yes/no feedback)

**Support Contact Section**
- **Contact Information**
  - Email support address
  - Support phone number with hours
  - Support hours (timezone, days)
  - WhatsApp link (if applicable)
  - Live chat availability indicator

- **Submit Support Ticket**
  - **Support Form Fields**
    - Issue category dropdown (Bug Report, Feature Request, Account Support, Technical Support, Other)
    - Subject (required)
    - Detailed description (required, min 20 chars)
    - Attach screenshot/file (optional)
    - Email address (pre-filled from profile)
    - Priority level (Low, Medium, High)
    - Submit button
  
  - **After Submission**
    - Confirmation message
    - Ticket ID provided
    - Expected response time
    - Response notification settings

**Documentation Links**
- Quick links to:
  - Full user documentation
  - Video tutorials
  - Setup guide
  - API documentation (for developers)
  - Community guidelines
  - Privacy policy
  - Terms of service

**Common Issues & Solutions**
- Expandable sections for most common problems
- Step-by-step solutions
- Screenshots/videos for clarity

**Feedback Form**
- Rate platform experience (1-5 stars)
- Feedback type (Bug, Feature Idea, General Feedback)
- Feedback text (textarea)
- Optional contact info for follow-up

**Access**: Public (no authentication required)

---

## 🔐 Authentication & Security

### Authentication Flow
1. **User Registration**
   - POST `/api/v1/auth/register`
   - Input: First Name, Last Name, Email, Password, Role, Phone (optional), Address (optional)
   - Returns: Auth token, User object
   - Auto-login after registration

2. **User Login**
   - POST `/api/v1/auth/login`
   - Input: Email, Password, Role
   - Returns: Auth token (JWT), User object with role
   - Token stored in localStorage

3. **Session Management**
   - Bearer token in Authorization header
   - Credentials included (for CORS)
   - Auto-logout on 401 Unauthorized
   - Token refresh mechanism (prepared for backend)

### Security Features
- **Password Requirements** (prepared)
  - Minimum 8 characters
  - Mix of uppercase, lowercase, numbers, symbols
  - No previous passwords reuse
  - Password change required periodically

- **Two-Factor Authentication** (prepared)
  - Email/SMS verification
  - TOTP support
  - Recovery codes

- **Account Protection**
  - Account lockout after 5 failed login attempts (prepared)
  - Email verification on registration
  - Phone verification optional
  - Suspicious login alerts

- **Data Protection**
  - HTTPS/TLS encryption in transit
  - Passwords never transmitted in plain text (hashed on backend)
  - PII data encrypted at rest (backend responsibility)
  - Rate limiting on API endpoints

- **Session Security**
  - Session timeout after 30 minutes of inactivity (prepared)
  - One-device login option (prepared)
  - Device tracking and management
  - Logout all sessions option

### Protected Routes
- Routes require valid authentication token
- Role-based route access using ProtectedRoute component
- Unauthorized users redirected to role-appropriate dashboard or login

---

## 🔗 API Integration Points

### Base Configuration
- **Base URL**: `http://localhost:8080`
- **API Prefix**: `/api/v1`
- **Authentication**: Bearer token in headers
- **CORS**: Credentials included
- **Error Handling**: 401 triggers auto-logout

### API Endpoints by Module

#### Authentication API (`authAPI`)
```
POST   /auth/register          - User registration
POST   /auth/login             - User login
POST   /auth/logout            - User logout
GET    /auth/me                - Get current user
POST   /auth/forgot-password   - Password reset request
POST   /auth/reset-password    - Reset password with token
```

#### User API (`userAPI`)
```
GET    /users/profile          - Get own profile
PUT    /users/profile          - Update own profile
GET    /users                  - Get all users (admin)
GET    /users/:id              - Get specific user
GET    /users/role/:role       - Get users by role
```

#### Crop Management API (`cropAPI`)
```
GET    /crops                  - Get user's crops
GET    /crops/:id              - Get crop details
POST   /crops                  - Create new crop
PUT    /crops/:id              - Update crop
DELETE /crops/:id              - Delete crop
GET    /crops/:id/health       - Get crop health status
```

#### Farm Data API (`farmDataAPI`)
```
GET    /farm/dashboard-stats   - Dashboard overview
GET    /farm/metrics           - Farm metrics/analytics
POST   /farm/tasks             - Create task
GET    /farm/tasks             - Get user tasks
PUT    /farm/tasks/:id         - Update task
GET    /farm/tasks/:id         - Get task details
```

#### Weather API (`weatherAPI`)
```
GET    /weather                - Get current weather
GET    /weather/forecast       - Get 4-day forecast
Parameters: latitude, longitude
```

#### Market API (`marketAPI`)
```
GET    /market/prices          - Get current crop prices
GET    /market/trends          - Get price trends
GET    /market/opportunities   - Get market opportunities
GET    /market/opportunities/:id - Get opportunity details
POST   /market/opportunities/:id/apply - Apply for opportunity
```

#### Community API (`communityAPI`)
```
GET    /forum/threads          - Get forum threads
POST   /forum/threads          - Create new thread
GET    /forum/threads/:id      - Get thread details
GET    /forum/threads/:id/replies - Get thread replies
POST   /forum/threads/:id/replies - Create reply
POST   /forum/connect/:userId  - Connect with user
GET    /forum/connections      - Get user connections
```

#### Learning API (`learningAPI`)
```
GET    /learning/resources     - Get learning resources
GET    /learning/resources/:id - Get resource details
POST   /learning/resources/:id/complete - Mark as complete
GET    /learning/progress      - Get user progress
```

#### Expert API (`expertAPI`)
```
GET    /experts                - Get all experts
GET    /experts/:id            - Get expert profile
PUT    /experts/:id            - Update expert profile
POST   /experts/:id/consult    - Request consultation
GET    /experts/consultations  - Get user consultations
```

#### Admin API (`adminAPI`)
```
GET    /admin/dashboard        - Dashboard stats
GET    /admin/users            - Get all users
DELETE /admin/users/:id        - Delete user
GET    /admin/moderation       - Get moderation queue
POST   /admin/moderation/:id   - Moderate content
```

---

## 🎨 UI/UX Components & Design System

### Component Library: Radix UI
- **Accessibility First**: WCAG 2.1 AA compliant
- **Unstyled Primitives**: Styled with Tailwind CSS
- **Features**: Keyboard navigation, screen reader support, focus management

### Core UI Components
| Component | Purpose | Used In |
|-----------|---------|---------|
| **Button** | Primary interactions | All pages |
| **Input** | Text data entry | Forms (Login, Registration, Crop Add) |
| **Select** | Dropdown selections | Filters, role selection, categories |
| **Dialog** | Modal interactions | Crop add, thread create, consultation request |
| **Tabs** | Section navigation | Login, Settings, Admin Dashboard, Opportunities |
| **Accordion** | Expandable content | FAQ page, settings|
| **Card** | Content containers | Crops list, expert profiles, opportunities |
| **Table** | Data display | User management, crops, opportunities |
| **Avatar** | User profile images | Forum threads, expert profiles, comments |
| **Badge** | Status/type indicators | User roles, content types, status |
| **Dropdown Menu** | Action menus | User menu, admin actions |
| **Sheet** | Mobile navigation | Sidebar on mobile |
| **Separator** | Visual dividers | Section separators |
| **Label** | Form field labels | All forms |
| **Textarea** | Multi-line text | Forum posts, support tickets |
| **Calendar** | Date selection | Task scheduling, consultation dates |
| **Date Picker** | Date input | Crop dates, task dates |
| **Popover** | Contextual info | Info tooltips |
| **Scroll Area** | Scrollable content | Long lists, tables |

### Styling System
- **Framework**: Tailwind CSS 4
- **Color Scheme**:
  - Primary Green: Agricultural theme
  - Secondary Blue: Trust & information
  - Success Green: Positive actions
  - Warning Orange: Alerts
  - Error Red: Problems
  - Gray scale: Text and backgrounds

- **Typography**:
  - Headings: Bold, clear hierarchy
  - Body: Clean, readable
  - Monospace: Code examples

- **Spacing**: 4px base unit (sm/md/lg/xl)
- **Breakpoints**: Mobile first responsive design

### Responsive Design
- **Mobile** (320px-640px): Single column, bottom navigation
- **Tablet** (640px-1024px): Two columns, side navigation
- **Desktop** (1024px+): Full layout with sidebar + main content

### Icons & Imagery
- **Icon Library**: Lucide React (546+ icons)
- **Images**:
  - Crop photos/thumbnails
  - Weather condition icons
  - User avatars
  - Background illustrations
  - Product/feature images

### Animations
- **Library**: Motion/React (Framer Motion)
- **Transitions**: Smooth page transitions
- **Interactions**: Button hover, modal entrance
- **Performance**: Hardware accelerated CSS transforms

---

## 📊 Data Models & State Management

### User Object
```javascript
{
  id: string,
  firstName: string,
  lastName: string,
  name: string,
  email: string,
  role: 'farmer' | 'expert' | 'admin' | 'public',
  userType: string,
  phone: string,
  address: string,
  avatar: string (profilePicture),
  createdAt: ISO 8601 date,
  updatedAt: ISO 8601 date
}
```

### Crop Object
```javascript
{
  id: string,
  userId: string,
  name: string,
  type: string,
  variety: string,
  areaPlanted: number (sq meters),
  plantingDate: ISO 8601 date,
  expectedHarvestDate: ISO 8601 date,
  healthStatus: 'Healthy' | 'Stressed' | 'Critical',
  soilType: string,
  irrigationType: string,
  notes: string,
  image: URL string,
  createdAt: ISO 8601 date,
  updatedAt: ISO 8601 date
}
```

### Forum Thread Object
```javascript
{
  id: string,
  title: string,
  content: string,
  authorId: string,
  category: string,
  tags: string[],
  status: 'Open' | 'Resolved',
  viewCount: number,
  replyCount: number,
  createdAt: ISO 8601 date,
  updatedAt: ISO 8601 date
}
```

### Consultation Object
```javascript
{
  id: string,
  farmerId: string,
  expertId: string,
  topic: string,
  description: string,
  scheduledDate: ISO 8601 datetime,
  duration: number (minutes),
  rate: number (₹),
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled',
  notes: string,
  rating: number (1-5),
  createdAt: ISO 8601 date,
  updatedAt: ISO 8601 date
}
```

### State Management
- **Context API**: AuthContext for user authentication
- **Custom Hooks**: useFetch, usePaginatedFetch
- **localStorage**: Auth tokens, user data, preferences
- **Component State**: useState for local component state

---

## 🚀 Technology Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router 7.13.1
- **UI Library**: Radix UI
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React 0.546
- **Animations**: Motion/React 12.23.24
- **Date Manipulation**: date-fns 4.1.0
- **Data Visualization**: Recharts 3.7.0
- **HTTP Client**: Fetch API
- **Utilities**: clsx, tailwind-merge

### Backend (Reference)
- **Runtime**: Node.js / Java Spring Boot
- **Database**: MySQL
- **Authentication**: JWT tokens
- **Weather API**: OpenWeather / Similar
- **Gemini API**: Google AI integration (indicated by @google/genai @1.29.0)

### Development
- **TypeScript**: Configuration available (tsconfig.json)
- **Dev Port**: 3000
- **Build Output**: Optimized bundles
- **Environment**: Vite configuration for env variables

---

## 📱 User Flows & Journeys

### New User Journey (Farmer Example)
1. User lands on Home page (`/`)
2. Clicks "Sign Up" or "Get Started"
3. Directed to Login page (`/login`) with Sign Up tab active
4. Fills registration form (all fields)
5. Selects "Farmer" as role
6. Clicks Sign Up button
7. Validated & submitted to backend
8. Auto-logged in with token
9. Redirected to Dashboard (`/dashboard`)
10. Completes profile setup with farm details
11. Adds first crop
12. Views weather & market data
13. Explores learning resources

### Expert Consultation Flow
1. Farmer visits Experts page (`/experts`)
2. Searches or filters experts by specialty
3. Views expert profile details
4. Clicks "Request Consultation"
5. Fills consultation form (issue description, preferred time, budget)
6. Submits request
7. Expert receives notification
8. Expert accepts/declines
9. Farmer notified of status
10. Consultation scheduled
11. Post-consultation: farmer rates expert
12. Expert provides consultation
13. Payment processed (backend)
14. Consultation marked complete

### Learning Progress Flow
1. Farmer visits Learning page (`/learning`)
2. Searches for resources on soil management
3. Filters by type: "Articles"
4. Selects article, reads details
5. Clicks "Start Learning"
6. Views article content
7. Clicks "Mark as Complete"
8. System tracks progress
9. User sees updated progress %
10. Receives certificate (if course)
11. Gets recommended next resources

### Market Opportunity Application Flow
1. Farmer visits Opportunities page (`/opportunities`)
2. Browses buyers, jobs, grants in tabs
3. Filters opportunities by location and crop
4. Finds buyer for wheat crop
5. Views opportunity details (price, quantity, quality requirements)
6. Clicks "Apply" or "Contact"
7. Fills application with farm/crop details
8. Submits application
9. Application tracked in status list
10. Buyer responds with requirements
11. Farmer negotiates terms
12. Deal finalized via platform

### Forum Discussion Flow
1. Farmer encounters crop disease
2. Visits Community page (`/community`)
3. Searches for similar issues
4. Finds relevant thread
5. Reads expert responses
6. Creates new thread if no answer found
7. Describes problem with photos
8. Posts thread
9. Receives expert responses
10. Marks helpful answer as solution
11. Applies expert recommendations

---

## 🎯 Implemented Features Summary

### ✅ Completed Features
1. **User Authentication**
   - Registration with role selection
   - Login with role-based tabs
   - Session management with localStorage
   - Protected routes & role-based access
   - Logout functionality

2. **Farmer Dashboard**
   - Crop management (CRUD operations)
   - Weather widget with forecast
   - Market prices widget
   - Task management system
   - Farm statistics overview

3. **Learning Resources**
   - Browse educational content
   - Search and filter resources
   - Track learning progress
   - Resource categorization

4. **Community Forum**
   - Browse threads
   - Create new threads
   - Reply to threads
   - Search and filter threads
   - User connections

5. **Expert Directory**
   - Browse expert profiles
   - Filter by specialty/rating/price
   - Request consultations
   - View consultation details

6. **Market Opportunities**
   - Browse buyer connections
   - View employment opportunities
   - Explore grants & subsidies
   - Apply for opportunities
   - Search and filter

7. **User Profiles**
   - View profile information
   - Role-specific profile data
   - Activity tracking

8. **Settings & Preferences**
   - Update profile information
   - Notification preferences
   - Theme/appearance settings
   - Security settings
   - Role-specific configurations

9. **Admin Dashboard**
   - User management
   - Content moderation queue
   - Platform statistics
   - User search and filtering

10. **Help & Support**
    - FAQ with categorized questions
    - Support contact information
    - Support ticket submission
    - Feedback form

11. **UI/UX**
    - Responsive mobile/tablet/desktop
    - Radix UI component library
    - Tailwind CSS styling
    - Lucide icons (546+)
    - Smooth animations

### 🔄 Prepared for Backend Integration (Not UI-Dependent)
- Advanced password security (8+ chars, special requirements)
- Two-factor authentication setup
- Account lockout after failed attempts
- Email verification on registration
- Device tracking and management
- Session timeout handling
- Suspicious login alerts
- Resource contribution by experts
- Bulk user operations (export, messaging)
- Advanced analytics and monitoring
- Search result optimization
- Recommendation algorithms

---

## 📈 Performance & Analytics

### Metrics Tracked
- Page load times
- API response times
- User engagement (clicks, views)
- Consultation completion rates
- Forum activity
- Learning completion rates
- Application conversion rates

### Optimization Strategies
- Code splitting by route
- Image optimization
- API response caching (prepared)
- Lazy loading components
- Minimize re-renders with custom hooks

---

## 🔮 Future Enhancements

### Phase 2 Features
1. **Real-Time Features**
   - Live weather alerts
   - Push notifications
   - Real-time price updates
   - Live chat for consultations

2. **Advanced Analytics**
   - Crop yield predictions
   - Disease detection with AI
   - Price forecasting models
   - Personalized recommendations

3. **Mobile Apps**
   - Native iOS app
   - Native Android app
   - Offline functionality

4. **Marketplace**
   - Direct farmer-to-buyer transactions
   - Payment gateway integration
   - Escrow system
   - Rating/review system

5. **Video Features**
   - Live video consultations
   - Expert webinars
   - Farmer-to-farmer video calls
   - Video tutorial uploads

6. **IoT Integration**
   - Soil sensor data
   - Weather station integration
   - Automated alerts
   - Smart farm monitoring

7. **Blockchain**
   - Supply chain tracking
   - Certification records
   - Decentralized marketplace (if applicable)

---

## 📋 Deployment & Infrastructure

### Frontend Deployment
- **Build Process**: `npm run build` generates optimized bundle
- **Hosting**: Can be deployed to any static hosting (Vercel, Netlify, AWS, GCP, Azure)
- **Environment Variables**: 
  - `VITE_API_URL` - Backend API base URL
  - `VITE_API_PREFIX` - API endpoint prefix
  - `GEMINI_API_KEY` - Google AI API key

### Development Setup
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run preview      # Preview production build
```

---

## 🎓 User Training & Documentation

### Available Documentation
- README.md - Project overview and features
- Integration guides for backend
- Tutorial videos (prepared)
- FAQ on Help page
- Contextual help tooltips

### Recommended User Training
1. Video tutorials for each role
2. Interactive walkthroughs
3. Webinar sessions for farmers
4. Expert demonstration sessions
5. Community forum peer support

---

## 📞 Support & Maintenance

### Support Channels
- Email support
- In-app support form
- FAQ/Help section
- Community forum for peer support

### Maintenance Tasks
- Regular security updates
- Performance monitoring
- Bug fixes and patches
- Feature enhancements
- Database maintenance
- Backup procedures

---

## ✅ Acceptance Criteria & Testing

### Functional Requirements Met
- ✅ All user roles can register and login
- ✅ Farmers can manage crops and view analytics
- ✅ Experts can manage consultations
- ✅ Admins can moderate content and manage users
- ✅ Weather and market data displayed correctly
- ✅ Learning resources searchable and filterable
- ✅ Forum allows thread creation and replies
- ✅ Opportunities browsable and applicable
- ✅ Settings persist user preferences
- ✅ Responsive across devices

### Non-Functional Requirements Met
- ✅ Fast page load times (< 3 seconds)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Secure authentication with tokens
- ✅ Accessible UI (WCAG 2.1 AA with Radix UI)
- ✅ SEO-friendly metadata
- ✅ Error handling and user feedback
- ✅ Data validation on forms
- ✅ Protected API endpoints

---

## 📝 Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | April 5, 2026 | Initial PRD - Complete feature inventory and specifications |

---

## 🤝 Sign-Off

**Document Owner**: AgriConnect Product Team  
**Last Reviewed**: April 5, 2026  
**Approval Status**: Ready for Development/Enhancement

---

*This document serves as the comprehensive specification for the AgriConnect Frontend Application. All features, functionalities, and options currently implemented have been documented above. This PRD can be used for onboarding new developers, understanding platform capabilities, planning future enhancements, and communicating with stakeholders.*
