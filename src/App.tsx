import React, { useState, useEffect } from 'react';

import './App.css';
import GroupedBarChart from './components/GroupedBarChart';

import firebase from './utils/firebase';

export interface IState{
  ageGroups:{
    age_group: string
  }[],
  
  ethnicityData:{
    ethnicity: string;
    data: IState["valueByYear"][]
  }[],

  valueByYear:{
      year: number;
      value: number;
  }[]
}

function App() {
  const [dataByEthnicity, setDataByEthnicity ] = useState<IState["ethnicityData"]>([]);
  const [ageGroups, setAgeGroups ] = useState<IState["ageGroups"]>([]);


  const [loading, setLoading] = useState(true);

  const dbRef = firebase.database().ref("singapore-population");


  const getPopulation=()=>{
    let items: IState["ethnicityData"]=[];
    let ageGroups: IState["ageGroups"]=[];

    dbRef.on("value",(snapshot)=>{
      console.log(snapshot.val());
      Object.keys(snapshot.val()).forEach((key: any)=>{
        let segment = snapshot.val()[key];
        // debugger;
        if(!ageGroups.includes(segment.level_2)){
          ageGroups.push(segment.level_2);
        }

        let inserted= false;
        items.forEach((item)=>{
          
          if(segment.level_1 === item.ethnicity ){
            let i = ageGroups.indexOf(segment.level_2);
            if(typeof item.data[i]  === 'undefined' ){
              item.data.push([{
                year: segment.year,
                value: segment.value
              }]);
              inserted= true;
            }else{
              item.data[i].push({
                year: segment.year,
                value: segment.value
              })
              inserted=true;
            }
          }
        })
        if(inserted===false){
          const ETH = segment.level_1+"";
          const YEAR = parseInt(segment.year);
          const VAL = parseInt(segment.value)

          items.push({ethnicity: ETH, data: [[{ year: YEAR,value: VAL}]]});
        }
        
      });

        console.log(items);

      setDataByEthnicity(items);
      setAgeGroups(ageGroups);
      setLoading(false);

    });

  }


  useEffect(()=>{
    getPopulation();
  }, []);

  if(loading){
    return <h1>loading... </h1>;
  }
  return (
    <div className="App">
      <h1> Graphs</h1>
      <GroupedBarChart rawData={dataByEthnicity} ageGroups = {ageGroups}/>
      {/* <Histogram  results={dataByGroupName}/> */}

      {/* <Histogram  data={annualData}/> */}
      {/* {annualData.map((annual, i)=>(
        <div key ={i}>
          <h1>{annual.year}</h1>
          <br/>
          <br/>
          {annual.data.map((entry, j)=>{
            return <div key={i+" "+j}>
              <h5>{entry.resident_group}</h5>
              <h5>{entry.age_group}</h5>
              <h5>{entry.value}</h5>
              <br/>
            </div>
          })}
        </div>

      ))}*/}
    </div> 
  );
}

export default App;

