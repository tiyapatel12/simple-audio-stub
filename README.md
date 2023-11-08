# Simple Audio

## Introduction

In this task we will learn to use audio in javascript. We will create a simple audio player from which we can play one song with pause and seeking functionalities.

It will be left as a task to finish the audio player as described in [the moodle vle](https://vle.norwichuni.ac.uk/pluginfile.php/59293/mod_resource/content/8/WebFundamentalsTask3.pdf). 

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

### Step Three: Initial Styling

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

```css #8-11
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