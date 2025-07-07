# Frontend Developer Coding Challenge

A modern React application built with TypeScript that displays user cards with detailed modal views. This project demonstrates advanced React patterns, responsive design, and production-ready code architecture.

## 🌐 Live Demo

**🔗 [View Live Application](https://user-interface-assignmentt.vercel.app/)**

## 🚀 Features

- **Modern React Architecture**: Built with React 18+ and TypeScript
- **Responsive Design**: Fully responsive layout that works on all devices
- **Advanced UI Components**: Custom-built components with Tailwind CSS
- **Smooth Animations**: Framer Motion integration for delightful user interactions
- **Smart Text Truncation**: Intelligent text handling with ellipsis for consistent card layouts
- **Efficient Data Fetching**: React Query for optimized API calls and caching
- **Image Optimization**: Smart image loading with fallbacks and aspect ratio handling
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Error Handling**: Comprehensive error states with retry mechanisms
- **Loading States**: Skeleton components and loading indicators
- **Performance Optimized**: Lazy loading, memoization, and efficient rendering
- **Code Quality**: ESLint integration with zero violations
- **Comprehensive Testing**: 136 tests with high coverage

## 🛠️ Tech Stack

- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **React Query (TanStack Query)** for data fetching
- **Framer Motion** for animations
- **Axios** for API calls
- **Jest + React Testing Library** for testing
- **ESLint** for code quality

## 📁 Project Structure

```
src/
├── components/
│   ├── UserCard/
│   │   ├── UserCard.tsx
│   │   ├── UserCardSkeleton.tsx
│   │   └── index.ts
│   ├── UserModal/
│   │   ├── UserModal.tsx
│   │   └── index.ts
│   └── ui/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Loading.tsx
│       └── Navbar.tsx
├── hooks/
│   ├── useUsers.ts
│   ├── useModal.ts
│   └── useImageLoader.ts
├── services/
│   └── userService.ts
├── types/
│   └── user.ts
├── utils/
│   ├── imageHelpers.ts
│   ├── textHelpers.ts
│   └── constants.ts
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
└── App.tsx
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3001](http://localhost:3001) to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run lint:fix` - Automatically fixes ESLint violations
- `npm run eject` - Ejects from Create React App (not recommended)

## 🎯 Key Implementation Details

### Component Architecture

- **Functional Components**: Uses React hooks exclusively
- **Component Composition**: Reusable, composable components
- **Custom Hooks**: Business logic abstracted into custom hooks
- **Service Layer**: API calls separated from UI components
- **TypeScript-First**: Complete type safety throughout
- **Consistent Card Dimensions**: Fixed height cards (400px) with smart text truncation

### Text Truncation System

- **Smart Truncation**: Intelligent text handling for consistent layouts
- **Description Limits**: 80-character description limit with line-clamp-3
- **Tooltip Support**: Full text available on hover
- **Multiple Strategies**: Character-based and word-based truncation options

### Data Management

- **Single API Call**: Simplified data fetching that loads all users at once
- **Smart Caching**: React Query optimization for performance
- **Real-time Updates**: Dynamic user counter updates
- **Error Boundaries**: Comprehensive error handling throughout

### API Integration

- **Endpoint**: `https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users`
- **Error Handling**: Comprehensive error handling with retry logic
- **Loading States**: Skeleton components while fetching data
- **Caching**: React Query for efficient data management
- **Image Handling**: Graceful handling of different aspect ratios with timeout and retry
- **Null Safety**: Comprehensive null/undefined handling throughout

### UI/UX Features

- **Responsive Design**: Mobile-first approach with fluid layouts
- **Sticky Navigation**: Professional navbar with gradient branding
- **Accessibility**: ARIA labels and keyboard navigation
- **Animations**: Smooth transitions and micro-interactions
- **Error States**: User-friendly error messages
- **Image Optimization**: Smart aspect ratio handling and fallback avatars with retry mechanism
- **Interactive Elements**: Clickable email and phone links in modals

### Performance Optimizations

- **Bundle Size**: Optimized for < 500KB initial load
- **Lazy Loading**: Images loaded on demand with timeout handling
- **Memoization**: React.memo and useMemo where appropriate
- **Efficient Rendering**: Optimized re-renders and state management

## 📱 Responsive Breakpoints

The application adapts seamlessly across different screen sizes:

- **Mobile**: 320px - 640px (single column)
- **Tablet**: 641px - 768px (two columns)
- **Desktop**: 769px - 1024px (three columns)
- **Large Desktop**: 1025px+ (four columns)

## 🔒 Error Handling

Comprehensive error handling includes:

- **Network Errors**: Graceful handling of API failures with retry mechanisms
- **Image Loading**: Fallback avatars for broken images with 8-second timeout and retry
- **User Feedback**: Clear error messages and retry options
- **Boundary Components**: React error boundaries for graceful failures
- **Null Safety**: Comprehensive null/undefined checking throughout
- **Validation**: Input validation and sanitization in services

## 🚀 Production Ready

This application is production-ready with:

- **TypeScript**: Complete type safety with strict configuration
- **Performance**: Optimized bundle and rendering (< 500KB initial load)
- **Accessibility**: WCAG compliance with proper ARIA labels
- **Testing**: Comprehensive test coverage (136 passing tests)
- **Documentation**: Clear code and architecture documentation
- **Deployment**: Deployed on Vercel with CI/CD pipeline
- **Code Quality**: Zero ESLint violations
- **Error Handling**: Robust error boundaries and retry mechanisms

## 🌟 Advanced Features

### Modal System
- **Professional Design**: Card-based layout with section organization
- **Interactive Elements**: Clickable email and phone links
- **Smart Image Display**: Dynamic sizing based on aspect ratios
- **Accessibility**: Escape key handling, focus management, backdrop clicks
- **Comprehensive Data**: Contact info, location details, personal information

### Navigation
- **Sticky Navbar**: Professional header with gradient branding
- **Real-time Counter**: Shows total users loaded
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Framer Motion entrance effects

### Image Loading System
- **Smart Loading**: 8-second timeout for slow-loading images
- **Fallback System**: SVG-based fallback avatars with user initials
- **Retry Mechanism**: Manual retry button for failed images
- **Loading States**: Skeleton with spinning icon during load
- **Error Handling**: Graceful degradation for broken images

## 🧪 Testing Strategy

The application includes comprehensive testing:

- **Component Tests**: 136 passing tests covering all components
- **Hook Tests**: Isolated testing of business logic
- **Service Tests**: API integration and error handling tests
- **Utility Tests**: Helper function validation
- **Integration Tests**: End-to-end user interaction flows

## 🔧 Development Workflow

- **TypeScript**: Strict type checking for reliability
- **ESLint**: Code quality enforcement with zero violations
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance
- **Jest**: Comprehensive testing framework
- **React Testing Library**: Component testing utilities

This application demonstrates modern React development practices with a focus on performance, accessibility, and maintainability.

## 📝 License

This project is created for a coding challenge and is not intended for commercial use.

---

**🔗 [Live Demo](https://user-interface-assignmentt.vercel.app/)** | Built with ❤️ using React, TypeScript, and modern web technologies
![image](https://github.com/user-attachments/assets/da8ea624-9665-427a-93c3-b5d18afbed42)

