# FullStack Developer Assignment

A comprehensive monorepo containing both Font Management System and Book Catalog application with professional UI/UX design.

## 🏗️ Project Structure

```
├── backend/                 # Node.js/Express API with PostgreSQL
│   ├── src/
│   │   ├── controllers/     # MVC Controllers
│   │   ├── models/         # Database Models
│   │   ├── routes/         # API Routes
│   │   ├── middleware/     # Custom Middleware
│   │   ├── utils/          # Utility Functions
│   │   ├── config/         # Configuration Files
│   │   └── database/       # Migrations & Seeds
│   └── package.json
├── src/                    # React Frontend
│   ├── features/           # Feature-based Architecture
│   │   ├── font-management/
│   │   └── book-catalog/
│   ├── shared/             # Shared Components & Utils
│   │   ├── components/
│   │   ├── utils/
│   │   └── types/
│   └── ...
└── package.json           # Root Package
```

## 🚀 Features

### Task 1: Font Management System
- ✅ TTF Font Upload with Drag & Drop
- ✅ Font List with Preview
- ✅ Dynamic Font Group Creation
- ✅ Font Group Management (CRUD)
- ✅ Professional UI with Ripple Effects
- ✅ Real-time Validation

### Task 2: Book Catalog System
- ✅ Gutendex API Integration
- ✅ Real-time Search & Filtering
- ✅ Wishlist with LocalStorage
- ✅ Pagination System
- ✅ Responsive Design
- ✅ Book Details View

## 🚀 Features

### Task 1: Font Management System
- ✅ TTF Font Upload with Drag & Drop
- ✅ Font List with Preview
- ✅ Dynamic Font Group Creation
- ✅ Font Group Management (CRUD)
- ✅ Professional UI with Ripple Effects
- ✅ Real-time Validation

### Task 2: Book Catalog System
- ✅ Gutendex API Integration
- ✅ Real-time Search & Filtering
- ✅ Wishlist with LocalStorage
- ✅ Pagination System
- ✅ Responsive Design
- ✅ Book Details View

## 🛠️ Technology Stack

### Backend
- **Node.js** with **Express.js**
- **PostgreSQL** Database
- **TypeScript** for Type Safety
- **MVC Architecture**
- **Joi** for Validation
- **Multer** for File Uploads

### Frontend
- **React 18** with **TypeScript**
- **Tailwind CSS** for Styling
- **React Router** for Navigation
- **Feature-based Architecture**
- **Professional UI Components**

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (recommended)
- PostgreSQL (v13+) - if running locally
- npm or yarn

### Quick Start with Docker (Recommended)
```bash
# Clone repository
git clone <repository-url>
cd fullstack-developer-assignment

# Start all services with Docker
make docker-up
# or
docker-compose up -d

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
# Adminer (Database UI): http://localhost:8080
```

### Database Access via Adminer
- **URL**: http://localhost:8080
- **System**: PostgreSQL
- **Server**: postgres
- **Username**: postgres
- **Password**: postgres123
- **Database**: font_book_management

### 1. Clone Repository
```bash
git clone <repository-url>
cd fullstack-developer-assignment
```

### 2. Install Dependencies
```bash
# Install all dependencies
make install
# or
npm run setup
```

### 3. Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Start database and Adminer
docker-compose up -d postgres adminer

# Run migrations and seed data
make db-migrate
make db-seed
```

#### Option B: Local PostgreSQL
```bash
# Create PostgreSQL database
createdb font_book_management

# Copy environment file
cp backend/.env.example backend/.env

# Update database credentials in backend/.env

# Run migrations
make db-migrate

# Seed sample data
make db-seed
```

### 4. Start Development Servers
```bash
# Option A: Using Make
make dev

# Option B: Using npm
npm run dev

# Option C: Start individually
npm run dev:frontend  # http://localhost:5173
npm run dev:backend   # http://localhost:5000

# Option D: Full Docker development
make docker-up
```

## 🐳 Docker Commands

```bash
# Start all services
make docker-up

# Stop all services
make docker-down

# View logs
make logs

# Clean up containers and volumes
make clean

