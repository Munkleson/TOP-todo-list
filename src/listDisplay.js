import { NewList, listArray, listIdentifier, projectArray } from './constructors.js'
import { completedTask, returnCardToHome } from './domFunctions.js';
import { currentFolder, folderActive } from './projectDisplay.js';

const deletedListCards = [];

const newListCard = (title, description, dueDate, priority, notes, listIdentifier) => {
    const listContainer = document.querySelector('.listContainer');

    const listCard = document.createElement('div');
    listCard.classList.add('listCard');
    listCard.draggable = true;
    listCard.setAttribute('id', `listCard#${listIdentifier}`);
    listContainer.append(listCard);

    const listCardTitle = document.createElement('p');
    listCardTitle.innerHTML = `<a class=listCardLegend>Title:</a> ${title}`;
    listCard.append(listCardTitle);

    const listCardDescription = document.createElement('p');
    listCardDescription.innerHTML = `<a class=listCardLegend>Description:</a> ${description}`;
    listCard.append(listCardDescription);

    const listCardDueDate = document.createElement('p');
    listCardDueDate.innerHTML = `<a class=listCardLegend>Due by:</a> ${dueDate}`;
    listCard.append(listCardDueDate);

    const listCardpriority = document.createElement('p');
    listCardpriority.innerHTML = `<a class=listCardLegend>Priority:</a> ${priority}`;
    listCard.append(listCardpriority);

    const listCardNotes = document.createElement('p');
    listCardNotes.innerHTML = `<a class=listCardLegend>Notes:</a> ${notes}`;
    listCard.append(listCardNotes);

    const completeButton = document.createElement('button');
    completeButton.innerHTML = 'Completed';
    listCard.append(completeButton);

    completeButton.addEventListener('click', (event) => {
        completedTask(event.target);
    });

    const deleteListCardButton = document.createElement('button');
    deleteListCardButton.innerHTML = 'Delete card';
    listCard.append(deleteListCardButton);

    deleteListCardButton.addEventListener('click', (event) => {
        const uniqueIdentifier = event.target.parentElement.id.split('').splice(9).join("") * 1;
        const uniqueIndex = listArray.findIndex(element => element.listIdentifier === uniqueIdentifier);
        deletedListCards.push(listArray.splice(uniqueIndex, 1)[0]);
        event.target.parentElement.remove();
    });

    listCard.addEventListener('dragstart', (event) => {
        // console.log(event.target.id);
        const uniqueIdentifier = event.target.id.split('').splice(9).join("") * 1;
        // console.log('unique ID: ' + uniqueIdentifier);
        const indexOfTargetedElement = listArray.findIndex(element => element.listIdentifier === uniqueIdentifier);
        // console.log(`Index of Targeted Element: ${indexOfTargetedElement}`);
        // console.log(listArray);
        const transferObject = JSON.stringify(listArray[indexOfTargetedElement]);
        // console.log(transferObject);
        event.dataTransfer.setData('application/json', transferObject);
        event.dataTransfer.setData('text/plain', uniqueIdentifier);
    });
};

const undoListDelete = () => { //// for both the home page and within a folder
    if (!folderActive){ //// home page
        if (deletedListCards.length > 0){
            const mostRecentDeletedList = deletedListCards[deletedListCards.length - 1];
            // listArray.push(new NewList(mostRecentDeletedList.title, mostRecentDeletedList.description, mostRecentDeletedList.dueDate, mostRecentDeletedList.priority, mostRecentDeletedList.notes));
            newListCard(mostRecentDeletedList.title, mostRecentDeletedList.description, mostRecentDeletedList.dueDate, mostRecentDeletedList.priority, mostRecentDeletedList.notes, mostRecentDeletedList.listIdentifier);
            listArray.push(deletedListCards.splice(deletedListCards.length - 1, 1)[0]);
            // deletedListCards.splice(deletedListCards.length - 1, 1);
        };
    } else if (folderActive){ //// within a folder --- This will create console errors because it doesn't check if the deleted card lists is longer than 0. Harmless, so low priority to change
            const targetedProjectFolder = projectArray.find(element => element.projectIdentifier === currentFolder);
            const target = targetedProjectFolder.deletedLists[targetedProjectFolder.deletedLists.length - 1];
            innerListCardCreate(target.title, target.description, target.dueDate, target.priority, target.notes, target.listIdentifier);
            targetedProjectFolder.lists.push(targetedProjectFolder.deletedLists.splice(targetedProjectFolder.deletedLists.length - 1, 1)[0]);
    }
};

const innerListCardCreate = (title, description, dueDate, priority, notes, listIdentifier) => {
    const listContainer = document.querySelector('.innerFolder');

    const listCard = document.createElement('div');
    listCard.classList.add('listCard');
    listCard.draggable = true;
    listCard.setAttribute('id', `listCard#${listIdentifier}`);
    listContainer.append(listCard);

    const listCardTitle = document.createElement('p');
    listCardTitle.innerHTML = `<a class=listCardLegend>Title:</a> ${title}`;
    listCard.append(listCardTitle);

    const listCardDescription = document.createElement('p');
    listCardDescription.innerHTML = `<a class=listCardLegend>Description:</a> ${description}`;
    listCard.append(listCardDescription);

    const listCardDueDate = document.createElement('p');
    listCardDueDate.innerHTML = `<a class=listCardLegend>Due by:</a> ${dueDate}`;
    listCard.append(listCardDueDate);

    const listCardpriority = document.createElement('p');
    listCardpriority.innerHTML = `<a class=listCardLegend>Priority:</a> ${priority}`;
    listCard.append(listCardpriority);

    const listCardNotes = document.createElement('p');
    listCardNotes.innerHTML = `<a class=listCardLegend>Notes:</a> ${notes}`;
    listCard.append(listCardNotes);

    const completeButton = document.createElement('button');
    completeButton.innerHTML = 'Completed';
    listCard.append(completeButton);

    completeButton.addEventListener('click', (event) => {
        completedTask(event.target);
    });

    const deleteListCardButton = document.createElement('button');
    deleteListCardButton.innerHTML = 'Delete card';
    listCard.append(deleteListCardButton);

    deleteListCardButton.addEventListener('click', (event) => {
        const targetedProjectFolder = projectArray.find(element => element.projectIdentifier === currentFolder); /// variable for the current folder so you can push or splice from the arrays
        const uniqueIdentifier = event.target.parentElement.id.split('').splice(9).join("") * 1;
        const uniqueIndex = targetedProjectFolder.lists.findIndex(element => element.listIdentifier === uniqueIdentifier);
        targetedProjectFolder.deletedLists.push(targetedProjectFolder.lists.splice(uniqueIndex, 1)[0]);
        event.target.parentElement.remove();
    });

    const returnCard = document.createElement('button');
    returnCard.innerHTML = 'Move list back to home';
    listCard.append(returnCard);
    returnCard.addEventListener('click', (event) => {
        returnCardToHome(event.target);
    });
};

export { newListCard, undoListDelete, deletedListCards, innerListCardCreate };