import AddTodo from './components/addTodo.js';
import Modal from './components/modal.js';
import Filter from './components/filter.js';

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoFrom = new AddTodo();

        this.addTodoFrom.onClick( (t,d) => this.addTodo(t, d) );

        this.modal = new Modal();
        this.modal.onClick( ( id, data ) => this.editTodo(id, data)  );

        this.filter = new Filter();
        this.filter.selectAll( (t) => this.renderSelected(t) );
        this.filter.selectCompleted( (t) => this.renderSelected(t) );
        this.filter.selectUncompleted( (t) => this.renderSelected(t) );
        this.filter.selectSearch( (t) => this.renderSelected(t) );
    }

    setModel(model) {
        this.model = model;
    }

    render() {
        const todos = this.model.getTodos();
        if(todos && todos.length > 0){
            todos.forEach( t => this.createRow(t));
        }
    }

    renderSelected(todos) {
        this.clearTable();
        
        if(todos && todos.length > 0){
            todos.forEach( t => this.createRow(t));
        }
    }

    clearTable() {
        const rowCount = this.table.rows.length - 1;
        for (let i = 0; i < rowCount; i++) {
            this.table.deleteRow(1);
        }
    }

    addTodo(title, description) {  
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    editTodo(id, data){
        console.log(id, data);
        this.model.editTodo(id, data);
        const row = document.getElementById(id);
        row.children[0].innerText = data.title;
        row.children[1].innerText = data.description;
        row.children[2].children[0].checked = data.completed;
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    toogleCompleted(id){
        this.model.toogleCompleted(id);
    }

    createRow(todo){
        const row = table.getElementsByTagName('tbody')[0].insertRow();
        row.setAttribute('id', todo.id)
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
            </td>
            <td class="text-right">
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1')
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-bs-toggle', 'modal');
        editBtn.setAttribute('data-bs-target', '#modal');
        editBtn.onclick = () => this.modal.setValues( {
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked
        } )
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}