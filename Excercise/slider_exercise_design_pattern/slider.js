var title = document.getElementById("slider-title");
//Image module
var image = function() {
    var images = document.getElementsByClassName("img");
    var length = images.length;
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
        item.changeWhiteColor(index);
        item.changeGreenColor(indexCurrent);
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
                item.changeWhiteColor(i);
            }
        }
        indexCurrent = index;
        setImage(indexCurrent, 0.1, 0.1, 10);
    }

    function getImage(position) {
        return images[position];
    }

    return {
        changeImage: changeImage,
        setImage: setImage,
        getImage: getImage,
        length: length
    };
}();
var item = function() {
    var items = document.getElementsByClassName("item");

    function changeWhiteColor(index) {
        items[index].style.background = "#FFFFFF";
    }

    function changeGreenColor(index) {
        items[index].style.background = "#52D017";
    }
    /**
     * Click on specific circle to see a specific image 
     */
    function onClick() {
        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener("click", function() {
                if (this.id == "item0") {
                    image.changeImage(0);
                } else if (this.id == "item1") {
                    image.changeImage(1);
                } else if (this.id == "item2") {
                    image.changeImage(2);
                } else if (this.id == "item3") {
                    image.changeImage(3);
                } else {
                    image.changeImage(4);
                }
            });
        }
    }

    return {
        changeGreenColor: changeGreenColor,
        changeWhiteColor: changeWhiteColor,
        click: onClick
    };

}();
var button = function() {
    var buttons = document.getElementsByClassName("btn");

    function onClick() {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function() {
                if (this.id == "btnNext") {
                    getNextImage();
                } else {
                    getPrevImage();
                }
            });
        }
    }
    return {
        click: onClick
    };
}();

function getNextImage() {
    if (indexCurrent == image.length - 1) {
        indexCurrent = 0;
        image.setImage(image.length - 1, 0.02, 0.02, 300);
    } else {
        indexCurrent++;
        image.setImage(indexCurrent - 1, 0.02, 0.02, 300);
    }
}

function getPrevImage() {
    if (indexCurrent == 0) {
        indexCurrent = image.length - 1;
        image.setImage(0, 0.02, 0.02, 300);
    } else {
        indexCurrent--;
        image.setImage(indexCurrent + 1, 0.02, 0.02, 300);
    }
}

function initSlider() {
    image.getImage(indexCurrent).style.opacity = 1;
    title.innerText = image.getImage(indexCurrent).getAttribute("title");
    if (loop) {
        setInterval(getNextImage, duration);
        item.changeGreenColor(indexCurrent);
        button.click();
        item.click();
    }
}