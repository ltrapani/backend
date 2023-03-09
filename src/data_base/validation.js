const productKeys = ['title', 'description', 'code', 'price', 'stock', 'category', 'status'];

function validate(data, keys){
    const dataKeys = Object.keys(data);
    
    return(
        keys.every((key) => dataKeys.includes(key)) &&
        dataKeys.every((key) => keys.includes(key))
    )
}

function __validateproduct(data, keys){
    const dataKeys = Object.keys(data);
    return(
        dataKeys.length <= keys.length &&
        dataKeys.every((key) => keys.includes(key))
    )
}
export function validateproduct(maybeProducto){
    return validate(maybeProducto, productKeys)
}

export function _validateproduct(maybeProductoParcial){
    return __validateproduct(maybeProductoParcial, productKeys)
}

