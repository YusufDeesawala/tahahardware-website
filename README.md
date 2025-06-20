# Taha Hardware - Premium Industrial Solutions

A modern, unique website for Taha Hardware built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Features

- 🎨 **Unique Design**: Modern gradient-based design with premium animations
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- ⚡ **Premium Animations**: Smooth transitions and interactive elements
- 🗄️ **Dynamic Content**: Real-time product management through Supabase
- 🔐 **Secure Admin Panel**: Password-protected dashboard for content management
- 📧 **Lead Capture**: User data modal and contact form integration
- 🔍 **Advanced Search**: Product filtering and search functionality
- 👁️ **Hidden Specifications**: Collapsible product specs with "View Specs" button
- 🎯 **Uniform Card Design**: Consistent card heights and layouts
- 🌈 **Modern Gradient Theme**: Indigo-purple-pink gradient color scheme

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd taha-hardware
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit \`.env.local\` and add your Supabase credentials:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

4. Set up the database:
   - Go to your Supabase dashboard
   - Run the SQL scripts in order:
     - \`01-setup-database.sql\` (required - creates tables and basic data)
     - \`02-sample-products.sql\` (optional - adds more sample products)

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🔐 Admin Access

- Navigate to \`/admin\`
- Password: \`taha@admin2024\`
- Manage products, categories, brands, and view customer inquiries

## 🎨 Design Features

### Unique Elements
- **No top bar above navbar** - Clean, minimal header design
- **Non-highlighted admin button** - Subtle admin access
- **User data modal** - Appears on every site visit (unless previously filled)
- **Hidden specifications** - Revealed with "View Specs" button
- **Uniform card heights** - All product cards maintain consistent sizing
- **Modern gradient theme** - Indigo-purple-pink color scheme throughout

### Animations
- Floating elements in hero section
- Smooth hover transitions
- Card lift effects
- Gradient animations
- Loading spinners

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js 14 app directory
│   ├── about/             # About page
│   ├── admin/             # Password-protected admin panel
│   ├── catalogue/         # Dynamic product catalogue
│   ├── contact/           # Contact page with map
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with user modal
│   └── page.tsx           # Modern homepage
├── components/            # Reusable components
│   ├── layout/           # Navigation and footer
│   ├── ui/               # UI components (shadcn/ui)
│   └── user-data-modal.tsx # User data collection modal
├── lib/                  # Utility libraries
│   └── supabase.ts       # Supabase client configuration
└── scripts/              # Database setup scripts
    ├── 01-create-tables.sql
    ├── 02-seed-categories.sql
    └── 03-seed-brands.sql
\`\`\`

## 🛠️ Technologies Used

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 🎯 Key Features

### Homepage
- Hero section with animated gradient background
- User data collection modal (appears on first visit)
- Dynamic brand carousel
- Featured products from database
- Why choose us section with animated cards

### Catalogue Page
- Real-time product loading from Supabase
- Category-based filtering
- Search functionality
- Grid/List view toggle
- Hidden specifications with toggle button
- Uniform card design

### Admin Panel
- Secure password protection (\`taha@admin2024\`)
- Product CRUD operations with specifications
- Category and brand management
- Customer inquiry tracking
- Analytics dashboard with stats

### Contact Page
- Multi-step contact form
- Interactive OpenStreetMap
- Business information cards
- Lead capture to Supabase

## 🔧 Customization

### Changing Colors
The gradient theme uses CSS custom properties. Update in \`globals.css\`:
\`\`\`css
:root {
  --gradient-primary: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
}
\`\`\`

### Adding Products
1. Access admin panel at \`/admin\`
2. Use password: \`taha@admin2024\`
3. Add categories first, then products
4. Products appear immediately on catalogue page

### User Modal Settings
The user data modal appears once per browser session. To reset:
\`\`\`javascript
localStorage.removeItem('taha_user_data_provided')
\`\`\`

## 🚀 Deployment

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Deploy to Vercel (recommended):
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. Alternative platforms:
   - Netlify
   - Railway
   - DigitalOcean App Platform

## 📊 Database Schema

### Tables
- **leads**: Contact form submissions and user data
- **categories**: Product categories
- **products**: Product catalog with specifications
- **brands**: Partner brand information

### Key Features
- UUID primary keys
- JSONB specifications for flexible product data
- Indexed columns for performance
- Foreign key relationships

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For technical support or questions:
- Email: info@tahahardware.com
- Phone: +91 98765 43210

---

Built with ❤️ for Taha Hardware - Premium Industrial Solutions
