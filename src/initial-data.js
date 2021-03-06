const initialData = {
    tasks: {
        //we use the object key as the 'lookup' for the object
        'task-1': {id: 'task-1', content: "take out the trash"},
        'task-2': {id: 'task-2', content: "Make dinner"},
        'task-3': {id: 'task-3', content: "Clean kitchen"},
        'task-4': {id: 'task-4', content: "Go to class"}

    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds:['task-1','task-2','task-3','task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds:[]
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds:[]
        }
    },
    columnOrder: ['column-1','column-2','column-3']
}

export default initialData;

