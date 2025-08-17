---
tags: workstream

title: Unified Silicon Interface
dateString: "Kickoff Meeting: December 12th"
timeString: 7.00pm CST // 10.00am ET
summary: Design discussion to specify the interfaces between silicon initialization code and host firmware.
text:
  - Integrating binary blobs that handle parts of the silicon initialization is a common technique within the open-source firmware ecosystem to retain control over parts of the code, from a SoC vendor perspective. Within the last years multiple SoC vendors defined different interfaces to communicate to those "silicon initialization code". Also different mechanisms are in place to configure those.

  - The Silicon Interface Design workstream has the goal to unify these interfaces and define a specification around it so that SoC vendors and (open-source) firmware projects, and their developers, have a fixed and common way to interact and configure those silicon initialization code.

goals:
  - text: Unify interfaces between silicon initialization code and host firmware
  - text: Define a common specification for SoC vendors and firmware projects
  - text: Standardize configuration mechanisms for silicon initialization code
  - text: Improve interoperability across different hardware platforms

resources:
  - text: "Introduction Slides"
    file: "/OSFF-Workstream-SiliconInterfaceDesign-Intro.pdf"

leads:
  - name: "Subrata Banik"
    email: "subrata.banik@gmail.com"
    image: "subrata-banik.jpg"
  - name: "Christian Walter"
    email: "christian.walter@osfw.foundation"
    image: "christian-walter.jpg"
---
