const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

app.get("/info", async (req, res) => {

    const location = `https://api.tomorrow.io/v4/weather/forecast?location={city}&apikey=9cUvLGu3raDxnwXyajUWeFsymHZxUHIE`
    const tempResult = await fetch(location)

    const result = await tempResult.json()

    const temperature = result.timelines.minutely[0].values.temperature
    console.log(temperature)
    res.json({ temperature: temperature })

})
console.log("Server is running")

app.listen(5000)