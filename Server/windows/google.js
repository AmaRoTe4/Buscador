const { app} =  require('electron')
const { Buscador } =  require("../app.js")

Buscador("https://www.google.com/");

app.on('window-all-closed', () => {
    app.quit()
})