var d3          = require('d3');

module.exports = function (calendar) {

	var days = 365;
	var angle = 2*Math.PI / days;

	var center = {
		x: 500,
		y: 500
	};

	var radius = 320;

	var lineData = [];
	var lineData2 = [];

	var normal = d3.scaleLinear()
		.domain([0, days * 11.5])
		.range([0, 12*Math.PI]);

	var normal2 = d3.scaleLinear()
		.domain([0, days])
		.range([0, 24*2*Math.PI]);

	var normalText = d3.scaleLinear()
		.domain([0, days])
		.range([0, 360]);

	normal = d3.scaleLinear()
		.domain([0, 365 / 2])
		.range([0, Math.PI]);

	for (var i = 0; i < days; i++) {
		var x = Math.round( 10 * (center.x + (radius * Math.sin(normal(i) )) )) / 10;
		var y = Math.round( 10 * (center.y + (radius * Math.cos(normal(i) )) )) / 10;

		lineData.push({
			x: x,
			y: y
		});
	}


	var lineFunction = d3.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });

	calendar.append("path")
		.attr("d", lineFunction(lineData));



};
