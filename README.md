# RunForrestRun
What started last year with a simple desire to learn more about HTML5+JS, in order to give a small training/workshop to some colleagues at work, ended up resulting in a small web-based game of mine that I would like to share with you. :)
The game is called "Run Forest!" (click here to play) and is very simple: it is an endless 2D runner game where the main character needs to collect as many coins as possible and avoid to be eaten by the evil robotic sharks (taken from Sonic The Hedgehog game).
Possible actions of the main character are:
Jump: you can do it by just clicking the mouse, pressing the arrow buttons of the keyboard, or simply touching the screen if you are playing in a mobile device
Walk faster: increase the main character's velocity by continuously pressing the right arrow in the keyboard  (I still need to implement this feature in mobile devices)
Walk slower: do this by continuously pressing the left arrow in the keyboard (also still to be implemented in mobile devices)
Although it is a pretty simple game, I am quite satisfied with the result because all I started with was a blank text editor (sometimes I've used Notepad++ and some other times switched to Sublime Text) and a few internet tutorials on the matter.
From there I started planning what features I had to implement and what were the tasks involved. I've used mainly Javascript with Object-Oriented Programming to implement everything in a more organized way. Then I came up with a "task list" or "implementation plan" that looked (very) roughly like this:
Show one coin on screen that can twist
Implement the main loop of the game (Init, Render, Update): with functions to read keyboard input
Implement a Sprite Manager system to handle multiple sprite objects on the screen
Add the background: I used three layers (ground, near plane with stones, far plane with mountains and sky) with different velocities to give the feeling of perspective
Add a manager to spawn the coins on the screen with a random frequency, value and height
Add the main character with some actions: walk, jump, die (the exciting part was in the jump implementation which involved applying the Kinematic Equations that we learn in Physics :D)
Add a manager to spawn the enemies on the screen with a random frequency and size
Add Collision detection system: character vs coins, character vs enemies (this was a fun thing to do involving some math calculations)
Add a Sound Manager system: with functions to initialize, play, pause and stop audio files
Finish and polish the logic to consider the game/character states, to include game pause/restart options and enable touch for mobile devices
Bug fixing!
That is an overview of what I've planned beforehand and I found it to be very useful and helpful to make me work more efficiently and in a "modularized" way, saving me a lot of time that would have been wasted in re-working features or debugging issues. So it is definitely recommended, specially if you are dealing with bigger tasks or projects (in this case there are many methodologies/philosophies used in the professional environment that are constantly evolving)
This was a relatively small application, it took me around 3 to 5 days to complete, but it was a good start and enough to make me feel the excitement of creating your own game, specially after I've shared it with my relatives and friends and they have enjoyed playing it and gave feedbacks. :)
