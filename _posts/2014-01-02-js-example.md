---
layout: post
title:  "Demoing js in jekyll."
date:   2014-01-02 17:10:51
categories: code
js:
 - jquery.min.js
 - demoing_jekyll_js.js
---

Hey look, you can do javascript in one of these jekyll posts!

<div id="demo_js_div" style="border: solid 1px; height: 50px; width: 150px; position: relative;"><h1 class="hidden">Woo javascript!</h1></div>

Following [this stack overflow post](http://stackoverflow.com/questions/14113559/how-to-tune-layout-for-a-particular-page-post-in-jekyll) you can define some js in in the header material and have the post layout include whichever js. And boom, here you have it!

For instance the frontmatter to this post looks like this:

    ---
    layout: post
    title:  "Demoing js in jekyll."
    date:   2014-01-02 17:10:51
    categories: code
    js:
     - jquery.min.js
     - demoing_jekyll_js.js
    ---

and the corresponding bit of the post layout looks like this:

     {% for js_name in page.js %}
        <script type="text/javascript" src="/assets/{{ js_name }}"></script>
     {% endfor %}

well no it doesn't look like that, the markdown is not escaping as it should . . . it's like:

    for js_name in page.js
        etc.
    endfor

but with proper markdown syntax for the loop, and a script tag with variable substitution for the js_name.
