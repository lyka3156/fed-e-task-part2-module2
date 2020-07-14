import "./index.css";

const baseUrl = "https://api.github.com";

fetch(baseUrl + "/users").then((res) => {
  console.log(res);
});

console.log(1111111);
