const { startBrowser } = require('./browser');
const fs = require('fs');
const getData = async (startBrowser) => {
    const browser = await startBrowser();
    const page = await browser.newPage();
    await page.goto('https://digital-world-2.myshopify.com/');
    const categories = await page.evaluate(() => {
        const collection = document.querySelectorAll('.allcol-element');
        const data = Array.from(collection).map(item => {
            return {
                name: item.querySelector('.collection-name').innerText.split(" ")[0],
                linkurl: `https://digital-world-2.myshopify.com${item.querySelector('a').getAttribute('href')}`
            }
        })
        return data;





    })
    const link = [];
    for (const category of categories) {
        await page.goto(category['linkurl']);
        const links = await page.evaluate(() => {
            const a = document.querySelectorAll('.grid-view-item__link');
            const data = Array.from(a).map(item => {
                return {
                    linkurl: `https://digital-world-2.myshopify.com/${item.getAttribute('href')}`,


                }
            })
            return data
        })
        link.push(...links)
    }
    const data = [];
    for (a of link) {
        await page.goto(a['linkurl']);
        const products = await page.evaluate(() => {
            const breadcrumb = document.querySelectorAll('.breadcrumb a');
            const imgs = document.querySelectorAll('.thumb__element img')
            const images = Array.from(imgs).map(item => {
                return item.getAttribute('src')
            })

            return {
                title: document.querySelector('h3').innerText,
                price: document.querySelector('#ProductPrice span').innerText,
                description: document.querySelector('#desc').innerText,
                category: breadcrumb[1].innerText,
                images: images
            }

        }


        )



        data.push(products);

    }

    fs.writeFileSync('../server/Scraper/output.json', JSON.stringify(categories));
    fs.writeFileSync('../server/Scraper/link.json', JSON.stringify(link));
    fs.writeFileSync('../server/Scraper/product.json', JSON.stringify(data));
    await browser.close()
}





getData(startBrowser)