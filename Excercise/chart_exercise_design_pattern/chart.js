var canvas;
var context;
var canvas2;
var context2;

var circleChart = (function() {
    var xScale = 1;
    var yScale = 0.5;
    var centerX = 200;
    var centerY = 200;
    var i;
    var data = [0.8, 0.2];
    var validDataChart1 = true;
    if (data[0] < 0 || data[0] > 1) {
        alert("Error in chart 1: Illegal success input");
        validDataChart1 = false;
    }
    if (data[1] < 0 || data[1] > 1) {
        alert("Error in chart 1: Illegal fail input");
        validDataChart1 = false;
    }
    if (data[0] + data[1] > 1 || data[0] + data[1] < 0) {
        alert("Error in chart 1: Success + Fail !=100%");
        validDataChart1 = false;
    }
    /**
     * Draw circle chart
     */
    function draw() {
        for (i = 50; i > 0; i--) {
            drawSuccess();
            drawFail();
            drawText();
        }
    }
    /**
     * Draw success part (a blue part)
     */
    function drawSuccess() {
        context.save();
        context.scale(xScale, yScale);
        context.beginPath();
        context.arc(centerX, centerY + i, 100, 0, 2 * Math.PI * data[0]);
        context.lineTo(centerX, centerY + i);
        context.restore();
        if (i == 1) {
            context.fillStyle = "#009ED5";
        } else {
            context.fillStyle = "#456AA4"
        }
        context.fill();
    }
    /**
     * Draw fail part (a red part)
     */
    function drawFail() {
        context.save();
        context.scale(xScale, yScale);
        context.beginPath();
        context.arc(centerX + 5, centerY - 5 + i, 100, (2 * Math.PI * data[0]) + 0.01, -0.01);
        context.lineTo(centerX + 7, centerY - 7 + i);
        context.restore();
        if (i == 1) {
            context.fillStyle = "#E4322B";
        } else {
            context.fillStyle = "#FFB2B2";
        }
        context.fill();
    }
    /**
     * Draw line indicate to specific part
     * @param {*} firstX - the horizontal position of starting point
     * @param {*} firstY - the vertical position of starting point
     * @param {*} secondX - the horizontal position of ending point
     * @param {*} secondY - the vertical position of ending point
     * @param {*} width - the width of the line
     * @param {*} color - the color of the line
     */
    function drawLine(firstX, firstY, secondX, secondY, width, color) {
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.beginPath();
        context.fillStyle = color;
        context.moveTo(firstX, firstY);
        context.lineTo(firstX + width, firstY);
        context.lineTo(secondX, secondY);
        context.stroke();
    }
    /**
     * Draw line and fill entire text of the chart
     */
    function drawText() {
        //draw line 
        var lableSpace1 = 0;
        var lableSpace2 = 0;
        var lableX1 = 0;
        var lableX2 = 0;
        var lableY1 = 0;
        var lableY2 = 0;
        radian = 1 - data[0];
        lableSpace1 = (100 * 2 / 3) * xScale * Math.cos(2 * Math.PI * radian);
        lableSpace2 = (100 * 2 / 3) * yScale * Math.sin(2 * Math.PI * radian);
        lableX1 = (centerX + 18) * xScale + lableSpace1;
        lableY1 = (centerY - 2) * yScale - lableSpace2;
        lableX2 = 2 * centerX * xScale - lableX1;
        lableY2 = 2 * centerY * yScale - lableY1;
        if (data[0] >= 0.5) {
            drawLine(20, 50, lableX2, lableY2, 70, "#456AA4");
            drawLine(400, 30, lableX1, lableY1, -70, "#E4322B");
        } else {
            drawLine(20, 50, lableX1, lableY1, 70, "#456AA4");
            drawLine(400, 30, lableX2, lableY2, -70, "#E4322B");
        }
        //fill text
        context.fillStyle = "#A29FA1";
        context.fillText(data[0] * 100 + "% ĐÃ ĐẠT", 20, 45);
        context.fillText(data[1] * 100 + "% CHƯA ĐẠT", 330, 25);
        context.fillStyle = "#88D0DA";
        context.fillText("BIỂU ĐỒ TỔNG QUAN KHUNG NĂNG LỰC", 100, 200);
    }
    return {
        draw: draw,
        valid: validDataChart1
    };
})();

