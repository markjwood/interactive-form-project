# Interactive Form Project

## Description
An interactive form to register for an event. Project for Treehouse Full-Stack JavaScript, Unit 3.

## Validation
Includes validation at submit and in real-time. Displays error messages on required fields that update depending on the error.

### Name field
Displays the message "Name cannot be left blank" if the user navigates away from the field without entering a name.

### Email Address field
If not filled out correctly, displays error messages depending on the problem:
 * "Email address cannot be left blank" if nothing is entered
 * "Email address must contain '@'" if there is no '@' symbol present
 * "Email address must contain domain name, e.g. 'gmail.com'" if nothing is entered after '@'
 * "Email address must have a domain suffix, e.g. '.com'" if top-level domain is missing.

Error messages update on keyup, blur, and/or submit, as appropriate.

### Register for Activities field
Displays the message "Choose at least one activity" if no activity is selected. Message updates on blur and/or submit.

### Payment Info field
Only displays error messages if 'Credit Card' is the selected payment method.
 * Expiration Date & Expiration Year - Field is highlighted and warning icon is displayed if no selection is made.
 * Card Number:
  * "Credit card number cannot be left blank" is displayed if field is empty.
  * "Only numeric characters allowed" is displayed if non-numeric characters are entered.
  * "Credit card number must be between 13 - 16 digits" is displayed if number is too short/too long.
 * Zip Code:
  * "Zip code cannot be left blank" is displayed if field is empty.
  * "Only numeric characters allowed" is displayed if non-numeric characters are entered.
  * "Zip code must be 5 digits" is displayed if number is too short/too long.
 * CVV:
  * "CVV cannot be left blank" is displayed if field is empty.
  * "Only numeric characters allowed" is displayed if non-numeric characters are entered.
  * "CVV must be 3 digits" is displayed if number is too short/too long.

All payment field error messages update on blur and/or submit. Additionally, the Card Number, Zip Code, and CVV fields update on keyup.