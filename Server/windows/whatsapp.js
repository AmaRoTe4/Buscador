const { app} =  require('electron')
const { Buscador } =  require("../app.js")

Buscador("https://web.whatsapp.com/");

app.on('window-all-closed', () => {
    app.quit()
})