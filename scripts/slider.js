let sliderValue = 15;
let weightValue = 1;
let seed = 0.01;

$(function () {
    var opacitySlider = document.getElementById("slider-id");
    var weightSlider = document.getElementById("weight-slider-id");
    var seedSlider = document.getElementById("seed-slider-id");
    
    opacitySlider.oninput = function (event) {
        sliderValue = opacitySlider.value;
    }
    
    weightSlider.oninput = function (event) {
        weightValue = weightSlider.value;
    }
    
    seedSlider.onchange = function (event) {
        seed = seedSlider.value;
    }
});
