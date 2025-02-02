import React, {useState, useEffect} from "react";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
 import api from './services/api.js'
 import DevItem from "./components/DevItem/index"
 import DevForm from "./components/DevForm/index"
 
function App() {
  const [devs, setDevs] = useState([]);
 
 

  useEffect(()=>{
 async function loadDevs() {
   const response = await api.get('/devs')

   setDevs(response.data)

 }
 loadDevs()
  },[])

  async function handleAddDev(data){
   
    const response = await api.post('/devs',data)
    
 
if(response.data._id)
 setDevs([...devs, response.data])

  
    console.log(response.data)
  }
 

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
         <DevForm onSubmit={handleAddDev}></DevForm>
          </aside>

      <main>
        <ul>
          {
            devs.map( dev =>( 
          <DevItem  key={dev._id} dev={dev}></DevItem> 
            ))
          }
         </ul>
      </main>
    </div>
  );
}

export default App;
