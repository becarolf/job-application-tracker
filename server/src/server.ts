import dotenv from "dotenv";
import { app } from "./app.js";

// look for a .env file and load its values into process.env
dotenv.config();

// fallback: use the PORT form the .env file if it exists, if it doesn't, use 5001
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});