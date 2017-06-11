var elClear = document.getElementById("clearPost");
var elUpdateHeadline = document.getElementById("updateHeadline");

//Clear user's input for a new post
elClear.onclick = function () {
    var elInputField = document.getElementById("postInputField");
    elInputField.value = "";
};

//Update user's headline
elUpdateHeadline.onclick = function () {
    var elOutput = document.getElementById("currentHeadline");
    var elInput = document.getElementById("newHeadLine");
    elOutput.innerHTML = elInput.value;
    elInput.value = "";
};
