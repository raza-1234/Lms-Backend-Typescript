import express from "express"
import getBookDetail from "../Controllers/bookDetailController";
import { paramValidator } from "../Middlewares/validationMiddleware";
const router = express.Router();

router.get("/:id/getBookRecord", paramValidator, getBookDetail)

export default router