document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');
    const messageDisplay = document.getElementById('message');
    const totalDoors = 25; // Advent Calendar goes up to Christmas Day

    // --- Create all 25 doors ---
    for (let day = 1; day <= totalDoors; day++) {
        const door = document.createElement('div');
        door.classList.add('door');
        door.setAttribute('data-day', day);
        door.innerHTML = `<span class="door-number">${day}</span>`;
        calendarGrid.appendChild(door);
    }

    const doors = document.querySelectorAll('.door');
    const today = new Date();
    // In a real 2025 calendar, the first door to open is Dec 1st.
    // We use the current date to determine which doors are 'openable'.
    const currentDayOfMonth = today.getDate();
    const currentMonth = today.getMonth(); // 0 = Jan, 11 = Dec

    // --- Check the date and set door states ---
    doors.forEach(door => {
        const day = parseInt(door.getAttribute('data-day'));

        // Check if it's December (month 11)
        if (currentMonth === 11) {
            if (day <= currentDayOfMonth) {
                // Door can be opened (or is already open)
                door.classList.add('opened');
                door.innerHTML += `<span class="door-content">HOORAY!</span>`; // Content for opened door
            } else {
                // Door is for a future day
                door.classList.add('future');
            }
        } else if (currentMonth > 11 || (currentMonth === 0 && today.getFullYear() > 2025)) {
             // After Christmas 2025, all doors are open
            door.classList.add('opened');
            door.innerHTML += `<span class="door-content">Merry Christmas!</span>`;
        } else {
            // Before December 2025, all doors are future doors
            door.classList.add('future');
        }

        // --- Add click event listener ---
        door.addEventListener('click', () => {
            if (door.classList.contains('opened')) {
                messageDisplay.textContent = `Door ${day} is already open!`;
            } else if (door.classList.contains('future')) {
                messageDisplay.textContent = `Patience! Door ${day} opens on Dec ${day}.`;
            }
        });
    });

    // --- Initial message based on date ---
    if (currentMonth === 11 && currentDayOfMonth >= 1 && currentDayOfMonth <= 25) {
        messageDisplay.textContent = `It's Dec ${currentDayOfMonth}! ${25 - currentDayOfMonth} days until Christmas!`;
    } else if (currentMonth === 11 && currentDayOfMonth > 25) {
        messageDisplay.textContent = `Hope you had a Merry Christmas!`;
    } else {
        messageDisplay.textContent = `The countdown begins in December 2025!`;
    }
});