// constructors.js

class Project {
    constructor(title) {
        this.title = title;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    deleteItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

}

class Item {
    constructor(title, description, dueDate, priority, projectList) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectList = projectList;
    }

    editParameters(parameter, value) {
        if (this.hasOwnProperty(parameter)) {
            this[parameter] = value;
        }
    }
}

export { Project, Item };