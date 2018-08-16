var images = document.getElementsByTagName("img");
var title = document.getElementById("slider-title");
var button = document.getElementsByTagName("button");
//This function initialize slider when the page has loaded
function initSlider() {
    images[indexCurrent].style.opacity = 1; // Set the highest value of the opacity to make the image visible 
    title.innerText = images[indexCurrent].getAttribute("title"); // Assign image's title to slider's title 
    if (loop) {
        setInterval(getNextImage, duration); // Automatically change to the next image after duration time
        // change background color of a circle that represent the image's position 
        document.getElementById("item" + indexCurrent).style.background = "#52D017";
    }
}

function getNextImage() {
    if (indexCurrent == images.length - 1) { // Reach the last image in the slider
        indexCurrent = 0;
        setImage(images.length - 1, 0.02, 0.02, 300);
    } else {
        indexCurrent++;
        setImage(indexCurrent - 1, 0.02, 0.02, 300);
    }
}

function getPrevImage() {
    if (indexCurrent == 0) {
        indexCurrent = images.length - 1;
        setImage(0, 0.02, 0.02, 300);
    } else {
        indexCurrent--;
        setImage(indexCurrent + 1, 0.02, 0.02, 300);
    }
}
/**
 * 
 * @param {*} index - index of the image that you want to display 
 * @param {*} opacity_period - The amount of opacity that the next image is added each duration time
 * @param {*} opacityImageOld_period - The amount of opacity that the current image is added each duration time
 * @param {*} duration_period - The duration time
 */
function setImage(index, opacity_period, opacityImageOld_period, duration_period) {
    // Make the image that not the image of desired index transparent 
    for (i = 0; i < images.length; i++) {
        if (i != index)
            images[i].style.opacity = 0;
    }
    var opacity = 0; // Opacity of next image
    var opacityImageOld = 1; // Opacity of current image
    /* 
       Change the background color of the circle that represent the current image to white
       Change the background color of the circle that represent the next image to green
    */
    document.getElementById("item" + index).style.background = "#FFFFFF";
    document.getElementById("item" + indexCurrent).style.background = "#52D017";

    var setOpacity = setInterval(function() {
        images[indexCurrent].style.opacity = opacity; // Next image is transparent
        images[index].style.opacity = opacityImageOld; // Current image is visible
        title.innerText = images[indexCurrent].getAttribute("title"); // Assign next image's title to slider's title

        if (opacity >= 1 && opacityImageOld <= 0) {
            clearInterval(setOpacity);
            return;
        }
        //Decrease current image opacity to make it become transparent
        //Increase next image opacity to make it become visible
        opacity += opacity_period;
        opacityImageOld -= opacityImageOld_period;
    }, duration / duration_period);
}
/**
 * This function is used by index circle to choose a specific image
 * @param {*} index - index of image that you want to display. In this case, this is index circle position
 */
function changeImage(index) {
    for (var i = 0; i < images.length; i++) {
        if (i != index) {
            document.getElementById("item" + i).style.background = "#FFFFFF";
        }
    }
    indexCurrent = index;
    setImage(indexCurrent, 0.1, 0.1, 10);
}