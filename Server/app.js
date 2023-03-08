const { app, BrowserWindow } = require( 'electron')
const { setMainMenu } = require('./electron/menu.js')

const createWindow = (direccion) => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 400,
  })

  if(direccion === ""){
    mainWindow.loadFile("index.html")
  }else{
    mainWindow.loadURL(direccion)
  }

  setMainMenu(direccion === "" ? "index.html" : direccion)
}

const Buscador = (direccion) =>  app.whenReady().then(() => {
  createWindow(direccion)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

module.exports = {
    Buscador
}  