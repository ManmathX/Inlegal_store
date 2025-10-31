const prisma  = require("../clients") ;
// const { updatepost, createpost } = require("./getPost");



 async function createuser(req , res) {
   const data =  await prisma.User.create({
        data:{
            name : "manmath",
            email : "manmathmohanty@gmail.com"
        }
    })
    res.send(data)
}async function deleteuser(req , res) {
    const {id} = req.params
    const data = await prisma.User.update({
        where :{
            id : Number(id)
        },
        data:{
            name: req.body.name,
            email : req.body.email
        }
    })
    res.send(data)
}
 async function updateuser(req , res) {
        const {id} = req.params
     await prisma.User.update({
        where :{
            id : id
        }
    })

}
 async function getuser(req ,res){
    const data = await prisma.User.findMany()
    res.send(data)
}
module.exports = {getuser,deleteuser,updateuser,createuser}