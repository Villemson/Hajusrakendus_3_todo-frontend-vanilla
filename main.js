var tasks = [];

let lastTaskId = 0;
let taskList;
let addTask;

// laeme taskid
window.addEventListener("load", async () => {
  taskList = document.querySelector("#task-list");
  addTask = document.querySelector("#add-task");
 
  await loadInExistingTasks();

  tasks.forEach(renderTask);

  // kui nuppu vajutatakse siis lisatakse uus task
  addTask.addEventListener("click", async () => {
    const task = await createTask(); // Teeme k�igepealt lokaalsesse "andmebaasi" uue taski
    const taskRow = createTaskRow(task); // Teeme uue taski HTML elementi mille saaks lehe peale listi lisada
    taskList.appendChild(taskRow); // Lisame taski lehele
  });
});

/* J�rgmise reaga vaadata hetkel olemasolevat tokenit, kui pole sisse logitud siis null, kui oled sisse logitud siis kuvab token konsooli*/
console.log(localStorage.getItem("token"));

async function loadInExistingTasks() {
  await sendAPIRequest("read", "tasks", null, null, null, true).then(
    (result) => {
      for (let i = 0; i < result.length; i++) {
        const task = {
          id: result[i].id,
          name: result[i].title,
          completed: result[i].marked_as_done,
        };
        tasks.push(task);
      }
    }
  );
}

function renderTask(task) {
  const taskRow = createTaskRow(task);
  taskList.appendChild(taskRow);
}

function createTask() {
  lastTaskId++;
  const task = {
    // id: lastTaskId,
    name: "Task " + lastTaskId,
    completed: false,
  };
  sendAPIRequest("create", "tasks", null, task.name);
  return task;
}


function sendAPIRequest(
  operation,
  requestPath,
  taskId,
  taskTitle,
  taskIsCompleted,
  returnFetchResponseResult
) {
  let URL = `https://demo2.z-bit.ee`;

  if (requestPath != null && taskId != null) {
    URL = [URL, requestPath, taskId].join("/");
    console.log(URL);
  } else if (requestPath != null && taskId == null) {
    URL = [URL, requestPath].join("/");
    console.log(URL);
  }

  const result = fetch(
    URL,
    createRequestOptions(operation, taskTitle, taskIsCompleted)
  )
    .then((response) => response.json())
    // .then(result => console.log(result))
    .catch((error) => console.log("error", error));

  if (returnFetchResponseResult) {
    return result;
  }
}

//funktsioon voimaldab seada API call vajalikud headerid

function createRequestOptions(operation, title, isCompleted) {
  var myHeaders = new Headers();

  //Sea autoriseerimise token
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  console.log(`Bearer ${localStorage.getItem("token")}`);

  switch (operation) {
    case "create":
      //postAddTask
      myHeaders.append("Content-Type", "application/json");

      var callBody = JSON.stringify({
        title: title,
        desc: "",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: callBody,
        redirect: "follow", //constant (for this app)
      };

      return requestOptions;
    case "read":
      //requestExisiting

      var callBody;

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: callBody,
        redirect: "follow", //constant (for this app)
      };

      return requestOptions;
    case "update":
      //putTask
      myHeaders.append("Content-Type", "application/json");

      var callBody = JSON.stringify({
        title: title,
        marked_as_done: isCompleted,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: callBody,
        redirect: "follow",
      };

      return requestOptions;
    case "delete":
      //sendDelete

      var raw;

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      return requestOptions;
    default:
      console.log("ERROR! No matching headers to set found!");
      break;
  }
}

function createTaskRow(task) {
  let taskRow = document
    .querySelector('[data-template="task-row"]')
    .cloneNode(true);
  taskRow.removeAttribute("data-template");

  // T�idame vormi v�ljad andmetega
  const name = taskRow.querySelector("[name='name']");
  // name.innerText = task.name;
  name.value = task.name;
  name.addEventListener("blur", () => {
    // console.log('input clicked')
    let clickAway;
    //     console.log('clicked away from task input');
    sendAPIRequest("update", "tasks", task.id, name.value);
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Button, mis avab/sulgeb vormi
    const createUserButton = document.getElementById("create-user");

    // Vormi konteiner
    const formContainer = document.getElementById("create-user-form-container");

    // Vorm ise
    const form = document.getElementById("create-user-form");

    // Nupu vajutamisel näita/peida vorm
    createUserButton.addEventListener("click", function () {
      if (formContainer.style.display === "none") {
        formContainer.style.display = "block";
      } else {
        formContainer.style.display = "none";
      }
    });

    // Vormi esitamisel saada andmed ja peida vorm
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Vältida lehe laadimist uuesti

      const newUser = {
        username: document.getElementById("new-username").value,
        firstname: document.getElementById("new-firstname").value,
        lastname: document.getElementById("new-lastname").value,
        newPassword: document.getElementById("new-password").value,
      };

      fetch("https://demo2.z-bit.ee/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Uus kasutaja loodud:", data);

          // Peida vorm
          formContainer.style.display = "none";
        })
        .catch((error) => console.error("Viga kasutaja loomisel:", error));
    });
  });

  async function createUser(username, firstName, lastName, newPassword) {
    const response = await fetch("https://demo2.z-bit.ee/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kasutajanimi: username,
        eesnimi: firstName,
        perekonnanimi: lastName,
        newPassword: newPassword,
      }),
    });

    return response.json();
  }

  const checkbox = taskRow.querySelector("[name='completed']");
  checkbox.checked = task.completed;
  checkbox.addEventListener("click", () => {
    //!bool to reverse boolean's current value, whatever it may be
    sendAPIRequest("update", "tasks", task.id, name.value, !task.completed);
  });

  const deleteButton = taskRow.querySelector(".delete-task");
  deleteButton.addEventListener("click", async () => {
    taskList.removeChild(taskRow);
    tasks.splice(tasks.indexOf(task), 1);
    await sendAPIRequest("delete", "tasks", task.id);
  });

  // Valmistame checkboxi ette vajutamiseks
  hydrateAntCheckboxes(taskRow);

  return taskRow;
}

function createAntCheckbox() {
  const checkbox = document
    .querySelector('[data-template="ant-checkbox"]')
    .cloneNode(true);
  checkbox.removeAttribute("data-template");
  hydrateAntCheckboxes(checkbox);
  return checkbox;
}

/**
 * See funktsioon aitab lisada eridisainiga checkboxile vajalikud event listenerid
 * @param {HTMLElement} element Checkboxi wrapper element v�i konteiner element mis sisaldab mitut checkboxi
 */
function hydrateAntCheckboxes(element) {
  const elements = element.querySelectorAll(".ant-checkbox-wrapper");
  for (let i = 0; i < elements.length; i++) {
    let wrapper = elements[i];

    // Kui element on juba t��deldud siis j�ta vahele
    if (wrapper.__hydrated) continue;
    wrapper.__hydrated = true;

    const checkbox = wrapper.querySelector(".ant-checkbox");

    // Kontrollime kas checkbox peaks juba olema checked, see on ainult erikujundusega checkboxi jaoks
    const input = wrapper.querySelector(".ant-checkbox-input");
    if (input.checked) {
      checkbox.classList.add("ant-checkbox-checked");
    }

    // Kui checkboxi v�i label'i peale vajutatakse siis muudetakse checkboxi olekut
    wrapper.addEventListener("click", () => {
      input.checked = !input.checked;
      checkbox.classList.toggle("ant-checkbox-checked");
    });
  }
}