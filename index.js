const express = require(express);
const PORT = 8000
const cheerio = require(cheerio);
const axios = require(axios);
const cors = require ('cors')
app.use (cors())

let  url = 'https://www.google.com/'

app.get('/', function(req, res){
    res.json("NODE.JS Web Scraper")
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.fc-item__title', html).each(function () { //<-- cannot be a function expression
                const title = $(this).text()
                url = $(this).find('a').attr('href')
                console.log(url);
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})


const app = express()
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
