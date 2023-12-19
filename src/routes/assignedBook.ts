import Express from "express";
import { paramValidator, studentBodyValidator } from "../Middlewares/validationMiddleware";
import { assignBook, returnBook, updateStudent } from "../Controllers/assignBookController"
const router = Express.Router();

router.post("/v1/:id/assignedBook", paramValidator, studentBodyValidator, assignBook);
router.delete("/v1/:id/returnBook", paramValidator, returnBook);
router.put("/v1/:id/updateStudent", paramValidator, studentBodyValidator, updateStudent);

export default router