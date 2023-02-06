import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import "./Search.scss";

import MovieCard from "../MovieCard/MovieCard";
import Button, { OutlineButton } from "../Button/Button";
import Input from "../Input/Input";

import tmdbApi, { category, movieType, tvType } from "../../Api/TmdbApi";

const Search = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <React.Fragment>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.length > 0 ? (
          items.map((item, i) => (
            <MovieCard category={props.category} item={item} key={i} />
          ))
        ) : (
          <MovieModal>
            <p>
              {" "}
              {`Oops! We can't find ${
                props.category === "tv" ? "TV SERIES" : "MOVIES"
              }  you're looking for `}{" "}
            </p>
            <Link to={`/${props.category}`}>
              <i className="bx bx-x close_modal"></i>
            </Link>
          </MovieModal>
        )}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </React.Fragment>
  );
};

const MovieSearch = (props) => {
  const Navigation = useNavigate();
  //   console.log(Navigation);

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      Navigation(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, Navigation]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder={`Search ${props.category} here.. `}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        {`Search ${props.category}`}
      </Button>
    </div>
  );
};

export default Search;

const protalroot = document.getElementById("portals");

const MovieModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className="movieModal">{props.children}</div>,
        protalroot
      )}
    </React.Fragment>
  );
};
