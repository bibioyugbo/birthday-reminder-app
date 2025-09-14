const express = require("express")
const app = express()
const env = require('dotenv')
const database = require('../server/config/database')

const cors = require("cors");
const authRoutes = require("./routes/authRoutes")

env.config()

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Welcome to Birthday app Backend");

})
app.get("/health", (req, res) => {
    res.send("OK");
});

const PORT =process.env.PORT|| 3500;
database.connectDB();


app.use("/auth", authRoutes)


app.listen(PORT, ()=>{
    console.log(`Birthday app running at http://localhost:${PORT}`);
})

