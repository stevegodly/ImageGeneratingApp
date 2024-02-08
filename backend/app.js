const routes=require('./routes/posts')
const cors =require('cors')
const express=require('express')
const app=express()
require('dotenv').config()


app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PATCH','DELETE'],
    allowedHeaders:['Content-Type'],    
}))
app.use('/api/v1/posts',routes)

const port=process.env.PORT

app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
)

const start = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
      console.log(err);
    }
};

start()