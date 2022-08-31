import { promises as fs } from "fs" //importando promises do modulo fs e nomeando como fs

//init();
writeReadJson()

async function init() {
    try {
        await fs.writeFile("teste.txt", "bla bla bla bla");
        await fs.appendFile("teste.txt", "\nteste apend file");
        const data = await fs.readFile("teste.txt", "utf-8");
        console.log(data)
    }
    catch (err) {
        console.log(err)
    }
}

async function writeReadJson() {
    try {
        const arrayCarros = ["gol", "palio", "uno"];
        const obj = {
            carros: arrayCarros
        };
        await fs.writeFile("teste.json", JSON.stringify(obj))//JSON.stringfy vai converter o objeto para JSON
        const data = JSON.parse(await fs.readFile("teste.json")) //JSON.parse irá converter o retorno da await em JSON
        console.log(data)

        //Adicionando um novo carro direto no JSON
        data.carros.push("Sandero")
        console.log(data)
        
        //Sobreescrevendo o arquivo JSON com a alteração (Sandero)
        await fs.writeFile("teste.json", JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

//Utilizando fs com as Promises e then

/*fs.writeFile("teste.txt", "bla bla bla bla").then(() => { //como é uma promise então tem que utilizar o then ou uma async function
    fs.appendFile("teste.txt", "\nteste apend file").then(() => {
        fs.readFile("teste.txt", "utf-8").then((resp) => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err);
});*/



//Utilizando com callbacks

/*import fs from "fs" //importando o filesystem, um modulo nativo do JS responsável por manipular arquivos

fs.writeFile("teste.txt", "bla bla bla", function (err) { //primeiro parametro é o nome do arquivo, segundo é o conteudo e o terceiro é uma function de callback
    if (err) {
        console.log(err)
    } else {
        fs.readFile("teste.txt", "utf8", function (err, data) {
            if(err){
                console.log(err)
            }else {
                console.log(data)
            }
        })
    }
})*/