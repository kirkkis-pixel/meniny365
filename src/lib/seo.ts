// SEO utilities for structured data and meta tags

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  type?: string;
  locale?: string;
  alternate?: string;
  structuredData?: any;
}

export function generateNamePageSEO(name: string, nameData: any): SEOData {
  const title = `${name} - Meniny, pôvod a význam mena | meniny365.sk`;
  const description = `Meniny pre ${name} sú ${nameData.nameDay}. Pozrite si pôvod, význam a históriu mena ${name}. Nájdite darčeky a pohľadnice k meninám.`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "description": description,
    "url": `https://meniny365.sk/sk/meno/${nameData.slug}`,
    "image": `https://meniny365.sk/og-image.jpg`,
    "sameAs": [
      "https://meniny365.sk/sk/meno/${nameData.slug}"
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Meniny",
        "value": nameData.nameDay
      },
      {
        "@type": "PropertyValue", 
        "name": "Pôvod",
        "value": nameData.origin
      }
    ]
  };

  return {
    title,
    description,
    canonical: `https://meniny365.sk/sk/meno/${nameData.slug}`,
    keywords: `meniny ${name}, ${name} meniny, pôvod mena ${name}, význam mena ${name}, darčeky k meninám ${name}`,
    structuredData
  };
}

export function generateBlogPostSEO(post: any): SEOData {
  const title = `${post.title} | meniny365.sk`;
  const description = post.excerpt || post.content.substring(0, 160) + '...';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": description,
    "url": `https://meniny365.sk/sk/blog/${post.slug}`,
    "image": post.image || "https://meniny365.sk/og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "meniny365.sk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "meniny365.sk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://meniny365.sk/logo.png"
      }
    },
    "datePublished": post.publishedTime,
    "dateModified": post.modifiedTime || post.publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://meniny365.sk/sk/blog/${post.slug}`
    }
  };

  return {
    title,
    description,
    canonical: `https://meniny365.sk/sk/blog/${post.slug}`,
    keywords: post.keywords || "meniny, slovenské mená, kalendár menín, pôvod mien",
    publishedTime: post.publishedTime,
    modifiedTime: post.modifiedTime,
    type: "article",
    structuredData
  };
}

export function generateCalendarPageSEO(month: string, year: string): SEOData {
  const monthNames = [
    "januára", "februára", "marca", "apríla", "mája", "júna",
    "júla", "augusta", "septembra", "októbra", "novembra", "decembra"
  ];
  
  const monthName = monthNames[parseInt(month) - 1];
  const title = `Meniny v ${monthName} ${year} - Kompletný kalendár | meniny365.sk`;
  const description = `Pozrite si všetky meniny v ${monthName} ${year}. Kompletný kalendár menín s pôvodom mien, darčekovými tipmi a pohľadnicami.`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `https://meniny365.sk/sk/kalendár/${year}/${month}`,
    "mainEntity": {
      "@type": "ItemList",
      "name": `Meniny v ${monthName} ${year}`,
      "description": `Zoznam všetkých menín v ${monthName} ${year}`
    }
  };

  return {
    title,
    description,
    canonical: `https://meniny365.sk/sk/kalendár/${year}/${month}`,
    keywords: `meniny ${monthName} ${year}, kalendár menín ${year}, slovenské mená ${monthName}`,
    structuredData
  };
}

export function generateHomePageSEO(): SEOData {
  const title = "Meniny365.sk - AI-powered kalendár menín na Slovensku";
  const description = "Prvý AI-powered kalendár menín na Slovensku. Inteligentné vyhľadávanie, pôvod mien, darčeky k meninám a personalizované pohľadnice. 100% zdarma.";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "meniny365.sk",
    "description": description,
    "url": "https://meniny365.sk",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://meniny365.sk/sk/povod-a-vyznam-mien?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "meniny365.sk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://meniny365.sk/logo.png"
      }
    }
  };

  return {
    title,
    description,
    canonical: "https://meniny365.sk",
    keywords: "meniny, kalendár menín, slovenské mená, meniny 2025, pôvod mien, darčeky k meninám, pohľadnice, AI",
    structuredData
  };
}

