import Echarts from "@/charts/Echarts";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RUChartPropsType = {
  data: any;
};
type optionType = echarts.EChartsOption;
function RUbyResource(props: RUChartPropsType) {
  const [dataset, setDataset] = useState("All Resources");
  console.log(dataset);

  const option: optionType = {
    dataset: [
      {
        id: "All Resources",
        dimensions: [
          "resource_name",
          "total_usage_price",
          "resource_type",
          "total_usage_quantity",
          "quantity_unit",
        ],
        source: props.data,
      },

      {
        id: "feed",
        transform: {
          // @ts-ignore
          fromDatasetId: "All Resources",
          type: "filter",
          config: { dimension: "resource_type", value: "feed" },
        },
      },
      {
        id: "input",
        transform: {
          // @ts-ignore
          fromDatasetId: "All Resources",
          type: "filter",
          config: { dimension: "resource_type", value: "input" },
        },
      },
      {
        id: "others",
        transform: {
          // @ts-ignore
          fromDatasetId: "All Resources",
          type: "filter",
          config: { dimension: "resource_type", value: "others" },
        },
      },
      {
        id: "chemical",
        transform: {
          // @ts-ignore
          fromDatasetId: "All Resources",
          type: "filter",
          config: { dimension: "resource_type", value: "chemical" },
        },
      },
      {
        id: "medical",
        transform: {
          // @ts-ignore
          fromDatasetId: "All Resources",
          type: "filter",
          config: { dimension: "resource_type", value: "medical" },
        },
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
        datasetId: dataset,
        name: dataset,
        type: "bar",
        label: {
          show: true,
          position: "outside",
          formatter: function (params: any) {
            return params.value.total_usage_price + " $";
          },
        },
        itemStyle: {
          color(params) {
            console.log(params);
            if (params.seriesName === "others") {
              return "#73c0de";
            } else if (params.seriesName === "medical") {
              return "#ee6666";
            } else if (params.seriesName === "chemical") {
              return "#5470c6";
            } else if (params.seriesName === "feed") {
              return "#91cc75";
            } else if (params.seriesName === "input") {
              return "#fac858";
            } else {
              return "gray";
            }
          },
        },
      },
    ],
  };

  return (
    <div>
      <Select onValueChange={(value) => setDataset(value)}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select Resource" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Resources">All Resources</SelectItem>
          <SelectItem value="feed">Feed</SelectItem>
          <SelectItem value="chemical">Chemical</SelectItem>
          <SelectItem value="medical">Medical</SelectItem>
          <SelectItem value="input">Input</SelectItem>
          <SelectItem value="others">Others</SelectItem>
        </SelectContent>
      </Select>
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
