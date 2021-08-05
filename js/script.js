const nameInput = document.getElementById('name');

// 'name' input gets focus by default
nameInput.focus();


////
// "Job Role" section
const otherJobRoleInput = document.getElementById('other-job-role');
const jobRoleSelect = document.getElementById('title');

  // Show 'other' job role input field
  // only when 'other' is selected
otherJobRoleInput.style.display = 'none'; // hidden by default

jobRoleSelect.addEventListener('change', role => {
  if (role.target.value === 'other') {
    otherJobRoleInput.style.display = 'block';
  } else {
    otherJobRoleInput.style.display = 'none';
  };
});
// end "Job Role"
////


////
// "T-shirt info" section
const colorSelectDiv = document.getElementById('shirt-colors');
const colorSelector = document.getElementById('color');
const shirtDesignSelector = document.getElementById('design');

  // Shirt color dropdown hidden until shirt design selected
colorSelectDiv.style.display = 'none'; // hidden by default

shirtDesignSelector.addEventListener('change', design => {
  const designChoice = design.target.value;
  colorSelectDiv.style.display = 'block';
  let first;
  for (let i = 0; i < colorSelector.children.length; i++) {
    const option = colorSelector.children[i];
    if (option.getAttribute('data-theme') !== designChoice) {
      option.setAttribute('hidden', '');
    } else {
      option.removeAttribute('hidden');
      // set first available option as 'selected'
      if (!first) {
        first = i;
      } else {
        colorSelector.children[first].selected = true;
      }
    }
  }
});
// end "T-shirt info"
////


////
// "Register for activities" section
let total = 0;
const activitiesBox = document.getElementById('activities-box');
const activitiesCostP = document.getElementById('activities-cost');

activitiesBox.addEventListener('change', e => {
  if (e.target.checked) {
    total += Number(e.target.getAttribute('data-cost'));
  } else {
    total -= Number(e.target.getAttribute('data-cost'));
  };
  activitiesCostP.innerHTML = `Total: $${total}`;
});
// end "Register for activities"
////


////
// "Payment Info" section
const payMethod = document.getElementById('payment');
const ccDiv = document.getElementById('credit-card');
const payPalDiv = document.getElementById('paypal');
const btcDiv = document.getElementById('bitcoin');

payMethod.children[1].selected = true; // "Credit Card" selected by default

  // Hide other payment options unless selected
payPalDiv.style.display = 'none';
btcDiv.style.display = 'none';
const payOptions = {
  paypal: 'payPalDiv',
  bitcoin: 'btcDiv',
  'credit-card': 'ccDiv'
}

payMethod.addEventListener('change', e => {
  // display correct payment info
  for (let key in payOptions) {
    if (e.target.value === key) {
      eval(payOptions[key]).style.display = 'block';
    } else {
      eval(payOptions[key]).style.display = 'none';
    }
  }
});
// end "Payment Info"
////
