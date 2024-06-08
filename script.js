document.addEventListener("DOMContentLoaded", function() {
  const employeeInput = document.getElementById("employee-input");
  const addEmployeeBtn = document.getElementById("add-employee-btn");
  const draggableEmployeesContainer = document.getElementById("draggable-employees");

  addEmployeeBtn.addEventListener("click", function() {
    const employeeName = employeeInput.value.trim();
    if (employeeName !== "") {
      const draggableEmployee = document.createElement("div");
      draggableEmployee.classList.add("draggable");
      draggableEmployee.setAttribute("draggable", "true");
      draggableEmployee.textContent = employeeName;
      draggableEmployeesContainer.appendChild(draggableEmployee);
      employeeInput.value = ""; // Clear input field after adding employee
      addDragEvents(draggableEmployee); // Add drag events to the new employee
    }
  });

  function addDragEvents(draggable) {
    draggable.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", draggable.textContent);
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  }

  // Attach drag events to all existing draggables (if any)
  document.querySelectorAll(".draggable").forEach(addDragEvents);

  const shifts = document.querySelectorAll(".shift");
  shifts.forEach(shift => {
    shift.addEventListener("dragover", e => {
      e.preventDefault();
    });
    shift.addEventListener("drop", e => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain");
      const employeeDiv = document.createElement("div");
      employeeDiv.classList.add("employee-name");
      employeeDiv.textContent = data;

      employeeDiv.addEventListener("click", () => {
        shift.removeChild(employeeDiv);
      });

      if (shift.childElementCount < 2) { // Allow max 2 employees per shift
        shift.appendChild(employeeDiv);
      }
    });
  });
});
