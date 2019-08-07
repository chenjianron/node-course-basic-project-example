const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');//放設置各個hbs中的共同部分的地方
app.set('view engine','hbs');//設置一些各種express-related的結構
app.use((req,res,next) => {
  var now =  new Date().toString();
  var log = now + req.method+req.url;
 // console.log(now,req.method,req.url);
 console.log(log);
 fs.appendFile('server.log',log + '\n',(err) =>{
   if(err) {
     console.log('Unable to append to server.log.');
   }
});
  next();
});
/*app.use((req,res,next) => {
/  res.render('maintenance.hbs');
});*/
app.use(express.static(__dirname+'/public'));//作用是添加一些中間件,express.static()接受你想要展現文件的絕對路勁

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
  //return 'test'
});//設置爲hbs中的函數
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});
app.get('/',(req,res) => {
 // res.send('<h1>Hello Express!</h1>');
// res.send({
//   name:'Andrew',
//   likes:[
//     'Biking',
//	 'Cities'
// ]
// })
  res.render('home.hbs',{
    pageTitle:'Home Page',
	welcomeMessage:'Welcome to my website',
  	currentYear:new Date().getFullYear()
  })
});
app.get('/about',(req,res) => {
   res.render('about.hbs',{
     pageTitle:'About Page',
	 currentYear:new Date().getFullYear()
	 });//調用模板
//  res.send('About Page');
});
app.get('/bad',(req,res) => {
   res.send({
     errorMessage: 'Unable to handle request'
  });  
});
app.listen(port,() =>{
  console.log('Server is up on port '+port);
});
