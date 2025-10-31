const prisma  = require("../clients") ;



 async function createpost(req , res) {
    const data = await prisma.post.create({
        data:{
            title : "manmath",
            description : "manmathmohanty@gmail.com"
        }
    })
    res.send(data)
}
async function updatepost(req , res) {
    const {id} = req.params
     const data = await prisma.post.update({
        where :{
            id : id
        },
        data:{
            title: req.body.title,
            description : req.body.description
        }
    })
    res.send(data)
}
 async function deletepost(req , res) {
        const {id} = req.params
          await prisma.post.update({
        where :{
            id : id
        }
    })

}
 async function getpost(req ,res){
     const data =  await prisma.post.findMany({})
    res.send(data)
}
module.exports = {getpost,deletepost,updatepost,createpost}