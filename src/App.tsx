import React, { useState, useEffect } from 'react';

import './App.css';
import CheckBoxes from './components/CheckBoxes';
import Paper from './components/Paper';
import GroupedBarChart from './components/GroupedBarChart';

import firebase from './utils/firebase';
import { CircularProgress, createStyles, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import { classicNameResolver } from 'typescript';

export interface IState{
  ageGroups: string[],
  
  ethnicityData:{
    ethnicity: string;
    show: boolean;
    data: IState["valueByYear"][]
  }[],

  valueByYear:{
    ethnicity: string;
    year: Date;
    value: number;
  }[],

  handlePropStateChanges: (ethnicity: string) => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading:{
      display: 'flex',
      justifyContent: 'center',
    }
  }),
);

function App() {
  const classes = useStyles();

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
          items.push({ethnicity: ETH, show: false, data: [[{ year: YEAR,value: VAL, ethnicity: ETH}]]});
        }
        
      });
      items[0].show=true;
      setDataByEthnicity(items);
      setAgeGroups(ageGroups);
      setLoading(false);
    });
  }

  const handleChange=(ethnicity: string)=>{
    let tmp = [...dataByEthnicity];
    tmp.map((group)=> group.ethnicity === ethnicity ? group.show = !group.show : null);
    setDataByEthnicity(tmp);
  }

  useEffect(()=>{
    getPopulation();
  }, []);

  if(loading){
    return <div className={classes.loading}><
      CircularProgress size={400}  thickness={1.8} className={classes.loading} color={'primary'}/> 
    </div>
  }
  return (
    <div className="App">
      <Paper rawData={dataByEthnicity} handleChange={handleChange}  ageGroups = {ageGroups}/>
      {/* <GroupedBarChart rawData={dataByEthnicity} ageGroups = {ageGroups}/> */}
      {/* <CheckBoxes rawData={dataByEthnicity} handleChange={handleChange}/> */}
    </div> 
  );
}

export default App;

