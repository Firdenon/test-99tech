# 99Tech Code Challenge

A comprehensive React + TypeScript application showcasing solutions to three coding problems with modern web development practices.

## 🚀 Live Demo

**Deployed App:** [https://code-challenge-99tech-one.vercel.app/](https://code-challenge-99tech-one.vercel.app/)

## 📋 Overview

This project contains solutions to three distinct programming challenges:

### Problem 1: Sum to N 🔢
- **Interactive Algorithm Implementation**: Three different approaches to calculate sum from 1 to n
- **Mathematical Formula**: O(1) solution using `n * (n + 1) / 2`
- **Iterative Solution**: Traditional loop-based approach
- **Recursive Solution**: Functional programming approach with proper error handling
- **Features**: Real-time testing, syntax highlighting, error handling for edge cases

### Problem 2: Currency Swap Form 💱
- **Live Token Data**: Fetches real-time prices from Switcheo API
- **Interactive Interface**: Click-to-select tokens from available list
- **Real-time Calculations**: Automatic exchange rate computation
- **Form Validation**: Comprehensive input validation and error handling
- **Toast Notifications**: Professional success/error feedback system
- **Token Icons**: Switcheo token repository integration with fallback badges
- **Responsive Design**: Mobile-friendly interface

### Problem 3: React Code Analysis 🤢
- **Code Review Task**: Detailed analysis of messy React/TypeScript code
- **Issue Identification**: Comprehensive breakdown of logic errors, TypeScript issues, performance problems, and anti-patterns
- **Solution Provided**: Complete refactored version with explanations
- **Interactive Display**: Syntax-highlighted code with toggleable solutions

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router DOM v7** for client-side routing
- **Tailwind CSS v4** with custom dark theme
- **Highlight.js** for syntax highlighting
- **Custom CSS Variables** for consistent theming

## 🎨 Design Features

- **Custom Dark Theme**: Blue-toned professional color palette
- **Luminous Cursor Effect**: Interactive cursor glow on hover
- **Smooth Animations**: Transitions and hover effects throughout
- **Responsive Layout**: Works on all device sizes
- **Professional UI**: Consistent design language across all pages

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Firdenon/test-99tech.git
   cd test-99tech
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

## 📁 Project Structure

```
src/
├── pages/
│   ├── Home.tsx          # Landing page with navigation
│   ├── Problem1.tsx      # Sum to N implementation
│   ├── Problem2.tsx      # Currency swap form
│   └── Problem3.tsx      # React code analysis
├── App.tsx               # Main app with routing and cursor effects
├── main.tsx              # Application entry point
└── index.css             # Custom theme and global styles
```

## 🎯 Key Features Implemented

### Problem 1 Highlights
- ✅ Three different algorithmic approaches
- ✅ Interactive testing interface
- ✅ Syntax highlighting for code display
- ✅ Comprehensive error handling
- ✅ Performance comparison between approaches

### Problem 2 Highlights
- ✅ Real-time token price fetching
- ✅ Interactive token selection
- ✅ Live exchange rate calculations
- ✅ Professional form validation
- ✅ Toast notification system
- ✅ Token icon integration with fallbacks
- ✅ Mobile-responsive design

### Problem 3 Highlights
- ✅ Detailed code analysis with 15+ issues identified
- ✅ Complete refactored solution
- ✅ Syntax highlighted code blocks
- ✅ Interactive solution reveal
- ✅ Educational explanations for each fix

## 🌟 Notable Implementation Details

- **Custom Theme System**: CSS variables integrated with Tailwind CSS
- **Error Boundaries**: Graceful handling of API failures and edge cases
- **Performance Optimizations**: Memoized calculations and optimized re-renders
- **Accessibility**: Proper semantic HTML and keyboard navigation
- **Type Safety**: Comprehensive TypeScript implementation throughout

---

## 🔧 Development Information

### Vite Configuration

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
