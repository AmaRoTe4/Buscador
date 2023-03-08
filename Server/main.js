const { app }  = require('electron')
const { Buscador } = require("./app.js")

Buscador("http://localhost:5173");

app.on('window-all-closed', () => {
    app.quit()
})