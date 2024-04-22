import * as app from "../app.mjs";

class SetClassList {
  constructor() {}

  addClassList(pTag) {
    return pTag.classList.add(`.test`);
  }

  removeClassList(pTag) {
    return pTag.classList.remove(`.test`);
  }
}

export const funcForSetClass = (pTag) => {
  const setClassList = new SetClassList();

  if (pTag.classList.contains(`.test`)) {
    setClassList.addClassList(pTag);
  } else if (!pTag.classList.contains(`.test`)) {
    setClassList.removeClassList(pTag);
  } else {
  }
};
