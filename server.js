const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.get('/',(req,res)=>{
    res.send('hello node api')
})

app.get('/blog',(req,res)=>{
    res.send('hello blog!!!')
})

app.get('/products', async(req,res)=>{
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (err){
        res.status(500).json({message:err.message})
    }
})

app.get('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (err){
        res.status(500).json({message:err.message})
    }
})


app.post('/products', async (req,res)=>{
    try{
      
        const product = await Product.create(req.body)
        res.status(200).json(product)
        
    } catch (err){
        console.log(err.message)
        res.status(500).json({message:err.message})
    }
})

// update a product
app.put('/products/:id', async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        // we cant find any product in database
        if(!product){
            return res.status(404).json({message:`cannot find any product with id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch(err){
        res.status(500).json({message:err.message})
    }
})

// delete a product

app.delete('/products/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product)
        {
            return res.status(404).json({message: `cant find any product with id ${id}`})
        }
        res.status(200).json(product)

    } catch (err){
        res.status(500).json({message:err.message})
    }
})

mongoose.set("strictQuery",false)

mongoose.connect('mongodb+srv://admin:admin123@sandboxapi.1lwolgn.mongodb.net/node-api?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to mongodb')
    app.listen(3000, ()=>{
        console.log(`Node API is running on port 3000`)
    })
    
}).catch(()=>{
    console.log(error)
})