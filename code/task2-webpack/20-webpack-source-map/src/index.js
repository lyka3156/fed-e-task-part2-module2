// import "./index.css";

// http://localhost:2080/api/users -> https://api.github.com/users

fetch("/api/users")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res.forEach((item) => {
      let p = document.createElement("p");
      p.innerHTML = item.login;
      document.body.appendChild(p);
    });
  });

console.lo(222);
