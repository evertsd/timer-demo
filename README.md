## Your own web timer demo
Containing some basic HTML, JS, and a bit of ruby. This code is a culmination of the explanation on "Writing your own Web Timer" https://medium.com/p/e009f283c9df/edit

If you want to get this code up and running, one big thing you'll have to solve is tracking the timer's status client side. Right now very weird (easiily explainable) things will happen if you play an already active timer, or pause an already paused timer. And there's a small bug lurking in the case of stopping a paused timer.