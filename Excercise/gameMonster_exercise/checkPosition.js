var canvas = document.getElementById("control");
var context = canvas.getContext("2d");

canvas.addEventListener("mousemove", function(event) {
    var mousePos = getMousePos(canvas, event);
    var message = mousePos.x + "," + mousePos.y;
    writeMessage(canvas, message);
});

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function writeMessage(canvas, message) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "18pt Arial";
    context.fillStyle = "white";
    context.fillText(message, 10, 25);
}