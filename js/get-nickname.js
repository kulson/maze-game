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
axios
  .post("http://localhost:3000/api/nickname", { nickname })
  .then((response) => {
    console.log("Nickname sent successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error sending nickname:", error);
  });
