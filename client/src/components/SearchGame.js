import React, { useState } from "react";

const SearchGame = ({ games, setFilteredGames }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

        const filtered = games.filter(game =>
            game.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredGames(filtered);
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search games..." 
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchGame;