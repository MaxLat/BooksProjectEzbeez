const Book = require('../models/book');

exports.addBook = function(req , res , next)
{
    req.body.userId = req.user.id;
    const book = new Book(req.body);
    book.save(function(err , result ) {

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

exports.getBooks = function(req , res , next)
{
    Book.find({ userId : req.user.id}, function(err, result)
    {
        console.log(result);
        res.send(result);
    });
}

exports.getBook = function(req,res,next)
{
    Book.find({ _id : req.params.id}, function(err, result)
    {
        if(result)
        {
            console.log(result);
            res.send(result);
        }
        else
        {
            res.status(403).send({ErrorCode : 007});
        }
        
    });
}

exports.editBook = function(req , res , next)
{
    req.body.userId = req.user.id;
    Book.update({_id : req.params.id}, req.body, function(err , result)
    {
        if(result)
        {
            console.log(result);
            res.send(result);
        }
        else
        {
            res.status(403).send({ErrorCode : 005});
        }
    })
}

exports.removeBook = function(req , res , next)
{
    Book.findByIdAndRemove({_id : req.params.id} , function(err , result){

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