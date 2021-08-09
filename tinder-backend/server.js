import express from 'Express'
import mongoose from 'mongoose'
import Cards from "./dbCards.js"
import Cors from 'Cors'

// APP config
const app=express();
const port=process.env.PORT || 8001;
const connection_url ='mongodb+srv://admin:I0gh9X9EIY8ot8Wc@cluster0.dlp1j.mongodb.net/tinderdb?retryWrites=true&w=majority'
//Middleware
app.use(express.json());
app.use(Cors());

//DB conignpm 
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoints
app.get("/",(req,res) => res.status(200).send("hello clever"));

app.post("/tinder/cards", (req,res) => {
    const dbCard =req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    });
});

app.get("/tinder/cards", (req,res) => {
    Cards.find((err,data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    });
});

// Listner
app.listen(port, () => console.log(`listening on localhost: ${port}`));

