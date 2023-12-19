import db from "./models"
import express from "express"
import bookRouter from "./routes/bookRoutes"
import assignBookRouter from "./routes/assignedBook"
import bookDetailRouter from "./routes/checkBookRecord"
import cors from "cors"

const app = express();
const port = process.env.PORT
 
app.use(cors())
app.use(express.json())

app.use("/", bookRouter)
app.use("/student", assignBookRouter)
app.use("/book", bookDetailRouter)

app.listen(port, async() => {
	console.log("server successfully running.");
	await db.sequelize.authenticate();
	console.log("connection created successfully.");
});
