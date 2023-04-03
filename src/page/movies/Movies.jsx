import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
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
  const [inputValue, setInputValue] = useState('');

  const [totalPage, setTotalPage] = useState(null);
  const [listMovies, setListMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cenLoadMore = totalPage <= pageUrl;

  const location = useLocation();

  console.log(location);

  useEffect(() => {
    async function searchData() {
      setIsLoading(true);
      const data = await searchMovies(search, pageUrl);
      const { results, total_pages } = data;
      console.log(1);

      setListMovies(prev => [...prev, ...results]);
      setTotalPage(total_pages);
      setIsLoading(false);
    }
    if (search) {
      searchData();
    }
  }, [search, pageUrl]);

  function handleSubmit(e) {
    e.preventDefault();
    setListMovies([]);
    setSearchParams({ ...prevSearchParams, pageUrl: 1, search: inputValue });
  }

  async function handleLoadMore(e) {
    setSearchParams({ ...prevSearchParams, pageUrl: Number(pageUrl) + 1 });
  }

  function handleInputChenge(e) {
    const { value } = e.target;

    setInputValue(value);
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
                value={inputValue}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
        <ul>
          {listMovies?.length === 0 && !isLoading && (
            <li>{`Movies '${search}' not found.`}</li>
          )}
          {listMovies?.length > 0 &&
            listMovies.map(el => {
              return (
                <li key={el.id}>
                  <Link state={location} to={`${el.id}`}>
                    <HiCamera /> {el.title || el.name}
                  </Link>
                </li>
              );
            })}
        </ul>
        {isLoading && (
          <ConteinerCenter>
            <PacmanLoader color="#00ddf4" size="50px" />
          </ConteinerCenter>
        )}
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
