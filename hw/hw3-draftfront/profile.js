//
// Setting data structure for input areas
//
// First all inputs are going to be stored in a list of objects, where each
// object holds all essential information about the input, like the DOM
// elements and if it is changed.
//

// All input area IDs, except password and password confirmation.
var inputAreaIDs = ["displayName", "email", "phone", "zipcode"];

// The check functions for the input areas.  All functions takes the input
// value and returns the error message. Empty error message signifies correct
// input.
var checkFunctions = {
    displayName: function (accountName) {
        var errMsg = "";
        var start = accountName.charAt(0);
        var letterNumber = /^[0-9a-zA-Z]+$/;
        var letter = /^[a-zA-Z]+$/;
        if (!letterNumber.test(accountName)) {
            errMsg += "Only letters and numbers can be used for account name! \n";
        } else if (!letter.test(start)) {
            errMsg += "Account name has to start with a letter! \n";
        }
        return errMsg;
    },
    email: function (email) {
        var errMsg = "";
        // A regex able to match most e-mail addresses.
        var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(email)) {
            errMsg += "Invalid email! \n";
        }
        return errMsg;
    },
    phone: function (phone) {
        var errMsg = "";
        var re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        if (!re.test(phone)) {
            errMsg = "Invalid phone numbers! (10 digits) \n";
        }
        return errMsg;
    },
    zipcode: function (zipcode) {
        var errMsg = "";
        var reg = /^\d{5}$/;
        if (!reg.test(zipcode)) {
            errMsg += "invalid zipcode! (5 digits) \n";
        }
        return errMsg;
    }
};

// Gather all information about the input fields into one list of objects. The
// object holds the input area ID, the cached input and display DOM elements,
// and if the area has been changed.
var fields = [];
// Construct the objects from the input area IDs.
inputAreaIDs.forEach(function (inputAreaID) {
    // Get the ID of the corresponding display area.
    var currentValueId = (
        "current"
        + inputAreaID.charAt(0).toUpperCase()
        + inputAreaID.slice(1)
    );

    var inputField = document.getElementById(inputAreaID);
    var outputField = document.getElementById(currentValueId);

    var field = {
        inputAreaID: inputAreaID,
        inputField: inputField,
        outputField: outputField,
        ifChanged: false
    };
    fields.push(field);

    // Toggle the dirty bit whenever one input field is changed.
    inputField.oninput = function () {
        field.ifChanged = true;
    };
});


//
// Special treatment of the passwords
//

var password = document.getElementById("password");
var currentPassword = document.getElementById("currentPassword");
var passwordConfirm = document.getElementById("passwordConfirm");

// Check if password has changed.
//
// Since the password field is always going to be cleared to empty
// automatically.  It is changed if and only if any of the fields is non-
// empty.
function ifPasswordChanged() {
    return password.value.length !== 0 || passwordConfirm.value.length !== 0;
}

function validatePassword() {
    var errMsg = "";
    if (password.value !== passwordConfirm.value) {
        errMsg += "Unmatched passwords! \n";
    }
    return errMsg;
}

function updatePassword() {
    currentPassword.innerHTML = password.value;
}


//
// The action for updating the profile
//

var elBtn = document.getElementById("updateBtn");
elBtn.onclick = function () {
    // First validate the updated values.
    var errMsg = "";
    var updatedFields = [];
    // Special treatment of password.
    if (ifPasswordChanged()) {
        errMsg += validatePassword();
    }
    // Other regular fields.
    fields.forEach(function (field) {
        if (field.ifChanged) {
            // When it is already updated.
            //
            // First check its validity.
            var checkFunction = checkFunctions[field.inputAreaID];
            errMsg += checkFunction(field.inputField.value);
            updatedFields.push(field);
        }
    });

    // Check if there is any error message.
    if (errMsg.length === 0) {
        // In the absence of any error message.
        // Update all the fields.
        updatedFields.forEach(function (field) {
            field.outputField.innerHTML = field.inputField.value;
        });
        if (ifPasswordChanged()) {
            updatePassword();
        }

        // Clear the input areas.
        clearInputArea();
    } else {
        // In the event of an error.
        window.alert("Error occurred in your input: \n" + errMsg);
    }
};

function clearInputArea() {
    fields.forEach(function (field) {
        if (field.ifChanged) {
            field.inputField.value = "";
            field.ifChanged = false;
        }
    });
    if (ifPasswordChanged()) {
        password.value = "";
        passwordConfirm.value = "";
    }
}