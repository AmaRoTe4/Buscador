const { Menu  } = require('electron')

const setMainMenu = (mainWindow) => {
  const template = [
    {
      label: "Back",
      click: () => {
        mainWindow.webContents.goBack();
      }
    },
    {
      label: "forward",
      click: () => {
        mainWindow.webContents.goForward();
      }
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = {
  setMainMenu
}