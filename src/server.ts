import express from "express"
import {books} from './bd'

const app= express();
const PORT= 8000
app.use(express.json())

app.get("/books", (req, res)=>{
    res.json(books)
})

app.get("/books/:id", (req, res)=>{
    const bookID= Number(req.params.id)
    if(isNaN(bookID)){
        res.status(400).json({Error : `ID must be a number`})
    }
    const bookfound= books.find((book)=> book.id===bookID)
    if (!bookfound){
        return res.status(404).json({Error : `id ${bookID} not found`})
    } res.json(bookfound);
})

app.post("/books", (req, res)=>{
    const { title, author }= req.body;
    if(!title || title===""|| !author || author===""){
        return res.status(400).json({Error : `Title and Author is needed`})
    }
    const id = books.length+1

    const newBook = {id , title , author}

    books.push(newBook)
    return res.status(201).json({Message : "Book created", id})

});

app.delete("/books/:id", (req, res)=>{
    res.send("under working")
});



app.listen(PORT, ()=> console.log(`server is listening on ${PORT}`))
