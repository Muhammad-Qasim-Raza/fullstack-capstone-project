require("dotenv").config();
const app = require("./app");
const { connectToDatabase } = require("./db");

const port = Number(process.env.PORT || 5000);

connectToDatabase()
  .then(() => app.listen(port, () => console.log(`GiftLink API running on port ${port}`)))
  .catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
  });
