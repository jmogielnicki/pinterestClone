Pinterest Clone by John Mogielnicki

_______________________

To Start the App:

1. Navigate to root folder (/pinterestClone)
2. Run "npm install"
3. Run "npm start"
4. Go to http://127.0.0.1:3000/ on any web browser
_______________________

Features:

1. Python server & flask api, which receives custom url parameters and serves up requested data
2. JSON pin data rendered into modular React pin components
3. Custom css styling to match Pinterest look & feel.
4. Pinterest grid layout using masonry.js, which can index across rows rather than down columns
5. Basic search functionality with immediate response as you type.  Can take in multiple keywords and shows only pins that contain all keywords in their description.
6. Module bundling with webpack

_______________________

Known bugs:

1. It's possible for user to get "stuck" at bottom of the page if they scroll fast enough, with no pins loading below.  However, if they scroll up a bit new pins load.  I believe I know how I would fix this but didn't have time to implement the fix.
_______________________

If I had another week to work on this, I would:

1. Fix infinite scroll bug referenced above.
2. Build out more search/filtering capabilities in the header toolbar, like a topics filters or repins/likes min/max filters.
3. Implement smarter language search.  
	- Count number of occurances of keywords in descriptions and sort pins by count of occurances descending
	- Add ability to understand synonymns
	- Add natural language intelligence, so someone could enter "pins of kittens with at least 100 likes" and see meaningful results
4. Make the pins clickable, with a pinteresty close-up modal.