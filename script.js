import {menuArray} from "./data.js";

const menuContainer = document.querySelector('.menu-container')
const orderSummary = document.querySelector('.order-summary')
const orderItems = document.querySelector('.order-items')
const totalPrice = document.querySelector('.total-price')
const modal = document.querySelector('#modal')
const orderConfirmation = document.querySelector('.order-confirmation')


let totalPriceIntermediate = 0


menuArray.forEach(function(menuItem) {
    menuContainer.innerHTML += `<div class="menu-item">
    <div class="item-left">
        <span class="item-emoji">${menuItem.emoji}</span>
        <div class="item-details">
            <h2 class="item-name">${menuItem.name}</h2>
            <p class="item-description">${menuItem.ingredients}</p>
            <p class="item-price">$${menuItem.price}</p>
        </div>
    </div>
    <button class="add-btn">+</button>
</div>`
})




document.addEventListener('click',function(e) {
    console.log(e.target)

    if (e.target.classList.contains('add-btn')) {
        if (orderSummary.classList.contains('hidden')) {
            orderSummary.classList.remove('hidden')
        }
        const menuItem = e.target.parentElement

        const name = menuItem.querySelector('.item-name').textContent
        const price = menuItem.querySelector('.item-price').textContent
        
        totalPriceIntermediate += Number(price.replace('$',''))
        console.log(typeof totalPriceIntermediate)

        orderItems.innerHTML += `
        <div class="order-item">
            <h2 class="item-name">${name}</h2>
            <p class="item-price">${price}</p>
        </div>
        `
        totalPrice.innerHTML = `$${totalPriceIntermediate}`
    }
    else if (e.target.classList.contains('complete-order-btn')) {
        modal.classList.remove('hidden')
    }

    else if (e.target.classList.contains('pay-btn')) {
        e.preventDefault()
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm.checkValidity()) {
            const customerName = document.querySelector('#customer-name').value
            const thankyouText = document.querySelector('.thank-you-text')
            thankyouText.textContent = `Thanks, ${customerName}! Your order is on its way!`
            paymentForm.reset();
            modal.classList.add('hidden')
            orderSummary.classList.add('hidden')
            orderConfirmation.classList.remove('hidden')
        } else {
            paymentForm.reportValidity();
        }


    }

    else if (e.target.classList.contains('close-btn')) {
        modal.classList.add('hidden');
    }
    else  if (!document.querySelector('.modal').contains(e.target)) {
        // Close the modal
        console.log(e.target)
        modal.classList.add('hidden');
    }
    }
    
)


