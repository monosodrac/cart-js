if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
};

var totalAmount = '0.00';

function ready() {
    const removeProductButtons = document.getElementsByClassName('remove-product-button');
    for (i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener('click', removeProduct);
    };
    
    const quantityInputs = document.getElementsByClassName('product-qtd-input');
    for (i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener('change', checkIfInputIsNull);
    };
    
    const addToCartButtons = document.getElementsByClassName('button-hover-background');
    for (i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', addProductToCart);
    };
    
    const purchaseButton = document.getElementsByClassName('purchase-button')[0];
    purchaseButton.addEventListener('click', makePurchase);
};

function removeProduct(e) {
    e.target.parentElement.parentElement.remove();
    updateTotal();
};

function checkIfInputIsNull(e) {
    if (e.target.value === '0') {
        e.target.parentElement.parentElement.remove();
    };
    
    updateTotal();
};

function addProductToCart(e) {
    const button = e.target;
    const productInfos = button.parentElement.parentElement;
    const productImage = productInfos.getElementsByClassName('product-image')[0].src;
    const productName = productInfos.getElementsByClassName('product-title')[0].innerText;
    const productPrice = productInfos.getElementsByClassName('product-price')[0].innerText;

    const productsCartNames = document.getElementsByClassName('cart-product-title');
    for (i = 0; i < productsCartNames.length; i++) {
        if (productsCartNames[i].innerText === productName) {
            productsCartNames[i].parentElement.parentElement.getElementsByClassName('product-qtd-input')[0].value++
            updateTotal();
            return;
        };
    };

    let newCartProduct = document.createElement('tr');
    newCartProduct.classList.add('cart-product');

    newCartProduct.innerHTML = `
        <td class="product-identification">
            <img src="${productImage}" alt="${productName}" class="cart-product-image">
            <strong class="cart-product-title">${productName}</strong>
        </td>
        <td>
            <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
            <input type="number" value="1" min="0" class="product-qtd-input">
            <button type="button" class="remove-product-button">Remover</button>
        </td>
    `

    const tableBody = document.querySelector('.cart-table tbody');
    tableBody.append(newCartProduct);
    updateTotal();

    newCartProduct
        .getElementsByClassName('product-qtd-input')[0]
        .addEventListener('change', checkIfInputIsNull);
    newCartProduct
        .getElementsByClassName('remove-product-button')[0]
        .addEventListener('click', removeProduct);
};

function makePurchase() {
    if (totalAmount === '0.00') {
        alert('Your cart is empty!');
    } else {
        alert(
            `
                Thank you for shopping with us!
                Total: $${totalAmount}
                Come back soon :)
            `
        );
    };

    document.querySelector('.cart-table tbody').innerHTML = '';
    updateTotal();
}

function updateTotal() {
    totalAmount = 0;
    
    const cartProducts = document.getElementsByClassName('cart-product');
    for (i = 0; i < cartProducts.length; i++) {
        const productPrice = cartProducts[i]
            .getElementsByClassName('cart-product-price')[0]
            .innerText
            .replace('$', '')
        const productQuantity = cartProducts[i]
            .getElementsByClassName('product-qtd-input')[0]
            .value;
        
        totalAmount += productPrice * productQuantity;
    };
    totalAmount = totalAmount.toFixed(2);
    document.querySelector('.cart-total-container span').innerText = "$" + totalAmount;
};
