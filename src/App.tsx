import React, { useState, useEffect } from 'react';

import './App.css';

import firebase from './utils/firebase';

interface IState{
  population:{
    level_1: string;
    level_2: string;
    value: number;
    year: string | number;
  }[]
}

function App() {
  const [data, setData ] = useState<IState["population"]>([]);

  const [loading, setLoading] = useState(true);

  const dbRef = firebase.database().ref("singapore-population");
  console.log(dbRef)

  const getSchools=()=>{
    setLoading(true);
    let items: IState["population"]=[];

    dbRef.on("value",(snapshot)=>{
      if(snapshot.val()){
        items.push(snapshot.val());
      }
      console.log(snapshot.val());
      setData(snapshot.val());

    })

    setLoading(false);
  }

  useEffect(()=>{
    getSchools();
  }, []);
  
  if(loading){
    return <h1>loading... </h1>;
  }
  return (
    <div className="App">
      <h1> Graphs</h1>
      {data.map((entry, i)=>(
        <div key ={i}>
          <h2>{entry.level_1}</h2>
          <h2>{entry.level_2}</h2>
          <h2>{entry.value}</h2>
          <h2>{entry.year}/n</h2>
        
        </div>
      ))}
    </div>
  );
}

export default App;
function items(items: any) {
  throw new Error('Function not implemented.');
}

