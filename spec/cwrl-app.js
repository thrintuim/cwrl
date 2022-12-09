require('dotenv').config()
const { WebDriver, By, WebElement } = require('selenium-webdriver')
class CWRL {
    /**
     * Class representing the complete user facing CWRL application.
     * 
     * @param {WebDriver} driver
     */
    constructor (driver) {
        const port = process.env.PORT || 3000
        const host = process.env.HOST || 'localhost'
        this.url = `http://${host}:${port}`
        this.driver = driver
        this.pageTitle = 'CWRL'
        this.driver.manage().setTimeouts({ implicit: 3000 })
    }

    /**
     * Navigates to CWRL web app and validate page title
     * 
     * @returns {Promise<bool>}
     */
    async navigateToCWRL() {
        await this.driver.get(this.url)
        const title = await this.driver.getTitle()
        if (this.pageTitle !== title) {
            throw `Page title "${title}" doesn't match with expected title of "${this.pageTitle}"`
        }
        else {
            return true
        }
    }

    /**
     * Uses a direction indicator to click a button and move an object in that direction
     * 
     * @param {string} direction 
     * @returns {Promise<WebElement>}
     */
    async moveObject(direction) {
        const el = await this.driver.findElement(By.id(`move${direction}`))
        await el.click()
        return el
    }

    /**
     * Gets all of the text from the movement history panel
     * 
     * @returns {Promise<string>}
     */
    async getMovementHistory() {
        const el = await this.driver.findElement(By.id("movementHistory"))
        const text = await el.getText()
        return text
    }

    /**
     * Gets the on screen element associated with a particular player
     * 
     * @param {Number} playerNumber Must be an integer
     * @returns {Promise<(WebElement|undefined)>} player object WebElement or undefined if it doesn't exist
     */
    async getPlayerObject(playerNumber) {
        try {
            const el = await this.driver.findElement(By.id(`player${playerNumber}Object`))
        } catch (error) {
            return undefined
        }
        return el
    }
}

module.exports = CWRL