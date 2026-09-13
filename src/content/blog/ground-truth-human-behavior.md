---
title: "Establishing Ground Truth in Human Behavior Research"
description: "A brief introduction to ratings versus rankings in human assessments."
date: 2017-06-19
tags: ["beam", "ordinal embedding"]
draft: false
coverImage: "/images/blog/ground-truth-human-behavior/goofy-faces.png"
---

*Welcome to the very first SAIL lab blog post!*

> This post originally appeared on the [SAIL BEAM blog](https://sail.usc.edu/blog/2017/ground-truth-human-behavior.html)
> on June 19, 2017, and is republished here.

Research in human behavior is often confounded by "human factors," meaning gathering quality information from people is hard ([NP hard?!](http://smbc-comics.com/index.php?id=3954)).

Let's start with a specific hypothetical example. Say we are interested in teaching a machine to predict the level of engagement at different moments in time of a human playing a video game. Regardless of which machine learning approach we use, we are going to need several examples of engaging and non-engaging game play. How do we measure this?

Questions like this are at the root of studies in human behavior because they cannot (at the present) be answered without help from people. At some point, we need actual humans to provide an assessment of the level of engagement. There are several ways to collect this information:

- Post-task self-assessment (ask the player afterwards)
- Momentary assessment (ask the player periodically during the game)
- Observer assessment (ask other people to annotate the player's engagement)

Each of these approaches introduces bias and warrants a whole separate post to discuss the types of annotation artifacts produced. Today we will focus just on the mechanics of these assessments. Namely, how do we obtain information from people about engagement levels (or any other mental construct) that can be rated on some kind of ordinal scale (for example, low/medium/high)?

## Assessment of Ratings versus Rankings

Let's examine a different example where an observer is asked to rate the level of silliness of facial expressions in a collection of head shots. Though computers have been trained to do some amazing things like [building 3D models of faces from 2D pictures](http://www.hao-li.com/publications/papers/siggraphAsia2017ADFSIFRTR.pdf) and weird things like [hallucinating faces where they don't belong](https://www.telegraph.co.uk/technology/google/11684183/Googles-artificial-intelligence-interprets-photos-as-animals-with-creepy-results.html), they haven't yet been taught to identify silly expressions. Of course, we can remedy this obvious shortcoming by generating a data set of faces rated for silliness and training a machine learning model on them. The crux is obtaining these silliness ratings and ensuring they are as accurate as possible.

Where will these ratings come from? People! How about you (yes, you)?

Say you log in to Amazon's Mechanical Turk and sign up to rate the silliness of facial expressions of Einstein and come across these three gems.

![Goofy pictures of Einstein](/images/blog/ground-truth-human-behavior/goofy-faces.png "Looking dapper!")

The task is simple: rate silliness on a scale from one to ten. Think about this for a second. What value would you assign to each one? Why?

...

Was it easy? Didn't you have dozens of questions swirling around in your head? Is the first image showing a silly expression or a smile? How do you rate a smile on a silliness scale? Does the middle image get a 10 or should it get a 8 because you can imagine Einstein making an even sillier face? Whatever decision calculus you apply to resolve these questions today might be different if you had to rate these images next week.

You're probably already getting the point: human ratings are highly subject to personal and interpretation biases and will be inevitably be noisy. There has to be a better way to collect information from people about silly faces, right?

Now try this: compare just the first two images on the left and select the sillier one. Think about it and decide for yourself.

...

Wasn't this much easier? Two things happened when the rating task changed. First, you only had to make a binary decision instead of picking one of ten different values. Fewer options = less thinking. Second, you didn't have to decide how much more or less silly one image was than the other, you only needed to decide *that* one was sillier. The key point here is:

<p style="text-align:center;"><strong><em>Ranking is easier than rating</em></strong></p>

This observation is far from new to psychologists but is finding its way into affective computing and behavior signal processing research and communities where machine learning meets human-produced data.[^metallinou2013annotation]<sup>,</sup>[^yannakakis2015ratings]<sup>,</sup>[^yannakakis2011]

Why is this useful? If we ask people to rank images instead of rate them we end up with a bunch of comparisons, but what we really want is a silliness value assigned to each picture. It turns out, we can turn these rankings into ratings and in many cases we get an even better result than simply asking people for ratings in the first place. I'll cover what "better" really means and how to obtain higher quality ratings by using these rankings in a future post.

## Triplet comparisons

Asking people to compare two images is very simple but isn't the only way to elicit rankings from human annotators. Let's return to our initial behavior modeling example where the goal is to understand how much fun people have playing different video games. Just as before, we need to collect labels from annotators corresponding to the amount of fun they have when playing these games. This time we want to employ our new comparison-based approach instead of asking annotators to assign a number from one to ten.

So far so good... until one annotator insists that Final Fantasy VII isn't more or less fun than Final Fantasy VI - they're both fun for different reasons (if you aren't privy to gamer culture, just know there is an unending debate over which game is better). This suggests that the our latent assumption that fun can be represented using a single number isn't fair - because people seem to experience different kinds of fun. We don't want to force people to compare apples to oranges, so maybe we need to try another approach.

One tempting idea is to first identify all of the different kinds of fun, then sort the games by their fun type, and then ask annotators to rank fun levels for the games within each group. Identifying every type of fun seems daunting, though [it hasn't stopped some people from trying](http://www.nicolelazzaro.com/the4-keys-to-fun/). We need a better tool.

Introducing... triplet comparisons!

In triplet comparison task applied for our video game ranking experiment, the annotator would be presented with three games, one reference game and two candidate games, and then asked which candidate game is most similar to the reference game. The definition of "similarity" is flexible and in our game example should be understood as "similar level of fun." This type of annotation task allows games with similar levels of perceived fun to be grouped together and ultimately provide useful labels for machine learning purposes. I'll cover this process in more detail in a future post on *Ordinal Embedding*.

If you made it this far, thanks for taking the time to read this. I hope it was useful or at least thought provoking. Please consider leaving a comment or suggestion below.

## References

[^metallinou2013annotation]: Metallinou, A., & Narayanan, S. (2013). Annotation and processing of continuous emotional attributes: Challenges and opportunities. *10th IEEE International Conference and Workshops on Automatic Face and Gesture Recognition*, 1-8. [ieeexplore.ieee.org/document/6553804](http://ieeexplore.ieee.org/document/6553804/)

[^yannakakis2015ratings]: Yannakakis, G. N., & Martínez, H. P. (2015). Ratings are overrated! *Frontiers in ICT, 2*, 13. [journal.frontiersin.org/article/10.3389/fict.2015.00013/full](http://journal.frontiersin.org/article/10.3389/fict.2015.00013/full)

[^yannakakis2011]: Yannakakis, G. N., & Hallam, J. (2011). Ranking vs. Preference: A Comparative Study of Self-reporting. *Affective Computing and Intelligent Interaction: 4th International Conference*, 437-446. Springer. [link.springer.com/chapter/10.1007/978-3-642-24600-5_47](https://link.springer.com/chapter/10.1007%2F978-3-642-24600-5_47)
