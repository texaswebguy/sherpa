 ---------------------
The index.html file
------------

Let's walk through the code in the blank index.html file so you understand it.

Required: xmlns:ng is required to get Angular to compile the page.

    <html lang="en" xmlns:ng="http://angularjs.org">

  
You can edit this so that when the page first loads it will have the proper title for your project. However, when you have a page router and different "pages" are displayed by your ap, this title will be changed.

    <title>Blank Page</title>

Important forthe grid to work properly in mobile devices

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	
The style tag turns off the page until it is ready.
When you copy the blank folder you can place anywhere as long as the pathe to the Sherpa js file is correct.

    <style>body{opacity:0}body.ng-scope{opacity:1}</style>
    <script src="../_sherpa/sherpa.v07.js"></script>

		
The pageController is a Sherpa function that controlls certain aspects of every prototype page so please leave it in place.

    <body ng-controller="pageController">

