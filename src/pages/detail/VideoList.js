import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router";
import SwiperCore, { Autoplay } from "swiper";
import { SwiperSlide } from "swiper/react";
import tmdbApi from "../../Api/TmdbApi";

const VideoList = (props) => {
  SwiperCore.use([Autoplay]);
  const { category } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, props.id);
      console.log(res);
      setVideos(res.results.slice(0, 5));
    };
    getVideos();
  }, [category, props.id]);
  const noOfVideo = videos.length < 2;
  // if (videos.length < 1) {
  //   props.setHideTrailer(true);
  // } else {
  //   props.setHideTrailer(false);
  // }
  return (
    <div className={`Video_div ${noOfVideo ? "hide" : ""}`}>
      {videos.map((item, i) => (
        <SwiperSlide key={i}>
          <Video item={item} />
        </SwiperSlide>
      ))}
    </div>
  );
};

const Video = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  console.log(item.key);
  // console.log(`https://www.youtube.com/embed/${item.key}`);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default VideoList;
