import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor() { }


  analyzeSEOScore(data: any) {
    // Sample SEO factors (you can customize and expand this list)

    var blog = `
    <html>
    <head>
      <title>${data.title}</title>
      <meta name="description" content="${data.meta_description}">
    </head>
    <body>
      <h1>${data.title}</h1>
      <h2>${data.subtitle}</h2>
      <img src="${data.banner}" alt="${data.title}">
      <p>${data.description}</p>
    </body>
  </html>
  `


    var linkCount = this.countLinks(data.description)
    const factors = {
      'contentLength': data.description.split(" ").length,
      'keywordDensity': this.calculateKeywordDensity(blog, data.focus_keyword).toFixed(1), // Replace with your target keyword
      'hasMetaDescription': this.hasMetaDescription(blog),
      'hasH1Tag': this.hasTag(blog, 'h1'),
      'hasH2Tag': this.hasTag(blog, 'h2'),
      'hasImageAltTags': this.hasImageAltTags(blog),
      'internalLinksCount': linkCount.internal,
      'externalLinksCount': linkCount.external,
      // 'hasUniqueMetaTitle': this.hasUniqueMetaTitle(blog),
      'titleLength': data.title.length,
      'metaDescriptionLength': data.meta_description.length,
      'mataDescriptionHasFocusKeyword': this.mataDescriptionHasFocusKeyword(data.meta_description, data.focus_keyword),
      'titleHasFocusKeyword': this.titleHasFocusKeyword(data.title, data.focus_keyword),
      'headingsHasFocusKeyword': this.headingsHasFocusKeyword(blog, data.focus_keyword)
    };

    // Calculate overall SEO score based on factors
    const seoScore = this.calculateOverallScore(factors);

    return {
      seoScore,
      factors,
    };
  }

  headingsHasFocusKeyword(blog: string, focus_keyword: string) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = blog;
    const headings = tempDiv.querySelectorAll('h2, h3, h4');
    const headingTexts = Array.from(headings).map(heading => heading.textContent);
    var hasKeyword = false;
    headingTexts.forEach(text => {
      if (text?.toLocaleLowerCase().includes(focus_keyword.toLocaleLowerCase())) {
        hasKeyword = true;
      }
    })
    return hasKeyword
  }
    

  titleHasFocusKeyword(title: string, focus_keyword: string) {
    return title.toLocaleLowerCase().includes(focus_keyword.toLocaleLowerCase())
  }

  mataDescriptionHasFocusKeyword(meta_description: string, focus_keyword: string) {
    return meta_description.toLocaleLowerCase().includes(focus_keyword.toLocaleLowerCase())
  }

  // Calculate keyword density in the blog content
  calculateKeywordDensity(blog: string, keyword: string) {
    // Sample implementation (you can customize based on your needs)
    const keywordCount = (blog.match(new RegExp(keyword, 'gi')) || []).length;
    const totalWords = blog.split(/\s+/).length;

    return (keywordCount / totalWords) * 100;
  }

  // Check if the blog has a meta description
  hasMetaDescription(blog: string) {
    // Sample implementation (you can customize based on your needs)
    const metaTagRegex = /<meta\s+name=["']description["']\s+content=["'](.*?)["']\s*\/?>/i;
    return metaTagRegex.test(blog);
  }

  // Check if the blog has a specific tag (e.g., h1, h2)
  hasTag(blog: string, tagName: string) {
    const tagRegex = new RegExp(`<${tagName}\\b[^>]*>(.*?)<\\/${tagName}>`, 'i');
    return tagRegex.test(blog);
  }

  // Check if the blog has image alt tags
  hasImageAltTags(blog: string) {
    // Sample implementation (you can customize based on your needs)
    const altTagRegex = /<img\b[^>]*alt=["'](.*?)["'][^>]*>/i;
    const altTags = blog.match(altTagRegex);
    return altTags !== null && altTags.length > 0;
  }

  // Count the number of internal links in the blog content
  countLinks(blog: string) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = blog;

    const links = tempDiv.querySelectorAll('a');

    const hrefs = Array.from(links).map(link => link.href);
    var invernal = 0;
    var external = 0;
    hrefs.forEach(href => {
      if (href.includes("withcodeexample.com")) {
        invernal++;
      } else {
        external++;
      }
    })
    return { "internal": invernal, "external": external}
  }

  isExternalLink(url: string) {
    // Simple check for external link based on "http", "https", or "//"
    return /^(https?:)?\/\//.test(url);
  }

  // Count the number of external links in the blog content
  countExternalLinks(blog: string) {
    // Sample implementation (you can customize based on your needs)
    const externalLinkRegex = /<a\s+(?:[^>]*?\s+)?href=["'](https?:\/\/[^"']+)["'](.*?)>/g;
    const externalLinks = blog.match(externalLinkRegex);
    return externalLinks !== null ? externalLinks.length : 0;
  }

  // Check if the blog has a unique meta title
  hasUniqueMetaTitle(blog: string) {
    // Sample implementation (you can customize based on your needs)
    const titleTagRegex = /<title\b[^>]*>(.*?)<\/title>/i;
    const titleTags = blog.match(titleTagRegex);
    return titleTags !== null && titleTags.length === 1;
  }

  // Calculate the overall SEO score based on individual factors
  calculateOverallScore(factors: any) {
    // Sample scoring algorithm (you can customize based on your needs)
    let totalScore = 0;

    // Adjust weights based on the importance of each factor
    totalScore += factors.contentLength * 0.01;
    totalScore += factors.keywordDensity * 0.15;
    totalScore += factors.hasMetaDescription ? 10 : 0;
    totalScore += factors.hasH1Tag ? 15 : 0;
    totalScore += factors.hasH2Tag ? 10 : 0;
    totalScore += factors.hasImageAltTags ? 10 : 0;
    totalScore += factors.internalLinksCount * 5;
    totalScore += factors.externalLinksCount * 5;
    totalScore += factors.hasUniqueMetaTitle ? 10 : 0;

    return totalScore = (totalScore / 100) * 100;
  }

  slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // Trim leading/trailing white space
    str = str.toLowerCase(); // Convert to lowercase
    str = str.replace(/[^\w\s-]/g, ''); // Remove non-word characters except spaces and hyphens
    str = str.replace(/\s+/g, '-'); // Replace spaces with hyphens
    return str;
  }



}
