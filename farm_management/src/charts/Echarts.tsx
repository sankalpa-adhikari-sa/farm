import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import darkmode from "./ThemeDark.json";

interface EchartsProps {
  option: echarts.EChartsOption;
}
export default function Echarts({ option }: EchartsProps) {
  const chartRef = useRef<HTMLDivElement | null>(null); // Reference to the DOM element
  // @ts-ignore
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
    null
  ); // Reference to the ECharts instance

  useEffect(() => {
    // Initialize the ECharts instance when it's not available
    echarts.registerTheme("dark mode", darkmode);
    const chart = echarts.init(chartRef.current);
    // Set the ECharts instance in the state
    setChartInstance(chart);
    // Set the chart option
    chart.setOption(option);
    // Add the resize event listener
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener("resize", handleResize);
    // Cleanup the ECharts instance on unmount
    return () => {
      window.removeEventListener("resize", handleResize); // Remove the resize listener
      chart.dispose(); // Dispose of the ECharts instance
    };
  }, [option]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
}
