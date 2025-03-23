//Chứa code để tạo 1 instance browser

const puppeteer = require("puppeteer");
const startBrowser = async () => {
    let browser;
    try {
        browser = await puppeteer.launch({

            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true,

        });


    } catch (error) {
        console.log("Bị lỗi rồi " + error.message);
    }


    return browser




}
module.exports = { startBrowser };