const addBtn = document.getElementById("add-btn");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage when page loads
window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
};

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText === "") return alert("Please enter a task!");
  addTask(taskText);
  input.value = "";
  saveTasks();
});

function addTask(text, completed = false) {
  const li = document.createElement("li");
  const checkBox = document.createElement("div");
  checkBox.className = "check-box";
  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;
  if (completed) li.classList.add("completed");

  // Toggle completed on click
  checkBox.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.style.border = "none";
  delBtn.style.background = "transparent";
  delBtn.style.cursor = "pointer";

  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent toggle on delete
    li.remove();
    saveTasks();
  });

  li.appendChild(checkBox);
  li.appendChild(taskSpan);
  li.appendChild(delBtn);
  taskList.appendChild(li);
  saveTasks();
}

// Save tasks in localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// list.addEventListener("click", function (e) {
//   if (e.target.tagName === "LI") {
//     e.target.classList.toggle("completed");
//   } else if (e.target.classList.contains("check-box")) {
//     e.target.parentElement.classList.toggle("completed");
//   }
// });