async function getOrderRequest() {
    const orderId = document.getElementById('orderId');
    if (orderId.value) {
        orderId.style.border = '';
        const request = await fetch(`http://nginx.localhost/api_get_order.php?order_id=${orderId.value}`);
        const parsedResponse = await request.json();
        console.log(parsedResponse);
    } else {
        orderId.style.border = '2px solid red';
    }
}