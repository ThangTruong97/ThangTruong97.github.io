var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var d = new Date(); // return current date
var month = d.getMonth();
var year = d.getFullYear();
var current_date = d.getDate();
var dateOld;
/**
 * Display a calendar when click in it (hidden in default)
 */
function click_input() {
    document.getElementById("calendar-tools").style.visibility = "visible";
    changeSelectElement(month, year);
    modifyDate(month, year, d.getDate());
}
/**
 * Change the calendar based on the values that are choosed by month select & year select
 * @param {*} month_select - value from month select
 * @param {*} year_select - value from year select
 */
function changeSelectElement(month_select, year_select) {
    var month_select = document.getElementById("month-select").options.selectedIndex = month;
    var length = document.getElementById("year-select").options.length;
    var position;
    var year_select;
    for (var i = 0; i < length; i++) {
        var num = document.getElementById("year-select").options[i].text;
        if (parseInt(num) == year) {
            position = i;
            break;
        }
    }
    year_select = document.getElementById("year-select").options.selectedIndex = position;
}

function get_calendar(day_num, days, current_date) {
    var table = document.createElement("table");
    table.setAttribute("id", "myId");
    var tr = document.createElement("tr");
    //row for the day letters
    for (var i = 0; i <= 6; i++) {
        var td = document.createElement("td");
        td.innerHTML = day_name[i];
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
        if (i == day_num) {
            break;
        }
        var td = document.createElement("td");
        td.innerHTML = "";
        td.style.background = "black";
        tr.appendChild(td);
    }
    var count = 1;
    for (var j = day_num; j <= 6; j++) {
        var td = document.createElement("td");
        td.innerHTML = count;
        td.onclick = function() { addRowHandlers() };
        if (td.innerHTML == current_date) {
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
            if (td.innerHTML == current_date) {
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
 * @param {*} month_modify - month to modify
 * @param {*} year_modify - year to modify
 * @param {*} current_date - current date to display in the new month & year
 */
function modifyDate(month_modify, year_modify, current_date) {
    //Clear the old calendar before create a new one
    var table = document.getElementById("myId");
    table.parentNode.removeChild(table);
    var first_date = month_name[month] + " " + 1 + " " + year; // August 1 2018 (first date of the month)
    //A day of this date
    var temp = new Date(first_date).toString(); // Wed, Aug 1 2018
    var first_day = temp.substring(0, 3); // return Wed
    var day_num = day_name.indexOf(first_day); // return 3
    //Get the last day
    var days = new Date(year, month + 1, 0).getDate(); //31
    var calendar = get_calendar(day_num, days, current_date);
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
 *  Change a calendar based on the value from a month select
 */
function update_month() {
    var month_selected = document.getElementById("month-select").value;
    var position;
    for (var i = 0; i < month_name.length; i++) {
        if (month_name[i] == month_selected) {
            position = i;
            break;
        }
    }
    month = position;
    modifyDate(month, year, d.getDate());
}
/**
 *  Change a calendar based on the value from a year select
 */
function update_year() {
    var year_selected = document.getElementById("year-select").value;
    year = parseInt(year_selected);
    modifyDate(month, year, d.getDate());
}
/**
 *  Get a value from input text a display a calendar
 */
function getDesiredDate() {
    var text = document.getElementById("birthday-input").value;
    var month_text = text.substring(0, 2);
    var day_text = text.substring(3, 5);
    var year_text = text.substring(6);
    month = parseInt(month_text - 1);
    year = parseInt(year_text);
    day = parseInt(day_text);
    modifyDate(month, year, day);
    changeSelectElement(month, year);
}
/**
 * Callback function occur when a cell in a calendar is clicked 
 * @param {*} currentCell - A cell is clicked
 */
function chooseDate(currentCell) {
    //Text to display in input field
    var text;
    //Store a current date
    dateOld = current_date;
    //Store a date is clicked
    current_date = currentCell.innerHTML;
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
    for (var i = 0; i < month_name.length; i++) {
        if (month_name[i] == monthString) {
            monthDisplay = i + 1;
        }
    }
    //Get a value from year select to display in input filed
    var yearDisplay = document.getElementById("year-select").value;
    text = monthDisplay + "/" + dayClick + "/" + yearDisplay;
    document.getElementById("birthday-input").value = text;
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