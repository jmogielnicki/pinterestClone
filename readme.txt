Pinterest Clone by John Mogielnicki


_______________________

To Start the App:
1. Navigate to root folder
2. npm install
2. npm Start
_______________________

Features:

1. Python server & flask api, which can serve up requested data based on custom url parameters
2. JSON pin data rendered into modular React pin components
3. Custom css styling to match Pinterest pin-look
4. Masonry.js layout library, which stacks pins into grid layout, indexed across rows rather than down columns
5. Basic search functionality, which can take in multiple keywords and shows only pins that contain all keywords in their description.

_______________________

Known bugs:
1. It's possible for user to get "stuck" at bottom of the page if they scroll fast enough, with no pins loading below.  However, if they scroll up a bit new pins load.  I believe I know how I would fix this but didn't have time to implement the fix.
_______________________

If I had another week to work on this, I would:
1. 
2. Build out more search/filtering capabilities in the header toolbar, like a topics filters or repins/likes min/max filters.
2. Implement smarter language search.  
	- Count number of occurances of keywords in descriptions and sort pins by count of occurances descending
	- Add ability to understand synonymns
	- Add natural language intelligence, so someone could enter "pins of kittens with at least 100 likes" and see meaningful results
3. Make the pins clickable, with a pinteresty close-up modal.
4. Fix