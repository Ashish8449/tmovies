import React from "react";
import HeroSlide from "../components/HeroSilder/HeroSilder";
import MoviesList from "../components/MoviesList/MoviesList";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/Button/Button";
import { category, tvType, movieType } from "../Api/TmdbApi";


//shdshdkshdk
const Home = () => {
  return (
    <React.Fragment>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV Shows</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV Shows</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

///sdsdhsd