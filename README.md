Alt-H1 WHERE'S WALDO???
==============================

This is a quick web program that provides the user with a Where's Waldo image. The user has to find Waldo before the game ends, there is a timer that starts when the page loads! Find him quick!!

SETUP

The site runs on a Ruby Sinatra server. Validation of Waldo's location happens server-side preventing the user from seeing his location in the source code. Saved scores are also stored server-side. To run locally on your computer have sinatra installed. The server can be started by running the file 'web.rb'.

HOW TO PLAY

The timer begins when the page loads. When the user finds Waldo, the timer will stop and a window will pop up with the user's final time. There will be an option to enter their name to save with the time. Simply hit play again to start over! (But if you already know where Waldo is you're cheating...)