import { useEffect, useState } from 'react';
import { searchCastByID } from 'serviceSearch/searchMovies';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ConteinerCenter from 'components/conteiner/conteinerCenter';
import './MovieCredits.css';

const MovieCredits = id => {
  const [creditsData, setCreditsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function sarchData(x) {
      const data = await searchCastByID(x);
      setCreditsData(data);
      setIsLoading(false);
    }

    sarchData(id);
  }, [id]);

  console.log(creditsData);

  if (isLoading) {
    return (
      <ConteinerCenter>
        <PacmanLoader color="#00ddf4" size="50px" />
      </ConteinerCenter>
    );
  }

  if (creditsData.cast.length === 0) {
    return <div>Sorry no actors...</div>;
  }
  return (
    <ul className="credits-box">
      {creditsData.cast.map(el => {
        return (
          <li key={el.id} className="credits-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
              alt={el.name}
              width="200"
              height="300"
            />
            <div className="credits-name-box">
              <p>Name: {el.name}</p>
              <p>Character: {el.character}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCredits;
