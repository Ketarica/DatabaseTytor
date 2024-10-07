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

// import React, { Fragment, useState } from "react";
// // const [name, setName] = useState([]);;

// // const SearchGame = () => {

// //     const SearchMyGame = async (id) => {
// //         e.preventDefault();
// //         try {
// //             const body = { name };
// //             const sendGame = await fetch(`http://localhost:5000/games/${id}`, {
// //                 method: "GET",
// //                 // headers: { "Content-Type": "application/json" },
// //                 // body: JSON.stringify(body)
// //             })
// //             window.location = "/";
// //         } catch (err) {
// //             console.error(err.message);
// //         }


// //     };
// const SearchGame = ({ games, setFilteredGames }) => {
//     const [searchTerm, setSearchTerm] = useState("");

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);

//         const filtered = games.filter(game =>
//             game.name.toLowerCase().includes(e.target.value.toLowerCase())
//         );
//         setFilteredGames(filtered);
//     };

//     return (
//         <Fragment>
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     placeholder="Search games..."
//                     value={searchTerm}
//                     onChange={handleSearch}
//                 />
//             </div>
//         </Fragment>
//     );
// }

// export default SearchGame;



