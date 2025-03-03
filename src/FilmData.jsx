// FilmData.js
import React from 'react';

const FilmCard = ({ film }) => {
    return (
        <div className="film-card">
            <div className="film-info">
                <h3 className="film-title">{film["Film Title"]}</h3>
                <p className="film-release">Release Year: {film["Release Year"]}</p>
                <p className="film-directors">
                    Director(s): {film["Director(s)"].join(", ")}
                </p>
                <p className="film-box-office">
                    Box Office Revenue: ${Number(film["Box Office Revenue"]).toLocaleString()}
                </p>
                <p className="film-country">
                    Country of Origin: {film["Country of Origin"].join(", ")}
                </p>
            </div>
        </div>
    );
};

export default FilmCard;