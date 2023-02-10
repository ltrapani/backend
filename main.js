const fs = require('fs');
class ProductManager {
    static idCreator = 0;
    products;
    constructor(path) {
        this.path = path;
        try {
            this.loadFile();
        } catch {
            this.products = [];
            this.saveFile();
        }
    }

    loadFile(){
        try {
            this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } catch (error) {
            throw new Error(error);
        }
    }

    saveFile(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } catch (error) {
            throw new Error(error);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if(this.products.find((product) => product.code === code)) {
            return console.log("Code assigned");
        } else if(title && description && price && thumbnail && stock) {
            ProductManager.idCreator++;
            const id = ProductManager.idCreator
            const product = {id, title, description, price, thumbnail, code, stock};
            this.products.push(product);
            this.saveFile();
        } else {
            return console.warn("Data missing");
        }
    }

    getProducts() {
        this.loadFile();
        console.log(this.products);
    }

    getProductById(id){
        return this.products.find((product) => product.id === id) || console.warn("Product ID not found");
    }

    updateProduct(id, data){
        if(this.products.find((product) => product.id === id)){
            const updatedProduct = this.products.map((product) => product.id === id ? {...product, ...data} : product)
            this.products = updatedProduct;
            return this.saveFile();
        }
        console.warn("Product not updated. ID not found");
    }
    
    deleteProduct(id){
        const index = this.products.indexOf(this.products.find((product) => product.id === id));
        if(index === -1){
            return console.warn("Product not deleted. ID not found")
        }
        this.products.splice(index, 1);
        this.saveFile();
    }
}

/* PROCESO DE TESTING */

//let newProducts = new ProductManager;
//newProducts.getProducts()
//newProducts.addProduct("libro1", "este libro se trata de aventura", 200, "Sin imagen", "hola123", 25);
//newProducts.getProducts()
//newProducts.addProduct("libro1", "este libro se trata de aventura", 200, "Sin imagen", "hola123", 25);
//newProducts.addProduct("libro2", "esto es otro libro que se trata de accion", 500, "Sin imagen", "hola123", 70);
//newProducts.getProductById(5);
//newProducts.getProductById(2); 
//newProducts.updateProduct(5, {title: 'producto prueba updateado'});
//newProducts.updateProduct(2, {title: 'producto prueba updateado'});
//newProducts.getProducts();
//newProducts.deleteProduct(5);
//newProducts.deleteProduct(2);
//newProducts.getProducts(); 

