---
tags: workstream

title: silicon interface design
date: "2025-12-12"
time: "7.00pm CST - 10.00AM ET"
text:
  - Integrating binary blobs that handle parts of the silicon initialization is a common technique within the open-source firmware ecosystem to retain control over parts of the code, from a SoC vendor perspective. Within the last years multiple SoC vendors defined different interfaces to communicate to those "silicon initialization code". Also different mechanisms are in place to configures those.

  - The Silicon Interface Design workstream has the goal to unify these interfaces and define a specification around it so that SoC vendors and (open-source) firmware projects, and their developers, have a fixed and common way to interact and configure those silicon initialization code."

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
  - text: "test.pdf"
    file: "test.pdf"

leads:
  - name: "Werner Zeh"
    email: "werner.zeh@osfw.foundation"
    image: "werner-zeh.png"
---