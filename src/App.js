import React, { useRef } from "react";
import starting_picture from './for_start_web.jpg';
import './App.css';
import MovieChart from "./myChart";
import Top5Chart from "./Top5Chart";
import CountryFilmChart from "./CountryChart";
import FilmCard from "./FilmData";
import useFetchData from "./getDataFromJson";

function App() {
  const { data, error, loading } = useFetchData(); // Загружаем данные

  // Создаем ссылки на секции
  const movieChartRef = useRef(null);
  const top5FilmsRef = useRef(null);
  const topCountriesRef = useRef(null);
  const allFilmsRef = useRef(null);

  if (loading) return <p>Загрузка данных...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  // Функция прокрутки к секции
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
      <div className="High-grossing films">
        <img src={starting_picture} className="App-logo" alt="logo" />
        <p className="header">High grossing films</p>

        {/* Навигация с обработкой кликов для прокрутки */}
        <div className="header-navigation">
          <a onClick={() => scrollToSection(movieChartRef)}>Movie Chart</a>
          <a onClick={() => scrollToSection(top5FilmsRef)}>Top 5 Films</a>
          <a onClick={() => scrollToSection(topCountriesRef)}>Top Countries by Films</a>
          <a onClick={() => scrollToSection(allFilmsRef)}>All Films</a>
        </div>

        <div ref={movieChartRef}>
          <MovieChart />
        </div>

        <div ref={top5FilmsRef} className="Top 5 films">
          <p className="Text-for-top-5">Top 5 films by Box Office</p>
          <Top5Chart />
        </div>

        <div ref={topCountriesRef} className="Top-Countries-by-counting-films">
          <p className="Text-for-top-country">Top countries by amount of films</p>
          <CountryFilmChart />
        </div>

        <div ref={allFilmsRef} className="all-films-header">
          <h2>All Films</h2>
        </div>

        <div className="film-cards-container">
          {data.map((film, index) => (
              <FilmCard film={film} key={index} />
          ))}
        </div>
      </div>
  );
}

export default App;