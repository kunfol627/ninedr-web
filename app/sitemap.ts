import type {MetadataRoute} from 'next';
import {publishedArticles} from '../content/articles';
export default function sitemap():MetadataRoute.Sitemap{const origin='https://www.ninedr.com';return [...['/','/o2o/','/services','/work','/insights','/about','/process','/contact','/privacy','/work/cardcaptor-sakura-yinsheng','/work/vilson-17th-anniversary','/work/huanyu-google-search'].map(p=>({url:origin+p})),...publishedArticles().map(a=>({url:origin+'/insights/'+a.slug,lastModified:a.updatedAt}))]}
