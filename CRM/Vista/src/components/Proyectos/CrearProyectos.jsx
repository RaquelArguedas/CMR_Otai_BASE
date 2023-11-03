
import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Navbar } from '../Navbar/Navbar';
import '../Evaluaciones/CrearEvaluacion.css';
import Swal from 'sweetalert2';
import { Table, columns, data, Styles } from './TablaSelectProyect'; 

const API = "http://127.0.0.1:5000";
export const CrearProyectos = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fechaIncio, setfechaIncio] = useState(new Date());
    const [inputValueIncio, setInputValueIncio] = useState('');
    const [fechaFinalizacion, setfechaFinalizacion] = useState(new Date());
    const [inputValueFinalizacion, setInputValueFinalizacion] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState(new Date());
    const [inputValueCreacion, setInputValueCreacion] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [outValue, setOutValue] = useState('');
    const [estado, setEstado] = useState("");
    const [fileInputKey, setFileInputKey] = useState('');
    //Esto va parte de la tabla que aun no esta creada
    let navigate = useNavigate();
    const gotoMenu = () => { navigate('/proyectos', {}); }
    const [servicios, setServicios] = useState([]);
    const [idServicio, setIdServicios] = useState([]);




    const handleSubmit = async (event) => {
        //const res = await fetch(`${API}/getNewIdProyecto`);
        //const data = await res.json();
        event.preventDefault(); 
        const data = {
            nombre: nombre,
            descripcion: descripcion, 
            idCliente: null,
            documentos: fileInputKey,
            fechaCreacion: inputValueCreacion,
            fechaInicio: inputValueIncio,
            fechaFinalizacion: inputValueFinalizacion,
            subTotal: costo,
            estado: estado,
        }; 
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const res = await fetch(`${API}/createProyecto`, requestOptions);
        if (res.ok) {
            Swal.fire({
                title: 'Confirmación',
                text: 'El proyecto se ha creado exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false, 
                allowEscapeKey: false,    
            }).then((result) => {
                if (result.isConfirmed) {
                    gotoMenu();
                //   const formData2 = new FormData();
                //   const selectedFilesModified = selectedFiles.map((item) => { 
                //     if (item.url instanceof File) {
                //         formData2.append('doc', item.url);
                //         fetch(`${API}/saveDoc/${idProyecto}`, {
                //             method: 'POST',
                //             body: formData2, // Utiliza el objeto FormData que contiene archivos
                //         });
                //         formData2.delete('*');
                //     }else {
                //         return null; // O cualquier otro valor que desees en lugar de null
                //       }
                //     }).filter((item) => item !== null); // Eliminar elementos nulos
                //   // console.log(selectedFilesModified)
            }});    
        } else {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al crear el proyecto.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
        }
    };

    const handleidServicioChange = ( idServicios) => {
        console.log('Array de idServicios:', idServicios);
        setIdServicios(idServicios);
    };
    const handleSearch = async () => { 
        //Obtener infromacion existente en la base de datos
        //A esto me refiero a la tabla de la evaluacion, cotizacion o nombre
        //Obtener infromacion existente en la base de datos
        //A esto me refiero recuperar los datos del cliente
        console.log(1)
        //Se supoene que ahi abajo mandamos a llamar a todos los servicios
        const res = await fetch(`${API}/getServicios`);
        const data = await res.json();//resultado de la consulta
        console.log(data)
         // Realiza la conversión de datos aquí
         const formattedData = data.map((item) => ({
            idServicio: item[1],
            nombre: item[2],
          }));

      setServicios(formattedData);
      handlefechaIncioChange(new Date())
      handlefechaFinalizacionChange(new Date())
    
    }; 
    React.useEffect(() => {
        handleSearch()
      }, []);
    const handleFileChange = (e) => {
      const files = e.target.files;
      setSelectedFiles([...selectedFiles, ...Array.from(files)]);
      setFileInputKey(Date.now()); // Para restablecer el input y permitir la selección del mismo archivo nuevamente
    };
    const handleRemoveFile = (index) => {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles.splice(index, 1);
      setSelectedFiles(newSelectedFiles);
    };
    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };
    const handleNameChange = (event) => {
        setNombre(event.target.value);
    };
    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };
    const handleCostoChange = (event) => {
        setCosto(event.target.value);
    };
    const handlefechaIncioChange = (date) => {
        setfechaIncio(date);

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
        // Construir la cadena en el formato deseado (mm/dd/aaaa)
        const formattedDate = `${year}-${month}-${day}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));

        setInputValueIncio(formattedDate);
    };
    const handlefechaFinalizacionChange = (date) => {
        setfechaFinalizacion(date);

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
        const formattedDate = `${year}-${month}-${day}`;
        setInputValueFinalizacion(formattedDate);

        const monthC = fechaCreacion.getMonth() + 1; 
        const dayC = fechaCreacion.getDate(); 
        const yearC = fechaCreacion.getFullYear(); 
        const formattedDateC = `${yearC}-${monthC}-${dayC}`;
        setInputValueCreacion(formattedDateC);

        
    };

    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
   
    return (
       
        <Fragment>
        <div className="container"> 
        <Navbar />
            <div class="row">
                    <div class="col-sm-3">
                        <h1 class="titulo-h1">Crear Proyecto</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="nameInput" class="form-label">Nombre:</label>
                        <input type="text" class="form-control custom-margin-right" id="nameInput"
                         placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                        
                    </div>
                    <div class="mb-3">
                        <label  style={{ marginRight: '37px' }} for="descripInput" class="form-label">Descripción:</label>
                        <input type="text" class="form-control custom-margin-right" id="descripInput"
                         placeholder="Ingrese la descripción del proyecto" value={descripcion} onChange={handleDescripcionChange}/>
                        
                    </div>
                    <div class="mb-3">
                        <label  style={{ marginRight: '61px'}} for="costInput" class="form-label">Sub Total:</label>
                        <input type="number" class="form-control custom-margin-right" id="costInput"
                        placeholder="Ingrese el costo del proyecto" value={costo} onChange={handleCostoChange}/>
                    
                    </div>
                    <div class="mb-3">
                        <select id="mySelect" value={estado} onChange={handleEstadoChange} style={{ marginRight: '95px'}} >
                            <option value="">Seleccione el estado del proyecto</option>
                            <option value="1">Eliminado</option>
                            <option value="2">En progreso</option>
                            <option value="3">Solicitado</option>
                            <option value="4">En planeación</option>
                            <option value="5">Activo</option>
                            <option value="6">Inactivo</option>
                        </select>
                        
                        
                    </div>
                        
                    <div className="mb-3" style={{marginBottom: '50px'}}>
                        <label  for="inputDate" className="form-label">
                            Seleccione la fecha de inicio:
                        </label>
                        <label  for="inputDate" className="form-label">
                            Seleccione la fecha de finalización:
                        </label>
                        <label  for="inputDate" className="form-label">
                            Seleccione los archivos adjuntos:
                        </label>
                        </div>
                        <div className="mb-3" style={{ display: 'flex',alignItems: 'flex-start'  }}>
                            <DatePicker
                                selected={fechaIncio}
                                onChange={handlefechaIncioChange}
                                dateFormat="dd/MM/yyyy"
                                inline
                                showYearDropdown
                                showMonthDropdown
                            />
                            <div style={{ marginLeft: '81px' }}>
                                <DatePicker
                                    selected={fechaFinalizacion}
                                    onChange={handlefechaFinalizacionChange}
                                    dateFormat="dd/MM/yyyy"
                                    inline
                                    showYearDropdown
                                    showMonthDropdown
                                />
                            </div>
                            <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px'}}>
                                <input
                                    style={{ marginLeft: '135px' }}
                                    type="file"
                                    key={fileInputKey}
                                    onChange={handleFileChange}
                                    multiple
                                />
                                <ul style={{ marginLeft: '150px', marginTop : '-15px'}}>
                                {selectedFiles.map((file, index) => (
                                    <li key={index}>
                                        {file.name}
                                        <button style={{ marginLeft: '10px', backgroundColor: '#ffffff', border: '0 transparent'} } onClick={() => handleRemoveFile(index)}>
                                            <MdOutlineDeleteForever style={{
                                            fontSize: '25px', // Tamaño del icono
                                        }}/></button>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mb-3" 
                                style={{ marginTop:  '40px' }} >
                                <div style={{ display: 'flex' }}>
                                <Styles> 
                                <Table columns={columns} data={servicios} handleidServicioChange={handleidServicioChange}/>
                                </Styles>
                                </div>     
                            </div>
                            
                            <div className="mb-3" 
                                style={{ marginTop:  '50px' }} >
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear proyecto
                            </button>
                            
                            </div>
        

                    </form>

            </div>
        </div>

    </Fragment>
     );
};