# Lumina AI

Create a modern, interactive frontend application for Module 1: User Authentication & Product Scanning.

Project Goal:

Build a user-friendly product analysis application where users can register/login, access a dashboard, search products, and submit product details (name, barcode, image) for AI-based product analysis.

Design Style:

- Modern SaaS mobile-first application design

- Premium and clean UI

- Smooth animations and micro-interactions

- Professional color palette (avoid common blue/green gradients)

- Use a minimal futuristic AI product analysis theme

- Rounded cards, glassmorphism elements, soft shadows

- Fully responsive for desktop, tablet, and mobile

Tech Preference:

- React + TypeScript

- Tailwind CSS

- Component-based architecture

- Use modern UI components

- Add smooth transitions and hover effects

Pages Required:

1. Landing Page

- Attractive hero section explaining AI-powered product analysis

- Heading:

  "Smart Product Analysis Powered by AI"

- Subtext:

  "Scan, search, and understand products instantly with intelligent insights."

- CTA buttons:

  "Get Started"

  "Login"

- Add animated product scanning illustration/card

- Feature cards:

  - Product Search

  - Barcode Scanning

  - AI Analysis

  - Secure User Access

2. User Registration Page

Create a clean signup interface.

Fields:

- Full Name

- Email

- Phone Number

- Password

- Confirm Password

Features:

- Password strength indicator

- Show/hide password option

- Form validation UI

- Animated success state after registration

3. User Login Page

Fields:

- Email

- Password

Features:

- Remember me checkbox

- Forgot Password link

- Login button with loading animation

- Social login placeholders (optional)

4. Forgot Password Page (Optional)

- Email input

- Reset password flow UI

- Success confirmation screen

5. User Dashboard

Create a professional AI dashboard.

Dashboard Components:

Top Navbar:

- Application logo

- User profile

- Notification icon

- Logout option

Main Section:

Welcome card:

"Welcome back, User"

Product Search Card:

- Large search input

- Search button

- Recent searches section

Product Scanner Section:

Create two interactive cards:

Card 1:

"Search Product"

- Enter product name

- Search products manually

- Show search animation

Card 2:

"Scan Barcode"

- Barcode scanner UI placeholder

- Camera scan button

- Mention "Coming Soon"

Image Upload Section:

- Drag and drop image upload area

- Preview uploaded product image

- "AI Analyze Product" button

- Mark image scanning as future enhancement

6. Product Submission Flow UI

After entering:

- Product Name

- Barcode (optional)

- Product Image (optional)

Show:

Loading animation:

"Identifying Product..."

Then show:

"Product Successfully Identified"

"Forwarding product details to AI Engine"

Create a smooth step progress indicator:

Step 1:

Product Input

Step 2:

Product Identification

Step 3:

AI Analysis

Interactive Requirements:

- Add page transition animations

- Add button hover animations

- Add skeleton loaders

- Add toast notifications

- Add empty states

- Add error states

- Add form validation messages

- Add smooth scrolling

Components Needed:

- Navbar

- Sidebar Dashboard

- Auth Forms

- Product Search Component

- Barcode Scanner Placeholder Component

- Image Upload Component

- Product Card

- Loading Animation

- Progress Stepper

Make the UI production-ready and visually impressive like a real AI-powered product analysis startup application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eed8352a-cb45-4529-b3e5-53722e1a051e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
