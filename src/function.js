if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (event) {
        //tilt([event.beta, event.gamma]);
        document.getElementById("result").innerHTML = "beta:" + event.beta + ", gamma: " + event.gamma;
    }, true);
} else if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function (event) {
        //tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
        document.getElementById("result_2").innerHTML = "acceleration.x:" + event.acceleration.x + ", acceleration.y: " + event.acceleration.y;
    }, true);
} else {
    window.addEventListener("MozOrientation", function (event) {
        //tilt([orientation.x * 50, orientation.y * 50]);
        document.getElementById("result_3").innerHTML = "orientation.x:" + event.orientation.x + ", orientation.y: " + event.orientation.y;
    }, true);
}
