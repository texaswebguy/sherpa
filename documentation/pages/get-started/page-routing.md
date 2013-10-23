 ------------
Page Routing
------------

Angular provides a very sophisticated level of page routing to enable "single page" web application. Many virtual pages can be constructed and once the prototype application boots up, they are cached and available for immediate display without the browser having to reload.

We have provided a simple way for you to provide the framework a route structure. You can do this on your own but the following is built-in and can help you build a multi-page prototype much quicker.

First, let's look at the config-overrides file with page routing added:

    {
        "PROTO_JS": "proto_config.js",
        "PROTO_CSS": "doc.css",
        "PATH_PROTO_ASSETS": "assets/",
        "PATH_WEBROOT": "",
        "PATH_PROTO_ASSETS": "assets/",
        "PROTO_ROUTES": {
          "home": {
            "name":"home",
            "url":"/",
            "label":"Home",
            "templateUrl":"pages/home.html",
            "controller":"homeController"
          },
          "page-1": {
            "name":"page-1",
            "url":"/page-1",
            "label":"Page One",
            "templateUrl":"pages/page-1.html",
            "controller":"page1Controller",
            "parent":"home"
          },
          "page-2": {
            "name":"page-2",
            "url":"/page-2",
            "label":"Page One",
            "templateUrl":"pages/page-2.html",
            "controller":"page2Controller",
            "parent":"home"
          },
          "page-3": {
            "name":"page-3",
            "url":"/page-3",
            "label":"Page One",
            "templateUrl":"pages/page-3.html",
            "controller":"page2Controller",
            "parent":"home"
          }
          "second": {
            "name":"second",
            "url":"/second",
            "label":"Second Section",
            "templateUrl":"pages/second/index.html",
            "controller":"secondController"
          },
     
        }
    }

  
This will automatically create a global object called `SHERPA.PROTO_ROUTES` which can now be used to build "pages". There is more information on this in the Prototyping section