// ===== APPOINTMENT BOOKING =====
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

document.getElementById("appointmentForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let doctor = document.getElementById("doctor").value;
    let date = document.getElementById("date").value;

    let sameDoctor = appointments.filter(app =>
        app.doctor === doctor && app.date === date
    );

    if (sameDoctor.length >= 10) {
        alert("Slots full for this doctor on this date.");
        return;
    }

    let token = sameDoctor.length + 1;

    let newAppointment = { name, age, doctor, date, token };

    appointments.push(newAppointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment Booked! Token: " + token);

    document.getElementById("appointmentForm").reset();
});


// ===== ADMIN LOGIN =====
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").textContent = "Invalid Username or Password";
    }
}


// ===== LOAD APPOINTMENTS =====
function loadAppointments() {
    let searchValue = document.getElementById("search")?.value?.toLowerCase() || "";

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let tableBody = document.getElementById("tableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    appointments
        .filter(app => app.name.toLowerCase().includes(searchValue))
        .forEach((app, index) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${app.name}</td>
                    <td>${app.age}</td>
                    <td>${app.doctor}</td>
                    <td>${app.date}</td>
                    <td>${app.token}</td>
                    <td><button onclick="deleteAppointment(${index})">Delete</button></td>
                </tr>
            `;
        });
}


// ===== DELETE APPOINTMENT =====
function deleteAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.splice(index, 1);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadAppointments();
}


// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "admin.html";
}


// Auto-load dashboard
loadAppointments();