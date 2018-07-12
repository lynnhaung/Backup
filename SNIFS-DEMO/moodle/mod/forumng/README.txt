ForumNG
=======

Copyright 2014 The Open University


This is an alternative forum that you can install into standard Moodle.

It does not replace the standard forum, and operates alongside it.
You can copy forums from the standard forum into ForumNG format if you like
(...and if it works; this hasn't been tested lately).

Support:

We cannot offer direct support. Please do not contact me directly. If you
need assistance, try the forum forum on moodle.org. (Remember to make clear
that you are using ForumNG and not the standard forum.)

Bug reports:

Please report bugs using the GitHub 'Issues' tab. Before reporting a bug,
please try the latest version to verify that the problem hasn't already been
fixed. In each bug, please remember to give:

1. Exact steps to reproduce your problem, starting from creating a new wiki
   with default or specified settings.
2. The news block version you are using (from version.php or Blocks admin
   screen).
3. The Moodle version you are using.

Status:

Tested, live code based on our Moodle 2.6 release.

Please note that this code is tested on OU systems but we rely on the
community for testing on other systems.

Requires:

Moodle 2.6+
Postgres / MySQL

Install:

Place the contents of this source tree into your Moodle installation so that
within your Moodle root, this file is mod/forumng/README. Then visit the
Moodle notifications page to install.

If you want the forums to be searchable, you also need to install the
local_ousearch plugin. (It is best to do this before using ForumNG much,
otherwise it takes ages to install as it builds indexes for everything.)
When you install the ousearch plugin, a search box will automatically appear.

Documentation:

None.
