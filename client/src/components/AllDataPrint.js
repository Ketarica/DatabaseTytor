import React, { Fragment, useEffect, useState } from "react";
import UpdateData from "./UpdateData";
import SearchGame from "./SearchGame";

const imgPlaceholder = require('../img/placeholderFilm.png');

const AllDataPrint = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);

    const getGames = async () => {
        try {
            const response = await fetch('http://localhost:5000/games', { method: "GET" });
            const data = await response.json();
            setGames(data);
            setFilteredGames(data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteData = async (id) => {
        try {
            await fetch(`http://localhost:5000/games/${id}`, { method: "DELETE" });
            setGames(games.filter(game => game.game_id !== id));
            setFilteredGames(filteredGames.filter(game => game.game_id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { getGames(); }, []);

    return (
        <Fragment>
            <div className="search-box">
                <SearchGame games={games} setFilteredGames={setFilteredGames} />
            </div>

            <div className="card-list-title">Game List:</div>
            <div className="game-list">
                {filteredGames.map(game => (
                    <div className="game-item" key={game.game_id}>
                        <div className="game-details">
                            <img
                                src={game.img ? `http://localhost:5000${game.img}` : imgPlaceholder}
                                alt="Game Poster"
                                className="game-img"
                                style={{ width: '200px', height: '300px', maxWidth: '200px', maxHeight: '300px' }}
                            />
                            <p className="game-name">{game.name}</p>
                            <p className="game-score">Score: {game.score}</p>
                            <p className="game-description">{game.description}</p>
                            <p className="game-release">Release: {game.release}</p>
                        </div>
                        <div className="update-module">
                            <UpdateData games={game} />
                        </div>
                        <button className="delete-button" onClick={() => deleteData(game.game_id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default AllDataPrint;
