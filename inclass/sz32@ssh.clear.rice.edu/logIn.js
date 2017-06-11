(function(){
// // Check the validity of input information.
// function checkForm() {
//     var inputAreaIDs = ["accountName", "email", "phone", "birthDate", "zipcode", "password"];

//     var validateFunctions = {
//         accountName: function (accountName) {
//             var errMsg = "";
//             var start = accountName.charAt(0);
//             var letterNumber = /^[0-9a-zA-Z]+$/;
//             var letter = /^[a-zA-Z]+$/;
//             if (!letterNumber.test(accountName)) {
//                 errMsg += "Only letters and numbers can be used for account name! \n";
//             } else if (!letter.test(start)) {
//                 errMsg += "Account name has to start with a letter! \n";
//             }
//             return errMsg;
//         },

//         email: function (email) {
//             var errMsg = "";
//             // A regex able to match most e-mail addresses.
//             var re = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
//             if (!re.test(email)) {
//                 errMsg += "Invalid email! \n";
//             }
//             return errMsg;
//         },

//         phone: function (phone) {
//             var errMsg = "";
//             var re = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
//             if (!re.test(phone)) {
//                 errMsg = "Invalid phone numbers! (10 digits) \n";
//             }
//             return errMsg;
//         },

//         birthDate: function (birthDate) {
//             var errMsg = "";
//             var today = new Date();
//             var bd = new Date(birthDate);
//             if ((bd - today) > 86400) {  // Only allow persons at least one day old.
//                 errMsg += "Invalid birthday! \n";
//             }
//             return errMsg;
//         },

//         zipcode: function (zipcode) {
//             var errMsg = "";
//             var reg = /^\d{5}$/;
//             if (!reg.test(zipcode)) {
//                 errMsg += "invalid zipcode! (5 digits) \n";
//             }
//             return errMsg;
//         },

//         password: function (firstPassword) {
//             var errMsg = "";
//             var confirmPassword = document.forms[0].passwordConfirm.value;
//             if (firstPassword !== confirmPassword) {
//                 errMsg += "Unmatched passwords! \n";
//             }
//             return errMsg;
//         }
//     };

//     // If no error happen, errMsg will be an empty string. Otherwise
//     // it means some input data is not valid.
//     var errMsg = "";

//     inputAreaIDs.forEach(function (inputAreaID) {
//         var validateFunction = validateFunctions[inputAreaID];
//         var input = document.getElementById(inputAreaID);
//         errMsg += validateFunction(input.value);
//     });

//     if (errMsg.length !== 0) {
//         window.alert(errMsg);
//         return false;
//     }
//     else {
//         return true;
//     }
// }


// // Check if user has entered something for both the username and password.
// //
// // No serious validation is performed.
// function checkLogin() {
//     var username = document.getElementById("username").value;
//     var loginPasswd = document.getElementById("loginPassword").value;
//     return !(username === null || username === "" || loginPasswd === null || loginPasswd === "");
// }


// var elSubmit = document.getElementById("submitBtn");
// elSubmit.onclick = checkForm;

// var elLogin = document.getElementById("logIn");
// elLogin.onclick = function () {
//     if (checkLogin()) {
//         window.location = "main.html";
//     } else {
//         window.alert("Please enter your name and password");
//     }
// };

})();
