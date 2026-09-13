---
title: "Arcade Joystick"
category: personal
summary: "A custom-built arcade-style joystick controller, from PCB design through final assembly."
dates: ""
organization: ""
order: 10
image: "/images/projects/arcade-joystick-cover.jpg"
imageAlt: "The finished arcade joystick controller"
links:
  - label: "Video"
    url: "https://www.youtube.com/watch?v=6YYsnefwc9g"
  - label: "Slagcoin joystick layout guide"
    url: "http://www.slagcoin.com/joystick/layout.html"
  - label: "Autodesk Inventor"
    url: "http://www.autodesk.com/products/inventor/overview"
  - label: "Teensy 2.0"
    url: "https://www.pjrc.com/teensy/"
  - label: "MAME"
    url: "https://www.mamedev.org/"
tags: ["hardware", "electronics", "PCB design"]
draft: false
featured: false
---

I've always wanted to build my own arcade-style joystick controller, so I finally sat down and
designed one from scratch, starting with the electronics. I based the button and joystick layout
on the excellent reference guides at [Slagcoin](http://www.slagcoin.com/joystick/layout.html), and
decided to drive everything through a [Teensy 2.0](https://www.pjrc.com/teensy/) microcontroller,
which shows up to a computer as a standard USB HID game controller and works great with
[MAME](https://www.mamedev.org/) and other emulators.

<div class="project-gallery">
  <figure>
    <img src="/images/projects/arcade-joystick/pcb-layout-altium.png" alt="PCB layout in Altium" />
    <figcaption>PCB layout in Altium. I designed a simple board to breakout the button and joystick microswitch connections to the Teensy's I/O pins.</figcaption>
  </figure>
  <figure>
    <img src="/images/projects/arcade-joystick/pcb-render.png" alt="Simulated 3D render of the PCB" />
    <figcaption>A simulated render of the PCB before sending it off for fabrication.</figcaption>
  </figure>
  <figure>
    <img src="/images/projects/arcade-joystick-cover.jpg" alt="The finished arcade joystick controller" />
    <figcaption>The real thing! Fully assembled and ready to play.</figcaption>
  </figure>
</div>

Once the PCB design was finalized, I had it fabricated by [Seeed
Studio](https://www.seeedstudio.com/service/index.php?r=pcb) and ordered arcade buttons and a
joystick from [Arcade Spare Parts](http://www.arcadespareparts.com/). Here's an early prototype
running on the breadboarded PCB:

<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/MpeWpB7eFDg" title="Arcade joystick prototype in action" frameborder="0" allowfullscreen loading="lazy"></iframe>
</div>

With the electronics working, I moved on to designing the housing. I wanted something with a
trapezoidal profile similar to a classic arcade cabinet control panel, so I modeled it in
[Autodesk Inventor](http://www.autodesk.com/products/inventor/overview) and had the panels cut on
a water jet. Here's an early test cut of one of the panels:

<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/szYdq6yDEvk" title="Water-jet cutting a test panel" frameborder="0" allowfullscreen loading="lazy"></iframe>
</div>

After test-fitting the panels and mounting the electronics, buttons, and joystick inside the
trapezoidal housing, I wired everything up to the PCB and Teensy. The last video below shows the
finished controller working with MAME:

<div class="video-embed">
  <iframe src="https://www.youtube.com/embed/gUrWOWnR6wU" title="Finished arcade joystick working in MAME" frameborder="0" allowfullscreen loading="lazy"></iframe>
</div>

This project was a fun excuse to get hands-on practice with PCB design, CAD modeling, and
microcontroller firmware all in one build - skills I first started picking up in an EE course I
took through [MITx](https://6002x.mitx.mit.edu/courseware/).

## Updates

- **2026-09-13**: Pulled in the full write-up, PCB photos, and video demos from the original site.
- **2026-09-12**: Migrated from the old site.
