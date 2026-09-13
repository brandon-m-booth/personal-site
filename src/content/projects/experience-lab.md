---
title: "Experience Lab"
category: research
summary: "A custom-built lab space for capturing rich, multimodal physiologic and behavioral data during human-computer interaction."
dates: "2015-2017"
organization: "GamePipe Lab, University of Southern California"
order: 25
image: "/images/projects/experience-lab-cover.png"
imageAlt: "Experience Lab block diagram"
imageWidth: 70
links:
  - label: "Publication (IEEE Xplore)"
    url: "https://doi.org/10.1109/ACII.2017.8273641"
  - label: "Video demo"
    url: "https://www.youtube.com/embed/PtRM6mSXih0"
tags: ["annotation", "affective computing", "wearables", "human-computer interaction"]
draft: false
featured: false
---

The Experience Lab was a project I started in January 2015 to help facilitate research on
interactive human-computer systems. The project was funded by the GamePipe Lab at USC (many
thanks to Dr. Zyda) and had received countless hours of love from 29 volunteer directed and
applied research students of various disciplines at USC (many thanks to these guys!).

**Why this project?** In short, we want to be able to study human experiences more closely,
especially those which impact us internally. A great example is the experience of "fun."
Millions of us engage with video games daily for different reasons (entertainment, passing the
time, escapism, socializing, decompression, addiction, etc.) but there are some commonalities in
the way we engage with these games too - for example, we attend to them and we interact with
them. Let's run with this example.

## Why do games hold our interest?

Professional game designers have been iterating on video game design concepts since these games
first gained popularity in the '70s. Some of the design concepts have proven themselves over
time to consistently provide quality entertainment while other unique designs have not. Games
and entertainment are complex. Through experience (and lots of testing), designers have become
better at anticipating which adventures are likely to be deemed "fun" by popular opinion, but
little is understood about how different people experience fun. Game designers today rely pretty
heavily on their personal experiences and intuition (in addition to feedback from early prototype
play testing) to create "fun" experiences that "feel good," but they would be hard-pressed to
explain exactly what makes an overall game experience "good."

This problem of quantifying and understanding what makes a particular game "good" or "fun" is one
of the many kinds of questions the Experience Lab was designed to help answer. The lab enables
closer scientific study of the real-time interactions between humans and computers (not just
games) through its wide array of instrumentation designed to capture a person's physiologic
state while they interact with the computer, as well as all of the inputs and outputs from the
machine (e.g. mouse movements, screen display). The idea is for recordings of interactions with
the same stimulus (e.g., a video game) from several participants to form a rich data set of
multimodal time series sensor data ripe for modern data science inquiry, time series modeling,
and machine learning methods.

## Building the lab

In order to facilitate natural and distraction-free human-computer interactions, we built the lab
in a sound-resistant room and blocked out light from the windows. We even decided to paint the
walls black to minimize the light reflections from the computer monitor. Here are some before and
after snapshots of the lab:

<div class="project-gallery">
  <figure>
    <img src="/images/projects/experience-lab/lab-before-1.jpg" alt="Empty room before conversion to the Experience Lab" />
    <figcaption>Checking the layout before transforming the room into a lab.</figcaption>
  </figure>
  <figure>
    <img src="/images/projects/experience-lab/lab-before-2.jpg" alt="Another before photo of the empty room" />
    <figcaption>Another "before" photo.</figcaption>
  </figure>
  <figure>
    <img src="/images/projects/experience-lab/lab-before-3.jpg" alt="Room painted black to remove reflections and distractions" />
    <figcaption>We wanted to remove as many potential distractions as possible, including sun light and reflective wall colors.</figcaption>
  </figure>
  <figure>
    <img src="/images/projects/experience-lab/lab-after-eeg-test.jpg" alt="Lab mate testing the Emotiv EPOC+ EEG headset in the finished room" />
    <figcaption>My lab mate testing out the Emotiv EPOC+ EEG headset in the finished room.</figcaption>
  </figure>
</div>

We did a lot of sensor research to figure out which devices to include in the lab that were
comfortable enough to wear for an hour and offered good data resolution and quality. One signal I
wanted the lab to be able to capture was the galvanic skin response (GSR). Typically this is
measured at the finger tip, but this placement wouldn't work for people using a keyboard or
mouse. Some consumer and research devices claimed to be able to measure GSR from the wrist, but I
was skeptical at the time, so I built a prototype wristband GSR sensor. After I verified the
signal strength was sufficient under the wrist, we invested in a research device (for the
curious: Empatica E4).

<div class="project-gallery">
  <figure>
    <img src="/images/projects/experience-lab/gsr-wristband-prototype.jpg" alt="Prototype wristband GSR sensor" />
    <figcaption>Traditional high-fidelity GSR sensors measure at the finger tips, which would impede participants using keyboards/mice/controllers as input. I wanted to see how data collected at the finger tips compared to data collected from the wrist (where the skin is also thinner), so I built a test wristband GSR sensor.</figcaption>
  </figure>
  <figure>
    <img src="/images/projects/experience-lab/gsr-results.jpg" alt="Preliminary GSR results collected from the wrist" />
    <figcaption>Preliminary test GSR results collected from the wrist. They were qualitatively similar in structure to data collected at the finger tips, but showed less of the expected Bateman function shape. Still, skin conductance responses were measurable and didn't suffer from motion artifacts as much as the finger sensors. <em>Edit: this was an early test to see how the signal strength compared - wristband sensors like the Empatica E4 are available and (in our experience) do a pretty good job.</em></figcaption>
  </figure>
  <figure>
    <img src="/images/projects/experience-lab-cover.png" alt="Block diagram of Experience Lab devices and information flow" />
    <figcaption>A block diagram showing Experience Lab devices and information flow. Inputs are at the top and outputs at the bottom.</figcaption>
  </figure>
  <figure>
    <img src="/images/projects/experience-lab/eeg-test.jpg" alt="Testing the EEG device" />
    <figcaption>Me testing the EEG device too. It is surprisingly easy to put on.</figcaption>
  </figure>
</div>

After extensive research and testing of various sensors, we acquired consumer and research
devices to capture: heart rate (via a PPG sensor), GSR, electro-encephalograms (EEG), eye gaze
location, front-facing video camera, keyboard and mouse input (anonymized), and computer audio
and video output. An army of graduate students helped set up the lab's data collection software
and eventually the Apache Spark and Mahout back-end data storage and machine learning systems.
The lab software was built on top of the [Robot Operating System](https://www.ros.org/) because
it made near real-time asynchronous capture and storage of sensor data a breeze.

The video below shows our first test run with all of the sensors. The eye gaze is displayed as a
green dot over the video in the upper left corner, which also turns red when the eye gaze moves
outside of the screen's view frustum. The front-facing camera eventually moved closer to the
computer user, too.

<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/PtRM6mSXih0?wmode=opaque" title="Experience Lab first sensor test run" frameborder="0" allowfullscreen loading="lazy"></iframe>
</div>

That's it for the lab build process. We first used this lab to study the engagement levels of
distance learning students, published in [this paper](https://doi.org/10.1109/ACII.2017.8273641).

As a final parting thought, understanding the dynamics of "fun," or any kind of real-time
interactive experience, isn't as easy as recording all of this data and throwing it into a big
machine learning system. We have to be able to make sense out of the patterns in the data in
order to generalize to other types of activities and in order to connect our discoveries to what
we already know. We know that games have to be challenging and that games require some sort of
skill, so to generalize findings across games, we would need to understand how this data could be
used to measure physical and mental load and how to quantify skill. Neither of these problems is
easy either. Some day we'll have answers to enough of these kinds of questions and may be able to
build closed-loop real-time feedback systems that enable the computer's software to evolve
alongside its user to optimize their overall experience. That will be an exciting day!

## Updates

- **2026-09-13**: Pulled in the full project write-up, photo galleries, and video demo from the
  original site.
- **2026-09-12**: Migrated from the old site.
