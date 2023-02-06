import React, { useState, useEffect, useRef } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactDOM from "react-dom";
import Button, { OutlineButton } from "../Button/Button";
import Modal, { ModalContent } from "../Modal/Modal";

import tmdbApi, { category, movieType } from "../../Api/TmdbApi";
import ApiConfig from "../../Api/apiConfig";

import "./HeroSilder.scss";
import { useNavigate } from "react-router-dom";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };

      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        // console.log(response);
        setMovieItems(response.results);
      } catch {
        console.log("SomeThing Went Wrong Try Again..");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 10000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItems.map((item, i) => (
        <Portal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let Navigation = useNavigate();

  const item = props.item;

  const background = ApiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    console.log(modal);
    const videos = await tmdbApi.getVideos(category.movie, item.id);
    console.log(videos);
    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => Navigation("/movie/" + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img
            className="hero_hover_image"
            src={ApiConfig.W500Image(item.poster_path)}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <div className="portal">
      <Modal active={false} id={`modal_${item.id}`}>
        <ModalContent onClose={onClose}>
          <iframe
            ref={iframeRef}
            width="100%"
            height="500px"
            title="trailer"
            allow="autoplay"
            allowFullScreen
            //   autoplay
          ></iframe>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HeroSlide;

export const setModalActive = async ({ item, category }) => {
  const modal = document.querySelector(`#modal_${item.id}`);

  console.log(modal);
  const videos = await tmdbApi.getVideos(category.movie, item.id);

  if (videos.results.length > 0) {
    const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
    modal
      .querySelector(".modal__content > iframe")
      .setAttribute("src", videSrc);
  } else {
    modal.querySelector(".modal__content").innerHTML = "No trailer";
  }

  modal.classList.toggle("active");
};

// this is modal conponents for render in portal id element in html
const portalroot = document.getElementById("portals");
export const Portal = ({ item }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<TrailerModal item={item} />, portalroot)}
    </React.Fragment>
  );
};
