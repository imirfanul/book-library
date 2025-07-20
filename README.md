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
- PostgreSQL (v13+)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd fullstack-developer-assignment
```

### 2. Install Dependencies
```bash
npm run setup
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb font_book_management

# Copy environment file
cp backend/.env.example backend/.env

# Update database credentials in backend/.env
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=font_book_management
# DB_USER=your_username
# DB_PASSWORD=your_password

# Run migrations
cd backend
npm run db:migrate

# Seed sample data
npm run db:seed
```

### 4. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # http://localhost:5173
npm run dev:backend   # http://localhost:5000
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
cd backend
npm run build
npm start
```

### Frontend Build
```bash
npm run build
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

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
npm test
```

## 📄 License

This project is created for the FullStack Developer Assignment.

---

**Built with ❤️ using modern web technologies and best practices**