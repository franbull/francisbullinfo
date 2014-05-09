---
layout: post
title:  "Drawing a triangle."
date:   2014-04-24 14:50:51
categories: code
---

Have you seen turtle? It draws on to a tkinter canvas and then you can save to svg in a variety of ways. Super fun!

![Sierpinski Triangle]({{ site.url }}/assets/spt.svg)


    import turtle
    import canvasvg
    
    
    def drawTriangle(ttl, pos, size):
        ttl.up()
        ttl.goto(*pos)
        ttl.down()
        ttl.setheading(180)
        ttl.right(60)
        ttl.forward(size)
        ttl.right(120)
        ttl.forward(size)
        ttl.right(120)
        ttl.forward(size)
    
    def get_new_pos_size(pos, size):
        half_size = 0.5 * size
        height = (size ** 2 - (half_size) **2) ** 0.5
        to_return = [((pos[0], pos[1] + height), half_size)]
        to_return.append(((pos[0] - (half_size), pos[1]), half_size))
        to_return.append(((pos[0] + (half_size), pos[1]), half_size))
        return to_return
    
    def sierpinski(ttl, pos, size, depth=0, max_depth=1):
        if depth >= max_depth:
            return
        drawTriangle(ttl, pos, size)
        for new_pos, new_size in get_new_pos_size(pos, size):
            sierpinski(ttl, new_pos, new_size, depth+1, max_depth)
    
    
    if __name__ == '__main__':
        myTurtle = turtle.Turtle()
        myTurtle.speed(speed=0)
        myWin = turtle.Screen()
        sierpinski(myTurtle, (0, -150), 3000, max_depth=8)
        ts = turtle.getscreen()
        for t in turtle.turtles():
            t.hideturtle()
        canvasvg.saveall('s.svg', ts.getcanvas())
        myWin.bye()
