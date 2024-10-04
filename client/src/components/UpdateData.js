import React, { Fragment, useEffect, useState } from "react";
const img = require('../img/placeholderFilm.png');

const UpdateData = ({ games }) => {

    const [name, setName] = useState(games.name || "");
    const [description, setDescription] = useState(games.description || "");
    const [score, setScore] = useState(games.score || "");
    const [release, setRelease] = useState(games.release || "");
    const [ModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    const EditForm = async e => {
        e.preventDefault();
        try {
            const body = { name, description, score, release };
            const sendGame = await fetch(`http://localhost:5000/games/${games.game_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }


    };

    return (
        <Fragment>
            <button className="modal-open" onClick={openModal}>Edit</button>
            {ModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close" onClick={closeModal}> Close edit form</button>
                        <h2 className="modal-subtitle">Edit Game Data</h2>
                        <form className="modal-form">
                        <h2 className="name-title"> Name </h2>
                            <input 
                                className="input-form-modal"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                             <h2 className="name-title"> Description: </h2>
                            <input
                                className="input-form-modal"
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                              <h2 className="name-title"> Score </h2>
                            <input
                                className="input-form-modal"
                                type="text"
                                placeholder="Score"
                                value={score}
                                onChange={e => setScore(e.target.value)}
                            />
                             <h2 className="name-title"> Release date  </h2>
                            <input
                                className="input-form-modal"
                                type="date"
                                placeholder="Release Date"
                                value={release}
                                onChange={e => setRelease(e.target.value)}
                            />
                            <button className="submit-button" type="submit" onClick={e => EditForm(e)} >Save</button>
                        </form>
                    </div>
                </div>
            )}
        </Fragment>
    );




}
export default UpdateData;