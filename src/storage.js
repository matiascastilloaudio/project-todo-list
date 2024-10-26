// storage.js

import { Project, Item } from "./constructors";

const STORAGE_KEY = "projectsData";

function loadStorage() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const data = storedData ? JSON.parse(storedData) : [];

    if (data.length === 0) {
        const defaultProject = new Project("Default Project");
        data.push(defaultProject);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    return data.map(projectData => {
        const project = new Project(projectData.title);
        project.items = projectData.items.map(itemData =>
            new Item(itemData.title, itemData.description, itemData.dueDate, itemData.priority, itemData.projectList)
        );
        return project;
    });
}

let existingProjects = loadStorage();

function updateAndSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingProjects));
}

export { existingProjects, updateAndSave };