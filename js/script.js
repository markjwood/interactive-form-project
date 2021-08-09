const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ccNumInput = document.getElementById('cc-num');

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
      if (!first) first = i;
      colorSelector.children[first].selected = true;
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
  const price = Number(e.target.getAttribute('data-cost'));
  if (e.target.checked) {
    total += price;
  } else {
    total -= price;
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


////
// form validation functions
const nameTest = name => {
  if (name) {
    return 'valid';
  }
}

const emailTest = email => {
  if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    return 'valid';
  }
  if (!/@{1}/.test(email)) {
    return 'noAt';
  }
  if (!/^\S+@\w{3,}$/.test(email)) {
    return 'noDomain';
  }
  if (!/$\S+@\S+\.[a-z]i{2,}$/.test(email)) {
    return 'noSuffix';
  }
  return 'other';
}

const ccNumTest = num => {
  if (!Number(num) && Number(num) !== 0) {
    return 'notNumber';
  }
  if (num.length < 13) {
    return 'tooShort';
  }
  if (num.length > 16) {
    return 'tooLong';
  }
  if (Number(num) === 0) {
    return 'zero';
  }
  return 'valid';
}
  
function validateText(inputId) {
  // inputId = id of input element to test
  const value = document.getElementById(inputId).value;
  const testFuncName = camelify(inputId) + 'Test';
  if (!value) {
    return 'blank';
  } else if (eval(testFuncName)(value) === 'valid') {
    return 'valid';
  } else {
    return eval(testFuncName)(value);
  }
}

  // validation event listeners
const hintMsgs = {
  email: {
    blank: "Email address cannot be blank",
    noAt: "Email address must contain '@' symbol",
    noDomain: "Email address must contain a domain name after the '@', e.g. 'gmail.com'",
    noSuffix: "Email address must contain domain suffix, e.g. '.com'",
    other: "Email address must be in the format: name@domain.com"
  },
  ccNum: {
    blank: 'Credit card number cannot be blank',
    notNumber: 'Only numeric characters allowed',
    tooShort: 'Credit card number must be at least 13 digits',
    tooLong: 'Credit card number can be no more than 16 digits',
    zero: 'All zeroes is not a valid credit card number'
  }
}

nameInput.addEventListener('blur', () => {
  const hintSpan = document.getElementById('name-hint');
  if (validateText('name') === 'valid') {
    hintSpan.style.display = 'none';
  } else {
    hintSpan.style.display = 'inline';
  }
});
nameInput.addEventListener('keyup', () => {
  const hintSpan = document.getElementById('name-hint');
  if (validateText('name') === 'valid') {
    hintSpan.style.display = 'none';
  } else {
    hintSpan.style.display = 'inline';
  }
});

emailInput.addEventListener('blur', () => {
  const hintSpan = document.getElementById('email-hint');
  if (validateText('email') === 'valid') {
    hintSpan.style.display = 'none';
  } else {
    hintSpan.style.display = 'inline';
    hintSpan.innerHTML = hintMsgs.email[validateText('email')];
  }
});
emailInput.addEventListener('keyup', () => {
  const hintSpan = document.getElementById('email-hint');
  if (validateText('email') === 'valid') {
    hintSpan.style.display = 'none';
  } else {
    hintSpan.style.display = 'inline';
    hintSpan.innerHTML = hintMsgs.email[validateText('email')];
  }
});

ccNumInput.addEventListener('blur', () => {
  const hintSpan = document.getElementById('cc-hint');
  if (validateText('cc-num') === 'valid') {
    hintSpan.style.display = 'none';
  } else {
    hintSpan.style.display = 'inline';
    hintSpan.innerHTML = hintMsgs.ccNum[validateText('cc-num')];
  }
});
ccNumInput.addEventListener('keyup', () => {
  const hintSpan = document.getElementById('cc-hint');
  if (validateText('cc-num') === 'valid') {
    hintSpan.style.display = 'none';
  } else {
    hintSpan.style.display = 'inline';
    hintSpan.innerHTML = hintMsgs.ccNum[validateText('cc-num')];
  }
});


// function to convert id's containing '-' to camel case
function camelify(text) {
  const arr = text.split('-');
  if (arr.length === 1) {
    return arr[0].toLowerCase();
  }
  let camel = arr[0].toLowerCase();
  for (let i = 1; i < arr.length; i++) {
    camel += arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
  }
  return camel;
}



  // nameInput.addEventListener('blur', () => {
//   validateName(nameInput.value)
// });
// nameInput.addEventListener('keyup', () => {
//   validateName(nameInput.value)
// });

// emailInput.addEventListener('blur', () => {
//   validateEmail(emailInput.value)
// });
// emailInput.addEventListener('keyup', () => {
//   validateEmail(emailInput.value)
// });