var sineChart = (function() {
    function drawChart() {
        // set value in Oy
        context2.beginPath();
        context2.fillStyle = "black"; //color of value
        context2.font = "18px Arial";
        var space = 50;
        for (scale = 4; scale >= 0; scale--) {
            context2.fillText(scale, 60, 30 + space);
            space += 50;
        }
        //draw Oy
        context2.beginPath();
        context2.strokeStyle = "#000000";
        context2.moveTo(80, 50);
        context2.lineTo(80, 280);
        context2.stroke();
        //draw Ox
        context2.beginPath();
        context2.strokeStyle = "#000000";
        context2.moveTo(80, 280);
        context2.lineTo(350, 280);
        context2.stroke();
        //draw sine 
        context2.beginPath();
        context2.lineWidth = 5;
        context2.strokeStyle = "#00AEEF";
        context2.moveTo(100, 200);
        context2.bezierCurveTo(135, 197, 111, 103, 151, 117);
        context2.moveTo(151, 117);
        context2.bezierCurveTo(178, 139, 161, 200, 195, 200);
        context2.moveTo(195, 200);
        context2.bezierCurveTo(230, 197, 217, 117, 251, 117);
        context2.moveTo(251, 117);
        context2.bezierCurveTo(272, 122, 283, 143, 300, 150);
        context2.moveTo(300, 150);
        context2.bezierCurveTo(306, 149, 324, 126, 340, 117);
        context2.stroke();
    }
    return {
        draw: drawChart
    };
})();
var pieChart = (function() {
    var datas = [10, 20, 10, 60];
    var colors = ["#4267B1", "#DB3D26", "#F8991D", "#189747"];
    var validDataChart3 = true;
    var sum = 0;
    for (var i = 0; i < datas.length; i++) {
        if (datas[i] < 0 || datas[i] > 100) {
            alert("Error in chart 3: Invalid input data (input data < 0 or input data > 100)");
            validDataChart3 = false;
        }
        sum += datas[i];
    }
    if (sum > 100) {
        alert("Error in chart 3: Total percentage > 100");
        validDataChart3 = false;
    }
    /**
     * Draw a slice of the pie chart
     * @param {*} positionX - Horizontal position of the starting point 
     * @param {*} positionY - Vertical position of the starting point
     * @param {*} radius - Radius of the slice
     * @param {*} startAngle - The start angle of the slice
     * @param {*} endAngle - The end angle of the slice
     * @param {*} color - The color of the slice
     */
    function drawSlice(positionX, positionY, radius, startAngle, endAngle, color) {
        context3.fillStyle = color;
        context3.beginPath();
        context3.moveTo(positionX, positionY);
        context3.arc(positionX, positionY, radius, startAngle, endAngle);
        context3.closePath();
        context3.fill();
    }
    /**
     * Draw pie chart and fill text
     */
    function drawChart() {
        var offset = 40;
        var labelX;
        var labelY;
        var pieRadius = 75;
        var startAngle = -Math.PI / 2;
        for (var i = 0; i < datas.length; i++) {
            var sliceAngle = 2 * Math.PI * (datas[i] / 100);
            labelX = canvas3.width / 2 + (offset + (pieRadius / 2)) * Math.cos(startAngle + sliceAngle * 0.5);
            labelY = canvas3.height / 2 + (offset + (pieRadius / 2)) * Math.sin(startAngle + sliceAngle * 0.5);
            drawSlice(200, 150, 100, startAngle, startAngle + sliceAngle, colors[i]);
            drawText(datas[i] + "%", labelX - 70, labelY + 5);
            startAngle += sliceAngle;
        }
        drawSlice(200, 150, 50, 0, Math.PI * 2, "#ffffff");
    }
    /**
     * Fill text into specific slice
     * @param {*} data - data to display
     * @param {*} posX - Horizontal position where a text appear
     * @param {*} posY - Vertical position where a text appear
     */
    function drawText(data, posX, posY) {
        context3.fillStyle = "black";
        context3.font = "14px Arial";
        context3.fillText(data, posX, posY);
    }

    return {
        draw: drawChart,
        valid: validDataChart3
    };
})();
var barChart = (function() {
    var data = [2, 0.1, 3, 4, 4];
    var validDataChart4 = true;
    for (var i = 0; i < data.length; i++) {
        if (data[i] < 0) {
            alert("Error in chart 4: Iligal input data (input data < 0)");
            validDataChart4 = false;
        }
    }

    function drawChart() {
        context4.beginPath();
        context4.strokeStyle = "#E5E3E3";
        context4.font = "14px Arial";
        var spaceY = 30;
        var spaceX = 30;
        //draw line behind column  
        for (var i = 4; i >= 1; i--) {
            context4.fillText(i, 70, 30 + spaceY);
            context4.moveTo(70 + spaceX, 30 + spaceY);
            context4.lineTo(400, 30 + spaceY);
            context4.stroke();
            spaceY += 50;
        }
        //draw Ox
        context4.beginPath();
        context4.strokeStyle = "black";
        context4.fillText("0", 70, 260);
        context4.moveTo(70 + spaceX, 260);
        context4.lineTo(400, 260);
        context4.stroke();
        //add text in Ox
        context4.fillStyle = "black";
        context4.fillText("A", 105, 280);
        context4.fillText("B", 150, 280);
        context4.fillText("C", 195, 280);
        context4.fillText("E", 240, 280);
        context4.fillText("F", 290, 280);
        //draw bar
        context4.fillStyle = "#3366CC";
        yScale = (canvas4.height - 100) / 4;
        xScale = (canvas4.width - 320) / 4;
        context4.translate(90, canvas4.height - 80 / 2);
        context4.scale(xScale, -1 * yScale);
        for (i = 0; i <= 4; i++) {
            context4.fillRect(i + 0.15, 0, 0.6, data[i]);
        }
    }
    return {
        draw: drawChart,
        valid: validDataChart4
    };
})();
window.onload = function() {
    canvas = document.getElementById("canvas1");
    context = canvas.getContext("2d");
    canvas2 = document.getElementById("canvas2");
    context2 = canvas2.getContext("2d");
    canvas3 = document.getElementById("canvas3");
    context3 = canvas3.getContext("2d");
    canvas4 = document.getElementById("canvas4");
    context4 = canvas4.getContext("2d");
    if (circleChart.valid) {
        circleChart.draw();
    }
    sineChart.draw();
    if (pieChart.valid) {
        pieChart.draw();
    }
    if (barChart.valid) {
        barChart.draw();
    }
};