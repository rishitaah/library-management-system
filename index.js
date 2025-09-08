const express = require("express");
//const {users} = require("./data/users.json")

const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

const app = express();

const PORT=8081;
app.use(express.json());

app.use("/users",usersRouter);
app.use("/books",booksRouter);

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Home Page :-)"
    });
});

// app.all('*',(req,res)=>{
//     res.status(500).json({
//         message:"Not Built Yet"
//     });
// });

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});