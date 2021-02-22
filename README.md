# fotovagg (Fotovägg in swedish means photo wall), this app is an image carousel fetching images from Flickr

It displays x amount of images for x amount of seconds. This procedure loops until
the last 'page' is reached for a specific term based on user search term. 

# The way in which the images are displayed

The "carousel" starts automatically. 
(Starting theme of images based on the term "Semla")

	1. X amount of images are displayed  

	2. fading in one by one every x amount of ms. 

	3. Present for x amount of seconds, 

	4. A new fetch is done to make sure is the latest updated data from Flickr

	Next X amount of images are displayed...and so on.

	...This goes on til the last page/image and starts all over again

  If new search, the loop starts again from phase 1. 



# Flickr Api Overview: 
https://www.flickr.com/services/api/misc.overview.html

Flickr Api index: 
https://www.flickr.com/services/api/

Method used in this app is flickr.photos.search: 
https://www.flickr.com/services/api/flickr.photos.search.html

# Tech

Created with React create-react-app.
Using functional components, Hooks like Context, useState, useEffect, useRef

Notes:
	React Context really necessary?

Downside: The fade in with CSS is dependent of the x amount of seconds one "page" shows with setTimeout. 

