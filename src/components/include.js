import { headerjs } from '/src/components/header/header.js';

function includeHTML(element, onSuccess) {
  const { includePath } = element.dataset;
  if (includePath) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        element.outerHTML = this.responseText;
        onSuccess();
      }
    };
    xhr.open('GET', includePath, true);
    xhr.send();
  }
}

function loadIncludedHTML() {
  const allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, (item) => {
    includeHTML(item, () => {
      if (item.tagName === 'HEADER') header();
    });
  });
}

const header = () => {
  // let state = false;
  // const ul = document.querySelector('ul');
  // ul.insertAdjacentHTML('beforeend',`${state ? '<li>login</li>' : '<li>logout</li>'}`)
  headerjs();
};

window.addEventListener('load', loadIncludedHTML);
