import React, { useState, useEffect } from "react";

import { useParams } from "react-router";

import TmdbApi from "../../Api/TmdbApi";
import ApiConfig from "../../Api/apiConfig";
import Avatar from "../../assets/avatar.png";
const CastMemberList = (props) => {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await TmdbApi.credits(category, props.id);

      setCasts(res.cast.slice(0, 50));
      // setCasts(res.cast.slice(0, 20));
      // console.log(casts);
    };
    getCredits();
  }, [category, props.id]);
  const NoOFCast = casts.length < 5;
  if (casts.length < 1) {
    console.log("df");
    props.setHideCast(true);
  } else {
    props.setHideCast(false);
  }
  return (
    <div className={`casts ${NoOFCast ? "hide" : ""}`}>
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${
                ApiConfig.W500Image(item.profile_path).includes("null")
                  ? Avatar
                  : ApiConfig.W500Image(item.profile_path)
              })`,
            }}
            alt="image"
          ></div>
          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastMemberList;
