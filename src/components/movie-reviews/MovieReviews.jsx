import { useEffect, useState } from 'react';
import { searchReviewsByID } from 'serviceSearch/searchMovies';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ConteinerCenter from 'components/conteiner/conteinerCenter';
import './MovieReviews.css';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
  const [reviewsData, setReviewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function sarchData() {
      const data = await searchReviewsByID(id);
      setReviewsData(data);
      setIsLoading(false);
    }

    sarchData();
  }, [id]);

  console.log(reviewsData);

  if (isLoading) {
    return (
      <ConteinerCenter>
        <PacmanLoader color="#00ddf4" size="50px" />
      </ConteinerCenter>
    );
  }

  if (reviewsData.results?.length === 0) {
    return <div>Sorry no reviews...</div>;
  }
  return (
    <ul className="reviews-box">
      {reviewsData.results.map(el => {
        return (
          <li key={el.id} className="reviews-item">
            <b>Author: {el.author}</b>
            <p>{el.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieReviews;
