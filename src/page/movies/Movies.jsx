import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { searchMovies } from 'serviceSearch/searchMovies';
import { HiCamera } from 'react-icons/hi2';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ConteinerCenter from 'components/conteiner/conteinerCenter';
import Conteiner from 'components/conteiner/conteiner';
import './Movies.css';

const Movies = ({ children }) => {
  const [searcParams, setSearchParams] = useSearchParams();
  const search = searcParams.get('search');
  const pageS = searcParams.get('page');

  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [listMovies, setListMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cenLoadMore = totalPage <= page;

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const data = await searchMovies(searchWord, 1);
    const { results, total_pages } = data;

    setSearchParams({ page: 1 });
    setPage(1);
    setListMovies(results);
    setTotalPage(total_pages);
    setIsLoading(false);
  }

  async function handleLoadMore(e) {
    setIsLoading(true);
    setSearchParams(page);
    setPage(prev => prev + 1);
    e.preventDefault();
    const data = await searchMovies(searchWord, page + 1);
    const { results } = data;

    setListMovies(prev => [...prev, ...results]);
    setIsLoading(false);
  }

  function handleInputChenge(e) {
    const { value } = e.target;

    setSearchWord(value);
    setSearchParams({ search: value });
  }

  return (
    <Conteiner>
      <div className="movies-box">
        <h2>Movies</h2>
        <div>
          <form onSubmit={handleSubmit} className="form-box">
            <label className="label-box">
              <span className="label-text">Search Movies</span>
              <input
                className="search-input"
                onChange={handleInputChenge}
                type="text"
                value={searchWord}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
        <ul>
          {isLoading && (
            <ConteinerCenter>
              <PacmanLoader color="#00ddf4" size="50px" />
            </ConteinerCenter>
          )}

          {listMovies?.length === 0 && !isLoading && (
            <li>{`Movies '${searchWord}' not found.`}</li>
          )}
          {listMovies?.length > 0 &&
            !isLoading &&
            listMovies.map(el => {
              return (
                <li key={el.id}>
                  <Link to={`${el.id}`}>
                    <HiCamera /> {el.title || el.name}
                  </Link>
                </li>
              );
            })}
        </ul>
        {totalPage && (
          <button
            disabled={cenLoadMore}
            type="button"
            className="btn btn-primary"
            onClick={handleLoadMore}
          >
            {`Load more ${page}/${totalPage}`}
          </button>
        )}
      </div>
    </Conteiner>
  );
};
export default Movies;
