var addElement = function(tag, className) {
	var element = document.createElement(tag);
	element.classList.add(className);
	return element;
};

$('[data-modal]').click(function() {
    console.log(1);
    var modal = document.getElementById( $(this).data('modal') );
    $.fancybox.open(modal);
});

document.addEventListener('DOMContentLoaded', function() {

    var labeledInputs = document.querySelectorAll('.input__field');

    labeledInputs.forEach((item) => {
        item.parentElement.classList.add('input_floating');
        if (item.value) {
            item.classList.add('input__field_filled');
        };
        item.addEventListener("change", function( event ) {
            if (this.value == '') {
                this.classList.remove('input__field_filled');
            } else {
                this.classList.add('input__field_filled');
            }
        });
    });

    if ($('.partners-slider__list').length) {
        var slider = tns({
          container: '.partners-slider__list',
          gutter: 30,
          slideBy: 'page',
          controlsText: ['', ''],
          responsive: {
              0: {
                  items: 1
              },
              600: {
                  items: 2
              },
              800: {
                  items: 3
              },
              1000: {
                  items: 5
              }
          }
        });
    }
    

	var menuMain = document.querySelector('.page-header__menu');
	var menuMainToggler = document.querySelector('.page-header__menu-toggler');
	var menuMainItems = menuMain.querySelectorAll('.menu-main__item')

	menuMainItems.forEach((item) => {
			if (item.querySelector('ul')) {
					item.classList.add('menu-main__item_is-parent');
					var toggler = addElement('span', 'menu-main__arrow');
					item.append(toggler);

					toggler.addEventListener('click', function() {
							item.classList.toggle('menu-main__item_is-open');
					});
			}
	});

	menuMainToggler.addEventListener('click', function() {
			menuMain.classList.toggle('page-header__menu_active');
			menuMainToggler.classList.toggle('button-burger_active');
	});
});

// Get all forms
var validationForms = document.querySelectorAll('[data-validate]');
// console.log('Validation forms:' + validationForms);

// Validation RegExp patterns
var validationPatterns = {
    email: /.+@.+\..+/i,
    phone: /^[0-9-+() ]*$/,
    text: /^[A-Za-zА-Яа-я0-9_-]*$/
};

// Adding error message
var addError = function(input, text) {
    var inputParent = input.parentElement;
    var error = inputParent.querySelector('.input__error');
    error.innerHTML = text;
};

// Check requred status
var checkRequired = function(input) {
    if (input.required && (input.value == '')) {
        // console.log('Required field is false');
        addError(input, 'Необходимо заполнить это поле');
        return false;
    }
    // console.log('Required field is true');
    return true;
};
// Check matching with patterns
var checkPattern = function(input) {
    if (!input.dataset.validatePattern || (input.value == '')) { return true };

    var inputPattern = validationPatterns[input.dataset.validatePattern],
        inputValue = input.value;

    // console.log('Pattern is ' + inputPattern.test(inputValue));
    if (!inputPattern.test(inputValue)) {
        addError(input, 'Использованы недопустимые символы');
    }
    return inputPattern.test(inputValue);
};
// Check input length
var checkLength = function(input) {
    if (!input.dataset.validateLength || (input.value == '')) { return true };

    var inputSize = input.dataset.validateLength,
        inputLength = input.value.length;
    if (inputSize.includes('-')) {
        var inputSizeRanges = inputSize.split('-');
        // console.log('Input length is range from ' + inputSizeRanges[0] + ' to ' + inputSizeRanges[1]);

        if ((inputLength >= inputSizeRanges[0]) && (inputLength <= inputSizeRanges[1])) {
            // console.log('Input length in range from ' + inputSizeRanges[0] + ' to ' + inputSizeRanges[1]);
            return true;
        };
        if (inputLength < inputSizeRanges[0]) {
            addError(input, 'Значение слишком короткое. Минимальное количество символов: ' + inputSizeRanges[0]);
        } else if (inputLength > inputSizeRanges[1]) {
            addError(input, 'Значение слишком длинное. Максимальное количество символов: ' + inputSizeRanges[1]);
        };
        return false;
    };

    if (inputLength >= inputSize) {
        // console.log('Input length more than ' + inputSize);
        return true;
    };
    // console.log('Input length less than ' + inputSize);
    addError(input, 'Значение слишком короткое. Минимальное количество символов: ' + inputSize);
    return false;
};
// Check input range
var checkRange = function(input) {
    if (!input.dataset.validateRange || (input.value == '')) { return true };

    var inputRange = input.dataset.validateRange,
        inputValue = parseInt(input.value);
    if (inputRange.includes('-')) {
        var inputRangeRanges = inputRange.split('-');
        // console.log('Input range from ' + inputRangeRanges[0] + ' to ' + inputRangeRanges[1]);

        if ((inputValue >= inputRangeRanges[0]) && (inputValue <= inputRangeRanges[1])) {
            // console.log('Input value from ' + inputRangeRanges[0] + ' to ' + inputRangeRanges[1]);
            return true;
        };
        if (inputValue < inputRangeRanges[0]) {
            addError(input, 'Значение слишком маленькое. Минимальное значение: ' + inputRangeRanges[0]);
        } else if (inputValue > inputRangeRanges[1]) {
            addError(input, 'Значение слишком большое. Максимальное значение: ' + inputRangeRanges[1]);
        };
        return false;
    };

    if (inputValue >= inputRange) {
        // console.log('Input range more than ' + inputRange);
        return true;
    };
    // console.log('Input range less than ' + inputRange);
    addError(input, 'Значение слишком маленькое. Минимальное значение: ' + inputRange);
    return false;
};

// Validate input
var validateInput = function(input, isHardCheck) {
    // console.log('input on check');
    // Check all validate parameters
    var isInputValid = checkRequired(input) && checkPattern(input) && checkLength(input) && checkRange(input),
        isNotEmpty = input.value || false;

    // Adding classes to inputs
    if (isInputValid && isNotEmpty) {
        input.classList.add('input__field_status_valid');
        input.classList.remove('input__field_status_invalid');
        // console.log('input soft checked ok');
        return true;
    } else if (!isInputValid && isHardCheck) {
        input.classList.remove('input__field_status_valid');
        input.classList.add('input__field_status_invalid');
        // console.log('input hard checked not ok');
        return false;
    } else if (!isInputValid) {
        input.classList.remove('input__field_status_valid');
        // console.log('input soft checked not ok');
        return true;
    };
    return true;
};

// Validate every form
validationForms.forEach((form) => {
    var inputs = form.querySelectorAll('.input__field');
    // console.log(inputs);

    inputs.forEach((input) => {
        // console.log(input);
        input.addEventListener('keyup', function() {
            validateInput(input, false);
        });
        input.addEventListener('click', function() {
            validateInput(input, false);
        });
        input.addEventListener('change', function() {
            validateInput(input, true);
        });
        input.addEventListener('blur', function() {
            validateInput(input, true);
        });
    });

    // Catch submit action
    form.onsubmit = function(e) {
        var isFormValid = true;
        inputs.forEach((input) => {
            if (!validateInput(input, true)) {
                isFormValid = isFormValid && validateInput(input, true);
            }
        });
        return isFormValid;
    };
});
