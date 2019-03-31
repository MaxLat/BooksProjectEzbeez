const Categorie = require('../models/categorie');

exports.getCategories = function(req , res , next)
{
    Categorie.find({}, function(err, result)
    {
        console.log(result);
        res.send(result);
    });
}

exports.addCategorie = function(req , res , next)
{
    const categorie = new Categorie(req.body);
    categorie.save(function(err , result ) {

        if(err)
        {
            console.log(err);
            res.status(403).send({ErrorCode : err.code});
        }
        if(result)
        {
            res.send({insert : true})
        }
        
    });
    
}



exports.removeCategorie = function(req , res , next)
{
    Categorie.findByIdAndRemove({_id : req.params.id} , function(err , result){

        if(result)
        {
            console.log(result);
            res.send(result);
        }
        else
        {
            res.status(403).send({ErrorCode : 004});
        }

    })
    
}