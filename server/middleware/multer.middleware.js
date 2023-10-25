const multer = require('multer')
const fs = require('fs')

// function to set up and return a multer middle ware 
const setUpMultMiddleWare = () =>{
    const storage = multer.diskStorage({
        destination:function(req,file,cb){
            const uploadDir = "./uploads"
            // create a upload directory if it doesn't exists
            if(!fs.existsSync(uploadDir)){
                fs.mkdirSync(uploadDir)
            }
            cb(null,uploadDir)//specifying multer where the file should be stored('destination')
        },
        filename:function(req,file,cb){
            const timeStamp = new Date().toISOString().replace(/:/g,"-");//convert date to string and chang all occurence "of : to -"
            cb(null,timeStamp+file.originalname)//attach the time stamp to orignal name to make it unique
        }
    });

    // configuring the storage engine to where and how the file should be stored in server
    const upload = multer({storage:storage});

    // return the multer middle ware to upload only a single image 
    return upload.single('image');
}

module.exports =  {setUpMultMiddleWare};