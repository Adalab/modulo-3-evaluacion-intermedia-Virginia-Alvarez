import '../styles/App.scss';
import callToApi from '../services/api.js';
import {useState, useEffect} from 'react';

function App() {
  // VARIABLES ESTADO
  const [data, setData]= useState ([]);
  const [newStudent, setNewStudent] = useState ({
    id: "",
    name: "",
    counselor: "",
    speciality: "",
  });
  const [nameFilter, setNameFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("Escoge una opción");
  const [name,setName] = useState("");
  const [counselor,setCounselor] = useState("");
  const [speciality,setSpeciality] = useState("");

  // USEEFFECT ?
  useEffect(() => {
    callToApi().then((response) => {     
          setData(response);
    })
  }, []);

  // FUNCIONES HANDLER
  function generateUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c == 'x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  const handleNewStudent =(ev)=>{
    switch (ev.target.id) {
      case 'name':
        setName(ev.target.value);
        break;
      case 'counselor':
        setCounselor(ev.target.value);
        break;
      case 'speciality':
        setSpeciality(ev.target.value);
        break;
    
      default:
        break;
    }
    setNewStudent({...newStudent, [ev.target.id]:ev.target.value})
  }

  const handleClick = (ev)=>{
    ev.preventDefault();

    if(name && speciality && counselor){
      newStudent.id = generateUUID();
      setData([...data,newStudent]);
      setName('');
      setCounselor('');
      setSpeciality('');
    } else {
      alert('Algunos campos no se han informado')
    }
    
  }
  const handleFilter=(ev)=>{
    setNameFilter(ev.target.value);

   };
 const handleSelect = (ev)=>{
  setTeacherFilter(ev.target.value);
 };

  // FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR HTML
  function renderSocialNetworks(socialNetworks){
    if (socialNetworks) {
     return socialNetworks.map((socialNetwork) => {
      return (<a target="_blank" href={socialNetwork.url}>{socialNetwork.name}</a>);
     });
    }
     }

  const renderAdalabers = data
  .filter ((data)=>teacherFilter === 'Escoge una opción' || 
                            data.counselor === teacherFilter)
  .filter ((data)=>data.name.toLowerCase().includes(nameFilter.toLowerCase()))
  .map((adalaber)=>{
    return (
        <tr  className="row" key={adalaber.id}>
            <td className="column">{adalaber.name}</td>
            <td className="column">{adalaber.counselor}</td>
            <td className="column">{adalaber.speciality}</td>
            <td className="column">{renderSocialNetworks(adalaber.social_networks)}</td>
        </tr>
    )
  })

  // HTML EN EL RETURN

  return (
    <div className="App">
      <header>
        <h1 className="title">Adalabers</h1>
      </header>
      <main>
        {/* filtrar */}
        <form className='formFilter'>
          <label className='label'>Nombre:</label>
          <input
            className='input'
            type="search"
            placeholder='Ej: Maricarmen'
            onChange={handleFilter}
          />
          <label className='label'>Escoge una tutora:</label>
          <select className="input select" name="counselor" id="counselor" onChange={handleSelect} >
            <option value="Escoge una opción">Escoge una opción</option>
            <option value="Dayana">Dayana</option>
            <option value="Yanelis">Yanelis</option>
            <option value="Iván">Iván</option>
          </select>
        </form>
        {/* tabla */}
        <table className="table">
          {/* <!-- Fila de cabecera --> */}
          <thead>
            <tr className='row'>
              <th className='column'>Nombre</th>
              <th className='column'>Tutora</th>
              <th className='column'>Especialidad</th>
              <th className='column'>Redes sociales</th>
            </tr>
          </thead>
          <tbody>
            {renderAdalabers}
          </tbody>
        </table>
        {/* nueva alumna */}
        <form >
          <label >Nombre:</label>
          <input
            type="text"
            className='newStudent'
            id="name"
            value={name}
            onInput={handleNewStudent}
          />
          <label >Tutora:</label>
          <input
            type="text"
            className='newStudent'
            id="counselor"
            value={counselor}
            onChange={handleNewStudent}
          />
          <label >Especialidad:</label>
          <input
            type="text"
            className='newStudent'
            id="speciality"
            value={speciality}
            onChange={handleNewStudent}
          />
        
          <input
            type="submit"
            value="Añadir una nueva adalaber"
            onClick={handleClick}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
