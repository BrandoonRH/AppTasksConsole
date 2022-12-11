import colors from 'colors';
import { inquirerMenu, pause, readInput, ListTasksDelete, ConfirmDeleteTask, showCheckList  } from './helpers/inquirer.js';
import { saveDB, readDB } from './helpers/saveFile.js';
import {Tasks} from './models/tasks.js';
console.clear();

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const tasksDB = readDB();
  if (tasksDB) {
    tasks.LoadInformationFromDatabase(tasksDB); 
  }
 
  
  do {
    opt = await inquirerMenu();
    
    switch(opt){

        case '1': //Create Task 
            const desc = await readInput('Descripción: ');
            tasks.createTask( desc ); 
        break; 

        case '2': //list tasks
            tasks.listTaks(); 
        break;  

        case '3': //list completed tasks
            tasks.ListPendingORCompleteTasks(true);
        break;  

        case '4': //List pending tasks
        tasks.ListPendingORCompleteTasks(false);
        break;  

        case '5': //Complete a task
              const ids = await showCheckList(tasks.listArray);
              //console.log(ids); 
              tasks.ChangeTaskStatus(ids); 
        break; 

        case '6': //Delete a task
              const id = await ListTasksDelete(tasks.listArray);
              if(id !== '0'){
                //Confirm if you want to delete tasks
                const ok = await ConfirmDeleteTask('¿Seguro que desea eliminar la tarea?: '); 

                if(ok){
                  tasks.DeleteTask(id)
                  console.log('Tarea Borrada'.yellow); 
                }
              }
        break;  

    }//Finish switch

    saveDB(tasks.listArray); 
    await pause();
    

    
  } while (opt !== '0');

};

main();