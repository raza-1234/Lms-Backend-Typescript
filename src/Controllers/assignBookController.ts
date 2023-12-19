import db from "../models"
import {Request, Response} from "express"
import studentDetails from "../Types/StudentDetails";

const assignBook = async(req: Request, res: Response): Promise<Response> => {
	const {id} = req.params;
	const {name, rollno, email, assignDate, returnDate}: studentDetails = req.body;

	try{
		const bookExist = await db.books.findOne({where : {id}});
		if(!bookExist) {
			return res.status(404).json({"message" : `Book With Id ${id} Not Exist.`})
		}
		if(bookExist.assigned) {
			return res.status(404).json({"message" : `Book With Id ${id} Not Available For Now(Already Borrowed By Someone.).`})
		}

		const assignBook = await db.students.create({name, rollno, email, bookId : bookExist.id, assignDate, returnDate});
		await bookExist.update({assigned: true})
		return res.status(200).send(assignBook)
	}catch (err) {
		return res.status(500).json({"message" : err})
	}
}

const returnBook = async(req: Request, res: Response): Promise<Response> => {
    
	const {id } = req.params;
	try{
		const bookExist = await db.books.findOne({where : {id}});
		if(!bookExist) {
			return res.status(404).json({"message" : `No Book Exist With Id ${id}`})
		}
		if(!bookExist.assigned) {
			return res.status(200).json({"message" : `Book With Id ${id} Already Available In Library.`})
		}

		const studentRecord = await db.students.findOne({where : {"bookId" : id}});
		await studentRecord.destroy();
		await bookExist.update({assigned: false})
		return res.send("Book Returned.")
    }catch (err) {
			return res.status(500).json({"message" : err})
    }
}

const updateStudent = async(req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	const {name, email, rollno, assignDate, returnDate}: studentDetails = req.body;
	try {
		const studentExist = await db.students.findOne({where : {'bookId' : id}})
		if(!studentExist) {
			return res.status(404).json({"Message" : "No Record Exist."})
		}

		const data: studentDetails = {
			name : name || studentExist.name,
			email : email || studentExist.email,
			rollno : rollno || studentExist.rollno,
			assignDate : assignDate || studentExist.assignDate,
			returnDate : returnDate || studentExist.returnDate,
			bookId : studentExist.bookId
		}

		await studentExist.update(data);
		return res.status(200).json(data)
	}catch (err){
			return res.status(500).json({"message" : err})
	}
}

export { assignBook, returnBook, updateStudent }