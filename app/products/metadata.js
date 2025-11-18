import productsData from '../../public/json/data/products.json';

export const metadata = {
  title: 'Products | Connecting Roots - SAP Consulting & Implementation Experts',
  description: 'Explore our comprehensive SAP product offerings including S/4HANA, Ariba, SuccessFactors, Hybris, BusinessObjects, and Concur. Critindia provides expert implementation and support services across the entire SAP ecosystem.',
  metadataBase: new URL('https://www.critindia.com'),
  openGraph: {
    title: 'Products | Connecting Roots - SAP Consulting & Implementation Experts',
    description: 'Explore our comprehensive SAP product offerings including S/4HANA, Ariba, SuccessFactors, Hybris, BusinessObjects, and Concur. Critindia provides expert implementation and support services across the entire SAP ecosystem.',
    url: 'https://www.critindia.com/products',
    siteName: 'critindia',
    images: [
      {
        url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif',
        width: 150,
        height: 40,
        alt: 'Products - critindia SAP Consulting Experts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | Connecting Roots - SAP Consulting & Implementation Experts',
    description: 'Explore our comprehensive SAP product offerings including S/4HANA, Ariba, SuccessFactors, Hybris, BusinessObjects, and Concur. Critindia provides expert implementation and support services across the entire SAP ecosystem.',
    images: ['https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif'],
  },
  alternates: {
    canonical: 'https://www.critindia.com/products',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  additionalMetaTags: [
    {
      property: 'article:modified_time',
      content: new Date().toISOString(),
    },
  ],
  keywords: productsData.products.map(product => product.name).join(', ') + ', SAP Solutions, SAP Implementation, SAP Consulting, SAP Services, Digital Transformation',
};
