import express from "express"

const app = express();
app.use(express.json());

app.use(express.static("public")) //
app.use("/images", express.static("public")) //definindo uma rota para encaminhar a pasta com arquivos estaticos

app.listen(3000, ()=> {
    console.log("API Runing")
})