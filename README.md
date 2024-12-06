# Introduction

This app was built to interact with the iTunes top 100 albums API, and offers the following features:

- Search functionality
- Pagination
- Album details, with external links to Apple Music
- Ability to add and remove albums to the favourites of a hardcoded user, which are viewable in a coverflow layout on the homepage (there are already some favourited albums hardcoded for demonstration purposes)
- Light and dark theming

The front-end has been built with React Vite, and styled using Tailwind CSS and DaisyUI.

The back-end is a small RESTful API, which calls the [base URL](https://rf-print-work-be.onrender.com/api/albums). Please see endpoints.json in the backend repo for more information on the endpoints used.

# Using the app

You can view a hosted version of the app [here](https://robsitunestop100.netlify.app/)

You can swiper through your favourited albums in the coverflow on the homepage, and also view the top 20 albums.

Clicking the button at the bottom of the top 20 albums list takes you to the main album list page, where you can view all 100 (loaded in intervals of 20). You can also search for any album or artist in the search bar.

Clicking on an indidual album will take you to the album detail page. Here, you can view high quality album art, album info such as genre/s, follow external links to Apple Music, and favourite/unfavourite the album.

In the Nav, clicking the logo will take you to the homepage. There is a popup menu to the left which includes links to the homepage and album list page. Finally, you can switch your theme between light and dark mode by pressing the sun/moon on the right-hand side of the navbar.

This app is responsive, and works across devices of all screen widths. This was achieved mostly using Tailwind, with some minor custom CSS tweaks for more specific cases.

Thanky you for taking the time to look at my project! :relaxed:
