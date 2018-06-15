//var subject_id = jsPsych.randomization.randomID(15); //random id assigned to each subject
var blur_count = 0; //number of times subject's focus leaves tab
var form; //current jspych-content element, to allow listeners to be toggled from different functions
var likely_invalid = false; //gets set to true if blur_count>threshold

var header = "<img id=\"logo\" src=\"/study_assets/MusicLang/img/langdev-logo.jpg\"</img><h1>Language Learning & Development Lab MusicLang Experiment</h1>"; //to be prepended to preludes

var inst = {
    type: 'instructions',
    pages: [
        header + '<h2>Instructions</h2><p>Please wear headphones for the duration of this experiment.<br>To make sure your headphones are set to a comfortable volume, play the following audio clip and adjust accordingly.</p><audio controls><source src="horse.ogg" type="audio/ogg"><source src="sample.mp3" type="audio/mpeg">'
    ],
    show_clickable_nav: true,
    button_label_next: 'Next',
    allow_keys: false
}

var met_rhythm = {
    type: 'binary-audio',
    json_label: 'MET-Rhythm-EngNat',
    preamble: header + '<h2>Musical Ear Test</h2><h3>Comparison of Rhythmic Phrases</h3>',
    example_preamble: 'Examples',
    question_preamble: 'Questions',
    example_count: '2',
    question_count: '52',
    example_num_prefix: 'Example ',
    question_num_prefix: '',
    example_num_suffix: '',
    question_num_suffix: '',
    example_num_type: 'alphabetic',
    question_num_type: 'numeric',
    answer1: 'Yes',
    answer2: 'No',
    audio: '/study_assets/MusicLang/audio/met-rhythm-engnat.mp3',
    allow_audio_control: false,
    test_length: 626 //611:length+15:grace
}

jatos.onLoad(
    jsPsych.init({
        //Questionaire:
        //production timeline:
        //timeline: [info, contact, personal, gender, background, dominant_languages, language_details, musical_summary, musical_detail],
        //timeline for testing: 
        //timeline: [contact, personal, musical_summary, musical_detail],
        timeline: [inst, met_rhythm],
        show_progress_bar: true,
        exclusions: {
            min_width: 800,
            min_height: 600
        },
        //Checks how many times user left if it's more than 10, triggers invalid flag
        on_interaction_data_update: function (data) {
            if (data.event == "blur") {
                console.log(data);
                blur_count++;
                if (blur_count > 10) {
                    likely_invalid = true;
                }
            };
        },
        on_finish: function (data) {
            var resultsRaw = jsPsych.data.get();
            var results = resultsRaw.ignore('internal_node_id');
            var resultsJSON = results.json();
            resultsJSON = '"' + jatos.studyResultId + '": ' + resultsJSON;
            jatos.submitResultData(resultsJSON, jatos.startNextComponent);
        }
    })
);