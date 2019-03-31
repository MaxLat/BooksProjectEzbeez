const AuthentificationController = require("./controller/authentification");
const BookAPIController = require("./controller/bookAPI");
const CategorieController = require("./controller/categoriesAPI");
var path = require('path');
require("./services/passport");
const passport = require("passport");

const requireToken = passport.authenticate("jwt" , {session : false})
const requireValidCredentials = passport.authenticate("local" , {session : false} )

module.exports = function(expressServer){

    expressServer.get('/api/test',requireToken ,function(req,res,next)
    {
        console.log(req.user.id);
        res.send({serverData : ["blical","jehkjsdhf" , "dsfjjksdfh"]})
    });

    //books
     expressServer.get('/api/getbooks',requireToken ,BookAPIController.getBooks);

     expressServer.get('/api/getbook/:id',requireToken,BookAPIController.getBook);

     expressServer.post('/api/addbook', requireToken,BookAPIController.addBook);

    // expressServer.get('api/removebooks/:id',BookAPIController.removeBook);

     expressServer.post('/api/editbook/:id', requireToken,BookAPIController.editBook);

     expressServer.get('/api/removebook/:id', requireToken,BookAPIController.removeBook);


    //categories 

     expressServer.get('/api/getcategories',requireToken ,CategorieController.getCategories);

     expressServer.post('/api/addcategorie', requireToken,CategorieController.addCategorie);

     expressServer.get('/api/removecategorie/:id', requireToken,CategorieController.removeCategorie);




    
    expressServer.post('/api/signup', AuthentificationController.signup)

    expressServer.get('/resourceSecrete' , requireToken , function(req,res)
    {
        res.send({code : 'coucou'});
    });

    expressServer.post('/api/signin', requireValidCredentials,AuthentificationController.signin)


    expressServer.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });

    
    
}