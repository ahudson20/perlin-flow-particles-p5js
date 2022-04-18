window.addEventListener('load', modalLoadOptions);

function modalLoadOptions() {
    // Get the modal
    var modal = document.getElementById("optionsModal");

    //Get the button
    var button = document.getElementById("openOptionsButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("options-close")[0];

    button.onclick = function () {
        console.log("button click");
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
