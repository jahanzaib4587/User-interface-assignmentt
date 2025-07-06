# Frontend Developer Coding Challenge

A modern React application built with TypeScript that displays user cards with detailed modal views. This project demonstrates advanced React patterns, responsive design, and production-ready code architecture.

## 🌐 Live Demo

**🔗 [View Live Application](https://user-interface-assignmentt.vercel.app/)**

## 🚀 Features

- **Modern React Architecture**: Built with React 18+ and TypeScript
- **Responsive Design**: Fully responsive layout that works on all devices
- **Advanced UI Components**: Custom-built components with Tailwind CSS
- **Smooth Animations**: Framer Motion integration for delightful user interactions
- **Infinite Scrolling**: Seamless data loading with Intersection Observer API
- **Smart Text Truncation**: Intelligent text handling with ellipsis for consistent card layouts
- **Efficient Data Fetching**: React Query for optimized API calls and caching
- **Image Optimization**: Smart image loading with fallbacks and aspect ratio handling
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Error Handling**: Comprehensive error states with retry mechanisms
- **Loading States**: Skeleton components and loading indicators
- **Performance Optimized**: Lazy loading, memoization, and efficient rendering
- **Code Quality**: ESLint integration with zero violations
- **Comprehensive Testing**: 166 tests with high coverage

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
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   ├── InfiniteScrollLoader/
│   │   ├── InfiniteScrollLoader.tsx
│   │   └── index.ts
│   └── ui/
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Loading.tsx
├── hooks/
│   ├── useUsers.ts
│   ├── useInfiniteUsers.ts
│   ├── useModal.ts
│   ├── useImageLoader.ts
│   └── useInfiniteScroll.ts
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
- **Consistent Card Dimensions**: Fixed height cards (380px) with smart text truncation

### Text Truncation System

- **Smart Truncation**: Intelligent text handling for consistent layouts
- **Email Preservation**: Preserves domain when truncating email addresses
- **Location Intelligence**: Prioritizes city names in location truncation
- **Tooltip Support**: Full text available on hover
- **Multiple Strategies**: Character-based and word-based truncation options

### Infinite Scrolling

- **Intersection Observer**: Efficient scroll detection without performance impact
- **Manual Fallback**: Load More button for accessibility and reliability
- **Progress Tracking**: Real-time user counter showing loaded vs total users
- **Smooth Loading**: Seamless data appending with loading states
- **Performance Optimized**: Debounced loading and efficient data management

### API Integration

- **Endpoint**: `https://api.slingacademy.com/v1/sample-data/users`
- **Error Handling**: Comprehensive error handling with retry logic
- **Loading States**: Skeleton components while fetching data
- **Caching**: React Query for efficient data management
- **Image Handling**: Graceful handling of different aspect ratios
- **Null Safety**: Comprehensive null/undefined handling throughout

### UI/UX Features

- **Responsive Design**: Mobile-first approach with fluid layouts
- **Sticky Navigation**: Professional navbar with gradient branding
- **Accessibility**: ARIA labels and keyboard navigation
- **Animations**: Smooth transitions and micro-interactions
- **Error States**: User-friendly error messages
- **Image Optimization**: Smart aspect ratio handling and fallback avatars
- **Interactive Elements**: Clickable email and phone links in modals

### Performance Optimizations

- **Bundle Size**: Optimized for < 500KB initial load
- **Lazy Loading**: Images and components loaded on demand
- **Memoization**: React.memo and useMemo where appropriate
- **Efficient Rendering**: Optimized re-renders and state management
- **Smart Image Loading**: Dynamic container sizing based on aspect ratios

## 🧪 Testing

The project includes comprehensive testing setup with **166 total tests**:

- **Unit Tests**: Component rendering and behavior (23 tests for UserCard, 18 for UserModal)
- **Integration Tests**: API integration and user interactions (8 tests for App component)
- **Custom Hook Tests**: Isolated testing of business logic (16 tests for useUsers, 13 for useModal)
- **Utility Tests**: Text helpers and image utilities (30 tests for textHelpers, 22 for imageHelpers)
- **Service Tests**: API integration testing (14 tests for userService)
- **Accessibility Tests**: ARIA labels and keyboard navigation

Run tests with:
```bash
npm test
```

### Test Coverage
- **High Coverage**: Comprehensive test coverage across all components
- **Zero Lint Violations**: Clean code following React Testing Library best practices
- **Production Ready**: All tests passing with proper assertions

## 🔧 Code Quality

- **ESLint Integration**: Zero violations with comprehensive rules
- **TypeScript Strict Mode**: Complete type safety
- **Testing Library Compliance**: Following React Testing Library best practices
- **No Direct DOM Access**: Semantic queries for better maintainability
- **Consistent Code Style**: Enforced through linting configuration

## 🎨 Design System

The application uses a consistent design system with:

- **Color Palette**: Neutral grays with blue accents and professional gradients
- **Typography**: Clear hierarchy with responsive font sizes
- **Spacing**: Consistent spacing scale (Tailwind CSS)
- **Components**: Reusable UI components with multiple variants
- **Animations**: Subtle and meaningful transitions
- **Card Layout**: Consistent 380px height with smart content fitting

## 📱 Responsive Design

The application is fully responsive and works across:

- **Mobile**: 320px and up (optimized mobile experience)
- **Tablet**: 768px and up (adaptive grid layouts)
- **Desktop**: 1024px and up (multi-column grids)
- **Large Desktop**: 1280px and up (maximum content width)

## 🔒 Error Handling

Comprehensive error handling includes:

- **Network Errors**: Graceful handling of API failures with retry mechanisms
- **Image Loading**: Fallback avatars for broken images
- **User Feedback**: Clear error messages and retry options
- **Boundary Components**: React error boundaries for graceful failures
- **Null Safety**: Comprehensive null/undefined checking throughout
- **Validation**: Input validation and sanitization in services

## 🚀 Production Ready

This application is production-ready with:

- **TypeScript**: Complete type safety with strict configuration
- **Performance**: Optimized bundle and rendering (< 500KB initial load)
- **Accessibility**: WCAG compliance with proper ARIA labels
- **Testing**: Comprehensive test coverage (166 passing tests)
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
- **Real-time Counter**: Shows loaded vs total users
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Framer Motion entrance effects

### Data Management
- **Infinite Pagination**: Efficient loading of large datasets
- **Smart Caching**: React Query optimization for performance
- **Real-time Updates**: Dynamic user counter updates
- **Error Recovery**: Automatic retry mechanisms

## 📝 License

This project is created for a coding challenge and is not intended for commercial use.

---

**🔗 [Live Demo](https://user-interface-assignmentt.vercel.app/)** | Built with ❤️ using React, TypeScript, and modern web technologies
