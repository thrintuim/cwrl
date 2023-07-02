require('dotenv').config()
const { WebDriver, By, WebElement } = require('selenium-webdriver')
class CWRL {
    /**
     * Class representing the complete user facing CWRL application.
     * 
     * @param {WebDriver} webDriver
     */
    constructor (webDriver) {
        const port = process.env.PORT || 3000
        const host = process.env.HOST || 'localhost'
        this.url = `http://${host}:${port}`
        this.webDriver = webDriver
        this.pageTitle = 'CWRL'
        this.webDriver.manage().setTimeouts({ implicit: 3000 })
    }

    /**
     * Navigates to CWRL web app and validate page title
     * 
     * @returns {Promise<bool>}
     */
    async navigateToCWRL() {
        await this.webDriver.get(this.url)
        const title = await this.webDriver.getTitle()
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
	let el = null
        try {
            el = await this.webDriver.findElement(By.id(`move${direction}`))
        }
        catch (error) {
            return undefined
        }
        await el.click()
        return el
        
    }

    /**
     * Gets all of the text from the movement history panel
     * 
     * @returns {Promise<string[]>}
     */
    async getMovementHistory() {
	    let els = null
        try {
            els = await this.webDriver.findElements(By.css("#movementHistory p"))
        }
        catch (error) {
            return undefined
        }
        const textArray = els.map(async (el) => { return await el.getText() })
        return await Promise.all(textArray)
    }

    /**
     * Gets the on screen element associated with a particular player
     * 
     * @param {Number} playerNumber Must be an integer
     * @returns {Promise<(WebElement|undefined)>} player object WebElement or undefined if it doesn't exist
     */
    async getPlayerObject(playerNumber) {
	let el = null
        try {
            el = await this.webDriver.findElement(By.id(`player${playerNumber}`))
        } catch (error) {
            return undefined
        }
        return el
    }

    /**
     * Determines the player number or observe number from the h1
     * 
     * expect the h1 to be structured like
     *   CWRL - [player type] [player number]
     */
    async getCurrentUser() {
        const h1 = await this.webDriver.findElement(By.css("h1")).catch((err) => undefined)
        if (h1) {
            const userTypeAndNumber = /CWRL - ([^ ]+) (\d+)/
            const h1text = await h1.getText()
            const result = userTypeAndNumber.exec(h1text)
            if (result) {
                this.userType = result[1]
                this.userNumber = result[2]
                return {
                    userType: this.userType,
                    userNumber: this.userNumber
                }
            }
            else {
                return undefined
            }
        }
    }
}

module.exports = CWRL
