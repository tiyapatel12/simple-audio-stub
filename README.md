# Simple Audio

## Introduction

In this task we will learn to use audio in javascript. We will create a simple audio player from which we can play one song with pause and seeking functionalities. We will use the audio file `Soft-Background-for-Interview.webm` located in the `audio`.

It will be left as a task to finish the audio player as described in [the moodle vle](https://vle.norwichuni.ac.uk/pluginfile.php/59293/mod_resource/content/8/WebFundamentalsTask3.pdf). 

## Knowledge / Learning
In this task you will use:
- css styling that we have already seen in class
- javascript events to detect when a button is clicked and trigger specific actions
- the javascript [`Audio` object](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio) to control audio

# Audio Task Guide

## Step One: Create the Structure

Let's begin by adding an html file:

- Create a file named `simple-player.html`.
- Use the shortcut `html:5` to generate the html skeleton.
- Change the title to `Simple Player`

Your initial `html` should look similar to this:

<details>
<summary>Solution</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Player</title>
</head>
<body>
    
</body>
</html>
```
</details>


Let's now create a css style file:
- Add a new folder named `css`
- Create a new file inside the folder `css` named `simple-player.css`

With these new files created, we are now ready to link the `js` and `css` files to our `html`.

- Add a `link` tag in your html `head` for your `css`:

<details>
<summary>Solution</summary>
You can do so by adding the line below to your html head:

```html
<link rel="stylesheet" href="css/simple-player.css">
```
</details>


- Add a `script` tag in your html `head` for your `javascript`:
<details>
<summary>Solution</summary>
You can do so by adding the line below to your html head:

```html
<script src="js/simple-player.js" defer></script>
```
</details>

## Step Two: Adding Play Button

Let's now move on to creating the body for our `html`:
- Create a `div` with **id** `"container"` - This div element will contain the rest of the body.
- Inside the `div` add an `img` with **id** `"play-pause-button"` and **src** `"images/play.svg"`

<details>
<summary>Solution</summary>

Your html body should now look like this:

```html
<body>
    <div id="container">
        <img id="play-pause-button" src="images/play.svg">
    </div> 
</body>
```
</details>

What happens if you now look at the live page? What's the next thing that we have to fix?

<details>
<summary>Answer</summary>

The play button is gigantic! We need to fix the css. Let's do this on the next step!
</details>

## Step Three: Initial Styling

Let's add some styling and, in the meantime, fix this gigantic image issue:

- Open the `simple-player.css` file
- Create a css selector for the container div through its id
- Give it a `width` of `330px`, a `height` of `50px`, a `background-color` of value `bisque` and a `border-radius` of `10px`
    
    This will createn display the div in an audio bar style.

<details><summary>Solution</summary>

You can add these properties with the following `css`:

```css
#container {
    /* Audio player bar style */
    width: 330px;
    height: 50px;
    background-color: bisque;
    border-radius: 10px;
  }
```

</details>

Let's now fix the play image width:

- Create a css selector for the play image through its id

- Give it a `width` of `20px`, a `height` of `20px`, a `padding-left` of `10px` and a `padding-right` of `10px`
    
    This will make the image smaller and add some padding between the image and the containing div

- Set the `cursor` property to `pointer`. - This will change the cursor when it hovers on to the play button to signify it can be clicked.

<details><summary>Solution</summary>

You can add these properties with the following `css`:

```css
#play-pause-button {
  /* Fix width and height */
  width: 20px;
  height: 20px;

  /* Add padding to give space to left and right */
  padding-left: 10px;
  padding-right: 10px;

  /* Change cursor to pointer style when hovering over image */
  cursor: pointer;
}
```

</details>

If you now look at the website, the play button is aligned to the top, but in an audio player bar usually we want buttons centred.

This is fixable by smartly using the `flex` display property in `css`. On top of giving this property, we wnat to set it in `row` direction, rather than `column`, since any object that we continue adding to the bar should be displayed horizontally. To add this:

- In the `#container` css selector:

    Set the `display` property to `flex` - to give the `div` flex properties

    Set the `flex-direction` property to `row` - to make sure any other elements (such as the seek bar or timer) we add are added horizontally

    Set the `align-items` property to `center` - to make the `play` button vertically align in the middle

<details><summary>Solution</summary>

Your `#container` selector should now look like this

```css
#container {
    /* Audio player bar style */
    width: 330px;
    height: 50px;
    background-color: bisque;
    border-radius: 10px;

    /* Flex display properties */
    display: flex;
    align-items: center;
    flex-direction: row;
}
```

</details>

## Step Four: Play audio from javascript

Let's now introduce the `Audio` object. The  [Mozilla Developer documents](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio) tell us that to create an Audio object we can use either of these lines:

```js
new Audio()
new Audio(url)
```

Where `url` is an optional `string` parameter that points to the source of the audio. Because we know which source we are going to use (located in `audio/Soft-Background-for-Interview.webm`), we will use the second option.

