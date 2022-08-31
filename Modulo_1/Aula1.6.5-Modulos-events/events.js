import {EventEmitter} from "events" //importando especificamente eventemitter do modulo events nativo do JS

const eventEmitter = new EventEmitter();

eventEmitter.on("testeEvent", obj => { //primeiro parametro o nome do evento, segundo é a função callback caso o evento passar alguma informação vai retornar nesse objeto
    console.log(obj)
})

eventEmitter.emit("testeEvent", "Emitindo o evento primeiro")//Emitindo o evento, segundo parametro pode ser um texto ou json, depende da regra de negocio

export default eventEmitter;