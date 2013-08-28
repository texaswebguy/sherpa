Known conversions issues & instructions
======================


**These classes should be deprecated and replaced to match Bootstrap**
* ```center-text``` change to ```text-centered```
* ```right-text``` change to ```text-right```
* ```btn-primary``` change to ```btn-success```
* ```btn-secondary``` change to ```btn-primary```
* ```btn btn-tertiary``` change to ```btn```
* ```rounded-large``` change to ```well-large```
* ```rounded-small``` change to ```well```
* ```rounded-large {color}-stroke``` change to ```well-large well-{color}-stroke```


**Issues with olde Sherpa override file**
* ```btn``` had a ```margin-bottom:10px``` which is not used in Bootstrap. This margin has been removed and may surface some issues.
* ```p``` had the ```margin-bottom:10px``` because it had problems with padded containers like wells. The margin has been added again and the last element in padded containers such as wells now will have margin-bottom:0 to fix the issue.
* 
