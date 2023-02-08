import React, { useState } from "react";

import "./MovieCard.scss";

import { useNavigate } from "react-router-dom";

import Button, { OutlineButton } from "../Button/Button";

import tmdbApi, { category } from "../../Api/TmdbApi";
import ApiConfig from "../../Api/apiConfig";

import { Portal } from "../HeroSilder/HeroSilder";
const MovieCard = (props) => {
  const item = props.item;
  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // console.log(props.category);
  // console.log(item);
  // const [ActiveModal, setActiveModal] = useState(false);
  const Navigation = useNavigate();
  let releaseDate;

  if (item.release_date) {
    const array =
      typeof item.release_date === "string" ? item.release_date.split("-") : "";
    let month = array[1];
    month = Months[month - 1];
    releaseDate = `${month} ${array[2]}, ${array[0]}`;
  } else {
    const array =
      typeof item.first_air_date === "string"
        ? item.first_air_date.split("-")
        : "";
    let month = array[1];
    month = Months[month - 1];
    releaseDate = `${month} ${array[2]}, ${array[0]}`;
  }
  //   console.log(releaseDate);

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = ApiConfig.W500Image(item.poster_path || item.backdrop_path);

  // console.log(item);
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    // setActiveModal(true);
    // console.log(modal);
    const videos = await tmdbApi.getVideos(props.category, item.id);

    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = `...NO TRAILER... 😩`;
      let close = document.createElement("i");

      modal.querySelector(".modal__content").appendChild(close);
      close.className = "bx bx-x ";

      close.style.color = "red";
      close.style.cursor = "pointer";
      close.style.fontSize = "2rem";
      close.style.position = "absolute";
      close.style.top = "5px";
      close.style.right = "5rem";
      close.style.align = "center";
      close.addEventListener("click", () => {
        modal.classList.toggle("active");
      });
    }
    modal.classList.toggle("active");
  };
  const MovieRating = item.vote_average.toFixed(1);
  const top = MovieRating >= 8;
  const medium = MovieRating <= 8 && MovieRating >= 5;

  const hasdhak = document.querySelector(".movie-card");
  // hasdhak.addEventListener("click", () => {
  //   setActiveModal(true);
  // });
  return (
    <div>
      <div className="main_container">
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <Button onClick={() => Navigation(link)}>Watch Now</Button>

          <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
        </div>
        <div onClick={() => Navigation(link)} className="main_content">
          <p
            className="rating"
            style={{
              border: top
                ? "2px solid red "
                : medium
                ? "2px solid green"
                : "2px solid yellow",
            }}
          >
            {MovieRating}
            <sub>*</sub>
          </p>
          <h3 className="movie_name">{item.title || item.name}</h3>
          <p className="releaseDate"> {releaseDate}</p>
        </div>
      </div>
      {/* // disclaimer below Portal componnets render all the modal window for all
      card due to this the page get slow  */}
      <Portal item={item} />
    </div>
  );
};

export default MovieCard;
