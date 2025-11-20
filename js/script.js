document.addEventListener('DOMContentLoaded', () => {
    const monthGrid = document.getElementById('monthGrid');
    const monthTitleDisplay = document.getElementById('monthTitle');
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');

    // State: Start view on the current date, but force 2025
    let currentDate = new Date(2025, new Date().getMonth(), 1); 

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Note: The current date is Nov 20, 2025, so the calendar starts on Nov 2025.
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
        
        // Update the title display
        monthTitleDisplay.textContent = `${monthNames[month]} ${year}`;

        // 1. Determine the first day of the month (0=Sun, 6=Sat)
        const firstDayOfMonth = new Date(year, month, 1).getDay();

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
        currentDate.setMonth(currentDate.getMonth() - 1, 1); 
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1, 1);
        renderCalendar();
    });

    // Initial render
    renderCalendar();
});
