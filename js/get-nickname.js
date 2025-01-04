function askNickname() {
  var nickname = prompt("Please enter your nickname:");
  if (nickname !== null) {
    localStorage.setItem("nickname", nickname);
  }
}

if (!localStorage.getItem("nickname")) {
  askNickname();
}
const nickname = localStorage.getItem("nickname");