# Build images
make docker-build
```

## 🗄️ Database Management

### Using Adminer (Web Interface)
1. Open http://localhost:8080
2. Login with credentials above
3. Browse tables, run queries, manage data

### Using Command Line
```bash
# Run migrations
make db-migrate

# Seed database
make db-seed

# Reset database (migrate + seed)
npm run db:reset
```

## 🎨 UI/UX Features

### Professional Design Elements
- **Ripple Effects** on button interactions
- **Smooth Transitions** (300ms duration)
- **Gradient Backgrounds** with glassmorphism
- **Interactive Hover States** with scale transforms
- **Staggered Animations** for list items
- **Professional Color Palette** with proper contrast

### Responsive Design
- **Mobile-first** approach
- **Collapsible Navigation** for mobile
- **Adaptive Grid Layouts**
- **Touch-friendly** interactions

## 🔧 API Endpoints

### Font Management
```
GET    /api/fonts              # Get all fonts
POST   /api/fonts              # Upload font
GET    /api/fonts/:id          # Get font by ID
PUT    /api/fonts/:id          # Update font
DELETE /api/fonts/:id          # Delete font
```

### Font Groups
```
GET    /api/font-groups        # Get all groups
POST   /api/font-groups        # Create group
GET    /api/font-groups/:id    # Get group by ID
PUT    /api/font-groups/:id    # Update group
DELETE /api/font-groups/:id    # Delete group
```

### Health Check
```
GET    /api/health             # API health status
GET    /                       # Server status
```

## 🏛️ Architecture Principles

### SOLID Principles Implementation
- **Single Responsibility**: Each component/class has one purpose
- **Open/Closed**: Extensible without modification
- **Liskov Substitution**: Proper inheritance patterns
- **Interface Segregation**: Focused interfaces
- **Dependency Inversion**: Abstractions over concretions

### Best Practices
- **Feature-based** folder structure
- **TypeScript** for type safety
- **Error Handling** with proper HTTP status codes
- **Input Validation** with Joi schemas
- **Database Transactions** for data integrity
- **File Upload Security** with type validation

## 🚀 Production Deployment

### Backend Build
```bash
# Build and start with Docker
docker-compose -f docker-compose.prod.yml up -d

# Or build locally
npm run build:backend
cd backend && npm start
```

### Frontend Build
```bash
npm run build
```

## 🔧 Development Tools

### Available Make Commands
```bash
make help          # Show all available commands
make install       # Install dependencies
make dev           # Start development
make build         # Build application
make start         # Start production
make stop          # Stop services
make clean         # Clean containers
make logs          # Show logs
make db-migrate    # Run migrations
make db-seed       # Seed database
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=font_book_management
DB_USER=your_db_user
DB_PASSWORD=your_db_password
FRONTEND_URL=http://localhost:5173
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

### Docker Environment
The Docker setup automatically configures environment variables for development.

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
npm test
```

## 📊 Database Schema

### Tables
- **fonts**: Store uploaded font files
- **font_groups**: Font group definitions
- **font_group_fonts**: Many-to-many relationship

### Key Features
- UUID primary keys for security
- Automatic timestamps with triggers
- Foreign key constraints with CASCADE
- Proper indexing for performance

## 📄 License

This project is created for the FullStack Developer Assignment.

---

**Built with ❤️ using modern web technologies, Docker, and best practices**
## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (recommended)
- PostgreSQL (v13+) - if running locally
- npm or yarn

### Quick Start with Docker (Recommended)
```bash
# Clone repository
git clone <repository-url>
cd fullstack-developer-assignment

# Start all services with Docker
make docker-up
# or
docker-compose up -d

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
# Adminer (Database UI): http://localhost:8080
```

### Database Access via Adminer
- **URL**: http://localhost:8080
- **System**: PostgreSQL
- **Server**: postgres
- **Username**: postgres
- **Password**: postgres123
- **Database**: font_book_management

### 1. Clone Repository
```bash
git clone <repository-url>
cd fullstack-developer-assignment
```

### 2. Install Dependencies
```bash
# Install all dependencies
make install
# or
npm run setup
```

### 3. Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Start database and Adminer
docker-compose up -d postgres adminer

# Run migrations and seed data
make db-migrate
make db-seed
```

