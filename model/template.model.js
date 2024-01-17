const {Schema,model} = require('mongoose');


const TemplateSchema = Schema({
    title :{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    }

})


module.exports = model('Template',TemplateSchema)