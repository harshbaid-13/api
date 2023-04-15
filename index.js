import express from 'express';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express()

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + file.originalname)
    }
  })
  
const upload = multer({ storage })

// const upload = multer({ dest: './uploads/' })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file=req.file;
    res.status(200).json(file.filename);    
})

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)


app.listen(8800,() => {
    console.log('backend listening on');
}); 
app.get('/',(req,res)=>console.log(res.json("bhak")))