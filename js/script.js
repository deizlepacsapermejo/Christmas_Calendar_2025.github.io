document.addEventListener('DOMContentLoaded', () => {
    const yearView = document.getElementById('yearView');
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); // 0-11
    const currentYear = today.getFullYear();

    // Months of the year
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Main function to generate the entire 2025 calendar
    function generateCalendar(year) {
        // Loop through all 12 months
        for (let month = 0; month < 12; month++) {
            const monthCard = document.createElement('div');
            monthCard.classList.add('month-card');
            
            // Month Title
            const title = document.createElement('div');
            title.classList.add('month-title');
            title.textContent = `${monthNames[month]} ${year}`;
            monthCard.appendChild(title);

            // Calendar Grid for the month
            const monthGrid = document.createElement('div');
            monthGrid.classList.add('month-grid');

            // 1. Determine the first day of the month (0=Sun, 6=Sat)
            const firstDayOfMonth = new Date(year, month, 1).getDay();

            // 2. Get the number of days in the month
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // 3. Add empty cells for the previous month's days
            // The grid starts on Sunday, so if Jan 1 is Wednesday (3), we need 3 empty cells.
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

                // Highlight the current day (only if it's the correct year and month)
                if (day === currentDay && month === currentMonth && year === currentYear) {
                    dayCell.classList.add('current-day');
                }
                
                monthGrid.appendChild(dayCell);
            }
            
            monthCard.appendChild(monthGrid);
            yearView.appendChild(monthCard);
        }
    }

    // Run the generator for the year 2025
    generateCalendar(2025);
});
