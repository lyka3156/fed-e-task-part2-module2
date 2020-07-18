import "./editor.css";

export default () => {
  // 创建div
  const editorElement = document.createElement("div");
  // div能编译
  editorElement.contentEditable = true;
  editorElement.className = "editor";
  editorElement.innerHTML = "devServer自动刷新导致的页面状态丢失";
  //   editorElement.id = "editor";

  console.log("editor init completed");

  return editorElement;
};
