 import React, {useState, useEffect}  from 'react';
import './styles.css'


function DevForm({onSubmit} ){
   
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');


  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(
      (position)=>{
       const { latitude, longitude } = position.coords;

       setLatitude(latitude);
       setLongitude(longitude);

      },
      (err)=>{
        console.log(err);
      },
      {
        timeout: 15000,
      }
    );

  },[])

 
 async function handleSubmit(e){
    e.preventDefault();
    
 await onSubmit({
   github_username,
   techs,
   latitude,
   longitude
 });
 setGithub_username("");
 setTechs(""); 

 
  }


  return (
    <form onSubmit={handleSubmit}>
    <div className="input-block">
      <label htmlFor="github_username">Usuário Github</label>
      <input 
      name="github_username"
      value={github_username}
      onChange={e =>setGithub_username(e.target.value)}
      id="github_username" required />
    </div>
    <div className="input-block">
      <label htmlFor="techs">Tecnologias</label>
      <input name="techs"
      value={techs}
      onChange={e =>setTechs(e.target.value)}
       id="techs" required />
    </div>

    <div className="input-group">
      <div className="input-block">
        <label htmlFor="latitude">Latitude</label>
        <input 
        value={latitude}
        onChange={ e => setLatitude(e.target.value)}
         name="latitude" id="latitude" required />
      </div>
      <div className="input-block">
        <label htmlFor="longitude">Longitude</label>
        <input 
        value={longitude}
         onChange={ e => setLongitude(e.target.value)} 
         name="longitude" id="longitude" required />
      </div>
    </div>

    <button type="submit"> Salvar</button>
  </form>

  )
}

export default DevForm;