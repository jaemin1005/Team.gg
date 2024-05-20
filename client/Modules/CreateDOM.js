export function CreateShortMenu(value){
  const rootDom = document.createElement("div");
  rootDom.classList.add("short_menu_column_child");

  const childDiv = document.createElement("div");
  childDiv.textContent = value;
  rootDom.appendChild(childDiv);

  const childImg = document.createElement("img");
  rootDom.appendChild(childImg);

  rootDom.addEventListener("focus",() => {
    rootDom.style.backgroundColor = "white";
  })

  return rootDom;
}