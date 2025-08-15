# HeroGlass App

A modern, responsive landing page built with Next.js 15, React 19, and Tailwind CSS v4.

## Features

- 🎨 Modern glass-morphism design
- 📱 Fully responsive layout
- ⚡ Fast performance with Next.js 15
- 🎭 Smooth animations and transitions
- 🔧 TypeScript for type safety

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

The project includes:
- `vercel.json` configuration
- Proper Next.js configuration
- Optimized build settings

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
└── components/
    ├── HeroSection.tsx  # Main hero section
    └── NavBar.tsx       # Navigation component
```

## Customization

- Colors and themes can be modified in `src/app/globals.css`
- Component styles use Tailwind CSS classes
- Animations are defined in the CSS file

## License

MIT
