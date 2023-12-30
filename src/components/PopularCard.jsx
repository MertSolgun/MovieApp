import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Notfound from "./notfound1.png";

import Spinner from "./Spinner";

const MovieCard = () => {
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const loadPopularMovies = async () => {
    setLoading(true);
    const key = process.env.REACT_APP_URL;
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${currentPage}`
      );
      setPopular(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      loadPopularMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  const inputVal = useRef();

  const handleSearch = () => {
    const searchTerm = inputVal.current.value;
    const key = process.env.REACT_APP_URL;
    if (!searchTerm) {
      loadPopularMovies();
      return;
    }

    axios(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${key}`
    )
      .then((data) => {
        setPopular(data.data.results);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="py-5 pr-5">
      {loading ? (
        ""
      ) : (
        <div className="px-5 searchMain flex mx-auto text-black text-center justify-center p-5 ">
          <input
            type="search"
            placeholder="Search Movies"
            className="SearchInput bg-gray-300 dark:bg-gray-800 p-3"
            onChange={handleSearch}
            ref={inputVal}
          />
        </div>
      )}

      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex justify-center mx-auto flex flex-row items-center flex-wrap gap-5">
            {popular.map((item, index) => (
              <div
                className="popularMovie"
                key={index}
                onClick={() => navigate("/details/" + item.id)}
              >
                {item.backdrop_path || item.poster_path ? (
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/original/${
                      item.backdrop_path ? item.backdrop_path : item.poster_path
                    }`}
                    alt={item.title}
                  />
                ) : (
                  <img src={Notfound}></img>
                )}
                <div className="moviOver">{item.overview}</div>
                <div className="moviedesc bg-blue-400 flex align-baseline items-center justify-between p-1">
                  <h5 className="text-center">{item.title}</h5>
                  <span
                    className={`${
                      item.vote_average < 6
                        ? "bg-red-500 px-3 rounded-xl p-3"
                        : item.vote_average > 7.5
                        ? "bg-green-600 px-3 rounded-xl p-3"
                        : "bg-green-400 px-3 rounded-xl p-3"
                    }`}
                  >
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {loading ? (
          ""
        ) : (
          <div className="pagination mx-auto justify-center flex gap-5 pt-10">
            <button
              onClick={() =>
                handlePageChange(
                  currentPage > 1 ? currentPage - 1 : currentPage
                )
              }
              disabled={currentPage === 1}
            >
              <GrFormPrevious className="text-4xl" />
            </button>
            <span className="text-3xl">{currentPage}</span>
            <button
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : currentPage
                )
              }
              disabled={currentPage === totalPages}
            >
              <MdNavigateNext className="text-4xl" />
            </button>
          </div>
        )}
      </div>
      <></>
    </div>
  );
};

export default MovieCard;