#### Option B: Local PostgreSQL
```bash
# Create PostgreSQL database
createdb font_book_management

# Copy environment file
cp backend/.env.example backend/.env

# Update database credentials in backend/.env

# Run migrations
make db-migrate

# Seed sample data
make db-seed
```

### 4. Start Development Servers
```bash
# Option A: Using Make
make dev

# Option B: Using npm
npm run dev

# Option C: Start individually
npm run dev:frontend  # http://localhost:5173
npm run dev:backend   # http://localhost:5000

# Option D: Full Docker development
make docker-up
```

## 🐳 Docker Commands

```bash
# Start all services
make docker-up

# Stop all services
make docker-down

# View logs
make logs

# Clean up containers and volumes
make clean

# Build images
make docker-build
```

## 🗄️ Database Management

### Using Adminer (Web Interface)
1. Open http://localhost:8080
2. Login with credentials above
3. Browse tables, run queries, manage data

### Using Command Line
```bash
# Run migrations
make db-migrate

# Seed database
make db-seed

# Reset database (migrate + seed)
npm run db:reset
```

## 🎨 UI/UX Features

### Professional Design Elements
- **Ripple Effects** on button interactions
- **Smooth Transitions** (300ms duration)
- **Gradient Backgrounds** with glassmorphism
- **Interactive Hover States** with scale transforms
- **Staggered Animations** for list items
- **Professional Color Palette** with proper contrast

### Responsive Design
- **Mobile-first** approach
- **Collapsible Navigation** for mobile
- **Adaptive Grid Layouts**
- **Touch-friendly** interactions

## 🔧 API Endpoints

### Font Management
```
GET    /api/fonts              # Get all fonts
POST   /api/fonts              # Upload font
GET    /api/fonts/:id          # Get font by ID
PUT    /api/fonts/:id          # Update font
DELETE /api/fonts/:id          # Delete font
```

### Font Groups
```
GET    /api/font-groups        # Get all groups
POST   /api/font-groups        # Create group
GET    /api/font-groups/:id    # Get group by ID
PUT    /api/font-groups/:id    # Update group
DELETE /api/font-groups/:id    # Delete group
```

### Health Check
```
GET    /api/health             # API health status
GET    /                       # Server status
```

## 🏛️ Architecture Principles

### SOLID Principles Implementation
- **Single Responsibility**: Each component/class has one purpose
- **Open/Closed**: Extensible without modification
- **Liskov Substitution**: Proper inheritance patterns
- **Interface Segregation**: Focused interfaces
- **Dependency Inversion**: Abstractions over concretions

### Best Practices
- **Feature-based** folder structure
- **TypeScript** for type safety
- **Error Handling** with proper HTTP status codes
- **Input Validation** with Joi schemas
- **Database Transactions** for data integrity
- **File Upload Security** with type validation

## 🚀 Production Deployment

### Backend Build
```bash
# Build and start with Docker
docker-compose -f docker-compose.prod.yml up -d

# Or build locally
npm run build:backend
cd backend && npm start
```

### Frontend Build
```bash
npm run build
```

## 🔧 Development Tools

### Available Make Commands
```bash
make help          # Show all available commands
make install       # Install dependencies
make dev           # Start development
make build         # Build application
make start         # Start production
make stop          # Stop services
make clean         # Clean containers
make logs          # Show logs
make db-migrate    # Run migrations
make db-seed       # Seed database
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=font_book_management
DB_USER=your_db_user
DB_PASSWORD=your_db_password
FRONTEND_URL=http://localhost:5173
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

### Docker Environment
The Docker setup automatically configures environment variables for development.

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
npm test
```

## 📊 Database Schema

### Tables
- **fonts**: Store uploaded font files
- **font_groups**: Font group definitions
- **font_group_fonts**: Many-to-many relationship

### Key Features
- UUID primary keys for security
- Automatic timestamps with triggers
- Foreign key constraints with CASCADE
- Proper indexing for performance

## 📄 License

This project is created for the FullStack Developer Assignment.

---

**Built with ❤️ using modern web technologies, Docker, and best practices**