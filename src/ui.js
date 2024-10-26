// ui.js

import { Item, Project } from "./constructors";
import { existingProjects, updateAndSave } from './storage';

import deleteIcon from './img/delete.svg';
import editIcon from './img/edit.svg'

const createElement = (() => {

    function createProject() {
        const container = document.querySelector('#container');
        const dialog = document.createElement('dialog');
        container.appendChild(dialog);

        const form = document.createElement('form');
        form.setAttribute('method', 'dialog');
        dialog.appendChild(form);

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Title');
        input.setAttribute('required', true);
        form.appendChild(input);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btnContainer');

        const addBtn = document.createElement('button');
        addBtn.setAttribute('type', 'submit');
        addBtn.textContent = 'Add';
        addBtn.addEventListener('click', () => {

        });

        const cancelBtn = document.createElement('button');
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.textContent = 'Cancel'
        cancelBtn.addEventListener('click', () => {
            dialog.close();
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            existingProjects.push(new Project(input.value));
            updateAndSave();
            displayElement.displayProject();
            dialog.close();
        });

        btnContainer.append(addBtn, cancelBtn);
        form.appendChild(btnContainer);
        dialog.showModal();

    }

    function createItem() {
        const container = document.querySelector('#container');
        const dialog = document.createElement('dialog');
        container.appendChild(dialog);

        const form = document.createElement('form');
        form.setAttribute('method', 'dialog');
        dialog.appendChild(form);

        const title = document.createElement('input');
        title.setAttribute('type', 'text');
        title.setAttribute('placeholder', 'Title');
        title.setAttribute('required', true);
        form.appendChild(title);

        const description = document.createElement('input');
        description.setAttribute('type', 'text');
        description.setAttribute('placeholder', 'Description');
        description.setAttribute('required', true);
        form.appendChild(description);

        const dueDate = document.createElement('input');
        dueDate.setAttribute('type', 'date');
        dueDate.setAttribute('placeholder', 'Due Date');
        dueDate.setAttribute('required', true);
        form.appendChild(dueDate);

        const priority = document.createElement('select');
        priority.setAttribute('required', true);
        ['Low', 'Medium', 'High'].forEach(level => {
            const option = document.createElement('option');
            option.textContent = level;
            priority.appendChild(option);
        });
        form.appendChild(priority);

        const projectList = document.createElement('select');
        projectList.setAttribute('required', true);
        existingProjects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.title;
            option.textContent = project.title;
            projectList.appendChild(option);

        });
        form.appendChild(projectList);
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btnContainer');

        const addBtn = document.createElement('button');
        addBtn.setAttribute('type', 'submit');
        addBtn.textContent = 'Add';
        addBtn.addEventListener('click', () => {

        });

        const cancelBtn = document.createElement('button');
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.textContent = 'Cancel'
        cancelBtn.addEventListener('click', () => {
            dialog.close();
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const selectedProject = existingProjects.find(
                project => project.title === projectList.value
            );

            const newItem = new Item(
                title.value,
                description.value,
                dueDate.value,
                priority.value,
                projectList.value
            );

            selectedProject.addItem(newItem);
            updateAndSave();

            displayElement.displayItem(selectedProject);
            dialog.close();
        });

        btnContainer.append(addBtn, cancelBtn);
        form.appendChild(btnContainer);
        dialog.showModal();
    }

    return { createProject, createItem }

})();

