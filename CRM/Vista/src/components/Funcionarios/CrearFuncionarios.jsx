import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../Clientes/CSSClientes/Clientes.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Select from 'react-select';

export const CrearFuncionarios = () => {
    let navigate = useNavigate();
    const gotoCliente = () => { navigate('/funcionarios'); }


    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const fechaNacimientoInicial = new Date();
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    fechaNacimientoInicial.setFullYear(fechaNacimientoInicial.getFullYear() - 10);

    const [fechaNacimiento, setFechaNacimiento] = useState(fechaNacimientoInicial);

    const handleFechaNacimientoChange = (date) => {
        setFechaNacimiento(date);
    };
    
    const handleCrearPerfil= async (event) => {
        event.preventDefault();  
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
      	
        Swal.fire({
            title: 'Crear perfil',
            input: 'text',
            inputLabel: 'Nombre del perfil',
            inputPlaceholder: 'Ingrese el nombre del perfil',
            showDenyButton: true, // Agregar botones de confirmación y cancelación
            confirmButtonText: 'Aceptar', // Cambiar texto del botón de confirmación
            denyButtonText: 'Cancelar', // Cambiar texto del botón de cancelación
            allowOutsideClick: false, // Evitar cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              const nombre = result.value; // Obtener el valor del input
              if (nombre !== '') {
                //Enviar al backend
                //Recuperar opcion creada
                setOptions((prevOptions) => [
                    ...prevOptions,
                    { value: nombre, label: nombre },
                  ]);
                Swal.fire('Se ingresó correctamente: ' + nombre);
              } else {
                Swal.fire('Incorrecto', 'Debe ingresar el nombre', 'error');
              }
            } else if (result.isDenied) {
              Swal.fire('Operación cancelada');
            }
          })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();  
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
        Swal.fire({
            title: 'Confirmación',
            text: 'El empleado se ha creado satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
          }).then((result) => {
            if (result.isConfirmed) {
              // El usuario hizo clic en "OK", entonces llama a la función gotoMenu
              gotoCliente();
            }
          });
        
    };
    const handleSearch = async () => {
        const opcionesDesdeBackend = [
            { id: 1, nombre: 'Opción 1' },
            { id: 2, nombre: 'Opción 2' },
            { id: 3, nombre: 'Opción 3' },
            
            { id: 4, nombre: 'Opción 4' },
            { id: 5, nombre: 'Opción 5' },
            { id: 6, nombre: 'Opción 6' },
            { id: 7, nombre: 'Opción 7' },
            { id: 8, nombre: 'Opción 8' },
            { id: 9, nombre: 'Opción 9' },
          ];
            // Mapeamos las opciones desde el backend al formato que utiliza react-select
            const opcionesFormateadas = opcionesDesdeBackend.map((opcion) => ({
                value: opcion.id,
                label: opcion.nombre,
            }));
        
            setOptions(opcionesFormateadas);
    };
      const handleSelectChange = (selected) => {
        setSelectedOption(selected);
      };

    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleNameChange = (event) => {
        setNombre(event.target.value);
    };
    const handleApellidoChange = (event) => {
        setApellido(event.target.value);
    };
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    const handleTelefonoChange = (event) => {
        setTelefono(event.target.value);
    };
    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };
    // const customStyles = {
    //       control: (provided) => ({
    //         ...provided,
    //         width: '300px', // Ancho deseado
    //         height: '47px', // Altura deseada
    //       }),
    //     };
    const customStyles = {
        control: (provided) => ({
          ...provided,
          width: '300px', // Establece el ancho deseado
          minHeight: '47px', // Establece la altura deseada
        }),
        menu: (provided) => ({
          ...provided,
          overflowX: 'auto', // Habilita el desplazamiento horizontal
        }),
      };
      React.useEffect(() => {
        handleSearch()
    }, []);
    return (
        
        <Fragment>
        <div className="container"> 
        <Navbar />
        <div class="row">
                    <div class="col-sm-3">
                        <Title>Crear Funcionario</Title>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label style={{ marginRight: '150px' }} for="nameInput" class="form-label">Nombre:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '150px'  }}for="apellidoInput" class="form-label">Apellido:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el primer apellido" value={apellido} onChange={handleApellidoChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '160px' }}for="nameInput" class="form-label">Cédula:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese la Cédula Juridica" value={cedula} onChange={handleCedulaChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '50px' }} for="nameInput" class="form-label">Número de teléfono:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el número de teléfono " value={telefono} onChange={handleTelefonoChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '160px' }} for="nameInput" class="form-label">Correo:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el correo electronico" value={correo} onChange={handleCorreoChange}/>
                        </div>
                        <div className="mb-3"style={{ marginBottom:  '50px' }}>
                        <label  for="inputDate" className="form-label" style={{ marginRight:  '100px' }} >
                            Seleccione la fecha de nacimiento:
                        </label>
                        <label  for="inputDate" className="form-label" >
                        Seleccione el o los tipo(s) de perfil(es)
                        </label>
                        </div>
                        <div className="mb-3" style={{ display: 'flex', alignItems: 'flex-start'  }}>
                            <DatePicker
                                selected={fechaNacimiento}
                                onChange={handleFechaNacimientoChange}
                                dateFormat="dd/MM/yyyy"
                                inline
                                showYearDropdown
                                showMonthDropdown
                                maxDate={fechaNacimientoInicial}
                            />
                            <div style={{marginLeft: '150px'}}>
                                <Select
                                    options={options}
                                    isMulti
                                    name="colors"
                                    classNamePrefix="select"
                                    className="basic-multi-select"
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    styles={customStyles}
                                />
                            </div>
                            <div style={{marginLeft: '150px'}}>
                                <button className='button2' onClick={handleCrearPerfil}>
                                    <AiOutlinePlusCircle style={{
                                                fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                            }} /> Crear perfil
                                </button>
                            </div>
                        </div>
                                                                    
                        <div className="mb-3" style={{ marginRight: '140px', marginTop:  '100px' }} >
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear funcionario
                            </button>
                        
                        </div>
        

                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};