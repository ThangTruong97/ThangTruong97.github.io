var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var d = new Date(); // return current date
var month = d.getMonth();
var year = d.getFullYear();
var currentDate = d.getDate();
//Init calendar when the page loaded
window.onload = function() {
        initYearSelect();
        //Put current month & current year to  display
        changeSelectElement(month, year);
        //Get a day 
        var firstDate = monthName[month] + " " + 1 + " " + year; // August 1 2018 (first date of the specific month & year)
        //Return a day of the first date
        var temp = new Date(firstDate).toString(); // Wed, Aug 1 2018 
        var firstDay = temp.substring(0, 3); // return Wed
        //Index of this day
        var dayNum = dayName.indexOf(firstDay); // return 3
        //Get the last day
        var days = new Date(year, month + 1, 0).getDate(); //31
        var calendar = get_calendar(dayNum, days, d.getDate());
        // display calendar
        document.getElementById("calendar-dates").appendChild(calendar);
    }
    /**
     * Change the calendar based on the values that are choosed by month select & year select
     * @param {*} monthSelect - value from month select
     * @param {*} yearSelect  - value from year select
     */
function changeSelectElement(monthSelect, yearSelect) {
    var monthSelect = document.getElementById("month-select").options.selectedIndex = month;
    var length = document.getElementById("year-select").options.length;
    var position;
    var yearSelect;
    for (var i = 0; i < length; i++) {
        var num = document.getElementById("year-select").options[i].text;
        if (parseInt(num) == year) {
            position = i;
            break;
        }
    }
    yearSelect = document.getElementById("year-select").options.selectedIndex = position;
}
/**
 * Create calendar based on the values of the first date, the last date, the current date in a month
 * @param {*} dayNum - the first date of the month
 * @param {*} days - the last date of the month
 * @param {*} currentDate - the current date of the month
 */
function get_calendar(dayNum, days, currentDate) {
    var table = document.createElement("table");
    table.setAttribute("id", "myId");
    var tr = document.createElement("tr");
    //row for the day letters
    for (var i = 0; i <= 6; i++) {
        var td = document.createElement("td");
        td.innerHTML = dayName[i];
        td.style.background = "#B7B7B7";
        td.style.color = "red";
        td.style.fontWeight = "bold";
        td.style.fontSize = "16px";
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //create second row
    tr = document.createElement("tr");
    //Create black cells before the first day of the month
    for (var i = 0; i <= 6; i++) {
        if (i == dayNum) {
            break;
        }
        var td = document.createElement("td");
        td.innerHTML = "";
        td.style.background = "black";
        tr.appendChild(td);
    }
    var count = 1;
    for (var j = dayNum; j <= 6; j++) {
        var td = document.createElement("td");
        td.innerHTML = count;
        td.onclick = function() { addRowHandlers() };
        if (td.innerHTML == currentDate) {
            td.style.background = "#00B2BF";
        }
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //The rest of the date rows
    for (var r = 3; r <= 7; r++) {
        tr = document.createElement("tr");
        for (var i = 0; i <= 6; i++) {
            if (count > days) {
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement("td");
            td.innerHTML = count;
            td.onclick = function() { addRowHandlers() };
            if (td.innerHTML == currentDate) {
                td.style.background = "#00B2BF";
            }
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

}
/**
 * load year data into year select
 */
function initYearSelect() {
    var select = document.getElementById("year-select");
    for (var i = 1900; i <= 2030; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
}
/**
 * Modify and display date
 * @param {*} monthModify - month to modify
 * @param {*} yearModify  - year to modify
 * @param {*} currentDate - current date to display in the new month & year 
 */
function modifyDate(monthModify, yearModify, currentDate) {
    //Clear the old calendar before create a new one
    var table = document.getElementById("myId");
    table.parentNode.removeChild(table);
    var firstDate = monthName[month] + " " + 1 + " " + year; // August 1 2018 (first date of the month)
    //A day of this date
    var temp = new Date(firstDate).toString(); // Wed, Aug 1 2018
    var firstDay = temp.substring(0, 3); // return Wed
    var dayNum = dayName.indexOf(firstDay); // return 3
    //Get the last day
    var days = new Date(year, month + 1, 0).getDate(); //31
    var calendar = get_calendar(dayNum, days, currentDate);
    document.getElementById("calendar-dates").appendChild(calendar);
}

function getNextMonth() {
    if (month == 11) {
        month = 0;
        year += 1;
    } else {
        month += 1;
    }
    modifyDate(month, year, d.getDate());
    changeSelectElement(month, year);
}

function getNextYear() {
    year += 1;
    modifyDate(month, year, d.getDate());
    changeSelectElement(month, year);
}

function getPrevMonth() {
    if (month == 0) {
        month = 11;
        year -= 1;
    } else {
        month -= 1;
    }
    modifyDate(month, year, d.getDate());
    changeSelectElement(month, year);
}

function getPrevYear() {
    year -= 1;
    modifyDate(month, year, d.getDate());
    changeSelectElement(month, year);
}
/**
 * Change a calendar based on the value from a month select
 */
function update_month() {
    var monthSelected = document.getElementById("month-select").value;
    var position;
    for (var i = 0; i < monthName.length; i++) {
        if (monthName[i] == monthSelected) {
            position = i;
            break;
        }
    }
    month = position;
    modifyDate(month, year, d.getDate());
}
/**
 * Change a calendar based on the value from a year select
 */
function update_year() {
    var yearSelected = document.getElementById("year-select").value;
    year = parseInt(yearSelected);
    modifyDate(month, year, d.getDate());
}
/**
 * Get a value from input text a display a calendar
 */
function getDesiredDate() {
    var text = document.getElementById("text-input").value;
    var monthText = text.substring(0, 2);
    var dayText = text.substring(3, 5);
    var yearText = text.substring(6);
    month = parseInt(monthText - 1);
    year = parseInt(yearText);
    day = parseInt(dayText);
    modifyDate(month, year, day);
    changeSelectElement(month, year);
}
/**
 * Callback function occur when a cell in a calendar is clicked 
 * @param {} currentCell - A cell is clicked
 */
function chooseDate(currentCell) {
    //Text to display in input field
    var text;
    //Store a current date
    dateOld = currentDate;
    //Store a date is clicked
    currentDate = currentCell.innerHTML;
    //Refer to table
    var tbl = document.getElementById("myId");
    if (tbl != null) {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 0; j < tbl.rows[i].cells.length; j++) {
                var test = tbl.rows[i].cells[j].innerHTML;
                //Make the cell's color of the current date to white
                if (test == dateOld) {
                    tbl.rows[i].cells[j].style.background = "#FFFFFF";
                }
            }
        }

    }
    //Make the cell's color of the clicked date to green
    currentCell.style.background = "#5BBD2B";
    var dayClick = currentCell.innerHTML;
    //Get a value from month select to display in input field
    var monthString = document.getElementById("month-select").value;
    var monthDisplay;
    for (var i = 0; i < monthName.length; i++) {
        if (monthName[i] == monthString) {
            monthDisplay = i + 1;
        }
    }
    //Get a value from year select to display in input filed
    var yearDisplay = document.getElementById("year-select").value;
    text = monthDisplay + "/" + dayClick + "/" + yearDisplay;
    document.getElementById("text-input").value = text;
}

/**
 * OnClick function of cell
 */
function addRowHandlers() {
    var tbl = document.getElementById("myId");
    if (tbl != null) {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 0; j < tbl.rows[i].cells.length; j++) {
                tbl.rows[i].cells[j].onclick = function() { chooseDate(this); };
            }
        }

    }
}