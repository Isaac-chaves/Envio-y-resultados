import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//variables de entorno del archivo env
const NAME=process.env.SERVER_NAME;
const VERSION=process.env.SERVER_VERSION;
const DESCRIPTION=process.env.SERVER_DESCRIPTION;
const PORT=process.env.SERVER_PORT;

app.get("/", (reg,res) =>{
res.json({Nombre:NAME, Version:VERSION, Descripcion:DESCRIPTION, Puerto:PORT});});

app.get("/", (req,res) => {res.send(`${NAME}<p>${VERSION}<p>${DESCRIPTION}` );});
app.listen(PORT, () => {console.log(`server running en :${PORT}`);});



