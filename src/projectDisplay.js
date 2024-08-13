import { projectArray, NewProject, projectIdentifier, listArray } from './constructors.js';
import { reopenListCards, reopenProjectFolders } from './domFunctions.js';
import { innerListCardCreate, newListCard } from './listDisplay.js';

let folderActive = false;

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
        
        const uniqueProjectIdentifier = event.target.id.split('').splice(14).join("") * 1;
        // console.log(uniqueProjectIdentifier);
        projectArray[uniqueProjectIdentifier].lists.push(data);

        //// removing list from listArray
        const transferredIndex = event.dataTransfer.getData('text') * 1;

        const uniqueIndex = listArray.findIndex(element => element.listIdentifier === transferredIndex);
        listArray.splice(uniqueIndex, 1);

        const listCardToRemove = document.getElementById(`listCard#${projectArray[uniqueProjectIdentifier].lists[projectArray[uniqueProjectIdentifier].lists.length - 1].listIdentifier}`);
        listCardToRemove.remove();
        // console.log(listArray);
        // console.log(projectArray);
    });

    /////// When you double click a folder - deletes everything in the DOM

    projectFolder.addEventListener('dblclick', (event) => {
        folderActive = true;
        const projectContainer = document.querySelector('.projectContainer');
        const listContainer = document.querySelector('.listContainer');
        projectContainer.remove();
        listContainer.remove();

        //////// opens the folder to view all the cards within

        const innerFolder = document.createElement('div');
        innerFolder.classList.add('innerFolder');
        document.body.append(innerFolder);
        
        const projectIndex = event.target.id.split('').splice(14).join("") * 1;
        // const uniqueIndex = listArray.findIndex(element => element.listIdentifier === uniqueIdentifier);
        projectArray[projectIndex].lists.forEach(element => {
            innerListCardCreate(element.title, element.description, element.dueDate, element.priority, element.notes);
        });


        const closeFolderButton = document.createElement('button');
        closeFolderButton.innerText = "Close Folder";
        document.body.append(closeFolderButton);
        //////// when you close a folder - reopens the home page and restores DOM
        closeFolderButton.addEventListener('click', (event) => {
            innerFolder.remove();
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('projectContainer');
            document.body.append(projectContainer);
            const listContainer = document.createElement('div');
            listContainer.classList.add('listContainer');
            document.body.append(listContainer);

            reopenProjectFolders();
            reopenListCards();

            event.target.remove();
            folderActive = false;
        });
    });
};




export { newProjectFolder, folderActive };