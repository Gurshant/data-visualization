import React from 'react';
import {VictoryChart,  VictoryStack, VictoryBar, VictoryGroup, VictoryLegend, VictoryLabel, createContainer, VictoryVoronoiContainerProps, VictoryZoomContainerProps} from 'victory';
import {ColorScalePropType} from "victory-core";

import {IState as IProps} from '../App';

interface Props{
  rawData: IProps["ethnicityData"];
  ageGroups: IProps["ageGroups"];
}

const GroupedBarChart:React.FC<Props> = ({rawData, ageGroups})=> {
  
  const colorScale: ColorScalePropType[] = ["red", "green", "blue", "cool",  "grayscale" ];

  const stringArr: string[] = ["red", "green", "blue", "turquoise", "grey" ];

  const legendTitles=()=>{
    let ethArr: { name: string}[] =[];
    rawData.forEach((group)=>ethArr.push({name: group.ethnicity}));
    
    return ethArr;
  }

  const VictoryZoomVoronoiContainer = createContainer<VictoryZoomContainerProps, VictoryVoronoiContainerProps>('zoom', 'voronoi');

  return (
    <div style={{paddingLeft: '10px'}}>
      <VictoryChart   padding={{top: 40, left: 100, bottom: 40}}  domainPadding={30} width={1000} height={400} scale={{x: "time"}}
        containerComponent={
          <VictoryZoomVoronoiContainer
            labels={({ datum }) => datum.ethnicity + " Population of " + ageGroups[datum._stack - 1] + " olds in " + datum.year.getFullYear() + ": " + datum.value}
          />}
      >
        <VictoryLabel text="Singapore Ethnicity Population Visual Analysis" x={500} y={10} textAnchor="middle" style={{fontSize: 20, fontWeight: "bold"}}/>
        

        <VictoryLabel text="Year" x={500} y={390} textAnchor="middle" style={{fontSize: 16, fontWeight: "bold" }}/>


        <VictoryLabel text="Population Size" x={10} y={200} textAnchor="middle" style={{fontSize: 16, fontWeight: "bold" }} angle= {270}/>
        <VictoryLegend x={125} y={25}
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black" } }}
          colorScale={stringArr}
          data={legendTitles()} />

        <VictoryGroup offset={16} style={{ data: { width: 13 } }}>

          {rawData.map((group, i)=>{
            return <VictoryStack colorScale={colorScale[i]} key={i}>
              {group.data.map((data, index) => {
                return <VictoryBar key={index} data={data} x="year" y= "value" />;
              })}
            </VictoryStack>
          })}

        </VictoryGroup>
      </VictoryChart>
    </div>
  );

}

export default GroupedBarChart;

