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

  // USEEFFECT ?
  useEffect(() => {
    callToApi().then((response) => {     
          setData(response);
    })
  }, []);

  // FUNCIONES HANDLER

  const handleNewStudent =(ev)=>{
    setNewStudent({...newStudent, [ev.target.id]:ev.target.value})
  }
  const handleClick = (ev)=>{
    ev.preventDefault();
    setData([...data,newStudent]);
  }
  const handleFilter=(ev)=>{
    setNameFilter(ev.target.value);

   };
 const handleSelect = (ev)=>{
  setTeacherFilter(ev.target.value);
 };

  // FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR HTML
  const renderAdalabers = data
  .filter ((data)=>teacherFilter === 'Escoge una opción' || 
                            data.counselor === teacherFilter)
  .filter ((data)=>data.name.toLowerCase().includes(nameFilter.toLowerCase()))
  .map((adalaber)=>{
    return (
        <tr key={adalaber.id}>
            <td>{adalaber.name}</td>
            <td>{adalaber.counselor}</td>
            <td>{adalaber.speciality}</td>
        </tr>
    )
  })

  // HTML EN EL RETURN

  return (
    <div className="App">
      <h1 className="title">Adalabers</h1>
      {/* filtrar */}
      <form >
        <label >Nombre:</label>
        <input 
          type="search"
          placeholder='Ej: Maricarmen' 
          onChange={handleFilter}
        />
        <label >Escoge una tutora:</label>
        <select name="counselor" id="counselor" onChange={handleSelect} >
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
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
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
          onInput={handleNewStudent}
        />
        <label >Tutora:</label>
        <input 
          type="text" 
          className='newStudent'
          id="counselor"
          onInput={handleNewStudent}
        />
        <label >Especialidad:</label>
        <input 
          type="text"
          className='newStudent'
          id="speciality"
          onInput={handleNewStudent}
        />
      
        <input 
          type="submit"
          value="Añadir una nueva adalaber"
          onClick={handleClick}
        />
      </form>


     
    </div>
  );
}

export default App;
