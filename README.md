# lipa-later-checkout-js

This library enables merchants and payment service providers to offer the LipaLater payment method to their customers. The payment method is a Buy Now Pay Later option that allows consumers to pay for goods in affordable monthly installments. Upon selecting **LipaLater** on checkout a customer can receive an instant credit descision and complete the purchase right away through a lightweight widget.

# Integration Guide

## CommonJS module require

```
const lipalater = require('lipa-later-checkout-js')
     lipalater.openModal({
                    orderDetails,
                    api_key: 'API_kEY',
                })
```

## script tag

```
<script src="https://unpkg.com/lipa-later-checkout-js@1.0.0/dist/lipa-later-checkout.js"></script>
<script>
       lipalater.openModal({
          orderDetails,
          api_key: "API_KEY"
        });
<script>
```

## Full example (a bit contrived)

### index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .button {
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <h1>This is the checkout page</h1>
    <button class="button">CLICK ME</button>
    <script src="https://unpkg.com/lipa-later-checkout-js@1.0.0/dist/lipa-later-checkout.js"></script>
    <script>
      document.querySelector(".button").onclick = (e) => {
        e.preventDefault();
        // If need be, get order details from your server (Using fetch , axios e.t.c). Below is a sample of JSON object(orderDetails) required by the library.
        const orderDetails = {
          order_id: "c6ba9f46-6104-4e8c-9a34-bb69b65a50b3",
          success_url: "http://localhost/success",
          cancel_url: "http://localhost/cancel",
          payment_options_url: "http://localhost/options",
          countryCode: "KE",
          items: [
            {
              item_type: "other",
              item_brand: "16GB A Series Walkman Video MP3",
              store_key: "jkiarie",
              delivery_option: "customer_store_pickup",
              preferred_option: "pick_up",
              item_decription: "16GB A Series Walkman Video MP3",
              facility_plan: "lipalater_regular_plan",
              item_code: "H0148VPS1T",
              item_value: "50000",
            },
            {
              item_type: "other",
              item_brand: "36GB A Series Walkman Video MP3",
              store_key: "jkiarie",
              delivery_option: "customer_store_pickup",
              preferred_option: "pick_up",
              item_decription: "16GB A Series Walkman Video MP3",
              facility_plan: "lipalater_regular_plan",
              item_code: "H0148VPS1T",
              item_value: "50000",
            },
          ],
        };
        window.lipalater.openModal({
          orderDetails,
          api_key: "API_kEY",
        });
      };
    </script>
  </body>
</html>

```

### Above example will render the pages below:

![alt checkout button](https://app.lipalater.com/IMAGES/checkout_button.png)

### on button click

![alt LipaLater modal](https://app.lipalater.com/IMAGES/checkout_page.png)

### For those that prefer to receive the payment status through callbacks(onFail, onSuccess), we have provision for this:

```
    lipalater.openModal({
          orderDetails,
          api_key: "API_KEY",
          onFail: (result) => {
            console.log("failure reason", result);
          },
          onSuccess: (result) => {
            console.log(result);
          },
        });
```
