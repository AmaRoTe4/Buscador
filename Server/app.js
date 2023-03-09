const { app, BrowserWindow } = require( 'electron')
const { setMainMenu } = require('./electron/menu.js')

const createWindow = async (direccion) => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })
  
  if(direccion === ""){
    mainWindow.loadFile("index.html")
  }else{
    await mainWindow.loadURL(direccion)
  }
  
  setMainMenu(mainWindow)
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