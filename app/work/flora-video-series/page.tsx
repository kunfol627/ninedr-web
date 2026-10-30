import VideoSeriesCase from '../video-series-case';
const project = {
  "name": "芙洛拉花藝學院",
  "impressions": "100,000+",
  "engagement": "1.74%",
  "images": [
    {
      "src": "/images/cases/flora-video-series/video-1.webp",
      "width": 580,
      "height": 904,
      "alt": "芙洛拉花藝學院系列影片畫面 1"
    },
    {
      "src": "/images/cases/flora-video-series/video-2.webp",
      "width": 534,
      "height": 832,
      "alt": "芙洛拉花藝學院系列影片畫面 2"
    },
    {
      "src": "/images/cases/flora-video-series/video-3.webp",
      "width": 582,
      "height": 892,
      "alt": "芙洛拉花藝學院系列影片畫面 3"
    }
  ]
};
export const metadata = {"title": "芙洛拉花藝學院｜系列影片", "description": "芙洛拉花藝學院系列影片合作案例，曝光次數 100,000+，互動率 1.74%。", "alternates": {"canonical": "/work/flora-video-series"}, "openGraph": {"title": "芙洛拉花藝學院｜系列影片", "description": "芙洛拉花藝學院系列影片合作案例，曝光次數 100,000+，互動率 1.74%。", "images": [{"url": "/images/cases/flora-video-series/video-1.webp", "width": 580, "height": 904}]}};
export default function Page(){return <VideoSeriesCase {...project}/>;}
