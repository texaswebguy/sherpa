Known conversions issues & instructions
======================


**These classes should be deprecated and replaced to match Bootstrap**
* ```center-text``` change to ```text-centered```
* ```right-text``` change to ```text-right```
* ```{color}-text``` change to ```text-{color}``` to match Bootstrap's text modifiers like ```text-centered``` - ```{color}-text``` will still work but it should not be used.
* ```btn-primary``` change to ```btn-success```
* ```btn-secondary``` change to ```btn-primary```
* ```btn btn-tertiary``` change to ```btn```
* ```rounded-large``` change to ```well-large```
* ```rounded-small``` change to ```well```
* ```rounded-large {color}-stroke``` change to ```well-large well-{color}-stroke```

**Font Names**
* All ```museo-sans``` fonts have been deprecated.
* ```museo-for-dell-100regular``` change to ```museo-for-dell-100```
* ```museo-for-dell-300regular``` change to ```museo-for-dell-300```
* NOTE: These changes should not have any impact because less variables should be used anyway: ```@sansFontFamily``` ```@serifFontFamily```

**Issues with old Sherpa override file**
* ```btn``` had a ```margin-bottom:10px``` which is not used in Bootstrap. This margin has been removed and may surface some issues.
* ```p``` had the ```margin-bottom:10px``` because it had problems with padded containers like wells. The margin has been added again and the last element in padded containers such as wells now will have margin-bottom:0 to fix the issue.


**Non Boostrap Colors**
* All non-bootstrap color variables are preceeded by "dell" to make a destinction that they are not bootstrap colors.
* @dellRedDark
* @dellBerry
* @dellTeal
* @dellNavy
* @dellAlertYellow
* @dellHighlightBlue
* @alertBackground

**Note:** All Boostrap native gray values have been loaded with brand approved values.  There is a slight difference in some of these. For example, in cases where ```gray-text``` is used, ```gray-medium-text``` is the appropriate class.

