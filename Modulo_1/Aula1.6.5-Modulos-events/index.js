import ev from "./events.js"

ev.on("testeEvent", () => {
    console.log("ouviu também")
});

ev.emit("testeEvent", "Emitindo o evento")