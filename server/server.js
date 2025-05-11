const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./routers/auth/auth-router');
const devRouter = require('./routers/developer/developer-router');
const conRouter = require('./routers/contributor/contributor-router');
const eventRouter = require('./routers/events/events-router');
const paymentRouter = require('./routers/payment/payment-router');
const projectRouter = require('./routers/project/project-router');
const postRouter = require('./routers/post/linkedinPostRouter');


require('dotenv').config();

mongoose
  .connect("mongodb+srv://bharath2005:bharath2005@cluster0.0vibjmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
);

app.use(passport.initialize());

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/developerEnroll',devRouter);
app.use('/api/contributorEnroll',conRouter);
app.use('/api/events',eventRouter);
app.use('/api/payment',paymentRouter);
app.use('/api/project',projectRouter);
app.use('/api/posts',postRouter);



app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));