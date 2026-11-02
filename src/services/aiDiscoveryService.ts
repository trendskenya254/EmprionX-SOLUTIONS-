import { Demo, CategorySlug, AiSearchCriteria } from '../types';
import { INITIAL_CATEGORIES } from '../data/initialCategories';

export class AiDiscoveryService {
  /**
   * Natural Language Search Assistant: parses user conversational intent
   * and matches REAL database records without inventing or hallucinating products.
   * Example: "Show me modern hotel websites with booking systems and beautiful image galleries"
   */
  public static searchWithAi(query: string, allDemos: Demo[]): AiSearchCriteria {
    const q = query.toLowerCase().trim();

    const matchedKeywords: string[] = [];
    const matchedCategories: CategorySlug[] = [];
    const matchedTechnologies: string[] = [];
    let matchedCms: string | undefined = undefined;

    // Detect Category intent
    if (q.includes('hotel') || q.includes('resort') || q.includes('villa') || q.includes('stay') || q.includes('hospitality')) {
      matchedCategories.push('hotel-hospitality-websites', 'hotel-and-restaurant-websites', 'booking-reservation-systems');
      matchedKeywords.push('Hotel', 'Resort', 'Room Reservations');
    }
    if (q.includes('restaurant') || q.includes('food') || q.includes('dining') || q.includes('menu') || q.includes('bistro')) {
      matchedCategories.push('restaurant-food-websites', 'hotel-and-restaurant-websites');
      matchedKeywords.push('Restaurant', 'Dining', 'Digital Menu');
    }
    if (q.includes('store') || q.includes('shop') || q.includes('ecommerce') || q.includes('e-commerce') || q.includes('checkout')) {
      matchedCategories.push('ecommerce-online-stores', 'ecommerce-websites', 'fashion-beauty-websites');
      matchedKeywords.push('E-commerce', 'Storefront', 'Cart');
    }
    if (q.includes('real estate') || q.includes('property') || q.includes('realty') || q.includes('penthouse') || q.includes('homes')) {
      matchedCategories.push('real-estate-websites');
      matchedKeywords.push('Real Estate', 'MLS', 'Virtual Tour');
    }
    if (q.includes('saas') || q.includes('software') || q.includes('cloud') || q.includes('dashboard') || q.includes('admin')) {
      matchedCategories.push('technology-saas-websites', 'dashboard-admin-templates', 'landing-pages');
      matchedKeywords.push('SaaS', 'Cloud', 'Dashboard');
    }
    if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('rag') || q.includes('agent') || q.includes('llm')) {
      matchedCategories.push('ai-powered-websites', 'ai-powered-business-systems');
      matchedKeywords.push('AI', 'RAG', 'Agentic Workflows');
    }
    if (q.includes('school') || q.includes('university') || q.includes('college') || q.includes('education') || q.includes('lms')) {
      matchedCategories.push('school-university-websites', 'school-management-systems', 'learning-management-systems');
      matchedKeywords.push('School', 'University', 'Education');
    }
    if (q.includes('portfolio') || q.includes('personal') || q.includes('cv') || q.includes('resume') || q.includes('freelancer')) {
      matchedCategories.push('portfolio-personal-websites', 'agency-digital-marketing-websites');
      matchedKeywords.push('Portfolio', 'Creative Showcase');
    }
    if (q.includes('delivery') || q.includes('logistics') || q.includes('courier') || q.includes('fleet')) {
      matchedCategories.push('delivery-logistics-applications', 'delivery-applications');
      matchedKeywords.push('Delivery', 'Logistics', 'Fleet GPS');
    }
    if (q.includes('africa') || q.includes('african') || q.includes('m-pesa') || q.includes('nuru') || q.includes('fintech')) {
      matchedCategories.push('finance-banking-websites', 'business-corporate-websites');
      matchedKeywords.push('Pan-African', 'Fintech', 'Mobile Money');
    }

    // Detect CMS intent
    if (q.includes('wordpress')) {
      matchedCms = 'WordPress';
      matchedKeywords.push('WordPress');
    } else if (q.includes('framer')) {
      matchedCms = 'Framer';
      matchedKeywords.push('Framer');
    } else if (q.includes('webflow')) {
      matchedCms = 'Webflow';
      matchedKeywords.push('Webflow');
    } else if (q.includes('shopify')) {
      matchedCms = 'Shopify';
      matchedKeywords.push('Shopify');
    } else if (q.includes('next.js') || q.includes('react')) {
      matchedCms = 'Next.js';
      matchedKeywords.push('Next.js');
    }

    // Technology mentions
    if (q.includes('tailwind')) matchedTechnologies.push('Tailwind CSS');
    if (q.includes('stripe')) matchedTechnologies.push('Stripe');
    if (q.includes('postgres') || q.includes('supabase')) matchedTechnologies.push('Supabase / PostgreSQL');
    if (q.includes('flutter')) matchedTechnologies.push('Flutter');
    if (q.includes('react native')) matchedTechnologies.push('React Native');

