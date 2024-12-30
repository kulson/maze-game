document.addEventListener("DOMContentLoaded", function () {
  const nicknameBox = document.getElementById("nickname-box");
  const nicknameInput = document.getElementById("nickname-input");

  // Check if nickname is already stored
  if (!localStorage.getItem("nickname")) {
    nicknameBox.style.display = "flex"; // Show the box
  } else {
    alert(`Welcome back, ${localStorage.getItem("nickname")}!`);
    nicknameBox.style.display = "none"; // Hide the box if nickname exists
  }

  document
    .getElementById("submit-nickname")
    .addEventListener("click", function () {
      const nickname = nicknameInput.value.trim();
      if (nickname) {
        localStorage.setItem("nickname", nickname); // Store nickname
        alert(`Hello, ${nickname}!`);
        nicknameBox.style.display = "none"; // Hide the box after submission
      } else {
        alert("Please enter a valid nickname.");
      }
    });
});
