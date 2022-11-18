# chatbox
Simple chat that works between browser tabs

Implemented using React, this is a very simple CHAT web application that runs exclusively in the browser.
UI is composed by a Messages'List and a TextInput.

Every TAB in the browser represents a user that sends messages in the same chat room.

Here are the main use cases:

- Everytime a new Tab is opened the user is prompted for a username, and a new "chat user" joins the conversation.
- User can fill the TextInput, and pressing "Enter" the message will be sent to the Messages'List together with username and datetime, these will appear in the Messages'List in a well-styled way (some CSS required).
- Every tab of the browser is updated with new messages in real-time.
- If TextInput is empty when "Enter" is pressed an error will appear.
- User can delete a Message by pressing some icon that appear only on mouseover, contained in the Message element.
- Messages will appear from bottom to top in the Messages'List.

Extra ✨ notes:
- Uses modern browser capabilities to persist the state of the application by allowing the page to be refreshed without losing data. Users are able to re-join the conversation by re-using a previously created “login session” (each tab/user is asked to join the first time only)
- When the _ArrowUp_ is pressed in a TextInput, that input is filled with the last message sent by that user (if it exists), and when _Enter_ is pressed again, that last message is replaced with the edited message.
- Using CSS3 transitions, the text-color of every message added to the list is animated, starting from a "Color 1" when created and ending with a "Color 2" using a transition with a duration of 10 seconds.

```
  TAB 1                                   TAB 2
|-------- MessagesList -------|         |-------- MessagesList -------|
|                             |         |                             |
|                             |         |                             |
|                             |         |                             |
|                             |         |                             |
|16:07 zelda                  |         |                  zelda 16:07|
| Hey, how you doing?         |         |         Hey, how you doing? |
|                             |         |                             |
|                   goku 16:10|         |16:10 goku                   |
|     Shh!, Doing a challenge |         | Shh!, Doing a challenge     |
|-----------------------------|         |-----------------------------|

zelda        [________________]         goku         [________________]
```
