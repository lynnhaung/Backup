@mod @mod_hsuforum
Feature: Teachers can edit or delete any forum post
  In order to refine the forum contents
  As a teacher
  I need to edit or delete any user's forum posts

  Background:
    Given the following "users" exists:
      | username | firstname | lastname | email |
      | teacher1 | Teacher | 1 | teacher1@asd.com |
      | student1 | Student | 1 | student1@asd.com |
    And the following "courses" exists:
      | fullname | shortname | category |
      | Course 1 | C1 | 0 |
    And the following "course enrolments" exists:
      | user | course | role |
      | teacher1 | C1 | editingteacher |
      | student1 | C1 | student |
    And I log in as "teacher1"
    And I follow "Course 1"
    And I turn editing mode on
    And I add a "Forum" to section "1" and I fill the form with:
      | Forum name | Test forum name |
      | Description | Test forum description |
    And I add a new discussion to "Test forum name" forum with:
      | Subject | Teacher post subject |
      | Message | Teacher post message |
    And I log out
    And I log in as "student1"
    And I follow "Course 1"
    And I reply "Teacher post subject" post from "Test forum name" forum with:
      | Subject | Student post subject |
      | Message | Student post message |

  @javascript
  Scenario: A teacher can delete another user's posts
    Given I log out
    And I log in as "teacher1"
    When I follow "Course 1"
    And I follow "Test forum name"
    And I follow "Teacher post subject"
    And I click on "Delete" "link" in the "//div[contains(concat(' ', normalize-space(@class), ' '), ' forumpost ')][contains(., 'Student post subject')]" "xpath_element"
    And I press "Continue"
    Then I should not see "Student post subject"
    And I should not see "Student post message"

  @javascript
  Scenario: A teacher can edit another user's posts
    Given I log out
    And I log in as "teacher1"
    When I follow "Course 1"
    And I follow "Test forum name"
    And I follow "Teacher post subject"
    And I click on "Edit" "link" in the "//div[contains(concat(' ', normalize-space(@class), ' '), ' forumpost ')][contains(., 'Student post subject')]" "xpath_element"
    And I fill the moodle form with:
      | Subject | Edited student subject |
    And I press "Save changes"
    And I wait to be redirected
    Then I should see "Edited student subject"
    And I should see "Edited by Teacher 1 - original submission"

  @javascript
  Scenario: A student can't edit or delete another user's posts
    When I follow "Teacher post subject"
    Then I should not see "Edit" in the "//div[contains(concat(' ', normalize-space(@class), ' '), ' forumpost ')][contains(., 'Teacher post subject')]" "xpath_element"
    And I should not see "Delete" in the "//div[contains(concat(' ', normalize-space(@class), ' '), ' forumpost ')][contains(., 'Teacher post subject')]" "xpath_element"