    // Score and rank all real demos
    const scoredDemos = allDemos.map((demo) => {
      let score = 0;
      const dTitle = demo.title.toLowerCase();
      const dDesc = (demo.description + ' ' + (demo.fullDescription || '')).toLowerCase();
      const dTech = demo.technologies.map((t) => t.toLowerCase());
      const dTags = (demo.tags || []).map((t) => t.toLowerCase());

      // Category match
      if (matchedCategories.length > 0) {
        if (matchedCategories.includes(demo.category)) score += 40;
      }

      // CMS match
      if (matchedCms && demo.cms && demo.cms.toLowerCase().includes(matchedCms.toLowerCase())) {
        score += 25;
      }

      // Feature / keyword matches
      if (q.includes('booking') && (dDesc.includes('booking') || dDesc.includes('reservation') || dTitle.includes('booking'))) {
        score += 25;
      }
      if (q.includes('gallery') && (dDesc.includes('gallery') || dDesc.includes('photos') || dDesc.includes('tour'))) {
        score += 20;
      }
      if (q.includes('minimal') && (dDesc.includes('minimal') || (demo.designStyle && demo.designStyle.toLowerCase().includes('minimal')))) {
        score += 15;
      }
      if (q.includes('luxury') && (dDesc.includes('luxury') || (demo.designStyle && demo.designStyle.toLowerCase().includes('luxury')))) {
        score += 20;
      }
      if (q.includes('dark') && (dDesc.includes('dark') || (demo.designStyle && demo.designStyle.toLowerCase().includes('dark')))) {
        score += 15;
      }

      // General query term inclusion
      const queryWords = q.split(/\s+/).filter((w) => w.length > 3);
      for (const w of queryWords) {
        if (dTitle.includes(w)) score += 15;
        if (dDesc.includes(w)) score += 5;
        if (dTech.some((t) => t.includes(w))) score += 10;
        if (dTags.some((t) => t.includes(w))) score += 10;
      }

      return { demo, score };
    });

    // Sort by score descending
    scoredDemos.sort((a, b) => b.score - a.score);

    // If query was very generic or no strong score, take the top 4
    const topMatches = scoredDemos.filter((sd) => sd.score > 10).slice(0, 8);
    const matchedDemoIds = topMatches.length > 0 
      ? topMatches.map((m) => m.demo.id) 
      : allDemos.slice(0, 4).map((d) => d.id);

    // Suggest a collection
    let suggestedCollectionTitle: string | undefined = undefined;
    if (matchedCategories.includes('hotel-hospitality-websites')) {
      suggestedCollectionTitle = 'Premium Hotel Website Designs';
    } else if (matchedCategories.includes('technology-saas-websites')) {
      suggestedCollectionTitle = 'Best SaaS Website Designs';
    } else if (matchedCategories.includes('ecommerce-online-stores')) {
      suggestedCollectionTitle = 'Modern E-commerce Designs';
    } else if (matchedCategories.includes('ai-powered-websites')) {
      suggestedCollectionTitle = 'AI Website Designs';
    } else if (matchedCategories.includes('real-estate-websites')) {
      suggestedCollectionTitle = 'Luxury Real Estate Designs';
    }

    const count = matchedDemoIds.length;
    let explanation = `Found ${count} real showroom blueprint${count === 1 ? '' : 's'} matching your criteria`;
    if (matchedKeywords.length > 0) {
      explanation += ` for [${matchedKeywords.slice(0, 3).join(', ')}]`;
    }
    if (matchedCms) {
      explanation += ` powered by ${matchedCms}`;
    }
    explanation += '. All results link to verified live previews and can be commissioned directly.';

    return {
      naturalQuery: query,
      matchedCategories,
      matchedTechnologies,
      matchedKeywords,
      matchedCms,
      suggestedCollectionTitle,
      matchedDemoIds,
      explanation,
      confidence: topMatches.length > 0 ? 94 : 80
    };
  }

  /**
   * Generates similar website recommendations based on category, technology, and design style.
   */
  public static getSimilarWebsites(targetDemo: Demo, allDemos: Demo[], limit: number = 3): Demo[] {
    return allDemos
      .filter((d) => d.id !== targetDemo.id)
      .map((d) => {
        let similarity = 0;
        if (d.category === targetDemo.category) similarity += 50;
        if (d.cms === targetDemo.cms && targetDemo.cms) similarity += 20;
        if (d.sourceOrigin === targetDemo.sourceOrigin) similarity += 10;
        const sharedTech = d.technologies.filter((t) => targetDemo.technologies.includes(t));
        similarity += sharedTech.length * 10;
        return { demo: d, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map((item) => item.demo);
  }

  /**
   * Generates SEO metadata for any category or listing.
   */
  public static generateSeoMeta(item: Demo | { name: string; description: string; demoCount: number }) {
    if ('title' in item) {
      return {
        title: `${item.title} | ImperionX Digital Showroom`,
        description: `Explore live interactive preview and technical specifications for ${item.title}. Engineered in ${item.technologies.join(', ')}. Indicative scope $${item.indicativePrice}.`,
        keywords: [item.title, item.categoryName, ...item.technologies, 'Client Showroom', 'ImperionX'].join(', ')
      };
    }
    return {
      title: `${item.name} Blueprints & Demos | ImperionX Showroom`,
      description: `Explore ${item.demoCount}+ verified ${item.name} designs, mobile interfaces, and enterprise platforms. Test live interactive demos and commission custom builds.`,
      keywords: [item.name, 'Website Templates', 'Website Designs', 'ImperionX'].join(', ')
    };
  }
}
