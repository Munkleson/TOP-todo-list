import { newListForm, newListFormActive, newProjectForm, newProjectFormActive } from "./domFunctions";
import { NewList, listArray, listIdentifier, projectArray, NewProject, projectIdentifier } from "./constructors";
import './styles.css';
import { newListCard, undoListDelete, deletedListCards } from "./listDisplay";
import { folderActive, newProjectFolder } from "./projectDisplay";

//// creates the popup window to create a form to enter a new list
const newListButton = document.getElementsByClassName('newListButton');
newListButton[0].addEventListener('click', () => {
    if (!folderActive){
        if (newListFormActive){
            const listFormContainer = document.querySelector('.listFormContainer');
            listFormContainer.remove();
            newListFormActive = false;
        } else if (!newProjectFormActive) {
            newListForm();
            newListFormActive = true;
            const listFormContainer = document.querySelector('.listFormContainer');
            const listForm = document.querySelector('.listFormDiv');
            const closePopupButton = document.querySelector('.closePopupButton');
    
            listForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const form = event.target;
                const formTitle = form.elements['title'].value;
                const formDescription = form.elements['description'].value;
                const formDueDate = form.elements['due_date'].value;
                const formPriority = form.elements['priority'].value;
                const formNotes = form.elements['notes'].value;
    
                listArray.push(new NewList(formTitle, formDescription, formDueDate, formPriority, formNotes));
                newListCard(formTitle, formDescription, formDueDate, formPriority, formNotes, listIdentifier);
    
                listFormContainer.remove();
                newListFormActive = false;
                listIdentifier++;
            });
            closePopupButton.addEventListener('click', () => {
                listFormContainer.remove();
                newListFormActive = false;
            });
        };
    }
});

const undoListDeleteButton = document.querySelector('.undoListDelete');
undoListDeleteButton.addEventListener('click', () => {
    if (deletedListCards.length > 0){
        undoListDelete();
    } else if (folderActive){
        undoListDelete();
    }
});


//// new project form popup
const newProjectButton = document.querySelector('.newProjectButton');
newProjectButton.addEventListener('click', () => {
    if (!folderActive){
        if (newProjectFormActive){
            const projectFormContainer = document.querySelector('.projectFormContainer');
            projectFormContainer.remove();
            newProjectFormActive = false;
        } else if (!newListFormActive) {
            newProjectFormActive = true;
            newProjectForm();
    
            const projectFormContainer = document.querySelector('.projectFormContainer');
            const projectForm = document.querySelector('.projectFormDiv');
            const closePopupButton = document.querySelector('.closePopupButton');
    
            projectForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const form = event.target;
                const formTitle = form.elements['title'].value;
                const formDescription = form.elements['description'].value;
    
                projectArray.push(new NewProject(formTitle, formDescription, projectIdentifier));
                newProjectFolder(formTitle, formDescription, projectIdentifier);
    
                projectFormContainer.remove();
                newProjectFormActive = false;
                projectIdentifier++;
            });
    
            closePopupButton.addEventListener('click', () => {
                projectFormContainer.remove();
                newProjectFormActive = false;
            });
        }
    }
})
















