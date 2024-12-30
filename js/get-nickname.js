function askNickname() {
  var nickname = prompt("Please enter your nickname:");
  if (nickname !== null) {
    localStorage.setItem("nickname", nickname);
  }
}

// Check if nickname is stored in local storage
if (!localStorage.getItem("nickname")) {
  askNickname();
}
