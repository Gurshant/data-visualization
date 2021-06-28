import { useState, useEffect } from 'react';
import './App.css';
import Paper from './components/Paper';
import firebase from './utils/firebase';
import { CircularProgress, createStyles, CssBaseline, makeStyles, Theme } from '@material-ui/core';

export interface IState{
  ageGroups: string[],

  valueByYear:{
    ethnicity: string;
    year: Date;
    value: number;
  }[],

  ethnicityData:{
    ethnicity: string;
    show: boolean;
    data: IState["valueByYear"][]
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

const App = () => {
  const [dataByEthnicity, setDataByEthnicity ] = useState<IState["ethnicityData"]>([]);
  const [ageGroups, setAgeGroups ] = useState<IState["ageGroups"]>([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(loading){
    return <div className={classes.loading}><
      CircularProgress size={400}  thickness={1.8} className={classes.loading} color={'primary'}/> 
    </div>
  }
  return (
    <div className="App">
      <CssBaseline />
      <Paper rawData={dataByEthnicity} handleChange={handleChange}  ageGroups = {ageGroups}/>
    </div> 
  );
}

export default App;

