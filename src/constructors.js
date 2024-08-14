
const listArray = [];
const projectArray = [];


class NewList {
    constructor(title, description, dueDate, priority, notes, listIdentifier){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        // this.checklist = checklist;
        this.listIdentifier = listIdentifier;
    }
}

class NewProject {
    constructor(title, description, projectIdentifier){
        this.title = title;
        this.description = description;
        this.lists = [];
        this.deletedLists = [];
        this.projectIdentifier = projectIdentifier;
    }
}

export { NewList, listArray, projectArray, NewProject };