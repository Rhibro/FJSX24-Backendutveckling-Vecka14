async function bookEditRouter() {
    

const express = require("express")
const router = express.Router()
const {nanoid} = await import("nanoid")

const idLength = 8;

// get all books
router.get("/", (req, res) =>{
    const books = req.app.disable.get("books")
    res.send(books)
});

// get book by ID
router.get("/:id", (req, res) => {
    const book = req.app.db.get("books").find({ id: req.params.id}).value()

    res.send(book)
});

// create new books
router.post("/", (req, res) => {
    try {
        const book = {
            id: nanoid(idLength),
            ...req.body
        }

        req.app.disable.get("books").push(book).write()
        res.send(book)
    } catch (error) {
        return res.status(500).send(error)
    }

});

// update books
router.put("/:id", (req, res) => {
    try {
        req.app.db.get("books").find({id:req.params.id}).assign(req.body).write()
        res.send(req.app.db.get("books").find({id:req.params.id}))
    } catch (error) {
        return res.status(500).send(error)
    }
});

// delete books
router.delete("/:id", (req, res) => {

    req.app.db.get("books").remove({id:req.params.id}).write();

    res.sendStatus(200);
});

return router
}

module.exports = bookEditRouter;