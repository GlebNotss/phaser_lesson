import { Card, CardPosition } from "./Card";
import { Scene, Utils } from "phaser";
import gameConfig from './gameConfig'

export class CardDealer {
    private _scene: Scene
    private prevOpenCard: Card | null = null
    private guessedPairs = 0
    private possibleCardsIds: Card['id'][] = ['1', '2', '3', '4', '5']

    public onAllCardsOpen: (...args: any) => any = () => null

    constructor(scene: Scene) {
        this._scene = scene
    }

    openCard(card: Card) {
        if (card.isOpen) 
            return

        card.open()

        if (!this.prevOpenCard) {
            this.prevOpenCard = card
            return
        }

        if (this.prevOpenCard.id === card.id) {
            this.guessedPairs++
            console.log(this.guessedPairs)
        } else {
            this.prevOpenCard.close()
            card.close()
        }

        this.prevOpenCard = null

        if (this.guessedPairs === this.possibleCardsIds.length) {
            this.onAllCardsOpen()
        }
    }

    createCards() {
        const allCardIdsPositions = Utils.Array.Shuffle([...this.possibleCardsIds, ...this.possibleCardsIds])
        const cardPositions = this.getCardsPositions()

        allCardIdsPositions.forEach((cardId, index) => {
            const {x, y} = cardPositions[index]
            new Card(this._scene, {x, y, id: cardId})
        })
    }

    private getCardsPositions() {
        const cardsPositions: CardPosition[] = [];
    
        // Определяем ширину и высоту экрана
        const screenWidth = gameConfig.screenWidth
        const screenHeight = gameConfig.screenHeight
    
        const cardTexture = this._scene.textures.get('card').getSourceImage()
    
        // Определяем ширину и высоту карты
        const cardWidth = cardTexture.width;
        const cardHeight = cardTexture.height;
    
        // Определяем отступ между картами
        const cardMargin = 4
    
        // Вычисляем количество карт в ряду и количество рядов
        const cols = 5
        const rows = 2
    
        // Вычисляем отступ слева и сверху, чтобы расположить карты по центру экрана
        const marginLeft = (screenWidth - cardWidth * cols) / 2 + cardWidth / 2
        const marginTop = (screenHeight - cardHeight * rows) / 2 + cardHeight / 2
    
        // Создаем матрицу позиций для карт
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = marginLeft + col * (cardWidth + cardMargin)
            const y = marginTop + row * (cardHeight + cardMargin)
            cardsPositions.push({ x, y })
          }
        }
    
        return cardsPositions
    }
}