const displayElement = (() => {

    function displayProject() {
        const projectsContainer = document.querySelector('#projectsContainer');
        projectsContainer.innerHTML = '';

        existingProjects.forEach((project) => {
            const projectDiv = document.createElement('div');
            const btnDiv = document.createElement('div');
            projectDiv.classList.add('projectBox');
            projectDiv.textContent = project.title;

            projectDiv.addEventListener('click', () => {
                displayItem(project);
            });

            const editImg = document.createElement('img');
            editImg.classList.add('actionIcon');
            editImg.src = editIcon;
            editImg.addEventListener('click', () => {
                editElement.editProject(project);
            });

            const delImg = document.createElement('img');
            delImg.classList.add('actionIcon');
            delImg.src = deleteIcon;
            delImg.addEventListener('click', () => {
                editElement.deleteProject(project);
            });

            btnDiv.append(editImg, delImg);
            projectDiv.appendChild(btnDiv);

            projectsContainer.appendChild(projectDiv);
        });
    }

    function displayItem(selectedProject) {
        const itemsContainer = document.querySelector('#container');
        itemsContainer.innerHTML = '';

        if (selectedProject.items.length === 0) {
            const noItems = document.createElement('p');
            noItems.textContent = 'No items in this project.';
            itemsContainer.appendChild(noItems);
        } else {
            selectedProject.items.forEach((item) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('itemBox');
                const textDiv = document.createElement('div');
                const btnDiv = document.createElement('div');

                textDiv.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p>Due: ${item.dueDate}</p>
                <p>Priority: ${item.priority}</p>
                `;

                const editImg = document.createElement('img');
                editImg.classList.add('actionIcon');
                editImg.src = editIcon;
                editImg.addEventListener('click', () => {
                    editElement.editItem(selectedProject, item);
                });

                const delImg = document.createElement('img');
                delImg.classList.add('actionIcon');
                delImg.src = deleteIcon;
                delImg.addEventListener('click', () => {
                    editElement.deleteItem(selectedProject, item);
                });

                btnDiv.append(editImg, delImg);
                itemDiv.append(textDiv, btnDiv);
                itemsContainer.appendChild(itemDiv);
            });
        }
    }

    return { displayProject, displayItem }

})();

const editElement = (() => {

    function editProject(project) {
        const container = document.querySelector('#projectsContainer');
        const dialog = document.createElement('dialog');
        container.appendChild(dialog);

        const form = document.createElement('form');
        form.setAttribute('method', 'dialog');
        dialog.appendChild(form);

        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('value', project.title);
        form.appendChild(titleInput);

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        form.appendChild(saveBtn);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            project.title = titleInput.value;
            updateAndSave();
            displayElement.displayProject();
            dialog.close();
        });

        dialog.showModal();
    }

    function deleteProject(project) {
        const projectIndex = existingProjects.indexOf(project);
        if (projectIndex > -1) {
            existingProjects.splice(projectIndex, 1);
            updateAndSave();
            displayElement.displayProject();
        }
    }

    function editItem(project, item) {
        const container = document.querySelector('#container');
        const dialog = document.createElement('dialog');
        container.appendChild(dialog);

        const form = document.createElement('form');
        form.setAttribute('method', 'dialog');
        dialog.appendChild(form);

        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('value', item.title);
        form.appendChild(titleInput);

        const descInput = document.createElement('input');
        descInput.setAttribute('type', 'text');
        descInput.setAttribute('value', item.description);
        form.appendChild(descInput);

        const dueDateInput = document.createElement('input');
        dueDateInput.setAttribute('type', 'date');
        dueDateInput.setAttribute('value', item.dueDate);
        form.appendChild(dueDateInput);

        const priorityInput = document.createElement('select');
        ['Low', 'Medium', 'High'].forEach(level => {
            const option = document.createElement('option');
            option.textContent = level;
            option.selected = (level === item.priority);
            priorityInput.appendChild(option);
        });
        form.appendChild(priorityInput);

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        form.appendChild(saveBtn);

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            item.editParameters('title', titleInput.value);
            item.editParameters('description', descInput.value);
            item.editParameters('dueDate', dueDateInput.value);
            item.editParameters('priority', priorityInput.value);

            updateAndSave();
            displayElement.displayItem(project);
            dialog.close();
        });

        dialog.showModal();
    }

    function deleteItem(project, item) {
        project.deleteItem(item);
        updateAndSave();
        displayElement.displayItem(project);
    }

    return { editProject, deleteProject, editItem, deleteItem }

})();

export { createElement, displayElement };