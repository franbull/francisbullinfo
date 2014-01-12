---
layout: post
title:  "Animated Gif with Python and ImageMagick"
date:   2013-12-11 13:10:51
categories: code
---

I saw this blog post [PyCairo by Pershing](http://preshing.com/20110920/the-python-with-statement-by-example/) and it made me interested in pycairo. I combined generating pngs with pycairo and some ImageMagick magic to make an animated gif.

![Circle animated gif]({{ site.url }}/assets/circle.gif)

The script to make the image files is pretty short, and only a small deviation from the script in the post above. It's probably naive, I would imagine pycairo has a 'circle' function for example:
{% highlight python linenos %}
import cairo
import math
from contextlib import contextmanager

@contextmanager
def saved(cr):
    cr.save()
    try:
        yield cr
    finally:
        cr.restore()

def circle(cr, x, y, r): 
    cr.move_to(0, 0)
    cr.translate(0, -100)
    cr.new_sub_path()
    cr.arc(x, y, r, 0, 2 * math.pi)
    cr.stroke()

def make_circle_png(x, y, r, filename):
    surf = cairo.ImageSurface(cairo.FORMAT_ARGB32, 280, 204)
    cr = cairo.Context(surf)
    cr.translate(140, 203)
    cr.set_line_width(5)
    circle(cr, x, y, r)
    surf.write_to_png(filename)

if __name__ == '__main__':
    x = 0 
    y = 0 
    r = 20
    n = 10
    count = 0 
    xs = range(10)
    xs += range(8, 0, -1) 
    print xs
    for i in xs: 
        filename = '/tmp/circle%s.png' % chr(97 + count)
        make_circle_png(x + i, y, r, filename)
        count += 1
{% endhighlight %}

And then I did this to generate the gif
{% highlight bash %}
convert -dispose background -delay 10 -loop 0 /tmp/circle*.png /tmp/animation.gif
{% endhighlight %}
