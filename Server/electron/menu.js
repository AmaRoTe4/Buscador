const { Menu } = require('electron')

const setMainMenu = () => {
  const template = [
    {
      label: 'Inicio',
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = {
  setMainMenu
}