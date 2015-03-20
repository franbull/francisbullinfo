---
layout: post
title:  "Genetic Algorithm"
date:   2014-08-02 14:50:51
categories: code
---

I have implemented the genetic algorithm described at [this page](http://www.ai-junkie.com/ga/intro/gat2.html) three or four times over the past several years. I think it's absolutely fascinating. Bearing in mind that I know nothing else about the subject, here's what happens.

The basic idea is that you have an end point you don't know how to get to, but you can encode pieces of the solution that combine in some way to get to the end point. In the example the end point is "How to calculate the number 42 from [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, +, -, *, /]". And you encode the pieces of the puzzle in binary from 1 -> 0001 to / -> 1101. Then you could try all combinations of the pieces, or random combinations of the pieces until you get the answer you want, or you can use a genetic algorithm to move towards it. This sounds more complicated than it is. Basically if you have a function or system or algorithm that takes a variety of inputs to produce an result, and you can say how good the result is, but you can't solve the system to say 'these are the optimal values for the inputs' you can use a genetic algorithm approach to find the best (or close to) inputs. So you could use this for curve fitting for example. There are of course a bunch of other ways to search for those best inputs, but this is the most fun.

So you might initialize your pool with 8 random chromosomes.

    (Pdb) for chrom in pool: print chrom
    0111101001100110110001000010101000000001110000101011
    01101011101010111010101111010110111
    10101100111111010101010111101010111010011000011001110111000001100010100011100010100
    11011111001010111010
    100001011010001110000
    0100110010010000111000100111001000111101011011001111
    011101110111100000000101100000000001101001010110110010001010100011000111100110011000011
    1100

in our problem domain these decode like so:

    (Pdb) for chrom in pool: print decode_chromosome(chrom)
    [7, '+', 6, 6, '*', 4, 2, '+', 0, 1, '*', 2, '-']
    [6, '-', '+', '-', '+', '-', '/', 6]
    ['+', '*', None, '/', 5, 5, None, '+', None, 9, 8, 6, 7, 7, 0, 6, 2, 8, None, 2]
    ['/', None, 2, '-', '+']
    [8, 5, '+', 3, 8]
    [4, '*', 9, 0, None, 2, 7, 2, 3, '/', 6, '*', None]
    [7, 7, 7, 8, 0, 5, 8, 0, 1, '+', 5, 6, '*', 8, '+', 8, '*', 7, 9, 9, 8]
    ['*']

(because we take each complete chunk of 4 bits and decode them into a number, 0-9 are 0-9 and 10-13 are (+, -, * /) so 
    11011111001010111010 -> 1101 1111 0010 1011 1010 -> / None 2 - +

which evaluate like so:

    (Pdb) for chrom in pool: print evaluate_chromosome(chrom), fitness(chrom)
    104 0.0161290322581
    0 0.0238095238095
    14 0.0357142857143
    2 0.025
    11 0.0322580645161
    6.0 0.0277777777778
    728 0.00145772594752
    0 0.0238095238095

because according to the rules of our domain we perform operations from left to right, ignoring operations that don't apply so
    / None 2 - + -> ignore ignore 2 ignore ignore -> 2
and
    8 5 + 3 8 -> 8 ignore + 3 ignore -> 11

and our fitness function just measures how close we are to our goal (42).

then we randomly pick pairs weighting the probablity of picking a chromosome according to it's fitness (so a fitness score of 0.1 is twice as likely to be picked as 0.05)

    (Pdb) one = weighted_choice(choices_and_weights(pool))
    (Pdb) one
    '100001011010001110000'
    (Pdb) two = weighted_choice(choices_and_weights(pool))
    (Pdb) two
    '0100110010010000111000100111001000111101011011001111'

and then we breed the pair together to make one child, we breed by first randomly choosing whether to crossover, if we are crossing over we choose a random point along the length of the chromosome and swap the twos genes at that point, in this case crossover was performed:

    (Pdb) crossed_over = crossover(one, two, 0.7)
    (Pdb) crossed_over
    '1000010010010000111000100111001000111101011011001111'

then for each gene we may mutate it by flipping it to 0 where it was 1 or vice versa:

    (Pdb) child = mutate(crossed_over, 0.01)
    (Pdb) child
    '1000010010010000111000100111011000111101011011001111'

and we populate a new generation of the same size this way:

    (Pdb) new_pool = breed_next_generation(pool, 0.7, 0.01, 8)
    (Pdb) for chrom in new_pool: print chrom
    01101011101010111010101111010110111
    1010110011111101010101011110101011101001100000101011
    0100
    10101100111111010101010111101010111
    0100110010010000111000100111001000111101011011001111
    0100110010010000111000100111001000111101011011001111
    01001100100100001110
    01101011101010111010101111010110111

which is to say:

    (Pdb) for chrom in new_pool: print decode_chromosome(chrom), evaluate_chromosome(chrom)
    [6, '-', '+', '-', '+', '-', '/', 6] 0
    ['+', '*', None, '/', 5, 5, None, '+', None, 9, 8, 2, '-'] 14
    [4] 4
    ['+', '*', None, '/', 5, 5, None, '+'] 5
    [4, '*', 9, 0, None, 2, 7, 2, 3, '/', 6, '*', None] 6.0
    [4, '*', 9, 0, None, 2, 7, 2, 3, '/', 6, '*', None] 6.0
    [4, '*', 9, 0, None] 36
    [6, '-', '+', '-', '+', '-', '/', 6] 0

and if we do it again we get:

    (Pdb) new_pool = breed_next_generation(new_pool, 0.7, 0.01, 8)
    (Pdb) for chrom in new_pool: print decode_chromosome(chrom), evaluate_chromosome(chrom)
    [4, '*', 9, 0, None] 36
    [4] 4
    [4, '*', 9, 0, None] 36
    [4, '*', 9, 0, None, 2, 7, 2, 3, '/', 6, '*', None] 6.0
    [6, '-', '+', '-', '+', '-', '/', 4] 2
    [4, '*', 9, 0, None, 2, 7, 2, 3, '/', 6, '*', None] 6.0
    [4, '*', 9, 0, None] 36
    [4, '*', 9, 0, None] 36

and:

    (Pdb) new_pool = breed_next_generation(new_pool, 0.7, 0.01, 8)
    (Pdb) for chrom in new_pool: print decode_chromosome(chrom), evaluate_chromosome(chrom)
    [4] 4
    [4, '*', 9, 0, None] 36
    [4, '*', 9, 0, None] 36
    [4, '*', 9, 0, None] 36
    [4, '*', 9, 0, None] 36
    [4, '*', 9, 0, None] 36
    [4, '*', 9, 0, None] 36
    [4, '*', 9, 0, None] 36

and this devolves into a frustrating local minimum, but you get the idea.

I ran the algorithm 100 times for each pool size from 2 -> 20 and recorded how many generations it took before it found a solution. Here's the graph.
![Graph of Pool Size vs Mean and Median Number of Generations to Find Solution](/assets/genetic_pool_size_chart.png "The Effects Of Different Pool Sizes")
And as you might expect, increasing pool size decreases the average number of generations needed to get to the solution.

In the example above we got into a situation where the chromosome for 36 was favored and so each child became 36 and crossover had no effect and the low level of mutation meant that the pool stayed similar to each other. So how does changing the mutation rate affect things?
![Graph of Mutation Rate vs Mean and Median Number of Generations to Find Solution](/assets/genetic_mutation_rate_chart.png "The Effects Of Different Mutation Rates")
It seems that 0.01 is too low, something between 0.1 and 0.25 looks good.
