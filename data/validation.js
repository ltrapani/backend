const productKeys = ['title', 'description', 'code', 'price', 'stock', 'category', 'status'];

function validate(data, keys){
    const dataKeys = Object.keys(data);
    
    return(
        keys.every((key) => dataKeys.includes(key)) &&
        dataKeys.every((key) => keys.includes(key))
    )
}

function validatePartial(data, keys){
    const dataKeys = Object.keys(data);
    return(
        dataKeys.length <= keys.length &&
        dataKeys.every((key) => keys.includes(key))
    )
}

export function validateProduct(maybeProducto){
    return validate(maybeProducto, productKeys)
}

export function validateProductPartial(maybeProductoParcial){
    return validatePartial(maybeProductoParcial, productKeys)
}