# DBangles - Handmade Bangles & Designer Dresses 🛍️

E-commerce platform for handmade bangles and designer dresses with modern UI and complete SEO optimization.

## 🚀 Features

- **Product Catalog**: Browse handmade bangles, kundan bangles, glass bangles, and designer dresses
- **Shopping Cart**: Add to cart and buy now functionality
- **Order Tracking**: Track your orders with real-time status
- **Authentication**: Google Sign-In integration
- **WhatsApp Support**: Floating button for instant support
- **Responsive Design**: Mobile-first, optimized for all devices
- **SEO Optimized**: Complete SEO implementation with meta tags, schema markup, and sitemap

## 📦 Tech Stack

- **React 19** - UI Framework
- **Vite 7** - Build tool
- **React Router** - Navigation
- **Firebase** - Authentication
- **React Helmet** - SEO meta tags management
- **Lucide React** - Icons
- **CSS3** - Styling

## 🎯 SEO Features

✅ **Dynamic Meta Tags** - Unique titles and descriptions for each page  
✅ **Structured Data** - Schema.org markup for products and organization  
✅ **Open Graph Tags** - Optimized social media sharing  
✅ **Sitemap.xml** - For better search engine crawling  
✅ **Robots.txt** - Crawler directives  
✅ **Canonical URLs** - Prevent duplicate content  
✅ **Semantic HTML** - Proper heading structure (H1, H2, H3)  

📖 [**Read Complete SEO Documentation**](./SEO-IMPLEMENTATION.md)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
dbangle/
├── public/
│   ├── sitemap.xml       # SEO sitemap
│   └── robots.txt        # Crawler directives
├── src/
│   ├── components/       # React components
│   ├── styles/          # CSS stylesheets
│   ├── data/            # Product data
│   ├── firebase.js      # Firebase config
│   └── App.jsx          # Main app component
├── SEO-IMPLEMENTATION.md # Complete SEO guide
└── index.html           # Entry HTML with meta tags
```

## 🔧 Configuration

### Before Deployment:

1. **Update Domain URLs** in all files (replace `https://yourdomain.com`)
2. **Add OG Images** (`public/og-image.jpg` - 1200x630px)
3. **Configure Firebase** with your credentials
4. **Update Contact Info** in structured data (phone number, social links)
5. **Submit Sitemap** to Google Search Console

## 📊 SEO Checklist

- [x] React Helmet installed
- [x] Unique page titles & descriptions
- [x] Proper HTML heading structure
- [x] Sitemap.xml created
- [x] Robots.txt created
- [x] Open Graph meta tags
- [x] Structured data (Schema.org)
- [x] Canonical URLs
- [ ] Update domain URLs (Manual)
- [ ] Submit to Google Search Console (Manual)
- [ ] Add OG images (Manual)

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**After Deployment:**
1. Submit sitemap to [Google Search Console](https://search.google.com/search-console)
2. Test with [Google Rich Results](https://search.google.com/test/rich-results)
3. Verify mobile-friendliness
4. Test page speed

## 📈 Performance

- Lighthouse SEO Score: Target 95+
- Dynamic imports for code splitting
- Image lazy loading
- Optimized bundle size

## 🔗 Useful Links

- **Google Search Console**: https://search.google.com/search-console
- **Schema Validator**: https://validator.schema.org/
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Meta Tags Checker**: https://metatags.io/

## 📝 License

Private - All rights reserved

## 👨‍💻 Development

```bash
# Run linter
npm run lint

# Build
npm run build
```

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
