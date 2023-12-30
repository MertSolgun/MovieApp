import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const MovieDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [moviedetails, setMovieDetails] = useState([]);

  const key = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`
        )
        .then((movievideo) => setVideo(movievideo.data.results));
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
        )
        .then((details) => setMovieDetails(details.data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const videoUrl =
    video.length > 0
      ? `https://www.youtube.com/embed/${video[0].key}?autoplay=1`
      : "";

  return (
    <div className="text-white">
      <div className="mx-auto justify-center flex mt-10">
        {videoUrl && (
          <iframe
            width="900"
            height="500"
            src={videoUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        )}
      </div>
      <div className="movieOver rounded-xl bg-gray-900 dark:bg-gray-500 mt-10">
        <div className="rounded-xl">
          <img
            loading="lazy"
            alt={moviedetails.title}
            src={`https://image.tmdb.org/t/p/original/${
              moviedetails.backdrop_path || moviedetails.poster_path
            }`}
          />
        </div>
        <div className="overViews">
          <span>{moviedetails.title}</span>
          <span>{moviedetails.overview}</span>
          <ul>
            <li>Release Date:{moviedetails.release_date}</li>
            <li>Rate:{moviedetails.vote_average}</li>
            <li>Total Vote:{moviedetails.vote_count}</li>
            <button
              className="bg-blue-500 px-3 py-1 rounded-lg mx-4"
              onClick={() => navigate("/")}
            >
              Go Back
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
