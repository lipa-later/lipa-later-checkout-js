// const REQUIRED_KEYS = [
//   "delivery_option",
//   "facility_plan",
//   "item_brand",
//   "item_code",
//   "item_decription",
//   "item_type",
//   "item_value",
//   "preferred_option",
//   "store_key",
// ];
// function createOverlay() {
//   const overlay = document.createElement("div");
//   overlay.className = "lipa-later-checkout__overlay";
//   overlay.style.position = "fixed";
//   overlay.style.width = "100%";
//   overlay.style.height = "100%";
//   overlay.style.top = "0";
//   overlay.style.left = "0";
//   overlay.style.right = "0";
//   overlay.style.bottom = "0";
//   overlay.style.backgroundColor = "#f0f4f8";
//   return overlay;
// }

// function createInput(name, value) {
//   const input = document.createElement("input");
//   input.type = "hidden";
//   input.name = name;
//   input.value = value;
//   return input;
// }

// function postData(itemDetails, api_key) {
//   console.log(
//     itemDetails,
//     api_key,
//     "the item details passed into it and api key"
//   );
//   const items = itemDetails.items;
//   const form = document.createElement("form");
//   form.id = "lipa-later-item-data";
//   form.method = "post";
//   form.target = "lipa-later-checkout";
//   form.action = "http://localhost:3000";
//   const orderId = createInput("order_id", itemDetails.order_id);
//   const apiKey = createInput("api_key", api_key);
//   form.appendChild(orderId);
//   form.appendChild(apiKey);
//   items.map((item, index) => {
//     for (const [key, value] of Object.entries(item)) {
//       const input = createInput(key + (index + 1), value);
//       form.appendChild(input);
//     }
//   });
//   document.body.appendChild(form);
//   form.submit();
// }

// function createIframe() {
//   const iFrame = document.createElement("iframe");
//   iFrame.id = "lipa-later-checkout";
//   iFrame.name = "lipa-later-checkout";
//   iFrame.width = "100%";
//   iFrame.height = "100%";
//   return iFrame;
// }

// // function onFail() {
// //   return "the result is a failure";
// // }

// function isMissing(property) {
//   if (!property) {
//     return true;
//   }
//   return false;
// }

// export function openModal(data) {
//   const { orderDetails, api_key, onFail, onSuccess } = data;

//   if (isMissing(api_key)) {
//     throw "api_key missing. Please provide an api_key";
//   }
//   if (isMissing(orderDetails)) {
//     throw "orderDetails missing. Please provide the orderDetails object";
//   }

//   orderDetails.items.map((item) => {
//     const keysArray = Object.keys(item);
//     // validate all properties have been provided
//     let difference = REQUIRED_KEYS.filter((x) => !keysArray.includes(x));
//     if (difference.length > 0) {
//       throw `One of the object(s) is missing the ${difference} property`;
//     }
//     // validate all the property values
//   });

//   const overlay = createOverlay();
//   // const closeButton = createCloseButton(overlay);
//   const iFrame = createIframe();
//   overlay.appendChild(iFrame);
//   const scriptTags = document.getElementsByTagName("script");
//   const lastScriptTag = scriptTags[scriptTags.length - 1];
//   lastScriptTag.parentNode.insertBefore(overlay, lastScriptTag.nextSibling);
//   //   onFail('failed');
//   //   onSuccess('success');

//   postData(orderDetails, api_key);
//   // append iframe, open the web page.
//   // open the web page
// }

// function closeLipaLaterModal() {
//   document.querySelector(".lipa-later-checkout__overlay").remove();
// }

// if (typeof window !== "undefined") {
//   window.addEventListener(
//     "message",
//     (event) => {
//       if (event.origin === "http://localhost:3000") {
//         closeLipaLaterModal();
//         return;
//       }
//       console.error(event.origin, " is an invalid origin");
//     },
//     false
//   );
// }

const REQUIRED_KEYS = [
  "delivery_option",
  "facility_plan",
  "item_brand",
  "item_code",
  "item_decription",
  "item_type",
  "item_value",
  "preferred_option",
  "store_key",
];

