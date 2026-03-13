
import d3 from "d3";
import * as d3 from "d3";

// load the data from a json file and create the d3 svg in the then function
export function loadDataAndCreateViz(
  filePath: string,
  svgRef: React.RefObject<SVGSVGElement>,   
    width: number,
    height: number
) {
    d3.json(filePath).then((data) => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height);

            // create a simple bar chart as an example
            const xScale = d3.scaleBand()
                .domain(data.map((d: any) => d.name))
                .range([0, width])
                .padding(0.1);
            const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, (d: any) => d.value)])
                .range([height, 0]);
            svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", (d: any) => xScale(d.name)!)
                .attr("y", (d: any) => yScale(d.value))
                .attr("width", xScale.bandwidth())
                .attr("height", (d: any) => height - yScale(d.value));  
        }
    }).catch((error) => {
        console.error("Error loading data:", error);
    });
}

    


    

    
