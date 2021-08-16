// 'name' input gets focus by default
document.getElementById('name').focus();


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

  // Shirt color dropdown disabled until shirt design selected
colorSelector.disabled = true; 

shirtDesignSelector.addEventListener('change', design => {
  colorSelector.disabled = false;
  const designChoice = design.target.value;
  let first;
  for (let i = 0; i < colorSelector.children.length; i++) {
    const option = colorSelector.children[i];
    if (option.getAttribute('data-theme') !== designChoice) {
      option.hidden = true;
    } else {
      option.hidden = false;

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
let totalCost = 0;
const activitiesBox = document.getElementById('activities-box');
const activitiesCostP = document.getElementById('activities-cost');
const activityCheckboxes = activitiesBox.querySelectorAll('input[type=checkbox]');

for (let check of activityCheckboxes) {
  check.addEventListener('focus', () => {
    check.parentElement.classList.add('focus');
  });
  check.addEventListener('blur', () => {
    check.parentElement.classList.remove('focus');
  });
}

activitiesBox.addEventListener('change', e => {
  const eventPrice = +e.target.getAttribute('data-cost');
  if (e.target.checked) {
    totalCost += eventPrice;
  } else {
    totalCost -= eventPrice;
  };
  activitiesCostP.innerHTML = `Total: $${totalCost}`;
});
// end "Register for activities"
////


////
// "Payment Info" section
const payMethod = document.getElementById('payment');
const ccDiv = document.getElementById('credit-card');
const payPalDiv = document.getElementById('paypal');
const btcDiv = document.getElementById('bitcoin');

  // "Credit Card" selected by default
payMethod.children[1].selected = true; 
  // Hide other payment options unless selected
payPalDiv.style.display = 'none';
btcDiv.style.display = 'none';

  // reference appropriate variables from payment option values
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
// form validation
const form = document.querySelector('form');
const idsToTest = [
  'name',
  'email',
  'activities',
  'exp-month',
  'exp-year',
  'cc-num',
  'zip',
  'cvv'
];

  // validation tests
const tests = {
  name: {
    blank: [/\w+/i, 'Name cannot be left blank']
  },
  email: {
    blank: [/.+/, 'Email address cannot be left blank'],
    noAt: [/^[^@]+@/i, 'Email address must contain "@"'],
    noDomain: [/^[^@]+@[a-z0-9-]+/i, 'Email address must contain domain name, e.g. "gmail.com"'],
    noSuffix: [/^[^@]+@[a-z0-9-]+\.[a-z]{2,}$/i, 'Email address must have a domain suffix, e.g. ".com"']
  },
  expMonth: {
    blank: [
      /^\d/,
      'Credit card expiration date is required.'
    ]
  },
  expYear: {
    blank: [
      /^\d/,
      'Credit card expiration year is required.'
    ]
  },
  ccNum: {
    blank: [
      /.+/,
      'Credit card number cannot be left blank.'
    ],
    nan: [
      /^\d+$/,
      'Only numeric characters allowed.'
    ],
    length: [
      /^\d{13,16}$/,
      'Credit card number must be between 13 - 16 digits'
    ]
  },
  zip: {
    blank: [
      /.+/,
      'Zip code cannot be left blank.'
    ],
    nan: [
      /^\d+$/,
      'Only numeric characters allowed.'
    ],
    length: [
      /^\d{5}$/,
      'Zip code must be 5 digits.'
    ]
  },
  cvv: {
    blank: [
      /.+/,
      'CVV cannot be left blank.'
    ],
    nan: [
      /^\d+$/,
      'Only numeric characters allowed.'
    ],
    length: [
      /^\d{3}$/,
      'CVV must be 3 digits.'
    ]
  }
}

  // validation function
  // returns an array: [passed, error]
  // passed = boolean
  // error = hint message
function validate(inputId) {
  const inputElement = document.getElementById(inputId);
  const inputValue = inputElement.value;
  let passed = false;
  let error;

  if (inputId === 'activities') {
    if (totalCost > 0) {
      passed = true;
    } else {
      error = 'Choose at least one activity';
    }
  } else if (inputValue) {
    for (let toTest in tests[camelify(inputId)]) {
      if (tests[camelify(inputId)][toTest][0].test(inputValue)) {
        passed = true;
      } else {
        passed = false;
        error = tests[camelify(inputId)][toTest][1];
        break;
      }
    }
  } else {
    error = tests[camelify(inputId)].blank[1];
  }
  return [passed, error];
}

function displayHint(id) {
  const inputElement = id === 'activities' ?
    activitiesBox :
    document.getElementById(id);
  const hintSpan = id === 'cc-num' ?
    document.getElementById('cc-hint') :
    document.getElementById(id + '-hint');
  const isValid = validate(id)[0];
  const hint = validate(id)[1];
  
  if (!isValid) {
    inputElement.parentElement.classList.add('not-valid');
    inputElement.parentElement.classList.remove('valid');
    
    if (hintSpan) {
      hintSpan.style.display = 'block';
      hintSpan.innerHTML = hint;
    }
    return false;
  } else {
    inputElement.parentElement.classList.add('valid');
    inputElement.parentElement.classList.remove('not-valid');
    if (hintSpan) {
      hintSpan.style.display = 'none';
    }
    return true;
  }
}

  // real-time validation event listeners
for (let id of idsToTest) {
  const inputElement = document.getElementById(id);

  if (inputElement.tagName !== 'OPTION') {
    inputElement.addEventListener('keyup', () => {
      displayHint(id);
    });
  }
  inputElement.addEventListener('blur', () => {
    displayHint(id);
  });
}

form.addEventListener('submit', e => {
  for (let id of idsToTest) {
    // break loop on credit card info
    // if 'Credit Card' not selected
    if (id === 'exp-month' && payMethod.value !== 'credit-card') {
      break;
    }

    if (!displayHint(id)) e.preventDefault();
  }
});


// convert id's containing '-' to camel case
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

