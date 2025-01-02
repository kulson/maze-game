var ip = "http://18.194.89.132:3000";

import { newGame, endGame } from "./script.js";
function fetchServerTime() {
  setInterval(async () => {
    try {
      const response = await fetch(`${ip}/api`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let seconds = await response.text();
      if (seconds === "0") {
        newGame();
      }
      if (seconds === "45") {
        endGame();
      }
      console.log("Server Time:", seconds);
      let message;
      if (seconds < 45) {
        seconds = 45 - seconds;
        message = "Game is running: ";
      } else {
        seconds = 15 - (seconds - 45);
        message = "Break: ";
      }
      document.getElementById("serverTime").innerHTML =
        message + seconds + " seconds";
    } catch (error) {
      console.error("Error fetching server time:", error);
    }
  }, 1000);
}

fetchServerTime();
