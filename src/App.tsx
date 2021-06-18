import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from './firebase';

interface IState{
  school:{
    id: number;
    title: string;
  }[]
}

function App() {
  const [schools, setSchools ] = useState<IState["school"]>([]);

  const [loading, setLoading] = useState(true);

  const ref = firebase.firestore().collection("school");

  const getSchools=()=>{
    setLoading(true);
    ref.onSnapshot((querySnapshot)=>{
      const items: any= [];
      console.log(querySnapshot);
      querySnapshot.forEach( (doc)=> {
         items.push(doc.data());
         console.log(doc.data());
      })
      setSchools(items);
      // console.log(items);
      setLoading(false);
    })
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
      {schools.map((school)=>(
        <div key ={school.id}>
          <h2>{school.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
