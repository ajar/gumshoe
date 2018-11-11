Gumshoe
=======

Gumshoe is a Chrome extension for discreet password logging. It monitors
the submission of all forms with a password field and stores any unique
login details in a local database.


Installation
-----------

~~This thing's actually on the [Chrome Web Store](http://goo.gl/z8SIH).
Can you believe it?~~

> **UPDATE**: Yeah, I don't know why Google let that fly for six years
straight. It's finally been removed. Thank heavens!

Anyway, if you are absolutely set on using a tool like this, then you'll
have to look into Chrome extensions just a bit. Turn on developer mode,
search the Web for info on how to load this into Chrome, and please don't
contact me about Gumshoe as I am no longer supporting this project in any
capacity at all. 6+ yrs later, goes against everything I stand for...


Getting Started
---------------

Once installed, typing `gselog` anywhere should reveal the log management
page. From here, you can search for records, delete those records, and
change `gselog` to something more creative.

Provided that the extension is enabled and the user/password pair has not
previously been recorded, login attempts to most (semantically correct)
websites should be available for review through the log management page
(see above).


Screenshot
----------

![Gumshoe for Chrome (Windows 7)](http://i.imgur.com/1xyDl.png)


FAQ
---

**Aren't keyloggers scary and malicious?**

You could call it a keylogger, but 3 out of 4 pedants agree that it logs
form submissions, not keystrokes. (It monitors strokes as it listens for
the passcode, but they aren't recorded.)

**Right, but couldn't _you_ steal _my_ passwords?**

No. All data is stored locally using Web SQL; Gumshoe never communicates
with another machine.


Disclaimer
----------

You're just a bad person all around if you use this to snoop on any person,
steal money or property or secrets, etc. I should have removed this widely
used extension from the Chrome Store ages before it was removed. Please do
not ever contact me about this extension, and just try to be a good person.
