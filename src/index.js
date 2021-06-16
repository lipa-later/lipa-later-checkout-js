function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'lipa-later-checkout__overlay';
  overlay.style.position = 'fixed';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.backgroundColor = '#f0f4f8';
  return overlay;
}

function createInput(name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  return input;
}

function postData(itemDetails, api_key) {
  const items = itemDetails.items;
  const form = document.createElement('form');
  form.id = 'lipa-later-item-data';
  form.method = 'post';
  form.target = 'lipa-later-checkout';
  form.action = 'http://localhost:3000';
  const orderId = createInput('order_id', itemDetails.order_id);
  const apiKey = createInput('api_key', api_key);
  form.appendChild(orderId);
  form.appendChild(apiKey);
  items.map((item, index) => {
    for (const [key, value] of Object.entries(item)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key + (index + 1);
      input.value = value;
      form.appendChild(input);
    }
  });
  document.body.appendChild(form);
  form.submit();
}

function createIframe() {
  const iFrame = document.createElement('iframe');
  iFrame.id = 'lipa-later-checkout';
  iFrame.name = 'lipa-later-checkout';
  iFrame.width = '100%';
  iFrame.height = '100%';
  return iFrame;
}

// function onFail() {
//   return "the result is a failure";
// }

export function openModal(data) {
  const { itemDetails, api_key, onFail, onSuccess } = data;
  //validate params
  const overlay = createOverlay();
  // const closeButton = createCloseButton(overlay);
  const iFrame = createIframe();
  overlay.appendChild(iFrame);
  const scriptTags = document.getElementsByTagName('script');
  const lastScriptTag = scriptTags[scriptTags.length - 1];
  lastScriptTag.parentNode.insertBefore(overlay, lastScriptTag.nextSibling);
  onFail('failed');
  onSuccess('success');

  postData(itemDetails, api_key);
  // append iframe, open the web page.
  // open the web page
}

function closeLipaLaterModal() {
  document.querySelector('.lipa-later-checkout__overlay').remove();
}

window.addEventListener(
  'message',
  (event) => {
    if (event.origin === 'http://localhost:3000') {
      closeLipaLaterModal();
      return;
    }
    console.error(event.origin, ' is an invalid origin');
  },
  false
);
