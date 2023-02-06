import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import tmdbApi from "../../Api/TmdbApi";
import ApiConfig from "../../Api/apiConfig";

import "./Detail.scss";
import CastMemberList from "./CastMember";
import VideoList from "./VideoList";

import MovieList from "../../components/MoviesList/MoviesList";

const Detail = () => {
  const { category, id } = useParams();

  const [hideCast, setHideCast] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <React.Fragment>
      {item && (
        <React.Fragment>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${ApiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${ApiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastMemberList id={item.id} setHideCast={setHideCast} />
                <span className={`casts_span ${hideCast ? "hidden" : ""}`}>
                  Swipe Right{" "}
                  <BsFillArrowRightCircleFill className="swipe_icon" />{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="container">
            <div className={`section mb-3 `}>
              <div className="section__header mb-2">
                <h2>Trailers</h2>
              </div>
              <VideoList id={item.id} />
              <span className={`casts_span`}>
                Swipe Right{" "}
                <BsFillArrowRightCircleFill className="swipe_icon" />{" "}
              </span>
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Detail;
