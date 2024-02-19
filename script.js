// sample data
let todos = [
    {
        id: 1,
        title: "Complete assignment 1",
        description: "Finish the ToDo application assignment for Gamitar.",
        endDate: "2024-02-25",
        priority: "High",
        status: "ToDo"
    },
    {
        id: 5,
        title: "Complete assignment 2",
        description: "Finish the ToDo application assignment for Gamitar.",
        endDate: "2024-02-23",
        priority: "High",
        status: "ToDo"
    },
    {
        id: 6,
        title: "Complete assignment  3 ",
        description: "Finish the ToDo application assignment for Gamitar.",
        endDate: "2024-02-22",
        priority: "Low",
        status: "ToDo"
    },
    {
        id: 7,
        title: "Complete assignment  4",
        description: "Finish the ToDo application assignment for Gamitar.",
        endDate: "2024-02-21",
        priority: "Medium",
        status: "ToDo"
    },
    {
        id: 2,
        title: "Buy groceries",
        description: "Buy milk, eggs, and bread.",
        endDate: "2024-02-20",
        priority: "Medium",
        status: "Doing"
    }
];

let isEditMode = false;
let selectedId = null;
let prioritySortOrder = 'desc';
let endDateSortOrder = 'asc';

// Function to render no data message
function renderNoDataMessage(listElement, noDataMsgElement) {
    if (!noDataMsgElement) return;
    if (listElement.children.length === 0) {
        noDataMsgElement.style.display = 'block';
    } else {
        noDataMsgElement.style.display = 'none';
    }
}

// Function to render the ToDo list
function renderTodos() {
    const todoList = document.getElementById('todoList');
    const doingList = document.getElementById('doingList');
    const doneList = document.getElementById('doneList');
    
    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    todos.reverse().forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.id = `todo-${todo.id}`;
        todoItem.classList.add('todo-item', 'card', 'mb-3');
        todoItem.innerHTML = `
            <div class="card-body-inner">
                <div class="card-header">
                    <div>
                        <h5 class="card-title">${todo.title} - ${todo.endDate}</h5>
                        <p class="card-text">${todo.description}</p>
                    </div>
                    <div>
                        <p class="badge bg-primary">${todo.status}</p>
                        <p class="badge bg-secondary">${todo.priority}</p>
                    </div>
                </div>
                <br />  
                <button onclick="editTodo(${todo.id})" class="btn btn-primary"><i class="fas fa-pencil-alt"></i></button>
                <button onclick="deleteTodo(${todo.id})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        if (todo.status === 'ToDo') {
            todoList.appendChild(todoItem);
        } else if (todo.status === 'Doing') {
            doingList.appendChild(todoItem);
        } else if (todo.status === 'Done') {
            doneList.appendChild(todoItem);
        }

        // Render no data messages
        renderNoDataMessage(todoList, document.querySelector('.no-data-msg-todo'));
        renderNoDataMessage(doingList, document.querySelector('.no-data-msg-doing'));
        renderNoDataMessage(doneList, document.querySelector('.no-data-msg-done'));
    });
}

// Function to edit a ToDo item
function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    selectedId = id;
    document.getElementById('title').value = todo.title;
    document.getElementById('description').value = todo.description;
    document.getElementById('endDate').value = todo.endDate;
    document.getElementById('priority').value = todo.priority;
    document.getElementById('status').value = todo.status;

    document.getElementById('saveButton').style.display = 'inline-block';
    document.getElementById('cancelButton').style.display = 'inline-block';
    document.getElementById('statusGroup').style.display = 'block';

    // Hide add button
    document.getElementById('addButton').style.display = 'none';
}

// Function to save the edited ToDo item
function saveTodo() {
    // Get form values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const endDate = document.getElementById('endDate').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;

    // Validate title, end date, and priority fields
    if (!title || !endDate || !priority) {
        alert('Please fill in all required fields: Title, End Date, and Priority');
        return;
    }

    // If ID is present, update the existing todo, else add a new todo
    if (selectedId) {
        const index = todos.findIndex(todo => todo.id === selectedId);
        if (index !== -1) {
            todos[index].title = title;
            todos[index].description = description;
            todos[index].endDate = endDate;
            todos[index].priority = priority;
            todos[index].status = status;
        }
    }

    // Re-render the ToDo list
    renderTodos();

    // Reset form
    document.getElementById('todoForm').reset();

    // Reset form title and button text
    document.getElementById('formTitle').textContent = 'Add New ToDo';
    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('cancelButton').style.display = 'none';
    document.getElementById('addButton').style.display = 'inline-block';
}

// Function to handle adding a new ToDo item
function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const endDate = document.getElementById('endDate').value;
    const priority = document.getElementById('priority').value;

    // Validate title, end date, and priority fields
    if (!title || !endDate || !priority) {
        alert('Please fill in all required fields: Title, End Date, and Priority');
        return;
    }

    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1; // Generate new id
    const newTodo = {
        id: newId,
        title: title,
        description: description,
        endDate: endDate,
        priority: priority,
        status: 'ToDo' // Set default status to 'ToDo'
    };
    todos.push(newTodo);

    renderTodos();

    document.getElementById('todoForm').reset();
}

// Attach event listeners to buttons
document.getElementById('addButton').addEventListener('click', addTodo);
document.getElementById('saveButton').addEventListener('click', saveTodo);
document.getElementById('cancelButton').addEventListener('click', addTodo);


// Function to delete a ToDo item
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);

    renderTodos();
}

// Initial rendering of ToDo list
renderTodos();

// Function to sort ToDo items by priority
function sortByPriority() {
    todos.sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        const orderMultiplier = prioritySortOrder === 'asc' ? 1 : -1;
        return orderMultiplier * (priorityOrder[b.priority] - priorityOrder[a.priority]);
    });
    renderTodos();
    prioritySortOrder = prioritySortOrder === 'asc' ? 'desc' : 'asc';
}

// Function to sort ToDo items by end date
function sortByEndDate() {
    todos.sort((a, b) => {
        const orderMultiplier = endDateSortOrder === 'asc' ? 1 : -1;
        return orderMultiplier * (new Date(a.endDate) - new Date(b.endDate));
    });
    renderTodos();
    endDateSortOrder = endDateSortOrder === 'asc' ? 'desc' : 'asc';
}

// Attach event listeners to sort buttons
document.getElementById('sortByPriority').addEventListener('click', sortByPriority);
document.getElementById('sortByEndDate').addEventListener('click', sortByEndDate);


// Event listener for cancel button
document.getElementById('cancelButton').addEventListener('click', function() {
    // Reset form
    document.getElementById('todoForm').reset();
    document.getElementById('formTitle').textContent = 'Add New ToDo';
    document.getElementById('submitButton').textContent = 'Add';
    document.getElementById('cancelButton').style.display = 'none';
    document.getElementById('statusGroup').style.display = 'none';
    document.getElementById('todoForm').removeEventListener('submit', saveEdit);
});
