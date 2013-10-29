Configuring Your Prototype
------------

The index.html page described above is configured by default settings. These settings can be overwritten to provide customization to your prototype. The example below shows default values but you can change these in the case you want to have several pages in different folders sharing the same css, js and other assets.

    {
        "PROTO_JS": "app.js",
        "PROTO_CSS": "doc.css",
        "PATH_PROTO_ASSETS": "assets/",
        "PATH_WEBROOT": "",
        "PATH_PROTO_ASSETS": "assets/"
    }

  
To enable these overrides, your index page needs to have the following added to the `<head>` portion of your prototype html file.

    <script type="text/javascript">
      var SHERPA_CONFIG_OVERRIDES = {
      	"GLOBAL_CONFIG":"assets/config/config-overrides.json"
      }
    </script>
    
**Note:** the name of the config overrides file can be anything.

 ---------------------
