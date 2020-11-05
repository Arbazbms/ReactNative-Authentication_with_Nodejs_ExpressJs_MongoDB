const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000
const {mogoUrl} = require('./keys')


require('./models/User');

const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
const cors = require('cors')
app.use(bodyParser.json())
app.use(authRoutes)
app.use(cors());
//Database connection
mongoose
  .connect(mogoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB Not Connected!");
  });




app.get('/me',requireToken,(req,res)=>{
    res.send({email:req.user.email})
})

app.listen(PORT,()=>{
    console.log("server running "+PORT)
})