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
    ethnicity: string;
    year: Date;
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
        items.forEach((item, i)=>{
          
          if(segment.level_1 === item.ethnicity ){
            let i = ageGroups.indexOf(segment.level_2);
            if(typeof item.data[i]  === 'undefined' ){
              item.data.push([{
                year: new Date(segment.year,1,1),
                value: segment.value,
                ethnicity: item.ethnicity
              }]);
              inserted= true;
            }else{
              item.data[i].push({
                year: new Date(segment.year,1,1),
                value: segment.value,
                ethnicity: item.ethnicity
              })
              inserted=true;
            }
          }
        })
        if(inserted===false){
          const ETH = segment.level_1+"";
          const YEAR = new Date(segment.year,1,1);
          const VAL = parseInt(segment.value)
          items.push({ethnicity: ETH, data: [[{ year: YEAR,value: VAL, ethnicity: ETH}]]});
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
    </div> 
  );
}

export default App;

