import Echarts from "@/charts/Echarts";

type RUChartPropsType = {
  data: any;
};
type optionType = echarts.EChartsOption;
function RUbyResource(props: RUChartPropsType) {
  const option: optionType = {
    dataset: [
      {
        id: "Resources",
        dimensions: [
          "resource_name",
          "total_usage_price",
          "resource_type",
          "total_usage_quantity",
          "quantity_unit",
        ],
        source: props.data,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
      formatter: function (props) {
        //@ts-ignore
        let tooltipContent = props[0].axisValueLabel + "<br/>";
        //@ts-ignore
        props.forEach(function (item: any) {
          tooltipContent +=
            "Type : " +
            item.value.resource_type +
            "<br>" +
            "Usage Amount: " +
            item.value.total_usage_price +
            " $ <br/>" +
            "Quantity: " +
            item.value.total_usage_quantity +
            " " +
            item.value.quantity_unit;
        });
        return tooltipContent;
      },
    },
    xAxis: [
      {
        type: "value",
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: {
      type: "category",
    },
    series: [
      {
        dimensions: ["resource_name", "total_usage_price"],
        datasetId: "Resources",
        type: "bar",
        label: {
          show: true,
          position: "outside",
          formatter: function (params: any) {
            return params.value.total_usage_price + " $";
          },
        },
      },
    ],
  };

  return (
    <div>
      {props.data.length > 0 ? (
        <div className="w-full h-[540px] p-3 shadow-md  rounded-md">
          {/* @ts-ignore */}
          <Echarts option={option} resize={true} />
        </div>
      ) : (
        <p>No records available. You can add data by clicking in Add button</p>
      )}
    </div>
  );
}

export default RUbyResource;
