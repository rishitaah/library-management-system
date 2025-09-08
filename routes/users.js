const express=require('express');
const {users}=require('../data/users.json')
const router = express.Router();

/**
 * Route : /users
 * Method : GET
 * Description : Get all the list of users in the system
 * Access : Public
 * Parameters : None
 */
router.get('/',(req,res)=>{
    res.status(200).json({ 
        success:true,
        data: users
    })
})

/**
 * Route : /users:id
 * Method : GET
 * Description : Get a user by their ID
 * Access : Public
 * Parameters : None
 */

router.get('/:id',(req,res)=>{

    const {id} = req.params;
    const user=users.find((each)=>each.id===id)

    if(!user){
      return  res.status(404).json({
            success:false,
            message:`User not found for id:${id}`
        })
    }
    res.status(200).json({
        success:true,
        data:user
    })
})

/**
 * Route : /users
 * Method : POST
 * Description : Create/register a new user
 * Access : Public
 * Parameters : None
 */

router.post('/',(req,res)=>{
        //req.body should contain all the details of the user
        const{id,name,email,role,borrowedBooks,subscriptionType,subscriptionDate}=req.body;

        //Check if all the details are present
        //If not send an error response
        if(!id || !name || !email || !role || !borrowedBooks || !subscriptionType || !subscriptionDate){
            return res.status(400).json({
                success:false,
                message:"Please provide all the details"
            })
        }
        //Check if user already exists
        const userExists=users.find((each)=>each.id===id);
        if(userExists){
            return res.status(400).json({
                success:false,
                message:`User already exists with id:${id}`
            })
        }
        //Create a new user and add it to the users array
        users.push({
            id,name,
            email,
            role,
            borrowedBooks,
            subscriptionType,
            subscriptionDate
        })
        //Send a success response to the client
        res.status(201).json({
            success:true,
            message:"User created successfully",
        })
      })

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating a user by their ID
 * Access : Public
 * Parameters : None
 */

router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    //Check if user exists
    const user=users.find((each)=>each.id===id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:`User not found for id:${id}`
        }) 
    }
    //If user exists update their details
    //Object.assign(user,data);
    const UpdatedUsers=users.map((each)=>{
        if(each.id===id){
            return{
                //Spread operator - ...
                ...each,
                ...data
            }
        }
        return each;
    })
    res.status(200).json({
        success:true,
        message:"User details updated successfully",
        data:UpdatedUsers
    })
    
})

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating a user by their ID
 * Access : Public
 * Parameters : None
 */

router.delete('/:id',(req,res)=>{
    const{id}=req.params;
    //Check if user exists
    const user=users.find((each)=>each.id===id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:`User not found for id:${id}`
        })
    }
    const updatedusers=users.filter((each)=>each.id!==id)
    // 2nd approach
    // const index=users.indexOf(user);
    // users.splice(index,1);
    res.status(200).json({
        success:true,
        message:"User deleted successfully",
        data:updatedusers
    })
});

/**
 * Route : /users/subscription-details/:id
 * Method : GET
 * Description : Get subscription details of a user by their ID
 * Access : Public
 * Parameters : ID
 */

router.get('/subscriptiondetails/:id',(req,res)=>{
    const {id}=req.params;
    //Check if user exists
    const user=users.find((each)=>each.id===id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:`User not found for id:${id}`
        })
    }
    //Calculate the subscription details
    const getdateindays= (data='')=>{
        let date;
        if(data){
            //Current date
            date=new Date(data);
    }else{
        date=new Date();
    }
    let days = Math.floor(data/ (1000 * 60 * 60 * 24));
    return days;
    }
    const subscriptionType=(date)=>{
        if(user.subscriptionType==='Basic'){
            date= date+90;
    }else if(user.subscriptionType==='Standard'){
        date=date+180;
    }else if(user.subscriptionType==='Premium'){
        date=date+365;
    }return date;
}
//Subscription expiry date
let returndate=getdateindays(user.returnDate);
let currentdate=getdateindays();
let subscriptiondate=getdateindays(user.subscriptionDate);
let subscriptionexpiry=subscriptionType(subscriptiondate);
 const data = {
    ...user,
    subscriptionexpired:subscriptionexpiry<currentdate,
    daysleftforsubscription: subscriptionexpiry-currentdate,
    daysleftforexpiry:returndate<currentdate? "Book is overdue" : returndate,
    fine: returndate<currentdate ? subscriptionexpiry<=currentdate ? 200 : 100 : 0
 }
    res.status(200).json({
        success:true,
        data:data
    })
})

module.exports=router;