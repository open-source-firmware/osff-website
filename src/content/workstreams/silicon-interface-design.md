---
tags: workstream

title: Silicon Interface Design
date: "2025-12-12"
time: "7.00pm CST - 10.00AM ET"
summary: Design discussion to specify the interfaces between silicon initialization code and host firmware.
text:
  - Integrating binary blobs that handle parts of the silicon initialization is a common technique within the open-source firmware ecosystem to retain control over parts of the code, from a SoC vendor perspective. Within the last years multiple SoC vendors defined different interfaces to communicate to those "silicon initialization code". Also different mechanisms are in place to configures those.

  - The Silicon Interface Design workstream has the goal to unify these interfaces and define a specification around it so that SoC vendors and (open-source) firmware projects, and their developers, have a fixed and common way to interact and configure those silicon initialization code.

goals:
  - text: Develop a transparent, easy-to-follow workflow for feature requests.
    done: true

  - text: Ensure businesses and the community can collaborate efficiently.
    done: true

  - text: Avoid the creation of fragmented forks by encouraging upstream development.
    done: true

  - text: Balance business needs with the open-source ethos.
    done: false

resources:
  - text: "Introduction Slides"
    file: "https://osfw.foundation/slides/SiliconInterfaceDesign/OSFF-Workstream-SiliconInterfaceDesign-Intro.pdf"

leads:
  - name: "Subrata Banik"
    email: "subratabanik@google.com"
    image: "subrata-banik.jpg"
  - name: "Christian Walter"
    email: "christian.walter@9elements.com"
    image: "christian-walter.png"
---
## Bi-weekly

every Monday 5.00PM CEST - 11.00AM ET

  <a href="https://calendar.google.com/calendar/u/0/r/week/2022/9/26?eid=MjI1aTI3Mms4OTMzNG81aXU3MnVlMDZuNmxfMjAyMjA5MjZUMTUwMDAwWiBjXzR1ODVkODVlZHNsNzJzMjFxZWJvM2g4cDZzQGc&ctz=Europe/Berlin&sf=true" class="button" target="_blank">
    Go to Calendar
  </a>