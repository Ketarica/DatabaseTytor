import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import UpdateData from "./UpdateData";
import SearchGame from "./SearchGame";

import BlogPage from "./BlogPage";


const img = require('../img/placeholderFilm.png');

const AllDataPrint = () => {
    const [games, setGames] = useState([]);

    const [filteredGames, setFilteredGames] = useState([]);


    const getGames = async () => {
        try {
            const serverCall = await fetch("http://localhost:5000/games", {
                method: "GET"
            });
            const dataFormat = await serverCall.json();
            setGames(dataFormat);

            setFilteredGames(dataFormat);
        } catch (error) {

            console.error(error);
        }
    };

    const deleteData = async (id) => {
        try {

            await fetch(`http://localhost:5000/games/${id}`, {
                method: "DELETE"
            });
            setGames(games.filter(game => game.game_id !== id));

            setFilteredGames(filteredGames.filter(game => game.game_id !== id));
        } catch (error) {

            console.error(error);
        }
    }



    useEffect(() => { getGames(); }, []);

    return (
        <Fragment>
            {/* Компонент поиска */}
            <div className="search-box"> <SearchGame games={games} setFilteredGames={setFilteredGames} /> </div>

            <div className="card-list-title">Game List:</div>
            <div className="game-list">
                {filteredGames.map(game => (
                    <div className="game-item" key={game.game_id}>
                        <div className="game-details">
                            <img className="game-img" src={img} alt="Game Poster" />
                            <p className="game-name">{game.name}</p>
                            <p className="game-score">Score: {game.score}</p>
                            <p className="game-description">{game.description}</p>
                            <p className="game-release">Release: {game.release}</p>
                        </div>
                        <div className="update-module">
                            <UpdateData games={game} id={game.game_id} />
                        </div>
                        <button className="delete-button" onClick={() => deleteData(game.game_id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <BlogPage />
            </div>
        </Fragment>
    );
};

export default AllDataPrint;

