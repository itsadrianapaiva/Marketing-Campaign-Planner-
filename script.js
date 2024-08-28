const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const campaignInput = document.getElementById("campaign-input");
const objectiveInput = document.getElementById("objective-input");
const targetInput = document.getElementById("target-input");
const dateInput = document.getElementById("date-input");
const budgetInput = document.getElementById("budget-input");
const channelsInput = document.getElementById("channels-input");
const kpisInput = document.getElementById("kpis-input");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${campaignInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    campaign: campaignInput.value,
    objective: objectiveInput.value,
    target: targetInput.value,
    date: dateInput.value,
    budget: budgetInput.value,
    channels: channelsInput.value,
    kpis: kpisInput.value,
  };

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset()
};

const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";
  
    taskData.forEach(
      ({ id, campaign, objective, target, date, budget, channels, kpis }) => {
          tasksContainer.innerHTML += `
          <div class="task" id="${id}">
            <p><strong>Title:</strong> ${campaign}</p>
            <p><strong>Objective:</strong> ${objective}</p>
            <p><strong>Target:</strong> ${target}</p>
            <p><strong>Date: </strong> ${date}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Channels:</strong> ${channels}</p>
            <p><strong>KPI's:</strong> ${kpis}</p>
            <div class="btn-container">
            <button onclick="editTask(this)" type="button" class="edit-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="=18px" height="20px" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </button>
            <button onclick="deleteTask(this)" type="button" class="delete-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="=18px" height="20px" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
              </svg>
            </button> 
            </div>
          </div>
        `;
      }
    );
  };
  
  const deleteTask = (buttonEl) => {
    const taskElement = buttonEl.closest('.task'); // Assuming .task is the class of the task container
    const dataArrIndex = taskData.findIndex(
      (item) => item.id === taskElement.id
    );
  
    taskElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData));
  }
  
  const editTask = (buttonEl) => {
    const taskElement = buttonEl.closest('.task'); // Assuming .task is the class of the task container
    const dataArrIndex = taskData.findIndex(
      (item) => item.id === taskElement.id
    );
  
    currentTask = taskData[dataArrIndex];
  
    campaignInput.value = currentTask.campaign;
    objectiveInput.value = currentTask.objective;
    targetInput.value = currentTask.target;
    dateInput.value = currentTask.date;
    budgetInput.value = currentTask.budget;
    channelsInput.value = currentTask.channels;
    kpisInput.value = currentTask.kpis;
  
    taskForm.classList.toggle("hidden");
  }
  

const reset = () => {
  campaignInput.value = "";
  objectiveInput.value = "";
  targetInput.value = "";
  dateInput.value = "";
  budgetInput.value = "";
  channelsInput.value = "";
  kpisInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

if (taskData.length) {
  updateTaskContainer();
}

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = campaignInput.value || objectiveInput.value || targetInput.value || dateInput.value || budgetInput.value || channelsInput.value || kpisInput.value;
  const formInputValuesUpdated = campaignInput.value !== currentTask.campaign || objectiveInput.value !== currentTask.objective || targetInput.value !== currentTask.target || dateInput.value !== currentTask.date || budgetInput.value !== currentTask.budget || channelsInput.value !== currentTask.channels || kpisInput.value !== currentTask.kpis;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask();
});