const ORIGIN = "https://develop.d1euvomf008lqs.amplifyapp.com"
const URL = ORIGIN;

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "lipa-later-checkout__overlay";
  overlay.style.position = "fixed";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.right = "0";
  overlay.style.bottom = "0";
  overlay.style.backgroundColor = "#f0f4f8";
  return overlay;
}

function createInput(name, value) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  return input;
}

function postData(itemDetails, api_key, country) {
  const items = itemDetails.items;
  const form = document.createElement("form");
  form.id = "lipa-later-item-data";
  form.method = "post";
  form.target = "lipa-later-checkout";
  form.action = URL;
  const orderId = createInput("order_id", itemDetails.order_id);
  const apiKey = createInput("api_key", api_key);
  const countryCode = createInput("country_code", country);

  form.appendChild(orderId);
  form.appendChild(apiKey);
  form.appendChild(countryCode);
  items.map((item, index) => {
    for (const [key, value] of Object.entries(item)) {
      const input = createInput(key + (index + 1), value);
      form.appendChild(input);
    }
  });
  document.body.appendChild(form);
  form.submit();
  form.parentNode.removeChild(form);
}

function createIframe() {
  const iFrame = document.createElement("iframe");
  iFrame.id = "lipa-later-checkout";
  iFrame.name = "lipa-later-checkout";
  iFrame.width = "100%";
  iFrame.height = "100%";
  return iFrame;
}

// function onFail() {
//   return "the result is a failure";
// }

function isMissing(property) {
  if (!property) {
    return true;
  }
  return false;
}

const validCountries = ["ng", "ke", "ug", "rw"];

export function openModal(data) {
  const { orderDetails, api_key, country, onFail, onSuccess } = data;
  console.log("the data collected incoming", orderDetails, api_key, country);

  if (isMissing(api_key)) {
    throw "api_key missing. Please provide an api_key";
  }
  if (isMissing(orderDetails)) {
    throw "orderDetails missing. Please provide the orderDetails object";
  }
  if (isMissing(country)) {
    throw "country is missing. Please provide the country in the format: 'ng, ke, rw, ug' ";
  }
  if (!validCountries.includes(country)) {
    throw "Please provide the country in the format: 'ng, ke, rw, ug' ";
  }

  orderDetails.items.map((item) => {
    const keysArray = Object.keys(item);
    // validate all properties have been provided
    let difference = REQUIRED_KEYS.filter((x) => !keysArray.includes(x));
    if (difference.length > 0) {
      throw `One of the object(s) is missing the ${difference} property`;
    }
    // validate all the property values
  });

  const overlay = createOverlay();
  // const closeButton = createCloseButton(overlay);
  const iFrame = createIframe();
  overlay.appendChild(iFrame);
  const scriptTags = document.getElementsByTagName("script");
  const lastScriptTag = scriptTags[scriptTags.length - 1];
  lastScriptTag.parentNode.insertBefore(overlay, lastScriptTag.nextSibling);
  //   onFail('failed');
  //   onSuccess('success');

  postData(orderDetails, api_key, country);
  // append iframe, open the web page.
  // open the web page

  var messageEventListener;
  messageEventListener =  function( event ){
    console.log("Received message event" , event);
    if (event.origin !== ORIGIN ) {
      console.error(event.origin, " is an invalid origin");
      return;
    }

    closeLipaLaterModal();
    window.removeEventListener("message", messageEventListener ,false)

    const evdata = event.data;
    if(typeof evdata === 'object'){
      if(!evdata.success){

        if(typeof onFail === 'function'){
          onFail(evdata.errorMessage);
        }

        if(typeof orderDetails.cancel_url === "string" && orderDetails.cancel_url.trim() !== ""){
          document.location = orderDetails.cancel_url;
        }
      }
      else {
          if(typeof onSuccess === 'function'){
            onSuccess(evdata.message);
          }

          if(typeof orderDetails.success_url === "string" && orderDetails.success_url.trim() !== ""){
            document.location = orderDetails.success_url;
          }
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("message", messageEventListener ,false);
  }
}

function closeLipaLaterModal() {
  document.querySelector(".lipa-later-checkout__overlay").remove();
}
