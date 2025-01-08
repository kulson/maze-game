import { newGame, endGame } from "./script.js";

const ip = "https://mazegameonlineapi.run.place";

function fetchServerTime() {
  setInterval(async () => {
    try {
      let response = await axios.get(`${ip}/api`);
      let seconds = parseInt(response.data);

      console.log("Server Time:", seconds);

      if (seconds === 0) {
        newGame();
      }
      if (seconds === 45) {
        endGame();
      }

      let message;
      if (seconds < 45) {
        message = "Game is running: ";
        seconds = 45 - seconds;
      } else {
        message = "Break: ";
        seconds = 15 - (seconds - 45);
      }

      document.getElementById("serverTime").innerHTML =
        message + seconds + " seconds";
    } catch (error) {
      console.error("Error fetching server time:", error);
    }
  }, 1000);
}

fetchServerTime();
