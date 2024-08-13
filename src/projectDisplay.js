import { projectArray, NewProject, projectIdentifier, listArray } from './constructors.js';
import { newListCard } from './listDisplay.js';

const newProjectFolder = (title, description, projectIdentifier) => {
    const projectContainer = document.querySelector('.projectContainer');
    
    const projectFolder = document.createElement('button');
    projectFolder.classList.add('projectFolder');
    projectFolder.draggable = true;
    projectFolder.setAttribute('id', `projectFolder#${projectIdentifier}`);
    projectFolder.innerHTML = title;
    projectContainer.append(projectFolder);


    projectFolder.addEventListener('dragover', (event) => {
        event.preventDefault();
        ///// adding styling to folders when hovered over only when dragging
        // const folders = document.querySelectorAll('.projectFolder');
        // folders.forEach(element => element.classList.add('projectFolderHover'));
        projectFolder.classList.add('projectFolderHover');
    });

    projectFolder.addEventListener('dragleave', () => {
        projectFolder.classList.remove('projectFolderHover');
    });

    projectFolder.addEventListener('drop', (event) => {
        event.preventDefault();
        projectFolder.classList.remove('projectFolderHover');
        const transferredObject = event.dataTransfer.getData('application/json');
        const data = JSON.parse(transferredObject);
        
        const uniqueProjectIdentifier = event.target.parentElement.id.split('').splice(14).join("") * 1;
        projectArray[uniqueProjectIdentifier].lists.push(data);

        //// removing list from listArray
        const transferredIndex = event.dataTransfer.getData('text') * 1;

        const uniqueIndex = listArray.findIndex(element => element.listIdentifier === transferredIndex);
        listArray.splice(uniqueIndex, 1);

        const listCardToRemove = document.getElementById(`listCard#${projectArray[uniqueProjectIdentifier].lists[projectArray[uniqueProjectIdentifier].lists.length - 1].listIdentifier}`);
        listCardToRemove.remove();
        console.log(listArray);
        console.log(projectArray);
    });
};




export { newProjectFolder };