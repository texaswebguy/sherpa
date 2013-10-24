// Controllers 
sherpaApp.controller("tableCtrl", function($scope,$http) {

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 25, 50, 100],
        pageSize: 10,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get(SHERPA.PATH_PROTO_ASSETS+"data/sample_customer_list_en.json").success(function (largeLoad) {        
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get(SHERPA.PATH_PROTO_ASSETS+"data/sample_customer_list_en.json").success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = { 
        data: 'myData',
        columnDefs: [
            {field: 'FirstName', displayName: 'First Name'},
            {field: 'LastName', displayName:'Last Name'},
            {field: "Company", displayName:"Company"},
            {field: "Phone", displayName:"Phone"}
        ],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };

});

sherpaApp.controller("bsTableCtrl", function($scope,$http) {
    $http.get(SHERPA.PATH_PROTO_ASSETS+"data/sample_customer_list_en.json").success(function (tableRows) {    
        $scope.rows = tableRows;
        $scope.labels = (function(){
            var tempObj = {}
            _.each(_.keys(tableRows[0]), function(label){
                tempObj[label] = _.str.humanize(label);
            });
            return tempObj;
        })();

        //console.log($scope.rows,$scope.labels)
    });
});

