window.onload = function() {
    let canvas = document.getElementById("paint-canvas");
    let context = canvas.getContext("2d");
    let boundings = canvas.getBoundingClientRect();
    let range = document.getElementById("brush").value;

    let mouseX = 0;
    let mouseY = 0;
    let isDrawing = false;
    context.strokeStyle = 'black';

    let brush = document.getElementById('brush');
    brush.addEventListener('input', function(brush) {
        context.lineWidth = brush.target.value;
    });

    let colors = document.getElementsByClassName('colors')[0];
    colors.addEventListener('click', function(event) {
        context.strokeStyle = event.target.value || 'black';
    });

    canvas.addEventListener('mousedown', function(event) {
        setMouseCoordinates(event);
        isDrawing = true;

        context.beginPath();
        context.moveTo(mouseX, mouseY);
    });

    canvas.addEventListener('mousemove', function(event) {
        setMouseCoordinates(event);

        if (isDrawing) {
            context.lineTo(mouseX, mouseY);
            context.stroke();
        }
    });

    canvas.addEventListener('mouseup', function(event) {
        setMouseCoordinates(event);
        isDrawing = false;
    });

    function setMouseCoordinates(event) {
        mouseX = event.clientX - boundings.left;
        mouseY = event.clientY - boundings.top;
    }

    let clearbtn = document.getElementById('clear');
    clearbtn.addEventListener('click', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    let savebtn = document.getElementById('save');
    savebtn.addEventListener('click', function() {
        let imageName = prompt('please enter image name');
        let canvasDataURL = canvas.toDataURL();
        let a = document.createElement('a');
        a.href = canvasDataURL;
        a.download = imageName || 'drawing';
        a.click();
    });
}