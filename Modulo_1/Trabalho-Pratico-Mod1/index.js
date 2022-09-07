import express from "express";
import {promises as fs } from "fs";
import carsRouter from "./routes/cars.js";

async function getBrands(){
    const data = await readFile("car-list.json")
    return JSON.parse(data)
}
const app = express();
app.use(express.json());
app.use("/marcas", carsRouter);

app.get("/marcas/maisModelos", async (req, res) => {
    const brands = await getBrands();
    let result = [];
    let max = 0;
    for (const b of brands){
        if (b.models.length > max){
            result = [];
            result.push(b.brand);
            max = b.models.length;
        }else if (b.models.length === min) {
            result.push(b.brand);
        }
    }
})

app.listen(3000, () => {
    console.log("API Running")
} )