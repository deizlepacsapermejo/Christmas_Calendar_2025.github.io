document.addEventListener('DOMContentLoaded', () => {
    const monthGrid = document.getElementById('monthGrid');
    const monthTitleDisplay = document.getElementById('monthTitle');
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');

    // State: Start view on JANUARY 2025 (month index 0)
    let currentDate = new Date(2025, 0, 1); 

    const TARGET_YEAR = 2025;

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Current real-world date context (for highlighting today's date, Nov 20, 2025)
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();


    // --- Core function to draw the calendar for the currently set month ---
    function renderCalendar() {
        // Clear previous days
        monthGrid.innerHTML = ''; 

        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        // Update the title display: Use 'Christmas Countdown!' for December 2025
        if (month === 11 && year === TARGET_YEAR) {
            monthTitleDisplay.textContent = 'Christmas 2025 Countdown!';
        } else {
            // For all other months, show the Month Name and Year
            monthTitleDisplay.textContent = `${monthNames[month]} ${year}`;
        }

        // Enable/disable navigation buttons based on the current year constraint
        prevButton.disabled = (month === 0 && year === TARGET_YEAR);
        nextButton.disabled = (month === 11 && year === TARGET_YEAR);
        
        // --- Day Label Mapping (Monday Start) ---
        // 1. Determine the first day of the month (0=Sun, 6=Sat)
        let firstDayOfMonth = new Date(year, month, 1).getDay();

        // Adjust for Monday start:
        // If it's Sunday (0), map to index 6 (the last column). 
        // Otherwise (Mon-Sat), subtract 1 (Mon (1) becomes index 0).
        if (firstDayOfMonth === 0) {
            firstDayOfMonth = 6; 
        } else {
            firstDayOfMonth = firstDayOfMonth - 1; 
        }

        // 2. Get the number of days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // 3. Add empty cells (padding)
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day-cell', 'empty');
            monthGrid.appendChild(emptyCell);
        }

        // 4. Add cells for the actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');
            dayCell.textContent = day;

            // Highlight the *real* current day if it matches the displayed month/year
            if (day === currentDay && month === currentMonth && year === currentYear) {
                dayCell.classList.add('current-day');
            }
            
            monthGrid.appendChild(dayCell);
        }
    }

    // --- Navigation Handlers ---

    prevButton.addEventListener('click', () => {
        // Prevent navigation before January 2025
        if (currentDate.getMonth() > 0 || currentDate.getFullYear() > TARGET_YEAR) {
            currentDate.setMonth(currentDate.getMonth() - 1, 1); 
            renderCalendar();
        }
    });

    nextButton.addEventListener('click', () => {
        // Prevent navigation after December 2025
        if (currentDate.getMonth() < 11 || currentDate.getFullYear() < TARGET_YEAR) {
            currentDate.setMonth(currentDate.getMonth() + 1, 1);
            renderCalendar();
        }
    });

    // Initial render: Starts on January 2025
    renderCalendar();
});
