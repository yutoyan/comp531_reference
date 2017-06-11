describe('Jasmine In Class Exercise', function () {

    beforeEach(function () {
        $("#fixture").remove();
        var html = '<span>This is a span with some color changing text</span>';

        // Add a checkbox to html.
        html += '<input type="checkbox" id="checkChangeColor"/>';
        $('body').append('<div id="fixture">' + html + '</div>');

        // This function was defined in jasmine-inclass9.js.
        window.setupHandlers($("#fixture"));
    });

    it('should test that 1 is 1', function () {
        expect(1).toBe(1);
    });

    it('should set the span text color to blue on load', function () {
        expect($('span', $('#fixture'))[0].style.color).toBe('blue');
    });

    var clickCheckbox = function ($) {
        return new Promise(function (resolve, reject) {
            $("#checkChangeColor").trigger("click");
            setTimeout(function () {
                resolve();
            }, 100);
        });
    };

    it('should set span text color to red when checked', function (done) {
        // Use jQuery to check the box, then examine the text color of the span.
        var colorSpan = $('span', $('#fixture'))[0];
        expect(colorSpan.style.color).toBe('blue');
        clickCheckbox($).then(function () {
            expect(colorSpan.style.color).toBe('red');
            done();
        });
    });

    it('should set span text color to green when unchecked', function (done) {
        // Check the box, then uncheck the box examine the text color fo the span.
        //
        // Make sure the checkbox is unchecked at first.
        var elBox = $("#checkChangeColor");
        elBox.attr('checked', false);
        var colorSpan = $('span', $('#fixture'))[0];
        expect(colorSpan.style.color).toBe('blue');

        clickCheckbox($);
        clickCheckbox($).then(function () {
            expect(colorSpan.style.color).toBe('green');
            done();
        });
    });

    // Now we do some non-DOM JavaScript testing.

    it('should compute the trajectory after 1 second', function () {
        var obj = {x: 5, y: 10, vx: 1, vy: 2, ay: -0.1};

        moveObject(obj, 1.0);
        // Expect object at [6, 11.95].
        var tolerance = 0.001;
        expect(obj.x - 6).toBeLessThan(tolerance);
        expect(obj.y - 11.95).toBeLessThan(tolerance);

        moveObject(obj, 1.0);
        // Expect object at [7, 13.80].
        expect(obj.x - 7).toBeLessThan(tolerance);
        expect(obj.y - 13.80).toBeLessThan(tolerance);

        obj.ax = 0.5;
        obj.ay = -0.4;
        moveObject(obj, 1.0);
        // Expect object at [8.25, 15.40].
        expect(obj.x - 8.25).toBeLessThan(tolerance);
        expect(obj.y - 15.40).toBeLessThan(tolerance);
    });
});