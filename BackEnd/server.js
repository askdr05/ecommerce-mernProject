const app = require("./app")
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')
const databaseConection = require('./config/dataBase')

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  

dotenv.config({path:"BackEnd/config/config.env"})


//connecting to database
databaseConection()

cloudinary.config({
    cloud_name : process.env.CLOUDINAY_NAME,
    api_key : process.env.CLOUDINAY_API_KEY,
    api_secret : process.env.CLOUDINAY_API_SECRET,
})

// app.get()
const server = app.listen(process.env.PORT,()=>{
    console.log(`server working on ${process.env.port}`)
})


// unhandeled promise rejection

process.on('unhandledRejection', (err)=>{
    console.log(`error:${err.message}`)
    console.log('shutting down the server due to unhandeled promise rejection' )

    server.close(()=>{
        process.exit(1)
    })
})
