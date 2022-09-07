import express from "express";

const app = express();
app.use(express.json());

//Routes
app.route("/testeRoute")
    .get((req, res) => {
        res.send("/testeRoute GET")
    })
    .post((req, res) => {
        res.send("/testeRoute post")
    })
    .delete((req, res) => {
        res.send("/testeRoute DELETE")
    })

app.listen(3000, () => {
    console.log("API Started!")
});