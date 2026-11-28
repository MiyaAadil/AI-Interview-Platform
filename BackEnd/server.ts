import "dotenv/config";
import chalk from "chalk";
import app from "./app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`✓ Server running on http://localhost:${PORT}`));
});