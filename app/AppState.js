import { Collectable } from "./Models/Collectable.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /**@type Number */
  coins = 0

  /** @type {import('./Models/Collectable.js').Collectable[]} */
  collectables = [
    new Collectable({
      name: "Xanther",
      emoji: '🦈',
      colorWay: 1,
      rarity: 18
    }),
    new Collectable({
      name: "Oslo",
      emoji: '🦧',
      colorWay: 1,
      rarity: 25
    }),
    new Collectable({
      name: "Nega-Oslo",
      emoji: '🦧',
      colorWay: 3,
      rarity: 1
    }),
    new Collectable({
      name: "Jung",
      emoji: '🦓',
      colorWay: 1,
      rarity: 11
    }),
    new Collectable({
      name: "Sly",
      emoji: '🦐',
      colorWay: 1,
      rarity: 10
    }),
    new Collectable({
      name: "Gold Sly",
      emoji: '🦐',
      colorWay: 2,
      rarity: 8
    }),
    new Collectable({
      name: "Justin",
      emoji: '🐖',
      colorWay: 1,
      rarity: 7
    }),
    new Collectable({
      name: "Glowing Justin",
      emoji: '🐖',
      colorWay: 2,
      rarity: 3
    }),
    new Collectable({
      name: "Glistening Justin",
      emoji: '🐖',
      colorWay: 3,
      rarity: 2
    }),
    new Collectable({
      name: 'Herbert',
      emoji: '🦍',
      colorWay: 1,
      rarity: 4
    }),
    new Collectable({
      name: 'Albino Herbert',
      emoji: '🦍',
      colorWay: 3,
      rarity: 2
    }),
    new Collectable({
      name: 'Billiam',
      emoji: '🦆',
      colorWay: 1,
      rarity: 3
    }),
    new Collectable({
      name: 'Raymond',
      emoji: '🦣',
      colorWay: 1,
      rarity: 3
    }),
    new Collectable({
      name: 'Gold Raymond',
      emoji: '🦣',
      colorWay: 2,
      rarity: 2
    }),
  ]

  /** @type {import('./Models/Collectable.js').Collectable} */
  activeCollectable = null

  /** @type {import('./Models/Collectable.js').Collectable[]} */
  collected = []
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
