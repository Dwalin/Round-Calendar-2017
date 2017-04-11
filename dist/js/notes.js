var d3          = require('d3');

module.exports = function (calendar, notes) {

	//console.log(notes);

	days = d3.selectAll(".mj-calendar__day");

	d3.selectAll(".mj-calendar__note").remove();

	notes.forEach(function(noteData){

		day = d3.select(days._groups[0][noteData.day]).select("svg");

		d3.select(days._groups[0][noteData.day])
			.attr("data-note", noteData.note);

		var note = day.append("g")
			.append("text")
			.attr("x", function() {
				if (noteData.day < 182) {
					return 10;
				} else {
					return -10;
				}
			})
			.attr("text-anchor",
			function() {
				if (noteData.day < 182) {
					return 'start';
				} else {
					return 'end';
				}
			})
			.attr('transform',
			function() {
				if (noteData.day < 182) {
					return 'rotate(' + ( (noteData.day) * (0.9863) + 270) + ', 0, 0)';
				} else {
					return 'rotate(' + ( (noteData.day) * (0.9863) + 90) + ', 0, 0)';
				}
			})
			.classed('mj-calendar__note', true);

		note.text(noteData.note);

		if (noteData.counter != undefined) {

			var parsed = JSON.parse(noteData.counter);

			console.log(parsed);

			for (key in parsed) {
				var note = day.append("g")
					.append("circle")
					.attr("r", "0.5")
					.attr("cx", "-50")
					.attr('transform',
					function() {
						if (noteData.day < 182) {
							return 'rotate(' + ( (noteData.day) * (0.9863) + 270) + ', 0, 0)';
						} else {
							return 'rotate(' + ( (noteData.day) * (0.9863) + 90) + ', 0, 0)';
						}
					})
					.attr("data-value", parsed[key])
					.classed('mj-calendar__counter', true);


			}
		}

		//console.log(noteData);

	});

};
