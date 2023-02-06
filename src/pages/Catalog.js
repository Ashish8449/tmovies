import React from "react";

import { useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader/PageHeader";

import { category } from "../Api/TmdbApi";
import Search from "../components/Search/Search";

const Catalog = () => {
  const categoryUrl = useParams();
  console.log(categoryUrl.category);

  window.scrollTo(0, 0);
  return (
    <>
      <PageHeader>
        {categoryUrl.category === category.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <Search category={categoryUrl.category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
