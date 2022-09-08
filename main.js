
document.addEventListener('DOMContentLoaded', () => {

    const alert = document.querySelector('.alert')
    const formulario = document.querySelector('#formulario');
    const pintarTodo = document.querySelector('#pintarTodo');
    const templateTodo = document.querySelector('#templateTodo').content;

    let todos = [];

    const agregarTodo = todo => {
        const objetoTodo = {
            nombre: todo,
            id: `${Date.now()}`
        }
        
        todos.push(objetoTodo);
    }

    const pintarTodos = () => {
        
        localStorage.setItem('todos', JSON.stringify(todos));

        pintarTodo.textContent = '';

        const fragment = document.createDocumentFragment();

        todos.forEach(item => {
            const clone = templateTodo.cloneNode(true);
            clone.querySelector('.lead').textContent = item.nombre;
            clone.querySelector('.btn').dataset.id = item.id;

            fragment.appendChild(clone);
        });

        pintarTodo.appendChild(fragment)
    }

    document.addEventListener('click', e => {
        // console.log(e.target.dataset.id);

        if(e.target.matches('.btn-danger')) {
          todos = todos.filter(item => item.id !== e.target.dataset.id)
          pintarTodos();
        }
    })

    formulario.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(formulario);
        const [todo] = [...data.values()];
        if(!todo.trim()) {
            alert.classList.remove('d-none');
            setTimeout(() => {
                alert.classList.add('d-none');    
            }, 2000);
            return;
        }
        agregarTodo(todo);
        pintarTodos();
    });

    
    if(localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
        pintarTodos();
    }
});
