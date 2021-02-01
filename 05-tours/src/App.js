import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  // Fetch data from API
  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setIsLoading(false);
      setTours(tours);
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  };

  // Load data from API on initial page load
  useEffect(() => {
    fetchTours();
  }, []);

  // While getting the data from API
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  // If no tours left
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  // When data fetched
  return (
    <main>
      <Tours removeTour={removeTour} tours={tours} />
    </main>
  );
};

export default App;
