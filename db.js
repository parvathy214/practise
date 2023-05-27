const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://p4parvathy214:Lekhaatlas@cluster0.ndcrk8y.mongodb.net/Exam?retryWrites=true&w=majority`,{useNewUrlParser: true})
.then(()=>
    console.log('connected to database'))
.catch(err=>{
 console.log('error connecting to db')
})

module.exports = mongoose;