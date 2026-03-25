const express = require("express")
const cors = require("cors")

const app = express()

app.get("/", (req, res) => {
    res.json({
        name: "Manodhithyaa C S",
        age: 20,
        phno: "+91 9940447272"
    })
})

app.post("/", (req, res) => {
    
})

app.listen(8000, () => console.log("Server running at port 8000"))