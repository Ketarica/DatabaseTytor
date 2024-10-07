const express = require("express");
const app = express();
const port = 5000
const cors = require("cors");
const pool = require("./db")

app.use(cors());
app.use(express.json());


app.post("/games", async (req, res) => {
    const { name, description, score, release } = req.body;
    const newGame = await pool.query("INSERT INTO games (name, description, score, release) VALUES($1, $2, $3, $4) RETURNING *", [name, description, score, release]);
    res.json(newGame.rows[0])
})


app.get("/games", async (req, res) => {
    const allGames = await pool.query("SELECT * FROM games");
    res.json(allGames.rows)
})


app.get("/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const selectGame = await pool.query("SELECT * FROM games WHERE game_id = $1", [id])
        res.json(selectGame.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const delGame = await pool.query("DELETE FROM games WHERE game_id = $1", [id]);
        res.json("Deleted");
    } catch (err) {
        console.log(err.message);
    }
});


app.put("/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, score, release } = req.body;
        const updateGame = await pool.query(
            "UPDATE games SET score = $2, name = $3, description = $4, release = $5 WHERE game_id = $1", [id, score, name, description, release]);
        res.json("UPDATE!");
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
