
# Reflection on Tic tac toe assignment - Michael van Diemen

## Confession

After getting to grips with Ember and wanting to start over, I checked online if there were any other versions of
Tic Tac Toe in Ember and found [this one](https://github.com/tchan/ember-tic-tac-toe). It got me to a point where I knew
what I wanted to achieve and use some parts as a baseline for this assignment.

It helped me to accept to start with a bunch of variables for the fields and how to use them, also the 'random' selection
for the computer move helped. The idea for the winning states list and the list of selected fields for each users were 
in my mind and as this example also had the same approach, I decided to go for it.

## Reflection
I felt a bit out of place with the framework from time to time, where the major time problems have been finding the
smaller connections between the components. The things I felt were the hardest were the parts that to me felt were the
Ember specific setup things, like how to call a function as argument and how to have a `if..else if..else if..` setup
for the dialog window.

I actually started to enjoy the framework a bit, I think the new Octane update makes Ember stand out, although I don't
know enough other frameworks to make a decent statement about this.

I did not use libraries as I wanted to learn and get familiar with Ember. I did use another version of tic tac toe as an 
example.

## Making the game - the story behind the story

I was not familiar with Ember.JS and not too much into JavaScript to pick it up easily.
To start I picked up the quick start guide on Ember to figure out the basics and the syntax.

On thursday I started to play a little bit with Ember, added the Material.IO links and was experimenting a bit with the
components I thought I might need. It quickly reached a point where it was just a bit too much and I needed to cut it down.
Setting up the Ember app felt a bit uncomfortable and I didn't really feel happy with it.

At this stage, there were a few things I got frustrated about (both not knowing how to do specific things in Ember
already and some at-home issues) which lead to an injust assumption about the distribution JS vs Ruby work that would be
required which didn't help me to reset and focus. After a quick back and forth with Lorenzo about the assignment I felt
a bit more at ease and decided to continue on friday with a fresh mind.

I kept thinking about the approach I wanted to take and started with the minimum requirements to expand from there.
On friday morning I started by building a single clickable div that would show an 'X' for the user to be able to copy it
nine times to create the board grid. At this point all fields had separate variables to keep hold of it's state.

This next step was to ensure the game would know when a game was 'won', a simple nested array with all winning states
and comparing would do the trick, where an alert would show if the game was won, lost if there was a draw. I thought
about making a second user solution but wanted to make a 'simple' computer opponent. The computer opponent could pick
fields that were not filled in yet and after every move (both computer as user) the game should check if it was a
winning move.

After reaching a working state I decided to try adding Material.IO and started with a grid based setup for the board. It
was a bit better than the squares in a single row, but there was a lot of spacing due to the grid structure.

The alert prevented the last selected field to be filled with the 'X' which was a bit annoying and since the alert did
not provide the option to reset the game, I went searching for a material.io dialog, to show the result and to reset the
game. It took quite some time to get the reset button working as well as showing a normal sentence instead of the raw
result input. I couldn't really find out what the issue was and internet was not really helping, which did not help.
After scouting the Ember docs I finally figured out I was treating the `get showTitle` as a function, but
`this.showTitle()` didn't work and it should just be `this.showTitle` so I felt really dumb (and that I shouldn't be a
developer etc, you know the drill.). The next issue was triggering an action on the parent component, with previous
experience (a little bit of Vue) I was assuming I needed to trigger the action by throwing the action to the parent
somehow, which also was the pattern I found in previous versions of Ember on StackOverflow. But adding the function as
an argument and calling said argument felt really nice and functional, a bit Elixir-esque.

Yay, the application was working. I didn't try any tests yet at I'm not familiar with JS testing and felt that the
challenge to get to know Ember and Material Design a bit was sufficient for now.

Then I wanted to track the amount of wins and build a score board, which also forced me to revamp the grid-based setup
for the board. I had a quick look at a more generic usable model for the player model
(`{name: 'player', symbol: 'X', wins: 0, fields: []}`) but ditched it for now as it felt over-engineered at this point
for only two users and had some issues with reaching the selected fields within this model.

Afterwards the one thing I wanted to do was give the setup of the board another shot and wanted to reduce the amount of
variables required and decided to try it with an array values. This cleaned up the variables used and also made the hbs
file with the ability to just loop over the board to set it up.

### Ruby restart

Setting up Rails with Ember is not something I have done before and I had some issues where it came down to jQuery and
CSRF. The API communication using a json API is not unfamiliar, although not something I have done in a while so it took
a bit of getting used to and I had some troubles getting the data from Ember getting back to Rails correctly. I didn't 
want to make my own serializer/deserializer as there are enought available. I thought to try `fast_jsonapi` but I the
Rails controller did not get any data when the create/update endpoints were called, so after a bit of hassling it was
time to move over to `jsonapi-rails` which worked great, some small adjustments and setting up the serialized models and
it was time to move back to the game. As the results would now be stored in the database I did need something to setup
the users, so I created a user model and a create user button to make people create a new user to start playing 
(Yay, no reliance on seed data to get it to work).

I decided to call it off at this point. I really wanted to have a look at getting a multiplayer in with websockets 
(Action Cable) but noticing the amount of struggles with Ember already I assume there is again a very high learning
curve. My assumption would be to be able to do build it in a day, but right now I am at around 13/14 hours already.