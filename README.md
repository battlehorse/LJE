# Live Javascript Editor #
**Live Javascript Editor** (LJE) is a simple HTML page that lets you type and execute
Javascript code and snippets on the fly.

It's main purpose is to help a speaker present and illustrate Javascript code to an
audience, like you would do during a tech conference.

I originally created LJE for [Google I/O 2011](http://www.google.com/events/io/2011/index-live.html)
to illustrate advanced features of [Google Chart Tools](code.google.com/apis/chart) with some
live examples. You can see how I used it in the [recorded video](http://www.youtube.com/watch?v=NZtgT4jgnE8&feature=player_embedded#at=2310) (38m30s in),
and the embedding in the [original presentation](http://google-visualization-io2011.googlecode.com/hg/index.html#42).

**LJE** is best suited for embedding in an HTML5 presentation, like the one you can create using
[this template](http://code.google.com/p/io-2011-slides/). It uses fonts and sizes that suit the
average projector and conference room (so that everybody should be able to read comfortably).

## Try before you buy ##

Try LJE live [here](http://battlehorse.github.com/LJE/editor.html). It is preloaded with two
samples (named demo1 and demo2): the first shows some jQuery-based javascript animation, the
second some graphs built using the d3 library.

Load the examples by clicking the links on the bottom. Try modifying the code and hitting the
'execute' button to see the output change on in real time.

## Usage ##

Download the code and/or fork the repository.

**LJE** is best used by having code snippets prepared beforehand. To do so, prepare your snippets
following the instructions in <code>empty_snippet.html</code> and enumerate them inside
<code>editor.html</code> where indicated.

Once done, just open <code>editor.html</code> in your browser, and you should find all your
snippets in the links at the bottom. Click on any of them to load and execute them. You can
then modify the javascript code and execute them again (you can use the <code>Ctrl-B</code> shortcut
to execute the current code, instead of using the mouse to click the 'Execute' button).

## Notes ##

Tested with Chrome, FF4, Safari, Opera only.

Since the editor load the snippets using <code>iframes</code>, it might not work if you execute it
locally, i.e. using a file:// scheme, so you better serve the editor from a local webserver running
on your machine. The problem does not exist when deployed on a webserver (workarounds exist, like Chrome's <code>--allow-file-access-from-files</code> flag).