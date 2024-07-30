const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT;
// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const authRoutes = require("./routes/auth");
const brandRoutes = require("./routes/brand");
const watchRoutes = require("./routes/watch");
const commentRoutes = require("./routes/comment");
const memberRoutes = require("./routes/member");
const cartRoutes = require("./routes/cart");

app.use("/auth", authRoutes);
app.use("/brands", brandRoutes);
app.use("/watches", watchRoutes);
app.use("/comments", commentRoutes);
app.use("/members", memberRoutes);
app.use("/carts", cartRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
