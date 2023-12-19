import Modal from "../models"
import {Request, Response} from "express"
import bookProperties from "../Types/BookDetails";
import studentDetails from "../Types/StudentDetails";

const addNewBook = async(req: Request, res: Response): Promise<Response> => {

	const {name, author, edition, assigned}: bookProperties = req.body;
	try {
		const newBook: bookProperties = await Modal.books.create({name, author, edition, assigned})
		return res.json(newBook)
		
	} catch(err) {
		return res.status(500).json({"message" : err})
	}
	
}
 
const getAllBooks = async(req: Request, res: Response): Promise<Response> => {
	try {
		const allBooks: bookProperties[] = await Modal.books.findAll({
			order: [['id', 'ASC']],
			include: "studentDetail",
		});


			
		if(allBooks.length === 0) {
			return res.status(200).json({"message" : "No Book Exist."})
		}		
		return res.status(200).json(allBooks);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"message" : err})
	}
}

const updateBook = async(req: Request, res: Response): Promise<Response> => {
	const {id} = req.params;
	const {name, author, edition, assigned}: bookProperties = req.body;
	
	try {
		const existingBook = await Modal.books.findOne({where : {id}})
		if(!existingBook) { 
			return res.status(404).json({"message" : `Book With Id ${id} Does Not Exist.`})
		}
		
		const updateBook: bookProperties = {
			id : existingBook.id,
			assigned : existingBook.assigned || assigned,
			name : name || existingBook.name,
			author : author || existingBook.author,
			edition : edition || existingBook.edition
		}

		await existingBook.update(updateBook);
		return res.status(200).json(updateBook)
	}catch(err) {
		return res.status(500).json({"message" : err})
	}
}

const deleteBook = async(req: Request, res: Response): Promise<Response> => {
	const { id }= req.params;
	
	try{
		const bookAssigned: studentDetails = await Modal.students.findOne({where : {"bookId" : id}})
		if(bookAssigned) {
			return res.status(404).json({"message" :`Book with id ${id} borrowed by someone. You can not delete it for now.`})
		}
		const existingBook = await Modal.books.findOne({where: {id}});
		if(!existingBook) {
			return res.status(404).json({"message" : `Book With Id ${id} Already Not Exist.`})
		}
		await existingBook.destroy();
		return res.status(200).json({"message" : "deleted successfully"})
	}catch(err) {
		return res.status(500).json({"message" : err})
	}
} 

export { addNewBook, getAllBooks, updateBook, deleteBook }
