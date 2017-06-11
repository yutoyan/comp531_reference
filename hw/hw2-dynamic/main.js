// String for the label of the buttons.
var LOGIN = "Log In";
var LOGOUT = "Log Out";
var STOPINTERVAL = "Stop";
var STARTINTERVAL = "Start";

// Cached DOM elements which are going to be repeatedly used.
var username = document.getElementById("username");
var loginBtn = document.getElementById("login");
var elShareBox = document.getElementById("shareBox");
var elGreeting = document.getElementById("greeting");


//
// The Login button
//

loginBtn.value = LOGIN;
loginBtn.onclick = function () {
    if (loginBtn.value == LOGIN) {
        login();
    } else {
        logout();
    }
};

function login() {
    if (!username.value) {
        window.alert("Please enter a username");
    } else {
        // Hide the input field.
        username.className = "hidden";
        // Make the post div visible
        elShareBox.className = "visible";
        // Change the text of the login button to logout
        loginBtn.value = LOGOUT;
        showGreeting(username.value);
    }
}

function logout() {
    // Reverse hiding done in login.
    username.className = "visible";
    elShareBox.className = "hidden";
    // Change the text of button to login.
    loginBtn.value = LOGIN;
    hideGreeting();
}

function showGreeting(name) {
    elGreeting.innerHTML = "Hi, " + name + "!";
    elGreeting.className = "visible";
}

function hideGreeting() {
    elGreeting.className = "hidden";
}


//
// The image slide show
//

// All the images to display.
var gallery = [
    "http://infosthetics.com/archives/chillmaster.jpg",
    "http://barnabasartshouse.co.uk/wp-content/uploads/2012/08/THE-BEACONS-GROUPING-4002.jpg",
    "http://cairnarvon.rotahall.org/pics/simple.png",
    "http://www.jackslawn.com/PIX/landscape_04.jpg",
    "http://www.allsaintschurch.org.uk/wp-content/uploads/daffs-landscape-400x200.jpg",
    "https://images.blogthings.com/thecutemonstertest/button.png",
    "https://s-media-cache-ak0.pinimg.com/736x/b8/4c/03/b84c03f2754bf6942b1a3c1e67563e86.jpg",
    "http://www.frankwilsonfineart.com/mediac/400_0/media/DIR_104791/toboggan_hill_6x12.JPG",
    "http://cf.nearsay.com/sites/default/files/styles/400x200/public/content_images/abblimousine-500x260.jpg?itok=szVVpxZn",
    "http://www.draftdynastyonline.com/wp-content/uploads/2015/12/NBA-1024x576-400x200.png"
].map(function(img) {
    var curImage = new Image();
    curImage.src = img;
    return curImage;
});

// Cache all image elements.
var elImages = document.getElementsByClassName('cardImage');
// The index for the next image to display.  All images use the same index. So
// the slide show can be less regular and more interesting.
var idx = 0;

// Set the src property of an image element
function setSrc(elImage) {
    elImage.src = gallery[idx++ % gallery.length].src;
}

// Set and return an interval to repeatedly change src of an image element.
function setSlideShow(img) {
    var interval = (Math.floor((Math.random() * 5) + 1)) * 1000;
    return setInterval(setSrc, interval, img);
}

// Initialize an interval for all image elements.
// Bind handle function to the click event of every button.
Array.prototype.forEach.call(elImages,
    function (elImage) {
        var timer = setSlideShow(elImage);
        // Get the corresponding sibling button and set its callback.
        var button = elImage.parentNode.getElementsByClassName("stopInterval")[0];
        // The callback function holds the corresponding timer by closure.
        button.onclick = function () {
            if (button.innerHTML == STOPINTERVAL) {
                clearInterval(timer);
                button.innerHTML = STARTINTERVAL;
            } else {
                timer = setSlideShow(elImage);
                button.innerHTML = STOPINTERVAL;
            }
        };
    }
);
