const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const taskRoutes = require("./routes/taskRouter");
const adminRouter = require("./routes/adminRouter");
const messageRouter = require("./routes/messageRouter");
const taskApplicationRoutes = require("./routes/taskApplicationRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Berozgar.com API");
});

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/user/message", messageRouter);
app.use("/api/task-applications", taskApplicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
