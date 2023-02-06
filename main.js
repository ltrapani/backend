class ProductManager {
    static idCreator = 0;
    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if(this.products.find((product) => product.code === code)) {
            return console.log("Code assigned");
        } else if(title && description && price && thumbnail && stock) {
            ProductManager.idCreator++;
            const id = ProductManager.idCreator
            const product = {id, title, description, price, thumbnail, code, stock}
            this.products.push(product);
        } else {
            return console.log("Faltan completar datos")
        }
    }
    getProducts() {
        return this.products;
    }
    getProductById(id){
        return this.products.find((product) => product.id === id) || "Not found"
    }
}


/* PROCESO DE TESTING */

// let newProducts = new ProductManager;
// newProducts.getProducts()
// newProducts.addProduct("libro1", "este libro se trata de aventura", 200, "Sin imagen", "hola123", 25);
// newProducts.getProducts()
// newProducts.addProduct("libro1", "este libro se trata de aventura", 200, "Sin imagen", "hola123", 25);
// newProducts.addProduct("libro2", "esto es otro libro que se trata de accion", 500, "Sin imagen", "hola123", 70);
// newProducts.getProductById(5);
// newProducts.getProductById(2); 

