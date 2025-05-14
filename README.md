# Preston Schlagheck - Portfolio Website

A modern, dark-themed portfolio website for Preston Schlagheck, featuring an animated binary number rain effect and a financial-inspired design.

## Features

- **Matrix-style Binary Animation**: Dynamic rain effect with red and gray binary digits
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Modern UI**: Clean, financial-inspired dark theme with elegant typography
- **Experience Ticker**: Scrolling experience section that mimics a stock ticker display
- **Navigation**: Smooth scrolling navigation with transparent-to-solid transition
- **Contact Form**: Interactive contact form for reaching out
- **Social Links**: Direct links to LinkedIn, GitHub, and Twitter profiles
- **SEO Optimized**: Comprehensive metadata for better search engine results

## Technologies Used

- **Next.js 15**: Modern React framework with server-side rendering
- **React 19**: For component-based UI development
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS 4**: Utility-first CSS framework
- **CSS Animations**: Custom animations for the binary rain effect and ticker
- **Responsive Design**: Mobile-first approach

## Development

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/prestonschlagheck/site.git
cd site

# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Deployment

This site is deployed to Vercel. Each push to the main branch automatically triggers a new deployment.

## Project Structure

- `/public`: Static assets like favicon and images
- `/src/app`: Main application code
  - `/components`: Reusable React components
    - `Navigation.tsx`: Navbar with smooth scrolling
    - `ExperienceSection.tsx`: Experience ticker component
    - `ContactSection.tsx`: Contact form and info
    - `Footer.tsx`: Site footer with copyright
  - `/globals.css`: Global CSS styles with animation definitions
  - `/page.tsx`: Main home page with binary animation
  - `/layout.tsx`: Root layout component with font loading

## Credits

- Developed by [Preston Schlagheck](https://github.com/prestonschlagheck)
- Fonts: Playfair Display (serif) and Inter (sans-serif) from Google Fonts
