// const form = document.forms[0];
// The above is equivalent to:
// const form = document.getElementsByTagname('form')[0];

//Instead of using a numerical index, we can use the name attribute to identify a form:
//const form = document.forms.search;

//square bracket notation can be used to avoid problems if the form has
//the same name as any propertyis of the document.forms
//or if the form's name contains any invalid characters like dashes or spaces
// const form = document.forms['search'];

//A form object also has a method called elements that returns an HTML collection of all the elements contained in the form. In this case the form contains two controls: an input element and a button element:
// const [input,button] = form.elements;

//FORM PROPERTIES AND METHODS------------------------------------------------------------------

// const input = form.elements.searchInput;

// input.addEventListener('focus', () => alert('focused'), false);
// input.addEventListener('blur', () => alert('blurred'), false);

// const form1 = document.forms['search'];
// form1.addEventListener('submit', search, false);

// function search() {
//     alert(' Form Submitted');
// };

// function search(event) {
//     alert(`You Searched for: ${input.value}`);
//     event.preventDefault();
// };

//HERO.HTML: -----------------------------------------------------------------------------------

document.forms.hero.heroName.focus();

const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);

function makeHero(event) {

    event.preventDefault(); // prevent the form from being submitted

    const hero = {}; // create an empty object

    hero.name = form.heroName.value; // create a name property based on the input field's value

    hero.realName = form.realName.value;

    // hero.powers = [];
    // for (let i=0; i < form.powers.length; i++) {
    //     if (form.powers[i].checked) {
    //         hero.powers.push(form.powers[i].value);
    //     }
    // }

    //Simplified version:
    hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);
    
    hero.category = form.category.value;
    // form.type[2].checked = true;

    hero.age = form.age.value;

    hero.city = form.city.value;
    hero.origin = form.origin.value;

    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;

    
};




const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

function validate(event) {
    const firstLetter = form.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');
    }
};

function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')){
    error.style.display = 'block';
    } else {
    error.style.display = 'none';
    }
};


form.addEventListener('submit',validate,false);

function disableSubmit(event) {
    if(event.target.value === ''){
        document.getElementById('submit').disabled = true;
    } else {
        document.getElementById('submit').disabled = false;
    }
};