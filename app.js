const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine','pug');

app.use('/static', express.static('public'));

app.get('/', (req,res) => {
    res.render('index',{ projects: data.projects })
});

app.get('/about',(req,res)=>{
    res.render('about',{ })
})
app.get('/project/:id',(req,res)=>{
    if(data[req.params]){
        res.render('project', {id: req.params})
    } else {
        const err = new Error ();
        err.status = 404
        err.message = 'The page you are looking for does not exist. Please try another page...';
        res.render('error', { err });
    }
});
app.use((req,res,next)=>{
    const err = new Error ();
    err.status(404)
    err.message = 'The page you are looking for does not exist, please try another page';
    next(err);
});
// app.use((err,req,res,next) =>{
    
// });

app.listen(3000);