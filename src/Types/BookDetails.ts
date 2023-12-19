import StudentDetails from "./StudentDetails"

type BookDetails = {
  id?: number,
  name: string,
  author: string,
  edition: number,
  assigned: boolean,
  studentDetail?: StudentDetails[] 
}

export default BookDetails;