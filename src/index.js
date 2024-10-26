// index.js

import { Project } from './constructors';
import './style.css';
import { createElement, displayElement } from './ui';

const newProject = document.querySelector('#newProject');
newProject.addEventListener('click', () => {
    createElement.createProject();
});

const newItem = document.querySelector('#newItem');
newItem.addEventListener('click', () => {
    createElement.createItem();
});

window.addEventListener('DOMContentLoaded', () => {
    displayElement.displayProject();

});