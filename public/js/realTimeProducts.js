const socket = io()
const $tbody = document.getElementById('tbody');
const $fragment = document.createDocumentFragment()
const $article = document.getElementById('article')
const $form = document.getElementById('crud-form')

let products;

socket.on('products_actuales', data => {
    products = data;
    limpiarHtml()
    mostrarHtml()
})

function mostrarHtml(){
    products.forEach(el =>{
        const tr = document.createElement('tr')
        tr.setAttribute('data-id', el.id)
        tr.innerHTML = `
            <td data-label="Producto">${el.title}</td>
            <td data-label="Descripcion">${el.description}</td>
            <td data-label="Precio">${el.price}</td>
            <td data-label="Stock">${el.stock}</td>
            <td data-label="Categoria">${el.category}</td>
            <td data-label="Codigo">${el.code}</td>
            <td data-label="Opciones">
                <button class="delete product">Eliminar</button>
            </td>
        `
        $fragment.appendChild(tr)
    })
    
    $tbody.appendChild($fragment)
}

document.addEventListener('submit', async e=>{
    if(e.target === $form){
        e.preventDefault()

        if(!e.target.id.value){
            const formData = new FormData;

            formData.append('title', e.target.name.value)
            formData.append('description', e.target.description.value)
            formData.append('price', e.target.price.value)
            formData.append('stock', e.target.stock.value)
            formData.append('category', e.target.category.value)
            formData.append('code', e.target.code.value)
            formData.append('file', e.target.file.files[0])

            try {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {},
                    body: formData
                })

                if(!response.ok) {
                    const p = document.getElementById('producto-id')
                    p.innerText = `Error ${response.status}: ${response.statusText}`
                }else{
                    const p = document.getElementById('producto-id')
                    p.innerText = `Producto agregado correctamente`
                    setTimeout(() =>{
                        p.innerText = ``
                        location.reload()
                    }, 2000)
                }
            } catch (error) {
                let message = error.statusText || 'Ocurrio un error';
                const p = document.getElementById('producto-id')
                p.insertAdjacentHTML("afterend", `<p><b>Error: ${message} intenta mas tarde</b></p>`)
            }
        }
    }
})

document.addEventListener('click', async e =>{
    if(e.target.matches('.delete')){
        const id = Number(e.target.parentElement.parentElement.dataset.id)
        let isDelete = confirm(`Estas seguro de eliminar el id ${id}?`)

        if(isDelete){
            try {
                const response = await fetch(`/api/products/${id}`, {
                    method: 'DELETE',
                    headers: {},
                })

                if(!response.ok){
                    const p = document.getElementById('producto-id')
                    p.innerText = `Ocurrio un error al eliminar el producto`
                }
                location.reload()

            } catch (error) {
                console.log(error)
            }
        }
    }

    if(e.target.matches('.add-btn')){
        $article.classList.toggle('dnone')
    }
})

function limpiarHtml(){
    $tbody.innerHTML = ``
}