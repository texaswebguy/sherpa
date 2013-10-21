 ---------------------
The Blank Folder
------------

![_blank folder contents][1]

The _blank folder is there for you to copy and start a new prototype application. Please notice the word "application". Most designers and information architects would think of an HTML prototype as one page per HTML file. Beeter to think of it as one index.html = a web application that can server several "pages". Now lets look at the assets directory:

![assets folder contents][2]

**Here is a brief explanation of each folder and it's purpose:**

**config:** Holds files that are used to set up three things:


 - Application Configuration which specifies stylesheets, javascript
   files, framework options and page routing. 
 - Localization settings which provide currency conversion and date formatting. (will be
   deprecated in lieu of Angular's i18n js files)
 - Project information spreadsheet (in CSV format) which is used by framework to provide project information.

**content:** Localized content files to store language specific content used in your application.

**css:** All css needed for prototype including Bootstrap CSS and theme overrides.

**data:** A place to put any data files you might use in the prototype. A sample customer list is provided in csv format.

**img:** Images used in any stylesheet and prototype pages.

**js:** Your application's javascript goes in this folder.

**xref:** Localized reference files that work with content to provide urls for links and images that are localized.

  [1]: assets/img/starter-kit-blank.png
  [2]: assets/img/starter-kit-assets.png