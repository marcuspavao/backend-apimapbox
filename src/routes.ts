import { Router } from "express"
import axios from "axios"
require('dotenv/config')
const fs = require('fs')
const csv = require('fast-csv')
const routes = Router()
var ws = fs.createWriteStream('geocode.csv')
let datas: Array<object> = []
let arquivo: Array<object> = []

const enderecosarquivo = fs.createReadStream('enderecos.csv')

const enderecos = csv.parse().on('data', (data: object) => {
    arquivo.push(data)
})
enderecosarquivo.pipe(enderecos)


async function mapboxapi(arq: Array<object>) {
    try {
        for (let i in arq) {
            let response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + String(arq[i]) + '.json?access_token=' + process.env.API_KEY)
            console.log(String(arq[i]))
            let longitude = response.data.features[0].center[0]
            let latitude = response.data.features[0].center[1]
            let nomeendereco = response.data.features[0].place_name
            let id = response.data.features[0].id
            const data = {
                'id': i, 'endereco': String(nomeendereco), 'longitude': longitude,
                'latitude': latitude
            }
            datas.push(data)
        }

        return datas
    }
    catch (e) {
        console.log(e)
    }
}



routes.get("/", (req, res) => {
    mapboxapi(arquivo)
        .then(data => {
            //console.log(data)
            res.json(data)
            csv.write(data, { headers: ['id', 'endereco', 'latitude', 'longitude'] })
                .pipe(ws)

        })
})

export { routes }