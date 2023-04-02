import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchMovies } from 'serviceSearch/searchMovies';
import { HiCamera } from 'react-icons/hi2';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ConteinerCenter from 'components/conteiner/conteinerCenter';
import Conteiner from 'components/conteiner/conteiner';
import './Movies.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevSearchParams = Object.fromEntries([...searchParams]);
  const search = searchParams.get('search');
  const pageUrl = searchParams.get('pageUrl');

  const [totalPage, setTotalPage] = useState(null);
  const [listMovies, setListMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cenLoadMore = totalPage <= pageUrl;

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const data = await searchMovies(search, 1);
    const { results, total_pages } = data;

    setSearchParams({ ...prevSearchParams, pageUrl: 1 });
    setListMovies(results);
    setTotalPage(total_pages);
    setIsLoading(false);
  }

  async function handleLoadMore(e) {
    setIsLoading(true);
    setSearchParams({ ...prevSearchParams, pageUrl: Number(pageUrl) + 1 });
    e.preventDefault();
    const data = await searchMovies(search, Number(pageUrl) + 1);
    const { results } = data;

    setListMovies(prev => [...prev, ...results]);
    setIsLoading(false);
  }

  function handleInputChenge(e) {
    const { value } = e.target;

    setSearchParams({ ...prevSearchParams, search: value });
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
                value={search || ''}
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
            <li>{`Movies '${search}' not found.`}</li>
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
            {`Load more ${pageUrl}/${totalPage}`}
          </button>
        )}
      </div>
    </Conteiner>
  );
};
export default Movies;
