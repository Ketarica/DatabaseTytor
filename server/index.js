const express = require("express");
const app = express();
const port = 5000
const cors = require("cors");
const pool = require("./db")

const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ storage: storage })


// app.get("/gam", async (req, res) => {
//     res.json("wrpokwr3");
// })



app.post("/games/:id/upload", upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const imageUrl = `/images/${path.basename(req.file.path)}`;
        await pool.query(
            "UPDATE games SET img = $1 WHERE game_id = $2 RETURNING *",
            [imageUrl, id]
        );
        // res.json(newGame.rows[0]);
        res.json({ img: imageUrl });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.post("/games", upload.single('image'), async (req, res) => {
    try {
        const { name, description, score, release } = req.body;
        const imageUrl = req.file ? `/images/${path.basename(req.file.path)}` : null;
        const newGame = await pool.query(
            "INSERT INTO games (name, description, score, release) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, description, score, release]

            // [name, description, score, release, imageUrl]

        );
        res.json(newGame.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// app.post("/games", upload.single('image'), async (req, res) => {
//     try {
//         const { name, description, score, release } = req.body;
//         const imageUrl = `/images/${path.basename(req.file.path)}`;
//         const newGame = await pool.query(
//             "INSERT INTO games (name, description, score, release, img) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//             [name, description, score, release, imageUrl]
//         );
//         res.json(newGame.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// });




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

