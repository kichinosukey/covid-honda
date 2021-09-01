var dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
];
var xmargin = 20;
var padding = 30;
var width = 500;
var height = 400;


const url = "https://raw.githubusercontent.com/kichinosukey/covid-cases/main/covid-case-honda-location-cases-2021-09-01.json";
fetch(url).then(function (response){
    console.log(response);
    return response.json();
})
.then(function(json){
    console.log(json["data"]);
    return json
})
.then(function(json) {

    var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

    var xScale = d3.scaleBand()
        .rangeRound([padding, width - padding])
        .padding(0.1)
        .domain(json["index"].map(function(d, i) { return d; }));

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(json["data"], function(d) { return d[1]; })])
        .range([height - padding, padding]);

    svg.append("g")
        .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("transform", "translate(" + padding + "," + 0 + ")")
        .call(d3.axisLeft(yScale));

    svg.append("g")
        .selectAll("rect")
        .data(json["data"])
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return xScale(i); })
        .attr("y", function(d, i) { return yScale(d[1]); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - padding - yScale(d[1]); })
        .attr("fill", "steelblue");

    svg.append("g")
        .selectAll("text")
        .data(json["data"])
        .enter()
        .append("text")
        .attr("x", function(d, i) { return xScale(i); })
        .attr("y", function(d, i) { return yScale(d[1]); })
        .text(function(d) {
            return d[0];
        })
        .style("font-size", "8px")
        ;
})
// .then(function(json) {
//     var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
//     var xScale = d3.scaleLinear()
//         .domain([0, d3.max(json["index"], function(d){return d;})])
//         .range([xmargin, width])
//     var yScale = d3.scaleLinear()
//         .domain([0, d3.max(json["data"], function(d){return d[1];})])
//         .range([height, 0])

//     var axisX = d3.axisBottom(xScale);
//     var padding = 30;
//     svg.append("g")
//         .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
//         .call(axisX);

//     svg.selectAll("circle")
//     .data(json["data"])
//     .enter()
//     .append("circle")
//     .attr("cx", function(d, i){return xScale(i);})
//     .attr("cy", function(d, i){return yScale(d[1]);})
//     .attr("r", 4);
// })