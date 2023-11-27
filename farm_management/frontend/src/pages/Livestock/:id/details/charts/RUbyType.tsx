import Echarts from "@/charts/Echarts";

type RUChartPropsType = {
  data: any;
};
type optionType = echarts.EChartsOption;
function RUbyType(props: RUChartPropsType) {
  const option: optionType = {
    dataset: [
      {
        id: "RU by Type",
        dimensions: ["resource_type", "total_usage_price"],
        source: props.data,
      },
    ],
    tooltip: {
      trigger: "item",
      //   formatter: "{a} <br/>{b} : {c} ({d}%)",
      formatter: function (props) {
        console.log(props);
        let tooltipContent =
          //@ts-ignore
          props.seriesName +
          "<br>" +
          //@ts-ignore
          props.marker +
          //@ts-ignore
          props.value["resource_type"] +
          " : " +
          //@ts-ignore
          props.value["total_usage_price"] +
          " $" +
          "<br> Usage : " +
          //@ts-ignore
          props.percent +
          " %";
        return tooltipContent;
      },
    },
    legend: {
      left: "center",
      top: "top",
    },

    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },

    series: [
      {
        datasetId: "RU by Type",
        name: "Resource Type",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        // label: {
        //   formatter: function (props) {
        //     //@ts-ignore
        //     return props.name + " ( " + props.value.total_usage_price + " $ ) ";
        //   },
        // },
      },
    ],
  };
  return (
    <div className="w-full md:w-6/12  h-[540px] p-3 shadow-md  rounded-md">
      {props.data.length > 0 ? (
        <div className="w-full h-full">
          {/* @ts-ignore */}
          <Echarts option={option} />
        </div>
      ) : (
        <p>No records available. You can add data by clicking in Add button</p>
      )}
    </div>
  );
}

export default RUbyType;
