function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

	var cell = d3.select("#sample-metadata");
	let url = `/metadata/${sample}`;
//Clearing the html under the cell.
	cell.html('');

//Iterate the Json and post the value	
d3.json(url).then((item) => {
     Object.entries(item).forEach(([key, value]) => {
       /* cell.append('text').html(`${key}: ${value}<br>`); */
	   cell.append('text').html(`${key}: ${value}<br>`);
	   
     });
	 
});

}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var url = `/samples/${sample}`;

    console.log(url);

    d3.json(url).then(function(data){
      var layout = {
        title: "'Bar' Chart",
        width:500,
        height:500
				};
 
		var d = [{values:data["sample_values"].slice(0, 10),labels:data["otu_ids"].slice(0, 10),text:data["otu_labels"],hoverinfo:"text",type: "pie"}]
      
    console.log(d)
            
    Plotly.newPlot("pie", d,layout);
    
    // //Plotly.newPlot("plot", data, layout);
     });
		
		d3.json(url).then(function(data){
			var trace1 = {x:data["otu_ids"],y:data["sample_values"],  mode: 'markers', marker: { color: data["otu_ids"],size: data["sample_values"]} }
			var layout = {
				title: 'Marker Size',
				};
 
			
			//console.log(d)
            Plotly.newPlot("bubble", [trace1],layout);
			//Plotly.newPlot("plot", data, layout);
         });
		
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
