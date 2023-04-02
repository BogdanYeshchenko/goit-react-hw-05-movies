import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Trending from 'page/trending/Trending';
import Movies from 'page/movies/Movies';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import MovieReviews from './movie-reviews/MovieReviews';
import MovieCredits from './movieCredits/MovieCredits';
import MoviesDetailes from './MoviesDetailes/MoviesDetailes';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Trending />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MoviesDetailes />}>
            <Route path="credits" element={<MovieCredits />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};
