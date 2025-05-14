import express from 'express';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import baseRouter from './routes/baseRoutes.js';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", baseRouter);
app.use("/users", userRouter);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});