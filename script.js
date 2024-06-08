document.addEventListener("DOMContentLoaded", function () {
    const employeeInput = document.getElementById("employee-input");
    const addEmployeeBtn = document.getElementById("add-employee-btn");
    const draggableEmployeesContainer = document.getElementById("draggable-employees");
    const downloadBtn = document.getElementById("download-btn");

    addEmployeeBtn.addEventListener("click", function () {
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
                const confirmation = confirm("Do you really want to delete this entry?");
                if (confirmation) {
                    shift.removeChild(employeeDiv);
                }
            });

            if (shift.childElementCount < 2) { // Allow max 2 employees per shift
                shift.appendChild(employeeDiv);
            }
        });
    });

    // Add event listener to download button
    downloadBtn.addEventListener("click", function () {
        downloadCalendarImage();
    });

    function downloadCalendarImage() {
        const calendar = document.getElementById("calendar");

        html2canvas(calendar, {
            backgroundColor: null // Transparent background
        }).then(canvas => {
            // Convert canvas to image data URL
            const imageData = canvas.toDataURL("image/png");

            // Create a download link
            const a = document.createElement("a");
            a.href = imageData;
            a.download = "calendar.png";
            document.body.appendChild(a);

            // Trigger the download
            a.click();

            // Clean up
            document.body.removeChild(a);
        });
    }
});

// Set the current year in the footer
document.getElementById("current-year").textContent = new Date().getFullYear();
