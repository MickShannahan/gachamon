import { appState } from "../AppState.js";

function _rollCollectable() {
  let collectables = appState.collectables.sort((a, b) => b.rarity - a.rarity)
  let randomNum = Math.round(Math.random() * 100)
  let chance = 0
  let rolled = collectables.find(c => {
    chance += c.rarity
    console.log('roll:', randomNum, 'chn:', chance);
    if (randomNum <= chance) {
      return true
    }
    return false
  })
  console.log(rolled);
  return rolled
}

class CollectablesService {

  setActive(name) {
    let animal = appState.collectables.find(c => c.name == name)
    appState.activeCollectable = animal
  }

  trash() {
    let animal = appState.activeCollectable
    let indexToRemove = appState.collected.findIndex(c => c.name == animal.name)
    appState.collected.splice(indexToRemove, 1)
    appState.activeCollectable = null
    appState.emit('collected')
  }

  addCoin() {
    appState.coins += 1
  }
  purchaseCollectable() {
    if (appState.coins > 0) {
      appState.coins -= 1
      let newCollectable = _rollCollectable()
      appState.activeCollectable = newCollectable
      appState.collected = [newCollectable, ...appState.collected]
    }
  }

}

export const collectablesService = new CollectablesService()