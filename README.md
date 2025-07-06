# Frontend Developer Coding Challenge

A modern React application built with TypeScript that displays user cards with detailed modal views. This project demonstrates advanced React patterns, responsive design, and production-ready code architecture.

## 🚀 Features

- **Modern React Architecture**: Built with React 18+ and TypeScript
- **Responsive Design**: Fully responsive layout that works on all devices
- **Advanced UI Components**: Custom-built components with Tailwind CSS
- **Smooth Animations**: Framer Motion integration for delightful user interactions
- **Efficient Data Fetching**: React Query for optimized API calls and caching
- **Image Optimization**: Smart image loading with fallbacks and aspect ratio handling
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Error Handling**: Comprehensive error states with retry mechanisms
- **Loading States**: Skeleton components and loading indicators
- **Performance Optimized**: Lazy loading, memoization, and efficient rendering

## 🛠️ Tech Stack

- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **React Query (TanStack Query)** for data fetching
- **Framer Motion** for animations
- **Axios** for API calls
- **Jest + React Testing Library** for testing

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
│       └── Loading.tsx
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
│   └── constants.ts
├── __tests__/
│   ├── components/
│   ├── hooks/
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

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 🎯 Key Implementation Details

### Component Architecture

- **Functional Components**: Uses React hooks exclusively
- **Component Composition**: Reusable, composable components
- **Custom Hooks**: Business logic abstracted into custom hooks
- **Service Layer**: API calls separated from UI components
- **TypeScript-First**: Complete type safety throughout

### API Integration

- **Endpoint**: `https://api.slingacademy.com/v1/sample-data/users`
- **Error Handling**: Comprehensive error handling with retry logic
- **Loading States**: Skeleton components while fetching data
- **Caching**: React Query for efficient data management
- **Image Handling**: Graceful handling of different aspect ratios

### UI/UX Features

- **Responsive Design**: Mobile-first approach with fluid layouts
- **Accessibility**: ARIA labels and keyboard navigation
- **Animations**: Smooth transitions and micro-interactions
- **Error States**: User-friendly error messages
- **Image Optimization**: Lazy loading and fallback avatars

### Performance Optimizations

- **Bundle Size**: Optimized for < 500KB initial load
- **Lazy Loading**: Images and components loaded on demand
- **Memoization**: React.memo and useMemo where appropriate
- **Efficient Rendering**: Optimized re-renders and state management

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component rendering and behavior
- **Integration Tests**: API integration and user interactions
- **Custom Hook Tests**: Isolated testing of business logic
- **Accessibility Tests**: ARIA labels and keyboard navigation

Run tests with:
```bash
npm test
```

## 🎨 Design System

The application uses a consistent design system with:

- **Color Palette**: Neutral grays with blue accents
- **Typography**: Clear hierarchy and readable fonts
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components
- **Animations**: Subtle and meaningful transitions

## 📱 Responsive Design

The application is fully responsive and works across:

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🔒 Error Handling

Comprehensive error handling includes:

- **Network Errors**: Graceful handling of API failures
- **Image Loading**: Fallback avatars for broken images
- **User Feedback**: Clear error messages and retry options
- **Boundary Components**: React error boundaries for graceful failures

## 🚀 Production Ready

This application is production-ready with:

- **TypeScript**: Complete type safety
- **Performance**: Optimized bundle and rendering
- **Accessibility**: WCAG compliance
- **Testing**: Comprehensive test coverage
- **Documentation**: Clear code and architecture documentation

## 📝 License

This project is created for a coding challenge and is not intended for commercial use.
