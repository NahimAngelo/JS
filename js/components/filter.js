import Model from '../model.js';

export default class Filter {
    constructor() {
        this.model = new Model();
        this.radioAll = document.getElementById('radioAll');
        this.radioCompleted = document.getElementById('radioCompleted');
        this.radioUncompleted = document.getElementById('radioUncompleted');
        this.words = document.getElementById('words');
        this.search = document.getElementById('search');
    }

    selectAll(callback) {
        this.radioAll.onclick = () => {
            const todos = this.model.getTodosUpdated();

            callback( todos );
        }
    }

    selectCompleted(callback) {
        this.radioCompleted.onclick = () => {
            const todos = this.model.getTodosUpdated();

            const todosRes = [];
            todos.forEach((val) => {
                if (val.completed === true) {
                    todosRes.push(val);
                }
            });

            callback( todosRes );
        }
    }

    selectUncompleted(callback) {
        this.radioUncompleted.onclick = () => {
            const todos = this.model.getTodosUpdated();

            const todosRes = [];
            todos.forEach((val) => {
                if (val.completed === false) {
                    todosRes.push(val);
                }
            });

            callback( todosRes );
        }
    }

    selectSearch(callback) {
        this.search.onclick = () => {
            const todos = this.model.getTodosUpdated();
            const todosRes = [];

            todos.forEach((val) => {
                const { title, description } = val;

                if (title.toLowerCase().includes(this.words.value.toLowerCase()) || 
                description.toLowerCase().includes(this.words.value.toLowerCase())) {
                    todosRes.push(val);
                }
            });

            callback( todosRes );
        }
    }
}