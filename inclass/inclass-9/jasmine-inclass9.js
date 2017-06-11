'use strict';

function setupHandlers(root) {
    var colorSpan = $('span', root)[0];
    colorSpan.style.color = 'blue';

    // Find the input and add an event handler.
    var box = $("#checkChangeColor");
    box.change(function () {
            // checked box -> red text
            // unchecked box -> green text
            if (this.checked) {
                colorSpan.style.color = 'red';
            } else {
                colorSpan.style.color = 'green';
            }
        }
    );
}

function moveObject(obj, dt) {
    // Check for undefined values and set them to zero.
    var elements = ["x", "y", "vx", "vy", "ax", "ay"];
    elements.forEach(function (element) {
        if (obj[element] == null) {
            obj[element] = 0.0;
        }
    });

    // include the acceleration term
    obj.x = obj.x + dt * obj.vx + 0.5 * obj.ax * dt * dt;
    obj.y = obj.y + dt * obj.vy + 0.5 * obj.ay * dt * dt;

    // update the velocities
    obj.vx = obj.vx + dt * obj.ax;
    obj.vy = obj.vy + dt * obj.ay;
}