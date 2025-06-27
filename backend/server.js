import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.get("/", (req, res) => {
    res.send("it's working correctly!")
})

app.listen(PORT, () => {
    console.log(`server is listening to port: ${PORT}`)
})