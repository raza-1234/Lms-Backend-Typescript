import db from "../models"
import {Request, Response} from "express"

const getBookDetail = async(req: Request, res: Response): Promise<Response> => {
	
	const {id} = req.params;
	try {
		const bookExist  = await db.books.findOne({where: {id}, include: "studentDetail"});
		if (!bookExist) {
			return res.status(404).json({"message" : `No Book Found Of Id ${id}`});
		}
		return res.send(bookExist)
	} catch(err) {
		return res.status(500).json({"message" : err})
	}
}

export default getBookDetail