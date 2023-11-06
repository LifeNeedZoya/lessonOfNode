const express = require("express");

const { logger } = require("./middleware/logger");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(logger);
app.use(cors());

// api/users
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server is listening at ${PORT} port`));
