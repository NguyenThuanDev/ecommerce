const fs = require('fs');
const getBrand = () => {
    const brands = JSON.parse(fs.readFileSync('./product.json'));
    const raw = brands.map(item => {
        return {
            name: item['title'].split(' ')[0]
        }
    })
    const datas = [];
    for (item of raw) {
        if (datas.filter((data) => {
            return data['name'] == item['name']

        }).length == 0) {
            datas.push(item)
        }
        else {
            continue;
        }
    }
    fs.writeFileSync('./brand.json', JSON.stringify(datas))


}
const getCategory = () => {
    const raw = JSON.parse(fs.readFileSync('./category.json'));
    const data = raw.map(item => {
        return {
            name: item.name
        }
    })
    fs.writeFileSync('./category.json', JSON.stringify(data))



}
getCategory()