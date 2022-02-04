export const init = (paypal_key, currency) => {
  if (paypal_key) {
    var paypal_script = document.createElement("script"), head = document.head || document.getElementsByTagName("head")[0];
    paypal_script.onload = function () {};
    paypal_script.src = `https://www.paypal.com/sdk/js?client-id=${paypal_key}&currency=${currency || 'USD'}`;
    paypal_script.async = true;

    head.insertBefore(paypal_script, head.firstChild);
  }
}