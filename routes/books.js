const express = require("express");
const {books} = require('../data/books.json');
const {users} =require('../data/users.json');
const router = express.Router();

/**
 * Route : /books
 * Method : GET
 * Description : Get all the list of books in the system
 * Access : Public
 * Parameters : None
 */
router.get('/',(req,res)=>{
    res.status(200).json({ 
        success:true,
        data:books
    })
})

/**
 * Route : /books/:id
 * Method : GET
 * Description : Get a book by its ID
 * Access : Public
 * Parameters : None
 */

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const book=books.find((each)=>each.id===Number(id))

    if(!book){
      return  res.status(404).json({
            success:false,
            message:`Book not found for id:${id}`
        })
    }
    res.status(200).json({
        success:true,
        data:book
    })
})

/**
 * Route : /books
 * Method : POST
 * Description : Create/add a new book
 * Access : Public
 * Parameters : None
 */

router.post('/',(req,res)=>{
        //req.body should contain all the details of the book
        const{id,title,author,genre,year,available}=req.body;

        //Check if all the details are present
        //If not send an error response
        if(!id || !title || !author || !genre || !year || !available){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //Check if a book with the same id already exists
        const bookExists=books.find((each)=>each.id===Number(id));
        if(bookExists){
            return res.status(400).json({
                success:false,
                message:`Book already exists with id:${id}`
            })
        }

        //If all details are present create a new book object
        const newBook={
            id,
            title,
            author,
            genre,
            year,
            available
        }

        //Push it to the books array
        books.push(newBook);

        //Send a success response to the client
        res.status(201).json({
            success:true,
            data:newBook,
            message:"Book added successfully"
        })  

        });

/**
 * Route : /books/:id
 * Method : PUT
 * Description : Update/edit a book by its ID
 * Access : Public
 * Parameters : None
 */

router.put('/:id',(req,res)=>{
    const{id}=req.params;
    //req.body should contain all the details of the book
    const{data}=req.body;
    //Check if a book with the id exists
    const book=books.find((each)=>each.id===Number(id));
    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book not found for id:${id}`
        })
    }
    //Object.assign(user,data);
    const UpdatedBook = books.map((each) => {
        if (each.id === Number(id)) {
            return {
                ...each,
                ...data
            };
        }
        return each;
    });
   

    //Send a success response to the client
    res.status(200).json({
        success:true,
        data:UpdatedBook,
        message:"Book updated successfully"
    })
})

/**
 * Route : /books/:id
 * Method : DELETE
 * Description : Delete a book by its ID
 * Access : Public
 * Parameters : None
 */

router.delete('/:id',(req,res)=>{
    const{id}=req.params;
    //Check if a book with the id exists
    const book=books.find((each)=>each.id===Number(id));
    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book not found for id:${id}`
        })
    }
    const RemainingBooks=books.filter((each)=>each.id!==Number(id));
    //Send a success response to the client
    res.status(200).json({
        success:true,
        data:RemainingBooks,
        message:"Book deleted successfully"
    })
})

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books with user details
 * Access: Public
 * Parameters: None
 
router.get('/issued',(req,res)=>{
    //Get all issued books
    const issuedBooks=books.filter((each)=>!each.available);

    //If no issued books found send an error response
    if(issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message:"No issued books found"
        })
    }

    //For each issued book get the user details who issued it
    const issuedBooksWithUserDetails=issuedBooks.map((book)=>{
        //Find the user who issued the book
        const user=users.find((each)=>each.id===book.issuedTo);
        //Return the book details along with user details
        return {
            ...book,
            user:user?user:{}
        }
    })

    //Send a success response to the client
    res.status(200).json({
        success:true,
        data:issuedBooksWithUserDetails
    })
});
*/
module.exports = router;