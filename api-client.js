// ##Request functions
async function postRequest(postData) {
  try {
    const jsObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    await fetch(apiUrl, jsObj);
  } catch {
    errorHandler("Error: Could not post todo to list");
    console.log("Error: Could not post todo to list");
  }
}

async function getRequest() {
  try {
    const jsObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    todoItems = await fetch(apiUrl, jsObj).then((response) => response.json());
    return todoItems;
  } catch {
    errorHandler("Error: Could not get list of todos");
    console.log("Error: Could not get list of todos");
  }
}

async function deleteRequest(todoId) {
  try {
    //const apiUrlDelete = apiUrl + todoId;
    const jsObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(apiUrl + todoId, jsObj);
  } catch {
    errorHandler("Error: could not delete item.");
    console.log("Error: could not delete item.");
  }
}

async function putRequest(putData, todoId) {
  try {
    const jsObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    };
    await fetch(apiUrl + todoId, jsObj);
  } catch {
    errorHandler("Error: Could not update Item.");
    console.log("Error: Could not update Item.");
  }
}
