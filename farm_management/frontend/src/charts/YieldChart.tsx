import { useState } from "react";
import Echarts from "./Echarts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
type YieldChartPropsType = {
  type: any;
  data: any;
};
type optionType = echarts.EChartsOption;
export default function YieldChart(props: YieldChartPropsType) {
  const [dataset, setDataset] = useState(
    props.type.length > 0 ? props.type[0].value : null
  );
  const [unit, setUnit] = useState(
    props.type.length > 0 ? props.type[0].unit : null
  );
  const [open, setOpen] = useState(false);
  console.log(props.type);
  const option: optionType = {
    dataset: [
      {
        id: "All",
        dimensions: [
          "yield_date",
          { name: "expected_revenue", displayName: "Expeceted Revenue" },
          "net_yield_quantity",
          "yield_type",
          "yield_unit",
        ],
        source: props.data,
      },
      //filtering All data and creating granulariy on dataset based on type
      //fromDatasetId means the soruce on which filtering needs to be done
      //id means the id of the newly filtered data
      {
        id: dataset,
        transform: {
          // @ts-ignore
          fromDatasetId: "All",
          type: "filter",
          config: { dimension: "yield_type", value: dataset },
        },
      },
    ],

    title: {
      text: "Yield ",
    },
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
          let value =
            item.seriesName === "Expected Revenue"
              ? item.data.expected_revenue
              : item.data.net_yield_quantity;

          tooltipContent += item.seriesName + ": " + value + "<br/>";
        });
        return tooltipContent;
      },
    },
    legend: {
      data: ["Expected Revenue", "Yield"],
      top: "30",
      align: "left",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        magicType: { show: true, type: ["line", "bar"] },
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "7%",
      top: "15%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "time",
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        name: "Expected Revenue",
        type: "value",
        min: 0,
        // max: 80,
        interval: 10,
        axisLabel: {
          formatter: "{value} $",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "blue",
          },
        },
      },
      {
        name: "Yield",
        type: "value",
        min: 0,
        // max: 800,
        interval: 10,
        position: "right",
        axisLabel: {
          formatter: `{value} ${unit}`,
        },
        splitLine: {
          show: false,
        },
        alignTicks: true,

        //showing axis line
        axisLine: {
          show: true,
          lineStyle: {
            color: "green",
          },
        },
      },
    ],
    //data zoom gives the slider
    dataZoom: [
      {
        type: "inside",
      },
      {
        type: "slider",
        height: 20,
        bottom: "10px",
      },
    ],
    series: [
      {
        //Here datasetId means from which dataset (id) the data is taken for chart
        datasetId: `${dataset}`,
        name: "Expected Revenue",
        type: "line",
        stack: "Total",
        yAxisIndex: 0,
        emphasis: {
          focus: "series",
        },
        label: {
          show: true,
          position: "top",
          formatter: "{@expected_revenue} $",
        },
        tooltip: {
          valueFormatter: function (value: any) {
            return value + " $";
          },
        },
      },

      {
        dimensions: ["yield_date", "net_yield_quantity"],
        datasetId: `${dataset}`,
        name: "Yield",
        type: "bar",
        yAxisIndex: 1, //mapping value to the y axis of index 1
        emphasis: {
          focus: "series",
        },

        tooltip: {
          // valueFormatter: function (value: any) {
          //   console.log("hi");
          //   return value;
          // },
          formatter: function (params) {
            console.log("please", params);
            return params.name;
          },
        },
        label: {
          show: true,
          position: "top",
          // formatter: "{@net_yield_quantity} {@yield_unit}",
          formatter: function (params: any) {
            return (
              params.value.net_yield_quantity + " " + params.value.yield_unit
            );
          },
        },
      },
    ],
  };
  return (
    <div className="h-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {dataset
              ? props.type.find((TYPE: any) => TYPE.value === dataset)?.label
              : "Select framework..."}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {props.type.map((TYPE: any) => (
                <CommandItem
                  key={TYPE.value}
                  value={TYPE.value}
                  onSelect={(currentValue) => {
                    //@ts-ignore
                    setDataset(currentValue === dataset ? "" : currentValue);
                    setUnit(TYPE.unit);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      dataset === TYPE.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {TYPE.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

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
