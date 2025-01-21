const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

require('dotenv').config();

const port = process.env.PORT;


// create an inmemory array of user objects

const users=[{
    name: 'John',
    kidneys:[{healthy:true},{healthy:true}]
},
{
    name:'Shivam',
    kidneys:[{healthy:false},{healthy:true}]
}]


//four functionalities we need to implement

//user can check how many kidneys they have and their health status
app.get('/', (req, res)=>{
    let JohnKidneys=users[0].kidneys; 
    let numberOfKidneys=JohnKidneys.length;
    let numberOfHealthy=0;
    for(let i=0; i<JohnKidneys.length; i++){
           if(JohnKidneys[i].healthy){
               numberOfHealthy=numberOfHealthy+1;
           }
    }
 numberOfUnhealthy=numberOfKidneys-numberOfHealthy;
 res.json({numberOfKidneys,numberOfHealthy, numberOfUnhealthy})
})

//user can add a new kidney, it can be healthy or unhealthy
app.post('/', (req, res)=>{
const healthyStatus = req.body.healthy;
console.log(healthyStatus)
users[0].kidneys.push({healthy:healthyStatus})

res.json({msg:"done"})

})



//make all the kidneys healthy 
app.put('/', (req, res)=>{
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({msg:"done"})
})

//delete the unhealthy kidneys
app.delete('/', (req, res)=>{
const new_kidneys=[]
for(let i=0;i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i].healthy){
        new_kidneys.push(users[0].kidneys[i])
    }
}
users[0].kidneys=new_kidneys;
res.json({msg:"done"})
})


app.listen(port,(req,res)=>{
    console.log(`the app is running on port ${port}`)
})

