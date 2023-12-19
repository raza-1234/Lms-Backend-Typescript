import express from "express"
import { bodyValidator, paramValidator } from "../Middlewares/validationMiddleware";
import {getAllBooks, addNewBook, updateBook, deleteBook} from "../Controllers/bookController"
const router = express.Router();

router.get("/", getAllBooks);
router.post("/", bodyValidator, addNewBook);
router.put("/:id", paramValidator, bodyValidator, updateBook)
router.delete("/:id", paramValidator, deleteBook);

export default router 