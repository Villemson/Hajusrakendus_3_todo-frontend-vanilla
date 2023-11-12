let loginButton;
let logoutButton;
let usernameInput;
let passwordInput;

window.addEventListener("load", () => {
  loginButton = document.querySelector("#login-submit");
  logoutButton = document.querySelector("#logout-submit");
  usernameInput = document.querySelector("#username");
  passwordInput = document.querySelector("#password");

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("login clicked");
    login(usernameInput.value, passwordInput.value);
  });

  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("logout clicked");
    localStorage.clear();
  });
});

async function login(username, password) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: username,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("https://demo2.z-bit.ee/users/get-token", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem("token", result.access_token);
      console.log("Login successful");
    })
    .catch((error) => console.log("error", error));
}