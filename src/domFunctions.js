import { listArray, projectArray } from "./constructors";
import { newListCard } from "./listDisplay";
import { newProjectFolder } from "./projectDisplay";


const newListForm = () => {
    const listFormContainer = document.createElement('div');
    listFormContainer.classList.add('listFormContainer');
    document.body.append(listFormContainer);

    const listFormDiv = document.createElement('form');
    listFormDiv.classList.add('listFormDiv');
    listFormContainer.append(listFormDiv);

    const listTitleInput = document.createElement('input');
    listTitleInput.placeholder = 'Title';
    listTitleInput.name = "title";
    listFormDiv.append(listTitleInput);

    const listDescriptionInput = document.createElement('input');
    listDescriptionInput.placeholder = 'Description';
    listDescriptionInput.name = "description";
    listFormDiv.append(listDescriptionInput);

    const listDueDateInput = document.createElement('input');
    listDueDateInput.placeholder = 'Due date';
    listDueDateInput.name = "due_date";
    listFormDiv.append(listDueDateInput);

    const listPriorityInput = document.createElement('input');
    listPriorityInput.placeholder = 'Priority - Enter a value from 1 to 10';
    listPriorityInput.name = "priority";
    listFormDiv.append(listPriorityInput);

    const listNoteInput = document.createElement('input');
    listNoteInput.placeholder = "Notes";
    listNoteInput.name = "notes";
    listFormDiv.append(listNoteInput);

    const listSubmitButton = document.createElement('input');
    listSubmitButton.type = 'submit';
    listSubmitButton.value = 'Submit';
    listSubmitButton.classList.add('listSubmitButton');
    listFormDiv.append(listSubmitButton);

    const closePopupButton = document.createElement('button');
    closePopupButton.textContent = 'Close';
    closePopupButton.classList.add('closePopupButton');
    listFormContainer.append(closePopupButton);
};

let newListFormActive = false;

const newProjectForm = () => {
    const projectFormContainer = document.createElement('div');
    projectFormContainer.classList.add('projectFormContainer');
    document.body.append(projectFormContainer);

    const projectFormDiv = document.createElement('form');
    projectFormDiv.classList.add('projectFormDiv');
    projectFormContainer.append(projectFormDiv);

    const projectTitleInput = document.createElement('input');
    projectTitleInput.placeholder = 'Title';
    projectTitleInput.name = "title";
    projectFormDiv.append(projectTitleInput);

    const projectDescriptionInput = document.createElement('input');
    projectDescriptionInput.placeholder = 'Description';
    projectDescriptionInput.name = "description";
    projectFormDiv.append(projectDescriptionInput);

    const projectSubmitButton = document.createElement('input');
    projectSubmitButton.type = 'submit';
    projectSubmitButton.value = 'Submit';
    projectSubmitButton.classList.add('listSubmitButton');
    projectFormDiv.append(projectSubmitButton);

    const closePopupButton = document.createElement('button');
    closePopupButton.textContent = 'Close';
    closePopupButton.classList.add('closePopupButton');
    projectFormContainer.append(closePopupButton);
}

let newProjectFormActive = false;

const reopenProjectFolders = () => {
    projectArray.forEach(element => {
        newProjectFolder(element.title, element.description, element.projectIdentifier);
        console.log(element);
    });
};

const reopenListCards = () => {
    listArray.forEach(element => {
        newListCard(element.title, element.description, element.dueDate, element.priority, element.notes, element.listIdentifier);
    });
};

export { newListForm, newListFormActive, newProjectForm, newProjectFormActive, reopenListCards, reopenProjectFolders };

