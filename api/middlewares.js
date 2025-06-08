import jwt from 'jsonwebtoken'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()
export const checkAdd=(req,res,next)=>{
    if(!req.headers.authorization)
       return res.status(401).send("authorization f")
    const token=req.headers.authorization.split(" ")[1]
    if(!token)
        return res.status(401).send("authorization fd")
  
    jwt.verify(token, process.env.SECRET,(error,decoded)=>{
        if(error||!decoded)
            return  res.status(401).send("authorization ld")
        if(decoded)
             next()
    })
}

//פונקציה שמסננת את סוגי הקבצים שאפשר להעלות
const fileFilter = (req, file, cb) => {
    //במקרה שלנו נאפשר רק קבצי בסיומת תמונה
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpg') {
        //true אם הקובץ מסוג מתאים נחזיר 
        cb(null, true)
    }
    //ואם לא - false
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

 export const upload= multer({
        storage,
        //הגדרות לגבי הקובץ המועלה
        limits: {
            //2MB הקובץ יכול להיות עד גודל של 
            fileSize: 1024 * 1024 * 2
        },
        fileFilter
    })





