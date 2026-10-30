import VideoSeriesCase from '../video-series-case';
const project = {
  "name": "品凰珠寶 PH Jewelry",
  "impressions": "33,000+",
  "engagement": "1.17%",
  "images": [
    {
      "src": "/images/cases/ph-jewelry-video-series/video-1.webp",
      "width": 572,
      "height": 898,
      "alt": "品凰珠寶 PH Jewelry系列影片畫面 1"
    },
    {
      "src": "/images/cases/ph-jewelry-video-series/video-2.webp",
      "width": 582,
      "height": 904,
      "alt": "品凰珠寶 PH Jewelry系列影片畫面 2"
    },
    {
      "src": "/images/cases/ph-jewelry-video-series/video-3.webp",
      "width": 574,
      "height": 896,
      "alt": "品凰珠寶 PH Jewelry系列影片畫面 3"
    }
  ]
};
export const metadata = {"title": "品凰珠寶 PH Jewelry｜系列影片", "description": "品凰珠寶 PH Jewelry系列影片合作案例，曝光次數 33,000+，互動率 1.17%。", "alternates": {"canonical": "/work/ph-jewelry-video-series"}, "openGraph": {"title": "品凰珠寶 PH Jewelry｜系列影片", "description": "品凰珠寶 PH Jewelry系列影片合作案例，曝光次數 33,000+，互動率 1.17%。", "images": [{"url": "/images/cases/ph-jewelry-video-series/video-1.webp", "width": 572, "height": 898}]}};
export default function Page(){return <VideoSeriesCase {...project}/>;}
