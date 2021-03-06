<?php

if (!defined('MOODLE_INTERNAL')) {
    die('Direct access to this script is forbidden.');    ///  It must be included from a Moodle page
}

require_once($CFG->libdir.'/formslib.php');

class note_edit_form extends moodleform {

    function definition() {
        $mform =& $this->_form;
        $mform->addElement('header', 'general', get_string('note', 'notes'));

        $mform->addElement('textarea', 'content', get_string('content', 'notes'), array('rows'=>15, 'cols'=>40));
        $mform->setType('content', PARAM_RAW);
        $mform->addRule('content', get_string('nocontent', 'notes'), 'required', null, 'client');

        $mform->addElement('select', 'publishstate', get_string('publishstate', 'notes'), note_get_state_names());
        $mform->setDefault('publishstate', NOTES_STATE_PUBLIC);
        $mform->setType('publishstate', PARAM_ALPHA);
        $mform->addHelpButton('publishstate', 'publishstate', 'notes');

        $this->add_action_buttons();

        $mform->addElement('hidden', 'courseid');
        $mform->setType('courseid', PARAM_INT);

        $mform->addElement('hidden', 'userid');
        $mform->setType('userid', PARAM_INT);

        $mform->addElement('hidden', 'id');
        $mform->setType('id', PARAM_INT);
    }
}
