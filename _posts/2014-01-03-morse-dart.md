---
layout: post
title:  "Playing with Dart"
date:   2014-01-03 17:10:51
categories: code
css:
 - js_morse/morsecode.css
---

I've been playing with [dart](https://www.dartlang.org/) lately, and enjoying it a lot. I wrote this toy that let's you tap out morse code.

When the morse code reaches the receiver the receiver tries to interpret it.

You can compile your dart code into javascript very easily, and that's what this page is using.

![International Morse Code Key](http://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/International_Morse_Code.svg/315px-International_Morse_Code.svg.png)

<div class="morse" style="border: solid 2px lightgray;">
  <div class="boxen">
    <button id="clickme">Click Me</button>
  </div>
  <canvas height="100px" width="500px"></canvas>
  <img id="signal"></img>
  <div class="boxen">
    <p class="morse" id="dotdash"></p>
  </div>
  <div class="boxen">
    <p class="morse" id="result"></p>
  </div>
  <button id="clear">Clear</button>
</div>

<script type="text/javascript" src="/assets/js_morse/morsecode.dart.precompiled.js"></script>
