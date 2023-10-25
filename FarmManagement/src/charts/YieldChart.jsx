import React, { useState, useEffect, useRef } from "react";
import Echarts from "./Echarts";

export default function YieldChart(props) {
  console.log(props.data)
  const [dataset, setDataset] = useState(props.type[0]["yield_name"]);
  const option = {
    dataset: [
      {
        id: "All",
        dimensions:["yield_date","expected_revenue","net_yield_quantity","yield_type","yield_unit"],
        source: props.data
      },
      //filtering All data and creating granulariy on dataset based on type
      //fromDatasetId means the soruce on which filtering needs to be done
      //id means the id of the newly filtered data
      {
        id: dataset,
        transform: {
          fromDatasetId: "All",
          type: "filter",
          config: { dimension: "yield_type", value: dataset }
        }
      },
    ],

    title: {
      text: "Yield "
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {
      data: ["Expected Revenue", "Yield"],
      top: "30",
      align: "left"
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        restore: {},
        magicType: { show: true, type: ["line", "bar"] },
        saveAsImage: {},
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "7%",
      top: "15%",
      containLabel: true
    },
    xAxis: [
      {
        type: "time",
        axisPointer: {
          type: "shadow"
        }
      }
    ],
    yAxis: [
      {
        name: "Expected Revenue",
        type: "value",
        min: 0,
        max: 80,
        interval: 10,
        axisLabel: {
          formatter: "{value} $"
        },
        axisLine: {
            show: true,
            lineStyle: {
              color: "blue"
            }
          }
      },
      {
        name: "Yield",
        type: "value",
        min: 0,
        max: 800,
        interval: 100,
        position:"right",
        axisLabel: {
          formatter: "{value} kg"
        },
        splitLine: {
            show: false
          },
        alignTicks: true,
  
          //showing axis line
        axisLine: {
            show: true,
            lineStyle: {
                color: "green"
            }
        },

      }
    ],
    //data zoom gives the slider
    dataZoom: [
      {
        type: "inside"
      },
      {
        type: "slider",
        height: 20,
        bottom:"10px"
      }
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
          focus: "series"
        },
        label: {
          show: true,
          position: "top",
          formatter: "{@expected_revenue} $"
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + " $";
          }
        }
      },
    
      {
        dimensions:["yield_date","net_yield_quantity"],
        datasetId: `${dataset}`,
        name: "Yield",
        type: "bar",
        yAxisIndex: 1, //mapping value to the y axis of index 1
        emphasis: {
            focus: "series"
          },
        tooltip: {
          valueFormatter: function (value) {
            return value + " Kg";
          }
        },
        label: {
          show: true,
          position: "top",
          formatter: "{@net_yield_quantity} kg"
        }
      }
    ]
  };
  const onOptionChangeHandler = (event) => {
    setDataset(event.target.value);
  };

  return (
    <div className="h-full">
      <label >Filter By:</label>
      <select
        className="p-1 m-2 w-32 h-8 rounded-md "
        onChange={onOptionChangeHandler}
        
        name="yield_type"
        id="yield_type"
      >
       
        <option value="Egg">Egg</option>
        <option value="Meat">Meat</option>
      </select>
      {props.data.length >0 ? (
      <div className="w-full h-[540px] p-3 shadow-md  rounded-md">
        <Echarts option={option} resize={true} />
      </div>
      )
      :(
      <p>No records available. You can add data by clicking in Add button</p>
      )
      
        }
        
      
    </div>
  );
}
