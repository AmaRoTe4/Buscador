const { app} =  require('electron')
const { Buscador } =  require("../app.js")

Buscador("https://www.youtube.com/");

app.on('window-all-closed', () => {
    app.quit()
})