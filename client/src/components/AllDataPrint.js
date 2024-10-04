import React, { Fragment, useEffect, useState } from "react";
import UpdateData from "./UpdateData";
const img = require('../img/placeholderFilm.png');

const AllDataPrint = () => {
    const [games, setGames] = useState([]);


    const getGames = async () => {
        try {
            const serverCall = await fetch("http://localhost:5000/games", {
                method: "GET"
            });
            const dataFormat = await serverCall.json();
            setGames(dataFormat);
        } catch (error) {

        }
    };

    const deleteData = async (id) => {
        try {
            const deleteGame = await fetch(`http://localhost:5000/games/${id}`, {
                method: "DELETE"
            });
            setGames(games.filter(game => game.game_id !== id)) // поиск нужного id после нажатой кнопки Удалить, что бы сразу перерисовать страницу с уже удаленным элементом.
        } catch (error) {

        }
    };

    useEffect(() => { getGames(); }, [])

    return (
        <Fragment>
            <div className="card-list-title"> Game List: </div>
            <div className="game-list">

                {games.map(game => (
                    <div className="game-item" key={game.game_id}>
                        <div className="game-details">
                            <img className="game-img" src={img} ></img>
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
        </Fragment>
    );
}
export default AllDataPrint;