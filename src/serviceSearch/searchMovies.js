import axios from 'axios';
import { toast } from 'react-toastify';

const KEY = 'e5af635c866590d061e3d190b1e14e0d';
const BASE_URL = 'https://api.themoviedb.org/';

export const searchMovies = async (searchWord, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}3/search/movie?api_key=${KEY}&language=en-US&query=${searchWord}&page=${page}`
    );

    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.error(error.message);
  }
};

export const searchMovieByID = async id => {
  try {
    const response = await axios.get(
      `${BASE_URL}3/movie/${id}?api_key=${KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.error(error.message);
  }
};

export const searchCastByID = async id => {
  try {
    const response = await axios.get(
      `${BASE_URL}3/movie/${id}/credits?api_key=${KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.error(error.message);
  }
};

export const searchReviewsByID = async id => {
  try {
    const response = await axios.get(
      `${BASE_URL}3/movie/${id}/reviews?api_key=${KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.error(error.message);
  }
};

export const searchTrending = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}3/trending/all/week?api_key=${KEY}`
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.error(error.message);
  }
};
