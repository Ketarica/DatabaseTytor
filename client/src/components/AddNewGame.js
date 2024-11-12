import React, { Fragment, useState } from "react";
import GameForm from './GameForm';

const AddNewGame = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [score, setScore] = useState("");
    const [release, setRelease] = useState("");
    const [img, setImg] = useState(null);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("score", score);
            formData.append("release", release);
            if (img) formData.append("image", img);
            await fetch("http://localhost:5000/games", {
                method: "POST",
                body: formData
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="new-game-title">Add new game here: </h1>
            <form className="form-add" onSubmit={onSubmitForm}>
                <h2 className="name-title"> Name </h2>
                <input className="name-header" value={name} onChange={e => setName(e.target.value)} />
                <h2 className="name-title"> Description </h2>
                <input className="name-header" value={description} onChange={e => setDescription(e.target.value)} />
                <h2 className="name-title" type="number"> Score </h2>
                <input className="name-header" value={score} onChange={e => setScore(e.target.value)} />
                <h2 className="name-title"> Release date </h2>
                <input className="name-header" value={release} onChange={e => setRelease(e.target.value)} />
                <GameForm onImageUpload={setImg} />
                <button className="add-game-button">Add new game</button>
            </form>
        </Fragment>
    );
};

export default AddNewGame;