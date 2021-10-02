const {
    Router
} = require('express');
const Schema = require('../model/Schema');
const router = Router();
const multer = require('multer');
const path = require('path');

const { extname } = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "uploads")
    },
    filename: (req, file, cd) => {
        // cd(null , Math.random().toString.slice(-5) + path.extname(file.originaname))
        cd(null, Date.now() + path.extname(file.originalname))
    }
})
const uploads = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cd) => {
        const ext = path.extname(file.originalname)
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            const err = new Error("xatolik bor bunday farmat mumkin emas")
            err.code = 300
            return cd
        }
        cd(null, true)
    },
    preservePath: true
}).single("photo")

router.get('/add', (req, res) => {
    res.render('add', {
        title: "Add page",
        page: "Maxsulotlar Qo'shish"
    });
});

router.post('/add', uploads, (req, res) => {
    console.log(req);
    
    const db = new Schema({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        photo: req.file.path,
        comments: req.body.comments
    });
    db.save()
        .then(data => res.json(data), res.redirect('/'))        
        .catch(err => console.log(err, 'Error'));
});

module.exports = router;
