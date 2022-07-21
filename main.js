const submit = document.querySelector('#submit');
const input = document.querySelector('#entry');
const ul = document.querySelector('#ul-list');

const object = {
  entry: [],
  entryId: 0
};

window.addEventListener('load', () => {
  const retrieveEntries = localStorage.getItem('to-do-list');
  if (retrieveEntries) {
    const parse = JSON.parse(retrieveEntries);
    object.entry = parse.entry;
    object.entryId = parse.entry[parse.entry.length - 1].entryId + 1;
    renderEntries(object.entry);
  }
});


submit.addEventListener('click', () => {
  event.preventDefault();
  const entryObject = {};
  const entryText = document.forms['to-do-list'].entry.value;
  entryObject.entry = entryText;
  entryObject.entryId = object.entryId
  object.entry.push(entryObject);
  const div = document.createElement('div');
  div.setAttribute('entry-id', object.entryId);

  const li = document.createElement('li');
  li.textContent = entryText;
  div.appendChild(li);

  const section = document.createElement('section');
  li.appendChild(section);
  section.setAttribute('entry-id', index.entryId);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.setAttribute('value', 'edit')
  section.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('value', 'delete')
  section.appendChild(deleteBtn);

  ul.appendChild(div);
  object.entryId++
  document.forms['to-do-list'].reset();
});


window.addEventListener('beforeunload', () => {
  const stringify = JSON.stringify(object);
  localStorage.setItem('to-do-list', stringify);
});

ul.addEventListener('click', (e) => {
  let div = e.target.closest('div');
  let id = div.getAttribute('entry-id');
  if (e.target.nodeName === 'BUTTON' && e.target.value === 'delete') {
    for (let i = 0; i < object.entry.length; i++) {
      if (id == object.entry[i].entryId) {
        object.entry.splice(i, 1);
      }
    }
    div.remove();
  } else if (e.target.nodeName === 'BUTTON' && e.target.value === 'edit') {
    let section = e.target.closest('section');
    const original = e.target.closest('section');
    let li = e.target.closest('li');
    const form = document.createElement('form');
    form.setAttribute('name', 'edit');
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'edit-textarea');
    for (let i = 0; i < object.entry.length; i++) {
      if (object.entry[i].entryId == id) {
        textarea.textContent = object.entry[i].entry;
      }
    }

    const divArray = document.querySelectorAll('div#entry-id').length;
    console.log(divArray)


    form.appendChild(textarea);
    const div = document.createElement('div');
    form.appendChild(div);
    const button = document.createElement('button');
    button.setAttribute('class', 'cancel-update');
    button.textContent = 'Cancel';
    div.appendChild(button);
    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Update');
    div.appendChild(submit);
    li.appendChild(form);
    section.remove();
    let editForm = document.forms['edit'];
    let cancel = document.querySelector('.cancel-update');
    cancel.addEventListener('click', () => {
      event.preventDefault();
      form.remove()
      li.appendChild(original);

    });


    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const editInput = editForm['edit-textarea'].value;
      form.remove();
      li.textContent = editInput;
      li.appendChild(original);
      for (let i = 0; i < object.entry.length; i++) {
        if (object.entry[i].entryId == id) {
          object.entry[i].entry = editInput;
        }
      }
      console.log(object)
    });
  }
});



// Update Button
//


function renderEntries(todos) {
  for (index of todos) {
    const div = document.createElement('div');
    div.setAttribute('entry-id', index.entryId);
    const li = document.createElement('li');
    li.textContent = index.entry;
    div.appendChild(li);

    const section = document.createElement('section');
    li.appendChild(section);
    section.setAttribute('entry-id', index.entryId);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('value', 'edit')
    section.appendChild(editBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('value', 'delete')
    section.appendChild(deleteBtn);
    ul.appendChild(div);
  }
}
