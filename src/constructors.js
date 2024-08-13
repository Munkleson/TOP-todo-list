
const listArray = [];
const projectArray = [];

let listIdentifier = 0;

class NewList {
    constructor(title, description, dueDate, priority, notes, checklist){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        // this.checklist = checklist;
        this.listIdentifier = listIdentifier;
    }
}

let projectIdentifier = 0;

class NewProject {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.lists = [];
        this.deletedLists = [];
        this.projectIdentifier = projectIdentifier;
    }
}









export { NewList, listArray, listIdentifier, projectArray, NewProject, projectIdentifier };