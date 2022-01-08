const Tarea = require('./tarea');


class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = ''){
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        //this._listado(tarea.id)= tarea;
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '',) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        // 1: en verde
        // Completada: en verde
        // Pendiente: en rojo
        // 1. Alma :: Completada || Pendiente
        // 2. Poder :: Pendiente
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i+1}`;
            const { desc, completadoEn } = tarea;
            console.log(`${idx.green} ${tarea.desc.blue} :: ${tarea.completadoEn!=null? 'Completado'.green : 'Pendiente'.red}`);
        });
    }

    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        if(completadas){
            this.listadoArr.forEach( (tarea, i )=> {
                const { desc, completadoEn } = tarea;
                if(completadoEn!=null){
                    contador+=1;
                    console.log(`${(contador.toString()+'.').green} ${desc.blue} :: ${completadoEn.green}`);
                }
            });
        }
        else{
            this.listadoArr.forEach( (tarea, i )=> {
                const { desc, completadoEn } = tarea;
                if(completadoEn==null){
                    contador+=1;
                    console.log(`${(contador.toString()+'.').green} ${desc.blue} :: ${'Pendiente'.red}`);
                }
            });
        }
    }

    toggleCompletadas( ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    } 

}

module.exports = Tareas;