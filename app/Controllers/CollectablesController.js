import { appState } from "../AppState.js";
import { Collectable } from "../Models/Collectable.js";
import { collectablesService } from "../Services/CollectablesService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawActive() {
  let collect = appState.activeCollectable
  if (collect) {
    setHTML('active', collect.ActiveTemplate)
  } else {
    setHTML('active', Collectable.NoActive())
  }
}

function _drawMyCollectables() {
  console.log('draw mine');
  let collects = appState.collected
  let template = ''
  let score = 0
  collects.forEach(c => {
    template += c.ListTemplate
    score += c.rarity
  })
  setHTML('my-collectables', score + template)
}

function _drawCoins() {
  let coins = appState.coins
  console.log('coins', coins);
  // NOTE this is crazyness don't worry
  let template = Array(coins).fill('🪙', 0, coins).join('')
  setHTML('coins', template)
}

export class CollectablesController {

  constructor() {
    appState.on('coins', _drawCoins)
    appState.on('activeCollectable', _drawActive)
    appState.on('collected', _drawMyCollectables)
    _drawActive()
  }

  addCoin() {
    collectablesService.addCoin()
  }

  purchaseCollectable(e) {
    collectablesService.purchaseCollectable()
    // spin back the turner
    let knob = window.event.target
    setTimeout(() => knob.blur(), 500)
  }

  setActive(name) {
    collectablesService.setActive(name)
  }

  async trashCollectable() {
    if (await Pop.confirm('are you sure you want to trash this collectable?')) {
      collectablesService.trash()
    }
  }
}

