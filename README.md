# Mobile website for TOPO

This part of the TOPO website follows the Progressive Web App (PWA)
guidelines to deliver an experience as close as a native app as
possible,  while being easy to maintain and update.

This is a React version, that uses the power of the Wordpress REST API,
but it is adapted from a php version at
<https://topolitique.ch/beta/m/>.

To check out the latest version, go to this link
<https://mobile.the-duck.now.sh>

# Tasks

> 😴  pending
> ✍️  wip
> 👍  done

-   When posts are loading, show info ✍️
-   Add previous post button 😴
-   Change all images to svg components (see src/components/icons.js) ✍️
-   Cleanup css to more dense file 😴
-   Check if icons and splashscreens work, and if we could remove some
    😴
-   Stop and start timer, depending on status (menu open, posts
    loading...) 😴
-   Style change on category type 😴
-   When post type is video, go to youtube video 😴
-   Add 'advertising', a header that shows an announcement or something
    😴
-   Images : ensure that all images are https, otherwise don't show them
    😴
-   Images : lazy loading, if possible ? 😴
-   'serviceworker.js' : figure out how it works ✍️
-   Block timer when holding finger on screen 😴
-   Load articles when offline (using api, means that there will be no
    links) 😴
-   Reload new posts on scroll up. 😴
-   Show status when offline 😴

## Version 0.1.0 - Alpha

All 0.1.x versions pathe the way to making a fully functional PWA web
app. Nothing fancy there, just the foundations.  

**Tasks**

-   [0.1.1] Add eslint (with airbnb style guide) 👍
-   [0.1.2] Add lighthouse report 👍
-   [0.1.3] Service worker, load when offline; Custom UI (sections and
    social links)

* * *

resources for serviceworker
<https://github.com/poanchen/pwa-to-do-list/blob/dev/src/service-worker.js>

<https://medium.com/appscope/7-excellent-progressive-web-apps-that-prove-pwas-are-ready-for-mainstream-consumer-adoption-9a8a8e876eba>

<https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0>
