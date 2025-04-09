import useMeasure from "react-use-measure";
import { scaleLinear, scaleTime, TimeScaleConfig } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar, Circle, Line, LinePath } from "@visx/shape";
import { curveBasis, curveMonotoneX } from "@visx/curve";
import {
  Tooltip,
  defaultStyles,
  useTooltip,
  TooltipWithBounds,
} from "@visx/tooltip";
import { MouseEvent, TouchEvent } from "react";
import { localPoint } from "@visx/event";
import { bisect, bisector, extent } from "d3-array";
import axios from "axios";
import * as d3 from 'd3';

function Graph() {
  type DataPoint = { date: string; reps: number };
  
  const toolTipStyles = {
    ...defaultStyles,
    borderRadius: 4,
    background: "#161434",
    color: "#ADADD3",
  };

  const data = [
    { date: "2025-04-01 00:00:00", reps: 5 },
    { date: "2025-04-03 00:00:00", reps: 6 },
    { date: "2025-04-05 00:00:00", reps: 2 },
    { date: "2025-04-06 00:00:00", reps: 2 },
    { date: "2025-04-08 00:00:00", reps: 10 },
    { date: "2025-04-15 00:00:00", reps: 13 },
  ];

  const margin = 32;
  const defaultWidth = 100;
  const defaultHeight = 100;

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<DataPoint>();

  // Accessors
  const getXValue = (d: DataPoint) => new Date(d.date);
  const getYValue = (d: DataPoint) => d.reps;

  const [ref, bounds] = useMeasure();
  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultWidth;
  const bisect = bisector<DataPoint, Date>(getXValue).left;

  const axisColor = "white"

  const innerWidth = width - margin;
  const innerHeight = height - margin;

  // Earliest and Latest Dates
  //   const xExtent = [
  //     new Date(Math.min(...data.map((d) => getXValue(d).getTime()))),
  //     new Date(Math.max(...data.map((d) => getXValue(d).getTime()))),
  //   ];

  const yExtent = [
    Math.min(...data.map((d) => getYValue(d))),
    Math.max(...data.map((d) => getYValue(d))),
  ];

  // Scales
  const xScale = scaleTime({
    domain: extent(data, getXValue) as [Date, Date],
    range: [margin, innerWidth],
  });
  const yScale = scaleLinear<number>({
    domain: yExtent,
    range: [innerHeight, margin],
  });

  return (
    <>
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Group>
          <LinePath
            data={data}
            x={(d) => xScale(getXValue(d))}
            y={(d) => yScale(getYValue(d))}
            stroke="#23DBBD"
            strokeWidth={1}
          ></LinePath>
          {data.map((d, i) => (
          <Group key={`point-${i}`}>
            {/* Circle representing the point */}
            <Circle
              cx={xScale(getXValue(d))}
              cy={yScale(getYValue(d))}
              r={3} // Radius of the point circle
              fill="steelblue"
            />
            {/* Circle around the point */}
            <Circle
              cx={xScale(getXValue(d))}
              cy={yScale(getYValue(d))}
              r={5} // Radius of the outer circle (taken from data)
              fill="none"
              stroke="tomato"
              strokeWidth={0.7}
            />
          </Group>
        ))}
          
        </Group>
        <Group>
          <AxisLeft left={margin} scale={yScale} stroke={axisColor} tickStroke={axisColor} tickLabelProps={{fill: 'white',fontSize: 15}}/>
        </Group>
        <Group>
          <AxisBottom top={innerHeight} scale={xScale} stroke={axisColor} tickStroke={axisColor} tickLabelProps={{fill: 'white',fontSize: 10}}  numTicks={5}/>
        </Group>
        <Group>
          <Bar
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={(
              event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>
            ) => {
              const { x: tooltipLeft } = localPoint(event) || { x: 0 };
              const x0 = xScale.invert(tooltipLeft);
              const index = bisect(data, x0, 1);
              const d0 = data[index - 1];
              const d1 = data[index];

              if (d0 && d1) {
                const xValue0 = getXValue(d0);
                const xValue1 = getXValue(d1);
              
                // Normalize the x-position (t between 0 and 1)
                const t = (x0.valueOf() - xValue0.valueOf()) / (xValue1.valueOf() - xValue0.valueOf());
              
                // Linearly interpolate the y-values
                const yValue0 = getYValue(d0);
                const yValue1 = getYValue(d1);
                const interpolatedYValue = yValue0 + t * (yValue1 - yValue0);
              
                const interpolatedTooltipTop = yScale(interpolatedYValue);
              
                showTooltip({
                  tooltipData: d1 ? (x0.valueOf() - xValue0.valueOf() > xValue1.valueOf() - x0.valueOf() ? d1 : d0) : d0,
                  tooltipLeft: tooltipLeft,
                  tooltipTop: interpolatedTooltipTop, // Use the linearly interpolated y-position
                });
              }
            }}
            onMouseLeave={() => hideTooltip()}
          ></Bar>
        </Group>

        {tooltipData ? (
          <Group>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: height }}
              stroke="#59588D"
              strokeWidth={1}
              pointerEvents="none"
              strokeDasharray="5,5"
            />
            <Circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={8}
              fill="#59588D"
              fillOpacity={0.5}
              pointerEvents="none"
            />
            <Circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="#59588D"
              pointerEvents="none"
            />
          </Group>
        ) : null}
      </svg>
      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={toolTipStyles}
        >
          {`${getXValue(tooltipData).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}`}
          : <b>{getYValue(tooltipData)} reps</b>
        </TooltipWithBounds>
      ) : null}
    </>
  );
}

export default Graph;
