import express from "express";
// import userRouter from "./routes/userRouter.js";
// hello
const app = express();
const port = process.env.PORT || 9000;
import cors from "cors";

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
app.use("/api/user", userRouter)
const sendMenssage = (request, response) => {
  response.send({ menssage:'hello kangoroos', example:[1, 2, 3, 4]})
}
app.post('/test', sendMenssage)