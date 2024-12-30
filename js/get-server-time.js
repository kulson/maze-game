function fetchServerTime() {
  setInterval(async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const serverTime = await response.text();
      console.log("Server Time:", serverTime);
      document.getElementById("serverTime").innerHTML = serverTime + " seconds";
    } catch (error) {
      console.error("Error fetching server time:", error);
    }
  }, 1000);
}

fetchServerTime();
