import {Task} from "./task.js";

class Tasks{

    _list = {}; 

    get listArray () {

        const list = []; 
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task) 
        });

        return list;
    }//finish get listArray

    constructor (){
        this._list = {};
    }

    DeleteTask(id = ''){
        if(!this._list[id] )return
        delete this._list[id];
    }

    LoadInformationFromDatabase (tasks = [] ){
        const data = tasks.reduce((acc, item) => {
            acc[item.id] = item
            return acc
        }, {})

        this._list = data

        /*tasks.forEach(task => {
            this._list[task.id] = task;
        });*/
    }//finish LoadInformationFromDatabase

    createTask( desc = ''){
        const task = new Task(desc);
        this._list[task.id] = task; 
    }//finish createTask

    listTaks(){

        //Soloción Mía
        console.log(''); 
        for (let i = 0; i < this.listArray.length; i++) {
            console.log(`${`${i + 1}.`.green} ${this.listArray[i].desc} | ${this.listArray[i].completeEn ? `${'Completada'}`.green : `${'Pendiente'}`.red}`)
        }

        //Solución del curso 
       /*console.log(''); 
        this.listArray.forEach( (task, id) => {
            const idx = `${id + 1 }`.green; 
            const {desc, completeEn} = task;
            const state = (completeEn) ? 'Completada'.green : 'Pendiente'.red; 
            console.log(`${idx} ${desc} :: ${state}`);
        });*/
    }//finish listTaksComplete


    ListPendingORCompleteTasks( condition){

            //Solución Mía 
            if(condition){
                //Completed Tasks
                console.log(''); 
                for (let i = 0; i < this.listArray.length; i++) {
                    if(this.listArray[i].completeEn){
                        console.log(`${`${i + 1}.`.green} ${this.listArray[i].desc} | ${this.listArray[i].completeEn ? `${'Completada'}`.green : ''}`); 
                    }
                }

            }else{
                //Pending tasks
                console.log(''); 
                for (let i = 0; i < this.listArray.length; i++) {
                    if(!this.listArray[i].completeEn){
                        console.log( `${`${i + 1}.`.green} ${this.listArray[i].desc} | ${this.listArray[i].completeEn ? '' : `${'Pendiente'}`.red}` ); 
                    }
                }

            }

            //Solución de la Clase 
           /* console.log();
            let contador = 0;
            this.listadoArr.forEach( tarea => {
    
                const { desc, completadoEn } = tarea;
                const estado = ( completadoEn ) 
                                    //? 'Completada'.green
                                    : 'Pendiente'.red;
                if ( completadas ) {
                    // mostrar completadas
                    if ( completadoEn ) {
                        contador += 1;
                        console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                    }
                } else {
                    // mostrar pendientes
                    if ( !completadoEn ) {
                        contador += 1;
                        console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                    }
                }
    
            });*/

    }//finish ListPendingORCompleteTasks


    ChangeTaskStatus( ids = [] ){
        
       ids.forEach( id => {
            const task = this._list[id]; 
            if( !task.completeEn ){
                task.completeEn = new Date().toISOString();
            }
        });

        this.listArray.forEach( task => {

            if ( !ids.includes(task.id) ) {
                this._list[task.id].completeEn = null;
            }

        });

    }//finish ChangeTaskStatus


}

export {
    Tasks,

};