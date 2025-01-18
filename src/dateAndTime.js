
// script.js
function updateTimeAndDate() {
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");

    const now = new Date();

    // Get the day name (Sunday, Monday, etc.)
    const dayName = now.toLocaleDateString("en-US", { weekday: 'long' });

    // Format date as YYYY-MM-DD
    const date = now.toLocaleDateString("en-CA");

    // Format time as HH:MM:SS
    const time = now.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    // Display the day name and date
    dateElement.textContent=`${date}`;
    dateElement.textContent = `${dayName}`;
    timeElement.textContent = time;
}

// Update every second
setInterval(updateTimeAndDate, 1000);

// Initialize immediately
updateTimeAndDate();
