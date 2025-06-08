import Advertiser from "../models/Advertiser.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
export const getAll=(req,res)=>{
    Advertiser.find()
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(500).send(err.message)
    })
}

 export const create = (req, res) => {
     const {name,email,password,phone,anotherPhone} = req.body

     const newAdd = new Advertiser({
        name,email,password,phone,anotherPhone
        
    })
    console.log(newAdd);
    
    newAdd.save()
        .then(add => {
             res.status(200).send(add)
         })
         .catch(err => {
             res.status(500).send({ error: err.message })
         })
 }


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const advertiser = await Advertiser.findOne({ email: email });
        if (!advertiser) {
            console.log('email not found!');
            return res.status(404).send({ error: `email and password are not match!` });
        }

        const isMatch = await bcrypt.compare(password, advertiser.password);
        if (!isMatch) {
            console.log('password is not match!');
            return res.status(404).send({ error: `email and password are not match!` });
        }

        const token = await jwt.sign(
            { email: advertiser.email },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({ advertiser, token });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}
export const sign_in = (req, res) => {
    const { name,email, password, phone, anotherPhone } = req.body;

    // בדוק אם הסיסמה לא ריקה
    if (!password) {
        return res.status(400).send({ error: 'Password is required' });
    }

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertiser => {
            if (advertiser.length > 0) {
                return res.status(400).send({ error: 'email exists' });
            }

            // יצירת סוללה והצפנת הסיסמה
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).send({ error: err.message });
                }
                bcrypt.hash(password, salt, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).send({ error: err.message });
                    }
                    const newAdvertiser = new Advertiser({
                        name,
                        email,
                        password: hashedPassword, // שמירת הסיסמה המוצפנת
                        phone,
                        anotherPhone
                    });
                    newAdvertiser.save()
                        .then(async advertiser => {
                            const token = await jwt.sign({
                                email, phone: advertiser.phone, anotherPhone: advertiser.anotherPhone
                            },  process.env.SECRET, {
                                expiresIn: '1h', // hours
                            });
                            res.status(200).send({ advertiser, token });
                        })
                        .catch(err => {
                            res.status(500).send({ error: err.message });
                        });
                });
            });
        });
}





          
