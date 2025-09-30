require('dotenv').config();
const { handleBirthday } = require("./controller/authController");


const express = require("express")
const app = express()

const {connectDB} = require("./config/database");

const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const path = require("path");



app.use(express.json());
app.use(cors());

connectDB();


// app.get('/',(req,res)=>{
//     res.send("Welcome to Birthday app Backend");
//
// })
app.get("/health", (req, res) => {
    res.send("OK");
});

const PORT =process.env.PORT||3500;


handleBirthday()
app.use("/auth", authRoutes)

app.use(express.static(path.join(__dirname, "client/dist")));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.listen(PORT, ()=>{
    console.log(`Birthday app running at http://localhost:${PORT}`);
})

