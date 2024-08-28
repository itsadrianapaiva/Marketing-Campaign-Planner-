# 📊 Marketing Campaign Planner

**Marketing Campaign Planner** is a simple web application that I developed thinking about my prior experience in marketing and how managing campaings can be time consuming and prone to error. 
This app allows users to create, edit, and manage marketing campaigns. Built using HTML, CSS, and JavaScript, this project focuses on functionality and simplicity, enabling users to store campaign data locally in their browser.

## 📑 Features

- **Create Campaigns:** Add new marketing campaigns with details such as campaign name, objectives, target audience, date, budget, channels, and key performance indicators (KPIs).
- **Edit Campaigns:** Easily update campaign details with inline editing functionality.
- **Delete Campaigns:** Remove outdated or incorrect campaigns from the list.
- **Local Storage:** Campaign data is saved in the browser’s `localStorage` to persist across page reloads.

---

## 🛠️ How It Works

The application leverages vanilla HTML, CSS, and JavaScript for creating, reading, updating, and deleting (CRUD) marketing campaigns.

### 1. **HTML Structure**

Key elements of the app's structure:

```html
<!-- Task Form for Adding or Editing Campaigns -->
<form id="task-form">
  <input type="text" id="campaign-input" placeholder="Campaign Name" required>
  <input type="text" id="objective-input" placeholder="Objective" required>
  <input type="text" id="target-input" placeholder="Target Audience" required>
  <input type="date" id="date-input" placeholder="Date" required>
  <input type="number" id="budget-input" placeholder="Budget" required>
  <input type="text" id="channels-input" placeholder="Marketing Channels" required>
  <input type="text" id="kpis-input" placeholder="KPIs" required>
  <button type="submit" id="add-or-update-task-btn">Add/Update Campaign</button>
</form>

<!-- Task List Display -->
<div id="tasks-container"></div>
```

### 2. **CSS Styling**

Basic styling of the campaign planner is handled through a `style.css` file. Here’s an example of how the form and campaign cards are styled:

```css
#task-form {
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  margin-bottom: 20px;
}

.task {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
}

.hidden {
  display: none;
}
```

### 3. **JavaScript for Functionality**

The JavaScript handles the app's main functionality such as adding, updating, and deleting tasks. The tasks are stored in `localStorage` so that users can revisit their campaigns without losing data. Here's an overview of the main functions:

- **Add/Update Campaign:** Users can add new campaigns or update existing ones. Campaigns are identified using a unique `id`.

```javascript
const addOrUpdateTask = () => {
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

  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer();
  reset();
};
```

- **Display Campaigns:** Campaigns are displayed in the form of cards in the `#tasks-container`. The `updateTaskContainer` function dynamically updates the DOM to reflect the latest campaign data.

```javascript
const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";
  taskData.forEach(({ id, campaign, objective, target, date, budget, channels, kpis }) => {
    tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <p><strong>Title:</strong> ${campaign}</p>
        <p><strong>Objective:</strong> ${objective}</p>
        <p><strong>Target:</strong> ${target}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Channels:</strong> ${channels}</p>
        <p><strong>KPI's:</strong> ${kpis}</p>
        <button onclick="editTask(this)" class="edit-btn">Edit</button>
        <button onclick="deleteTask(this)" class="delete-btn">Delete</button>
      </div>
    `;
  });
};
```

- **Delete Campaign:** Users can delete any campaign they no longer need. Once deleted, the task is removed from both the DOM and localStorage.

```javascript
const deleteTask = (buttonEl) => {
  const taskElement = buttonEl.closest('.task');
  const dataArrIndex = taskData.findIndex((item) => item.id === taskElement.id);
  
  taskElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
};
```

---

## 🚀 Usage

### Clone the Repository

To use the Marketing Campaign Planner locally, you need to clone the repository:

```bash
git clone https://github.com/your-username/marketing-campaign-planner.git
cd marketing-campaign-planner
```

### Open the App

After cloning, simply open the `index.html` file in any browser to get started with creating and managing campaigns.

```bash
open index.html
```

### Run in Browser

Once the app is loaded in your browser, you can:

1. **Add a New Campaign:** Fill in the campaign details and hit the **Add/Update Campaign** button.
2. **Edit a Campaign:** Click the **Edit** button next to any campaign to modify its details.
3. **Delete a Campaign:** Remove a campaign by hitting the **Delete** button.

---

## 🧑‍💻 Development Setup

If you want to make changes or extend the functionality:

1. **Clone the Repo:**
   ```bash
   git clone https://github.com/your-username/marketing-campaign-planner.git
   ```

2. **Modify the HTML/CSS/JS Files:**
   Make any necessary changes in `index.html`, `style.css`, or `script.js`.

3. **Push to GitHub:**
   After making your changes, push them to GitHub:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

---

## 🐛 Known Issues & Future Improvements

1. **UI Enhancements:** 
- The current interface can be improved for a more polished user experience.
- Calendar Feature: Currently, I'm working on a calendar that can be toggled to view scheduled campaign tasks. An improvement in progress is to highlight the days that have scheduled campaigns on the calendar, providing an intuitive visual overview of campaign timelines.
- Campaign Summary View: I am working on a more concise UI for the task list, where only the campaign name and date are displayed. Clicking on a campaign will expand the view to show the full details such as objectives, budget, channels, and KPIs. This will improve readability and make it easier to manage larger lists of campaigns.

2. **Task Validation:** Implement form validation to ensure that all fields are filled in correctly.
3. **Multi-user Support:** This project only supports local data storage per user. Adding a backend to store tasks remotely would enable multi-user functionality.

---

## 🤝 Contributing

Feel free to submit pull requests and raise issues. Contributions are welcome!

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push your branch and submit a pull request.

---

## 📝 Acknowledgments

- Icons from [Hero Icons](https://heroicons.com/).
- Local Storage guide: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
