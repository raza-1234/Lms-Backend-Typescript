import { Optional } from "sequelize"

export type StudentAttribute = {
  id: number,
  name: string,
  rollno: string,
  email: string,
  bookId: number,
  assignDate: Date,
  returnDate: Date
}

export type StudentCreationAttribute = Optional<StudentAttribute, "id" >