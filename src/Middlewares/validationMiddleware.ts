import { body, param, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

const checkValidation = (req: Request, res:Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    res.status(422).json({errors: errors.array()})
    return;
  }
  next();
}

const bodyValidator = [
  body("name").trim().notEmpty().withMessage("Name Can Not Be Empty."),
  body("author").trim().notEmpty().withMessage("Author Can Not Be Empty."),
  body("edition").trim().notEmpty().withMessage("Edition Can Not Be Empty."),
  body("assigned").trim().isBoolean().withMessage("Assigned Must Be Boolean Value"),
  checkValidation
]

const paramValidator = [
  param("id").trim().notEmpty().withMessage("Id Can Not Be Empty.").isInt().toInt().withMessage("Id Should Be Number."),
  checkValidation
]

const studentBodyValidator = [
  body("name").trim().notEmpty().withMessage("Student Name Is Required."),
  body("rollno").trim().notEmpty().withMessage("Student Roll Number Is Required."),
  body("email").trim().notEmpty().withMessage("Email Is Required.").isEmail().withMessage("Enter Valid Email."),
  body("assignDate").trim().notEmpty().withMessage("AssignDate iS Required."),
  body("returnDate").trim().notEmpty().withMessage("ReturnDate iS Required"),
  checkValidation
]

export { bodyValidator, paramValidator, studentBodyValidator }