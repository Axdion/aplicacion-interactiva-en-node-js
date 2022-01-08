require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



console.clear();

const main = async() =>{
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    
    do {
        // Imprimir el menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                console.log(desc);
                tareas.crearTarea( desc );
                break;
        
            case '2':
                tareas.listadoCompleto();
                break;
            
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;

            case '5': //Completar pendientes
                const ids = await mostrarListadoCheckList( tareas.listadoArr);
                tareas.toggleCompletadas( ids );
                break;

            case '6': //borrar
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if (id!=0) {
                    const ok = await confirmar('Está seguro??');
                    //Verificar si está seguro
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                }
                }
                
                break;
        }

        guardarDB( tareas.listadoArr);
        await pausa();
        
    } while (opt!=='0');

    // pausa();
};

main();