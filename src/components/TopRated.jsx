import React, { useEffect, useState } from "react";
import axios from "axios";

const TopRated = () => {
  const [top, setTop] = useState([]);
  useEffect(() => {
    const key = process.env.REACT_APP_URL;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
      )
      .then((data) => setTop(data.data.results));
  }, []);
  return (
    <div className=" py-5">
      <div className="px-5 p-5 ml-3">
        <span className="text-2xl  px-5 items-center mt-10 popularS">
          Top Rated
        </span>
      </div>

      <div>
        <div className="flex justify-center mx-auto flex flex-row items-center flex-wrap gap-5">
          {top.map((item, index) => (
            <React.Fragment key={index}>
              <div className="topMovie">
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/original/${
                    Math.random() < 0.5 ? item.backdrop_path : item.poster_path
                  }`}
                  alt={item.title}
                />
                <div className="topOver">{item.overview}</div>
                <div className="topMovieOver  bg-blue-400 flex align-baseline items-center justify-between p-1">
                  <h5 className="text-black text-center">{item.title}</h5>
                  <span
                    className={`${
                      item.vote_average < 6
                        ? "bg-red-500 px-3 rounded-xl p-3"
                        : item.vote_average > 8
                        ? "bg-yellow-300 px-3 rounded-xl p-3"
                        : "bg-green-500 px-3 rounded-xl p-3"
                    }`}
                  >
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <></>
    </div>
  );
};

export default TopRated;
