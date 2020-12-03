const express = require('express');
const { projects } = require('./data.json');
const app = express();

// This sets the view engine to handle pug files.
app.set('view engine','pug');

// This makes the public folder of static files available. 
app.use('/static', express.static('public'));

// This prints the landing/root page. 
app.get('/', (req,res) => {
    res.render('index',{ projects })
});

// This prints the about page.
app.get('/about',(req,res)=>{
    res.render('about',{ })
});

// This checks the requested project from the URL. If the project exists, it will print.
// Otherwise a 404 is created and error page is printed.
app.get('/project/:id',(req,res)=>{
    const { id } = req.params
    if(projects[id]){
        res.render('project', { project: projects[id]})
    } else {
        const err = new Error ();
        err.status = 404
        err.message = 'The page you are looking for does not exist. Please try another page...';
        res.render('not-found');
    }
});
// This creates 404 error.
app.use((req,res,next)=>{
    const err = new Error ();
    err.status = 404
    err.message = 'The page you are looking for does not exist. Please try another page...';
    next(err);
});
// This handles all general errors. If the error handler above passses a 404 error it will print the 404 page. 
// Otherwise it will print any other error that happens.
app.use((err,req,res,next) =>{
    if (err.status === 404) {
        res.status(404).render('error', { err });
      } else {
        err.message = err.message || 'It appears there was an error.'
        res.status(err.status|| 500).render('error', { err });  
      }
});

app.listen(3000);