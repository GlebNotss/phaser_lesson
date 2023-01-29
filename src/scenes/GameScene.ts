import { Scene } from "phaser"
import { Card } from "../Card"
import { CardDealer } from "../CardDealer"

export class GameScene extends Scene {
    cardDealer: CardDealer

    constructor() {
        super('GameScene')
    }

    onAllCardsOpen = () => {
        this.scene.restart()
    }

    onCardClick(_: unknown, object: unknown) {
        if (object instanceof Card) {
            this.cardDealer.openCard(object)
        }
    }

    create() {
        this.cardDealer = new CardDealer(this)

        this.cardDealer.createCards()
        this.initEvents()
    }

    initEvents() {
        this.cardDealer.onAllCardsOpen = this.onAllCardsOpen
        this.input.on('gameobjectdown', this.onCardClick, this)
    }
}