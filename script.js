const apiUrl = "http://localhost:3000/";
const todoList = document.getElementById("todoList");
const addButton = document.getElementById("addButton");
displayTodoItems();

//###################################################
//## Eventlisteners
addButton.addEventListener("click", function (e) {
  target = e.target;
  addTodo();
});

todoList.addEventListener("click", function (e) {
  target = e.target;
  targetId = target.parentElement.id;
  if (target.matches("input")) {
    keyEventExecuted = false;
    oldValue = target.value;
    target.addEventListener("blur", function () {
      if (keyEventExecuted !== true) {
        checkDifferenceAndEdit(target, targetId);
      } else {
        return;
      }
    });
  } else if (target.matches("i")) {
    deleteItem(targetId);
  }
});
window.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    target = e.target;
    if (target.parentElement.classList.contains(`containerAddTodo`)) {
      addTodo();
    } else if (target.parentElement.classList.contains(`todoItem`)) {
      checkDifferenceAndEdit(target, targetId);
      keyEventExecuted = true;
    }
  }
});

//####################################################
// ##Support functions
async function displayTodoItems() {
  await getRequest();
  clearList();
  const arrayLength = todoItems.length;
  for (let i = 0; i < arrayLength; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("todoItem");
    newDiv.setAttribute("id", todoItems[i]._id);
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("Value", `${todoItems[i].description}`);
    const newi = document.createElement("i");
    newi.classList.add("fa-solid");
    newi.classList.add("fa-trash-can");
    todoList.appendChild(newDiv);
    newDiv.appendChild(newInput);
    newDiv.appendChild(newi);
  }
}

const clearList = function () {
  let domItems = todoList.children;
  const arrayLength = domItems.length;
  for (let i = 0; i < arrayLength; i++) {
    todoList.removeChild(domItems[0]);
  }
};

async function addTodo() {
  const inputTag = document.getElementById(`todoInput`);
  if (inputTag.value !== "") {
    preShowInDom();
    const data = { description: inputTag.value, done: false };
    await postRequest(data);
    displayTodoItems();
    inputTag.value = "";
    /* setTimeout(() => {
      postRequest(data);
      displayTodoItems();
      inputTag.value = "";
    }, 2000); */
  } else {
    errorHandler("Please enter a Todo before adding it to the list!");
  }
}

const errorHandler = (error) => {
  const errorSection = document.getElementById("errorSection");
  const newP = document.createElement("p");
  newP.textContent = error;
  newP.classList.add("alert");
  errorSection.appendChild(newP);
  setTimeout(() => {
    errorSection.removeChild(newP);
  }, 5000);
};

const checkDifferenceAndEdit = function (target, targetId) {
  const newvalue = target.value;
  if (newvalue !== oldValue) {
    putRequest({ description: newvalue }, targetId);
    displayTodoItems();
    target.removeEventListener("blur", function () {
      checkDifferenceAndEdit(target, targetId);
    });
  }
};

async function deleteItem(targetId) {
  const deletedItem = document.getElementById(targetId);
  todoList.removeChild(deletedItem);
  await deleteRequest(targetId);
  displayTodoItems();
}

const preShowInDom = function () {
  const newDiv = document.createElement("div");
  newDiv.classList.add("todoItem");
  const newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("Value", target.value);
  todoList.appendChild(newDiv);
  newDiv.appendChild(newInput);
};
