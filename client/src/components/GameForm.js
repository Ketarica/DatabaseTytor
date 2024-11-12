import React, { useState } from 'react';

const GameForm = ({ gameId, onImageUpload }) => {
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            console.error("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch(`http://localhost:5000/games/${gameId}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Game img added:', data);
            onImageUpload(data.img); // Передача URL загруженного изображения обратно в родительский компонент
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <form onSubmit={handleSubmit} className="img-form">
            <label className="button-change">
                Выберите файл
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required hidden />
            </label>
            <button className="img-input-button" type="submit">Add Game Image</button>
        </form>
    );
};

export default GameForm;
