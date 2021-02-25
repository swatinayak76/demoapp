const express=require('express');
const app=express();

//init middleware to enable body request
app.use(express.json({extended:false}));

app.get('/',(req,res)=> res.send('API Runing'));
// Define Routes
app.use('/v1/airshow/event',require('./routes/api/cosmosCrud'));

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))