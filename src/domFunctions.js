import { listArray, projectArray } from "./constructors";
import { newListCard } from "./listDisplay";
import { currentFolder, folderActive, newProjectFolder } from "./projectDisplay";


const newListForm = () => {
    const listFormContainer = document.createElement('div');
    listFormContainer.classList.add('listFormContainer');
    document.body.append(listFormContainer);

    const listFormDiv = document.createElement('form');
    listFormDiv.classList.add('listFormDiv');
    listFormContainer.append(listFormDiv);

    const listTitleInput = document.createElement('input');
    listTitleInput.placeholder = 'Title';
    listTitleInput.maxLength = '30';
    listTitleInput.name = "title";
    listFormDiv.append(listTitleInput);

    const listDescriptionInput = document.createElement('input');
    listDescriptionInput.placeholder = 'Description';
    listDescriptionInput.maxLength = '50';
    listDescriptionInput.name = "description";
    listFormDiv.append(listDescriptionInput);

    const listDueDateInput = document.createElement('input');
    listDueDateInput.placeholder = 'Due date';
    listDueDateInput.maxLength = '20';
    listDueDateInput.name = "due_date";
    listFormDiv.append(listDueDateInput);

    const listPriorityInput = document.createElement('input');
    listPriorityInput.placeholder = 'Priority - Enter a value from 1 to 10';
    listPriorityInput.maxLength = '2';
    listPriorityInput.name = "priority";
    listFormDiv.append(listPriorityInput);

    const listNoteInput = document.createElement('input');
    listNoteInput.placeholder = "Notes";
    listNoteInput.maxLength = '200';
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
    });
};

const reopenListCards = () => {
    listArray.forEach(element => {
        newListCard(element.title, element.description, element.dueDate, element.priority, element.notes, element.listIdentifier);
    });
};

const completedTask = (target) => {
    const currentListCard = target.parentElement;
    const currentListCardId = currentListCard.id.split("").splice(9).join("") * 1;
    if (folderActive){
        const targetFolder = projectArray.find(element => element.projectIdentifier === currentFolder);
        const currentListCardIndex = targetFolder.lists.findIndex(element => element.listIdentifier === currentListCardId); 
        targetFolder.lists.splice(currentListCardIndex, 1);
    } else if (!folderActive){
        const currentListCardIndex = listArray.findIndex(element => element.listIdentifier === currentListCardId);
        listArray.splice(currentListCardIndex, 1);
    }
    currentListCard.remove();
};

const returnCardToHome = (target) => { //// moves the list card back to the home page
    const currentListCard = target.parentElement;
    const currentListCardId = currentListCard.id.split("").splice(9).join("") * 1;
    const targetFolder = projectArray.find(element => element.projectIdentifier === currentFolder);
    const currentListCardIndex = targetFolder.lists.findIndex(element => element.listIdentifier === currentListCardId); 
    const currentList = targetFolder.lists[currentListCardIndex];

    // newListCard(currentList.title, currentList.description, currentList.dueDate, currentList.priority, currentList.notes, currentList.listIdentifier);
    listArray.push(targetFolder.lists.splice(currentListCardIndex, 1)[0]);
    // console.log(listArray);

    currentListCard.remove();
}

export { newListForm, newListFormActive, newProjectForm, newProjectFormActive, reopenListCards, reopenProjectFolders, completedTask, returnCardToHome };

