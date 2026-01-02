import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export default function SEO({
  title = 'FairPath Industries - Breaking Barriers, Building Futures',
  description = 'FairPath Industries connects justice-impacted individuals with jobs, housing, and resources. Formerly Friend A Felon. 20,000+ lives changed. 92% success rate.',
  keywords = 'reentry, justice-impacted, felon-friendly jobs, second chance housing, background check friendly, WOTC tax credit, fair chance hiring, reentry resources, friend a felon, fairpath',
  image = 'https://fairpath.com/og-image.png',
  url = 'https://fairpath.com',
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph / Facebook
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'FairPath Industries', 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'FairPath Industries');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'FairPath Industries',
      'alternateName': 'Friend A Felon',
      'url': url,
      'logo': image,
      'description': description,
      'sameAs': [
        'https://facebook.com/fairpath',
        'https://twitter.com/fairpath',
        'https://linkedin.com/company/fairpath',
        'https://instagram.com/fairpath',
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-800-555-1234',
        'contactType': 'Customer Service',
        'areaServed': 'US',
        'availableLanguage': 'English',
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Los Angeles',
        'addressRegion': 'CA',
        'addressCountry': 'US',
      },
    };

    // Add or update structured data script
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      // Reset title to default when component unmounts
      document.title = 'FairPath Industries';
    };
  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
}

// Pre-defined SEO configs for different pages
export const SEOConfigs = {
  home: {
    title: 'FairPath Industries - Breaking Barriers, Building Futures',
    description: 'Connect justice-impacted individuals with jobs, housing, and resources. Formerly Friend A Felon. 20,000+ lives changed. 92% success rate. Get started free.',
    keywords: 'reentry platform, second chance employment, felon-friendly housing, justice-impacted support, background check friendly jobs, friend a felon',
  },
  about: {
    title: 'About FairPath Industries - Our Mission & Impact',
    description: 'Learn how FairPath (formerly Friend A Felon) is revolutionizing reentry with a 5-sided ecosystem. 92% success rate, 15% recidivism. Breaking barriers since 2020.',
    keywords: 'fairpath industries, friend a felon, reentry nonprofit, second chance organization, justice reform',
  },
  blog: {
    title: 'FairPath Blog - Success Stories & Reentry Resources',
    description: 'Read inspiring success stories, employer insights, housing tips, and expert advice for justice-impacted individuals, employers, and property owners.',
    keywords: 'reentry blog, success stories, second chance stories, hiring tips, housing resources, wotc tax credit guide',
  },
  services: {
    title: 'FairPath Services - Jobs, Housing, Resources & Support',
    description: 'Comprehensive reentry solutions: job marketplace, FastTrack housing, employer solutions, property management tools, and community resources.',
    keywords: 'reentry services, job placement, housing assistance, employer solutions, fasttrack housing, property management',
  },
  contact: {
    title: 'Contact FairPath Industries - Get Help Today',
    description: 'Need help with jobs, housing, or reentry support? Contact FairPath Industries. Email: contact@fairpath.com | Phone: 1-800-555-1234',
    keywords: 'contact fairpath, reentry help, job assistance, housing help, employer inquiries, partnership opportunities',
  },
  employers: {
    title: 'Employer Solutions - Hire Qualified Candidates & Earn WOTC Credits',
    description: 'Access pre-screened candidates, earn up to $9,600 per hire in WOTC tax credits, and build an inclusive workforce with FairPath employer solutions.',
    keywords: 'wotc tax credit, fair chance hiring, diverse hiring, background friendly employers, second chance hiring, employer solutions',
  },
  properties: {
    title: 'Property Owner Solutions - Fill Vacancies & Earn Revenue',
    description: 'Fill vacancies faster with FastTrack (48hr guarantee), earn 60/40 revenue share, and create housing opportunities with FairPath property tools.',
    keywords: 'felon friendly housing, property management, tenant screening, rental income, fasttrack applications, landlord solutions',
  },
};
