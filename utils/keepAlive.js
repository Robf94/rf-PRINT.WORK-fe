import axios from "axios";
import cron from "node-cron";

function keepAlive() {
  axios.get("https://rf-print-work-be.onrender.com/api/albums");
}

cron.schedule("*/2 * * * *", () => {
  console.log("running a task every two minutes");
  keepAlive()
  console.log(2+2);
});