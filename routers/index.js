const {
    Router
} = require('express');
const router = Router();
const dbSchema = require('../model/Schema');

router.get('/', (req, res) => {
    dbSchema.find({} , (err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.render('index',{
                title: "Home page",
                datas: data
            })
        }
        console.log(data);
    })
});

router.get('/search', (req, res) => {
    let {search} = req.query;
    search.toLowerCase;
    dbSchema.find({title: {$regex:search}}  ,  (err,data)=>{
        if(data === ""){
            res.redirect('/')
        }else{
            res.render('index',{
                title: "Home page",
                datas: data
            })
        }
    })
});
router.post('/', (req, res) => {
    res.send('post methof')
});

module.exports = router;