var next_button;
var form;
var questions;
var is_valid;

function set_globals(){
    next_button = document.getElementById("jspsych-survey-text-next");
    form = document.getElementById("jspsych-content");
    questions = form.children;
    is_valid = true;
}

function allow_next(enable, text_on_false = "Please answer all the questions above"){
    next_button = document.getElementById("jspsych-survey-text-next");
    if(enable){
        next_button.disabled = false;
        next_button.style.backgroundColor = "#37904b";
        next_button.innerText = "Continue";
    }
    if(!enable){
        next_button.disabled = true;  
        next_button.style.backgroundColor = "#903738";
        next_button.innerText = text_on_false;
    }
}

function get_answer(question){
    form = document.getElementById("jspsych-content");
    return form.children[question].children[1].value;
}

function validate_contact_info(){
    set_globals();
    allow_next(false);

    var lname = get_answer(1);
    var fname = get_answer(2);
    var phone = get_answer(3);
    var email = get_answer(4);

    //regex from: https://cs.chromium.org/chromium/src/third_party/WebKit/LayoutTests/fast/forms/resources/ValidityState-typeMismatch-email.js?sq=package:chromium&type=cs
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(is_valid && (lname.length == 0 || lname.length > 100)){
        allow_next(false, "Invalid surname");
        is_valid = false;
    } 
    if(is_valid && fname.length == 0 || lname.length > 100){
        allow_next(false, "Invalid first name");
        is_valid = false;
    }
    if(is_valid && phone.length < 5 || phone.length > 100){
        allow_next(false, "Invalid phone number");
        is_valid = false;
    } 
    if(is_valid && !email_regex.test(String(email).toLowerCase())){
        allow_next(false, "Invalid email address");
        is_valid = false;
    }
    if(is_valid){
        allow_next(true);
    }    
}

function validate_personal_info(){
    set_globals();
    allow_next(false);

    var age = get_answer(1);
    var gender = get_answer(2);
    var birth_country = get_answer(3);
    var hearing_problems = get_answer(4);
    var language_disorders = get_answer(5);
    var learning_disorders = get_answer(6);

    if(is_valid && (isNaN(age) || age <= 0 || age > 120)){
        next_button.innerText = "Invalid age";
        is_valid = false;
    }
    if(is_valid && (gender.length == 0 || gender.length > 20)){
        next_button.innerText = "Invalid gender";
        is_valid = false;
    }
    if(is_valid && (birth_country.length < 2 || birth_country.length > 50)){
        next_button.innerText = "Invalid birth country";
        is_valid = false;
    }    
    if(is_valid && (hearing_problems.length == 0 || hearing_problems.length > 1000)){
        next_button.innerText = "Please enter any hearing problems you have or n/a";
        is_valid = false;
    }
    if(is_valid && (language_disorders.length == 0 || language_disorders.length > 1000)){
        next_button.innerText = "Please enter any language disorders you have or n/a";
        is_valid = false;
    }
    if(is_valid && (learning_disorders.length == 0 || learning_disorders.length > 1000)){
        next_button.innerText = "Please enter any learning disorders you have or n/a";
        is_valid = false;
    }
    if(is_valid){
        allow_next(true);
    }
}

function validate_background_info(){
    set_globals();
    allow_next(false);
    var age_arrival = get_answer(1);
    var native_language = get_answer(2);
    var parent_1_lang = get_answer(3);
    var parent_2_lang = get_answer(4);
    
    if(is_valid && (isNaN(age) || age < 0 || age > 120)){
        next_button.innerText = "Invalid age of arrival in Canada";
        is_valid = false;
    }
    if(is_valid && (native_language.length < 2 || native_language.length > 50)){
        next_button.innerText = "Invalid native language";
        is_valid = false;
    }
    if(is_valid && (parent_1_lang.length < 2 || parent_1_lang.length > 50)){
        next_button.innerText = "Invalid parent 1's native language";
        is_valid = false;
    }
    if(is_valid && (parent_2_lang.length < 2 || parent_2_lang.length > 50)){
        next_button.innerText = "Invalid parent 2's native language";
        is_valid = false;
    }
    if(is_valid){
        allow_next(true);
    }
}
function validate_language_info(){
    set_globals();
    allow_next(false);
    
    var dom_lang1 = get_answer(1);

    if (dom_lang1.length < 2 || dom_lang1.length > 50){
        next_button.innerText = "Please enter at least your most dominant language";
        is_valid = false;
    }



    if(is_valid){
        allow_next(true);
    }
}

function validate_language_detailed_info(){
    set_globals();
    allow_next(false);
    if(is_valid){
        allow_next(true);
    }
}
function validate_musical_info(){
    set_globals();
    allow_next(false);

    var musical_instruments = get_answer(1);

    if(is_valid && (musical_instruments.length == 0 || musical_instruments.length > 1000)){
        next_button.innerText = "Please enter your musical experience or n/a";
        is_valid = false;
    }
    if(is_valid){
        allow_next(true);
    }
}