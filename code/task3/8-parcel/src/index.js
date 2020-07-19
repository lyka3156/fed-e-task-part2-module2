import foo from "./foo";
import $ from "jquery";
import "./style.css";
import logo from "./logo.png";




import("jquery").then($ => {
    $(document.body).append('<h1>Hello Parcel</h1>');
    $(document.body).append(`<img src=${logo} />`);
})

foo.bar();

// 使用HMR
if (module.hot) {
    module.hot.accept(() => {
        console.log("hmr");
    })
}