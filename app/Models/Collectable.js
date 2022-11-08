import { appState } from "../AppState.js"

export class Collectable {
  constructor(data) {
    this.name = data.name
    this.emoji = data.emoji
    this.colorWay = data.colorWay
    this.rarity = data.rarity
  }


  get ActiveTemplate() {
    return `
    <h2 class="col-12 fw-bold reveal">${this.name}</h2>
    <div class="col-12 collectable emoji color-${this.colorWay}">${this.emoji}</div>
    <div class="col-12 text-warning">${this.rarity}%</div>
    <button class="col-6 btn btn-outline-danger" onclick="app.collectablesController.setActive(null)">
      <i class="mdi mdi-close"></i>
    </button>
    <button class="col-6 btn btn-outline-danger" onclick="app.collectablesController.trashCollectable('${this.name}')">
    <i class="mdi mdi-delete"></i>
  </button>
    `
  }

  get ListTemplate() {
    return `<span class="p-2 selectable color-${this.colorWay}" onclick="app.collectablesController.setActive('${this.name}')">${this.emoji}</span>`
  }

  static Available() {
    let collects = appState.collectables.sort((a, b) => b.rarity - a.rarity)
    let template = ''
    collects.forEach(c => template += c.ListTemplate)
    return template
  }

  static NoActive() {
    return `

    <div class="col-12 mt-5 fs-2 fw-bold title hira">コインを入れる</div>
    <div class="col-12 fs-4">${this.Available()}</div>
    <div class="col-12 emoji">💽</div>
    `
  }
}