To begin:
- Open your `simple-player.js` file
- At the top of this file, create a new constant variable named `audio` and assign it to a new audio object with url `"audio/Soft-Background-for-Interview.webm"`

<details><summary>Solution</summary>
You can do this with the following line:

```js
// audio object that stores the audio file
const audio = new Audio("audio/Soft-Background-for-Interview.webm");
```
</details>

Now, let's create a variable that will represent the play / pause image

- Create a new constant variable named `button` that references the play image
    
    You will have to select the image using it's `id` and the `getElementById` function of the `document` object

<details><summary>Solution</summary>
You can do this with the following line:

```js
// button object that references the image with id "play-pause-button"
const button = document.getElementById("play-pause-button");
```
</details>

Let's now add this button some functionality. If we read through the [W3 School `onclick` documentation](https://www.w3schools.com/jsref/event_onclick.asp), it says that we can use the following syntax to define this event from our javascript:

```js
object.onclick = function(){myScript};
```
Where `myScript` would be the content of the function.

Let's add some functionality to our button:
- Assign the `onclick` event to a function that logs the string `"The play button has been clicked"`

<details><summary>Solution</summary>

You can do so with the following code:

```js
button.onclick = function() {
    console.log("The play button has been clicked");
}
```

As you can see:
- Because we have previously assigned the name variable `button` and not `object` to our variable, we need to change that in our implementation
- Instead of `myScript`, we have added this logging line to perform the action

_
</details>

Now that this is done, head on to your live site. If you open the `Inspect Toolbar` and select the `Console` view, you should see this line logged every time you clicked the button. 

Now that we have successfully linked the javascript button with the html button, we can add the audio player functionality. To do so, we will use the function `audio.play()` that comes with the Audio object:

- Replace the logging line in the `onclick` event function with the line:

    ```js
    audio.play();
    ```

<details><summary>Solution</summary>

Your `onclick` event function should now look like this

```js
// When the play button is clicked, play audio
button.onclick = function() {
    audio.play();
}
```
</details>

## Step Five: Play / Pause functionality

### Play and Pause from the click of the button

Currently, this audio is playing when the button is clicked. But what we want to do is:

- When the `play` button is clicked:
    
    If the audio is not currently playing:

        Start playing audio
    If the audio is currently playing:

        Pause audio

As you can see, we will need to use a **conditional** statement, and figure out whether the audio is playing or not. The audio object has a property that can be accessed with the line `audio.paused` which returns a `boolean` that is `true` if the audio is currently paused (i.e. not playing) and `false` if the uadio is currently not pused (i.e. playing).

Knowing this, insde the `onclick` event function:
- Add an `if` statement to check if the audio is currently paused using the `audio.paused` property
- If the audio is currently paused, invoke the `audio.play()` functiont o start playing the audio
- Otherwise, invoke the `audio.pause()` function to pause the audio

You will have to use the structure:
```javascript
if(certain condition is met) {
    /* Do some actions */
}
else {
    /* Do some other actions */
}
```

<details><summary>Solution</summary>

Your `onclick` event function should now look like this:

```js
// When the play button is clicked, play or pause audio according to state
button.onclick = function() {
    if(audio.paused) { 
        audio.play();
    }
    else {
        audio.pause();
    }
}
```
</details>

Head over to your life site and check that it's working! You should now be able to play and pause the audio!

### Displaying correct image according to audio state

Before moving on to the next step, we still want to add a second functionality related to playing and pausing. We want the button to display the original `play.svg` image when the audio is paused, but it should display the `pause.svg` image when the audio is playing, so that the user knows what action they can do by clicking that button.

To do so, we will use a new type of event that the `Audio` object provides. These are the `audio.onplay` and `audio.onpause`. These events are triggered every time the audio plays or pauses, which means we can use them to change the image source of the button when that happens.

Add the following code to your javascript:
- Assign the `onplay` event to a function that logs the string `"The audio is playing"`
- Assign the `onpause` event to a function that logs the string `"The audio is paused"`

<details><summary>Solution</summary>
You can do so by adding the following code:

```js
audio.onplay = function() {
    console.log("The audio is playing");
}

audio.onpause = function() {
    console.log("The audio is paused");
}
```
</details>

If you now head to your live site and open the console, you should see these logs happening as you play and pause the audio. Let's now modify the code so that instead of logging the source of the button object is changed, thus changing the image:

#### In your `audio.onplay` event:
- Replace the log line with the following line, to modify the `button` image source:
    
    `button.src = "images/pause.svg"`

#### In your `audio.pause` event:
- Replace the log line with the following line, to modify the `button` image source:
    
    `button.src = "images/play.svg"`

<details><summary>Solution</summary>

The audio events code should now look like this:

```js

// Every time audio plays, replace button image to pause.svg
audio.onplay = function() {
    button.src = "images/pause.svg";
}

// Every time audio pauses, replace button image to play.svg
audio.onpause = function() {
    button.src = "images/play.svg";
}
```
</details>