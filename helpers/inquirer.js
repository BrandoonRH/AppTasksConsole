import inquirer from 'inquirer';
    
import colors from 'colors';

const menuOpts = [
  {
    type: 'list',
    name: 'option',
    message: 'Seleccione una opción',
    choices: [
        {
            value: '1',
            name: `${'1.'.green} Crear Tarea`

        },
        {
            value: '2',
            name: `${'2.'.green} Listar Tareas`

        },
        {
            value: '3',
            name: `${'3.'.green} Listar Tareas Completadas`

        },
        {
            value: '4',
            name: `${'4.'.green} Listar Tareas Pendientes`

        },
        {
            value: '5',
            name: `${'5.'.green} Completar Tarea(s)`

        },
        {
            value: '6',
            name: `${'6.'.green} Borrar Tarea`

        },
        {
            value: '0',
            name: `${'0.'.green} Salir`

        },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('==========================='.green);
  console.log('   Seleccione una opción'.gray);
  console.log('===========================\n'.green);

  const {option} = await inquirer.prompt(menuOpts);

  return option;
};

const pause = async () => {

    const alertPause = [
        {
          type: 'input',
          name: 'enter',
          message: `\nPrecione ${ 'ENTER'.red } para continuar\n`,
        
        },
      ];
      console.log('\n'); 
     await inquirer.prompt(alertPause);
      
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese el valor'
                }
                return true; 
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc; 
}

const ListTasksDelete = async (tasks = [] ) => {

    const choices = tasks.map( (task, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    }); 

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar '
    }); 

    const questions = [
        {
            type: 'list', 
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(questions);  
    return id; 


}//Finish ListTasksDelete

const ConfirmDeleteTask = async(message) => {

    const question = [
        {
            type: 'confirm', 
            name: 'ok', 
            message
        }
    ]; 

    const {ok} = await inquirer.prompt(question); 
    return ok; 
}

const showCheckList = async (tasks = [] ) => {

    const choices = tasks.map( (task, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: ( task.completeEn ) ? true : false
        }
    }); 

    const question = [
        {
            type: 'checkbox', 
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(question);  
    return ids; 


}//Finish showCheckList

export { 
    inquirerMenu, 
    pause,
    readInput,
    ListTasksDelete,
    ConfirmDeleteTask,
    showCheckList 
};