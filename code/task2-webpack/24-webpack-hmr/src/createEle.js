import "./editor.css";

export default () => {
  // 创建div
  const editorElement = document.createElement("div");
  // div能编译
  editorElement.contentEditable = true;
  editorElement.className = "editor";
  //   editorElement.id = "editor";

  console.log("editor init completed");

  return editorElement;
};
