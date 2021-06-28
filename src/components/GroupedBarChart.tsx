import React from 'react';
import {VictoryChart,  VictoryStack, VictoryBar, VictoryGroup, VictoryLegend, VictoryLabel, createContainer, VictoryVoronoiContainerProps, VictoryZoomContainerProps} from 'victory';
import {ColorScalePropType} from "victory-core";

import {IState as IProps} from '../App';

interface Props{
  rawData: IProps["ethnicityData"];
  ageGroups: IProps["ageGroups"];
}

const GroupedBarChart:React.FC<Props> = ({rawData, ageGroups})=> {
  
  const colorScale: ColorScalePropType[] = ["red", "green", "blue", "cool",  "grayscale", "red", "green", "blue", "cool",  "grayscale"  ];

  const stringArr: string[] = ["red", "green", "blue", "turquoise", "grey", "red", "green", "blue", "turquoise", "grey" ];

  const legendTitles=()=>{
    let ethArr: { name: string}[] =[];
    rawData.forEach((group)=>group.show?  ethArr.push({name: group.ethnicity}) : null );
    return ethArr;
  }

  const VictoryZoomVoronoiContainer = createContainer<VictoryZoomContainerProps, VictoryVoronoiContainerProps>('zoom', 'voronoi');

  return (
    <div style={{paddingLeft: '10px'}}>
      <VictoryChart   padding={{top: 100, left: 100, bottom: 50, right: 30}}  domainPadding={60} width={1000} height={550} scale={{x: "time"}} horizontal={false}
        containerComponent={
          <VictoryZoomVoronoiContainer
            labels={({ datum }) => datum.ethnicity + " Population of \n" + ageGroups[datum._stack - 1] + " olds in " + datum.year.getFullYear() + ": \n" + datum.value}
          />}
      >
        <VictoryLabel text="Visual Analysis: Singapore Population Breakdown" x={500} y={30} textAnchor="middle" style={{fontSize: 20, fontWeight: "bold"}}/>

        <VictoryLabel text="Year" x={500} y={530} textAnchor="middle" style={{fontSize: 16, fontWeight: "bold" }}/>

        <VictoryLabel text="Population Size" x={10} y={225} textAnchor="middle" style={{fontSize: 16, fontWeight: "bold" }} angle= {270}/>
        <VictoryLegend x={175} y={55}
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: "black" } }}
          colorScale={stringArr}
          data={legendTitles()} />
        <VictoryGroup offset={15} style={{ data: { width: 12 } }}>
          {rawData.map((group, i)=> group.show ? <VictoryStack colorScale={colorScale[i]} key={i}>
              {group.data.map((data, index) => <VictoryBar key={index} data={data} x="year" y= "value" /> )}
            </VictoryStack> : null
          )}
        </VictoryGroup>
    
      </VictoryChart>
    </div>
  );

}

export default GroupedBarChart;

