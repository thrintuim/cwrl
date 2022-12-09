require('dotenv').config()
const { WebDriver, By } = require('selenium-webdriver')
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
        this.driver.manage().setTimeouts({ implicit: 10000})
    }

    async navigateToCWRL() {
        this.driver.get(this.url)
        const title = await this.driver.getTitle()
        if (this.pageTitle !== title) {
            throw `Page title "${title}" doesn't match with expected title of "${this.pageTitle}"`
        }
        else {
            return true
        }
    }

    async moveObject(direction) {
        const el = await this.driver.findElement(By.id(`move${direction}`))
        await el.click()
        return el
    }

    async getMovementHistory() {
        const el = await this.driver.findElement(By.id("movementHistory"))
        const text = await el.getText()
        return text
    }
}

export default CWRL