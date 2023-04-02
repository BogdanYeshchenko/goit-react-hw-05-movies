import Conteiner from 'components/conteiner/conteiner';
// import MovieReviews from 'components/movie-reviews/MovieReviews';
// import MovieCredits from 'components/movieCredits/MovieCredits';
import { Suspense, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { searchMovieByID } from 'serviceSearch/searchMovies';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ConteinerCenter from 'components/conteiner/conteinerCenter';
import css from './MoviesDetailes.module.css';

const MoviesDetailes = ({ location }) => {
  const [dataOfMovie, setDataOfMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [isCatsOpen, setIsCatsOpen] = useState(false);
  // const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const reponse = await searchMovieByID(id);
      setDataOfMovie(reponse);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  // function handleCastOpen() {
  //   setIsCatsOpen(prev => !prev);
  //   setIsReviewsOpen(false);
  // }

  // function handleReviewsOpen() {
  //   setIsReviewsOpen(prev => !prev);
  //   setIsCatsOpen(false);
  // }

  if (isLoading) {
    return (
      <ConteinerCenter>
        <PacmanLoader color="#00ddf4" size="50px" />
      </ConteinerCenter>
    );
  }

  return (
    <Conteiner>
      <div className={css.movDetailesBox}>
        <div>
          <Link to="" className="btn btn-primary">
            Go back
          </Link>
        </div>
        <div className={css.movDetailes}>
          <img
            src={`https://image.tmdb.org/t/p/w500${dataOfMovie.poster_path}`}
            alt={dataOfMovie.title}
            width="300"
          />
          <div className={css.moviesDescription}>
            <p>Title: {dataOfMovie.title}</p>
            <p>Original title: {dataOfMovie.original_title}</p>
            <p>Original language: {dataOfMovie.original_language}</p>
            <p>Popularity: {dataOfMovie.popularity}</p>
            <p>Release date: {dataOfMovie.release_date}</p>
            <p>Vote average: {dataOfMovie.vote_average}</p>
            <p>Vote count: {dataOfMovie.vote_count}</p>
            <p>Overview: {dataOfMovie.overview}</p>
          </div>
        </div>

        <NavLink to="credits">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>

        {/* <div className={css.buttonGrup}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCastOpen}
          >
            Cast
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleReviewsOpen}
          >
            Reviews
          </button>
        </div> */}
      </div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>

      {/* {isCatsOpen && <MovieCredits id={id} />}
      {isReviewsOpen && <MovieReviews id={id} />} */}
    </Conteiner>
  );
};

export default MoviesDetailes;
