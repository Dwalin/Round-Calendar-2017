var d3          = require('d3');

module.exports = function (calendar, notes) {

    var month = function(name, days) {
        var self = this;
        self.name = name;
        self.days = days;
    };

    var months = [];

    months.push(new month("January", 31));
    months.push(new month("February", 28));
    months.push(new month("March", 31));
    months.push(new month("April", 30));
    months.push(new month("May", 31));
    months.push(new month("June", 30));
    months.push(new month("July", 31));
    months.push(new month("August", 31));
    months.push(new month("September", 30));
    months.push(new month("October", 31));
    months.push(new month("November", 30));
    months.push(new month("December", 31));

    var week = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];



    var days = 365;
    var angle = 2*Math.PI / days;

    var center = {
        x: 500,
        y: 500
    };

    var radius = 320;

    var j = 0;

	d3.selectAll(".mj-calendar__note").remove();

	days = d3.selectAll(".mj-calendar__day");

    months.forEach(function(month, k, arr) {

        normal = d3.scaleLinear()
            .domain([0, month.days])
            .range([0, Math.PI]);

        for (i = 0; i < month.days; i++) {

            var day = calendar.append("g")
                .classed("mj-calendar__note", true);

            var x = 0;
            var y = 0;

            if (j < days/2) {
                x = center.x + (radius - 40 * (Math.cos(normal(i)) * Math.cos(normal(i)) ) + 5) * Math.sin(angle * j + 0.002);
                y = center.y - (radius - 40 * (Math.cos(normal(i)) * Math.cos(normal(i)) ) + 5) * Math.cos(angle * j + 0.002);
            } else {
                x = center.x + (radius - 40 * (Math.cos(normal(i)) * Math.cos(normal(i)) ) + 5) * Math.sin(angle * j - 0.002);
                y = center.y - (radius - 40 * (Math.cos(normal(i)) * Math.cos(normal(i)) ) + 5) * Math.cos(angle * j - 0.002);
            }

            //  Days text

            var textBox = day.append("svg")
                    .attr("x", x  )
                    .attr("y", y  )
                    .attr("viewbox", "0 0 100 100")
                    .attr("width", "100")
                    .attr("height", "100")

                    .classed("mj-calendar__dateWrap", true)
                ;

            var note = textBox.append("text")
                .attr("text-anchor",
                function() {
                    if (j < days/2) {
                        return 'start';
                    } else {
                        return 'end';
                    }
                }
            )
                //.classed("mj-calendar__date", true)
                .classed("mj-calendar__note", true)
                //.classed("mj-calendar__date__weekend", (date.getDay() > 4))
                .attr('transform',
                function() {
                    if (j < days/2) {
                        return 'rotate(' + ( (j) * (360 / days) + 270) + ', 0, 0)';
                    } else {
                        return 'rotate(' + ( (j) * (360 / days) + 90) + ', 0, 0)';
                    }
                }

            );

            notes.forEach(function(noteData){
                if (noteData.day == j) {
                    note.text(noteData.note);
                } else {

                }
            });

            j++;

        }
    });
};
