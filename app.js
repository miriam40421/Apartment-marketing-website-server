import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
 import dotenv from 'dotenv'
import CityRouter from './api/routers/City.js'
import AdvertiserRouter from './api/routers/Advertiser.js'
import CategoryRouter from './api/routers/Category.js'
import ApartmentRouter from './api/routers/Apartment.js'

const app = express()
const port = 3001
dotenv.config()
app.use(bodyParser.json())
app.use(cors()) 
app.use(express.static("uploads"))

mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😊');
    })
    .catch(err => {
        console.log({ error: err.message });
    })

app.use('/Advertiser', AdvertiserRouter)
app.use('/City', CityRouter)
app.use('/Category', CategoryRouter)
app.use('/Apartment', ApartmentRouter)
app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})