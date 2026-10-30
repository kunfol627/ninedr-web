import type {MetadataRoute} from 'next';
import {publishedArticles} from '../content/articles';
export default function sitemap():MetadataRoute.Sitemap{const origin='https://www.ninedr.com';return [...['/','/o2o/','/services','/work','/insights','/about','/process','/contact','/privacy','/work/cardcaptor-sakura-yinsheng','/work/huanyu-google-search','/work/chichibox','/work/flora-video-series','/work/ph-jewelry-video-series'].map(p=>({url:origin+p})),...publishedArticles().map(a=>({url:origin+'/insights/'+a.slug,lastModified:a.updatedAt}))]}
