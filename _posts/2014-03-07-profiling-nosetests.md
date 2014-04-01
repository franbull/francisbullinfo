---
layout: post
title:  "Why are my tests so slow?"
date:   2014-03-07 14:50:51
categories: code
---

My unit tests that I run with nosetests were super slow. I wanted to know what was taking all the time rather than just making educated guesses, I found the `--with-profile` switch for nosetests and the [gprof2dot.py]() script to let me view the output as a `.dot` file.

Here's exactly what I did:

{% highlight bash %}
$ nosetests --with-profile --profile-stats-file /tmp/profile.out test_mytest.py:TestSomeClass.test_function
$ python ~/Downloads/gprof2dot.py -f pstats /tmp/profile.out > /tmp/output.dot
{% endhighlight %}

pretty straightforward, although it took me a little while to figure out what format the profile output was in (hotshot) so that I could run gprof2dot.py correctly.

I opened it in xdot, which is available from the Ubuntu Software Center and it quickly reveals the sources of my problems. Yay.
![xdot screenshot]({{ site.url }}/assets/xdotscreenshot.png)
