import Gui from 'lil-gui'

export class GuiControls {
  private static instance: GuiControls
  private gui: Gui

  private constructor() {
    this.gui = new Gui()
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GuiControls()
    }
    return this.instance
  }

  public addFolder(folder: string) {
    return this.gui.addFolder(folder)
  }
}
