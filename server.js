const dotenv = require("dotenv");
const connectDB = require('./src/config/db')
dotenv.config();
const app = require("./src/app");
const PORT = process.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is runing at port ${PORT}`);
});
