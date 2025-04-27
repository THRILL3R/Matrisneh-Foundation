const exp = require('express');
const mong = require('mongoose');
const path = require('path');
const port = 3020

const app = exp();
app.use(exp.static(__dirname))
app.use(exp.urlencoded({extended:true}))

mong.connect('mongodb://27017/registered')
const db = mong.connection
db.once('open',()=>{
    console.log("MongoDB connection successful")
});

const userSchema = new mong.Schema({
    name:String,
    email:String,
    phone:Number,
    age:Number,
    department:String,
    skills:String,
    availability:String
});

const User = mong.model('User', userSchema);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'volunteer.html'))
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, phone, age, department, skills, availability } = req.body;
        const newUser = new User({ name, email, phone, age, department, skills, availability });
        await newUser.save();
        res.send("Registration successful");
    } catch (error) {
        res.status(500).send("Error registering user");
    }
});

app.listen(port,()=>{
    console.log("Server Started")
});