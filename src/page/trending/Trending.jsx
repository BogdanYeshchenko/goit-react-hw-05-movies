import Conteiner from 'components/conteiner/conteiner';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchTrending } from 'serviceSearch/searchMovies';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ConteinerCenter from 'components/conteiner/conteinerCenter';
import { HiCamera } from 'react-icons/hi2';
import './Trending.css';

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await searchTrending();
      setTrendingMovies(response);
      setIsLoading(false);
    };
    getData();
    console.log(trendingMovies);
  }, []);

  if (isLoading) {
    return (
      <ConteinerCenter>
        <PacmanLoader color="#00ddf4" size="50px" />
      </ConteinerCenter>
    );
  }

  return (
    <Conteiner>
      <div className="trending-box">
        <h2>Trending Movies</h2>
        <ul>
          {trendingMovies.results.map(el => {
            return (
              <li key={el.id}>
                <Link to={`movies/${el.id}`}>
                  <HiCamera /> {el.title || el.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Conteiner>
  );
};

export default Trending;
