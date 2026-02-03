# Social Network Frontend

Modern social networking web application built with React and TypeScript, featuring user authentication, posts, comments, likes, and subscriptions.

## 🚀 Features

- **User Authentication** - Secure login and registration system
- **User Profiles** - Customizable user profiles with avatars and bio
- **Posts & Feed** - Create, view, and interact with posts
- **Comments** - Comment on posts and engage in discussions
- **Likes** - Like posts and comments
- **Subscriptions** - Follow/unfollow other users
- **Friend Requests** - Send and manage friend requests
- **Search** - Find users by username
- **Settings** - Update profile, change password, and privacy settings
- **Responsive Design** - Mobile-friendly interface

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **SCSS** - Styling with variables and mixins
- **Normalize.css** - CSS reset for consistency

## 📁 Project Structure

```
src/
├── config/           # Application configuration
│   ├── Axios.ts      # Axios instance setup
│   └── route.config.tsx  # Route definitions
├── hooks/            # Custom React hooks
│   ├── useDebounce.ts
│   └── useHttp.ts
├── pages/            # Page components
│   ├── available/    # Public pages (login, signup)
│   └── protected/    # Protected pages (home, profile, etc.)
├── services/         # API service layer
│   ├── authService.ts
│   ├── userService.ts
│   ├── postService.ts
│   ├── commentService.ts
│   ├── likeService.ts
│   └── accountService.ts
├── styles/           # SCSS stylesheets
│   └── scss/
│       ├── helpers/  # Mixins, functions, variables
│       └── pages/    # Page-specific styles
└── types/            # TypeScript type definitions
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/social-network-front.git
cd social-network-front
```

2. Install dependencies
```bash
npm install
```

3. Configure the API endpoint
Update the Axios configuration in `src/config/Axios.ts` with your backend URL

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. Users register with username, email, and password
2. Upon successful registration, users are redirected to login
3. After login, a JWT token is stored for authenticated requests
4. Protected routes require authentication to access

## 🌐 Routes

### Public Routes
- `/` - Login page
- `/register` - Registration page

### Protected Routes
- `/account/home` - Main feed
- `/account/profile/:username` - User profile
- `/account/subscriptions` - Following/Followers management
- `/account/requests` - Friend requests
- `/account/settings` - User settings
- `/account/post/:id` - Individual post view

## 🎨 Styling

The project uses SCSS with a modular architecture:
- **Variables** - Colors, fonts, spacing
- **Mixins** - Reusable style patterns
- **Media queries** - Responsive breakpoints
- **Page-specific styles** - Organized by feature

## 🔧 Custom Hooks

- `useHttp` - Handles HTTP requests with loading and error states
- `useDebounce` - Debounces rapid input changes (useful for search)

## 📦 Services

Each service module handles specific API operations:
- `authService` - Authentication (login, register, logout)
- `userService` - User data and search
- `postService` - Post CRUD operations
- `commentService` - Comment management
- `likeService` - Like/unlike functionality
- `accountService` - Account settings and privacy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
