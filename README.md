# SkillLoop Landing Page

A modern, responsive landing page for SkillLoop - a Skill Swap Platform built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with beautiful UI on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **React Router**: Client-side routing for seamless navigation
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **TypeScript**: Type-safe development experience
- **Component-Based**: Modular, reusable components

## Pages & Components

### Pages
- **Home**: Hero section, features, how it works, testimonials
- **How It Works**: Detailed step-by-step guide
- **Browse Skills**: Search and filter skills with categories
- **Login/SignUp**: Authentication forms with social login options

### Components
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Links, social media, and legal information

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillloop-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Project Structure

```
skillloop-landing/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── BrowseSkills.tsx
│   │   └── Login.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v6**: Client-side routing
- **Create React App**: Development environment

## Customization

### Colors
The project uses a custom color palette defined in `tailwind.config.js`:
- Primary: Blue shades (`primary-50` to `primary-900`)
- Secondary: Green shades (`secondary-50` to `secondary-900`)

### Styling
Custom CSS classes are defined in `src/index.css`:
- `.btn-primary`: Primary button styling
- `.btn-secondary`: Secondary button styling
- `.section-padding`: Consistent section padding
- `.container-custom`: Custom container width

## Features Implemented

### ✅ Completed
- [x] Responsive navbar with logo and navigation links
- [x] Hero section with bold headline and CTA buttons
- [x] 3-column feature section explaining core features
- [x] "How It Works" section with 4 detailed steps
- [x] Testimonials section from happy users
- [x] Footer with legal and social links
- [x] React Router v6 setup for navigation
- [x] Mobile responsive design
- [x] Modern, clean UI with Tailwind CSS
- [x] TypeScript for type safety
- [x] Functional components with hooks

### 🎨 Design Features
- Gradient backgrounds and modern color scheme
- Smooth hover animations and transitions
- Professional typography with Inter font
- Card-based layouts with shadows
- Icon integration with SVG
- Responsive grid systems

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please reach out to the development team.

---

**SkillLoop** - Swap Skills, Grow Together 

end 