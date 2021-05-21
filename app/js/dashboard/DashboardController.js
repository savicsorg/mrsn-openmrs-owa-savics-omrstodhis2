angular.module('DashboardController', []).controller('DashboardController', ['$scope', '$rootScope', 'openmrsRest', '$state', '$ocLazyLoad', '$injector', 'Upload','$timeout', function ($scope, $rootScope, openmrsRest,  $state, $ocLazyLoad, $injector, Upload, $timeout) {
//    $ocLazyLoad.load('../../node_modules/ng-file-upload/dist/ng-file-upload.min.js').then(function() {
        $scope.rootscope = $rootScope;

        console.log("DashboardController new form ---")
        $scope.myAgents = [{}];
        $scope.appTitle = "Gestion des formulaires";
        $scope.resource = "savicsgmao/agent";
        //Breadcrumbs properties ;
        $rootScope.links = {};
        $rootScope.links["Home"] = "";
        $rootScope.links["Agents"] = "/agents";

        $scope.IsVisible = false;

        $scope.ctrlPeriod = function(){
        $scope.IsVisible = true;
        };

        //TODO replace this by real data comming from openmrsRest
        $scope.formulaires = [
            {"serialnumber": "Consultation Externe", "designation": "HD Gaya", "strby": "John", "lastModified": "2021-01-31"},
            {"serialnumber": "Service des Urgences", "designation": "HD Gaya", "strby": "John", "lastModified": "2021-01-31"},
            {"serialnumber": "Plannification Familiale", "designation": "HD Gothèye", "strby": "Ben", "lastModified": "2021-01-31"},
            {"serialnumber": "Plannification Familiale", "designation": "HD Gaya", "strby": "John", "lastModified": "2021-01-31"},
            {"serialnumber": "Consultation Externe", "designation": "HD Gothèye", "strby": "John", "lastModified": "2021-01-31"}
            ];

        //var Upload = $injector.get('Upload');
        $scope.uploader = {};
        $rootScope.kernel.loading = 100;

        $scope.upload = function(){
            $rootScope.kernel.loading = 0;
            if ($scope.uploader.file) {
                $scope.uploader.file.upload = Upload.upload({
                    url: 'http://35.180.226.216:3000/reports',
                    data: $scope.uploader,
                    method:'POST'
                }).then(function onSuccess(response) {
                    console.log("success");
                }).catch(function onError(response) {
                    console.log("error", response);
                });

                $scope.uploader.file.upload.then(function(response) {
                    $timeout(function () {
                        $scope.uploader.file.result = response.data;
                        $rootScope.kernel.loading = 100;
                        // $state.transitionTo('home.capture.tests.main');
                        $rootScope.kernel.alerts.push({
                            type:3,
                            msg: gettextCatalog.getString('The data have been uploaded'),
                            priority: 4
                        });
                    });
                }, function (response) {
                    if (response.status > 0){
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    //$scope.has been uploader.file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }
//    });·


// old ctrl
//     $scope.rootscope = $rootScope;

// console.log("DashboardController new form ---")
// $scope.myAgents = [{}];
// $scope.appTitle = "Gestion des formulaires";
// $scope.resource = "savicsgmao/agent";
// //Breadcrumbs properties ;
// $rootScope.links = {};
// $rootScope.links["Home"] = "";
// $rootScope.links["Agents"] = "/agents";

// $scope.IsVisible = false;

// $scope.ctrlPeriod = function(){
// $scope.IsVisible = true;
// };

// //TODO replace this by real data comming from openmrsRest
// $scope.formulaires = [
//     {"serialnumber": "Consultation Externe", "designation": "HD Gaya", "strby": "John", "lastModified": "2021-01-31"},
//     {"serialnumber": "Service des Urgences", "designation": "HD Gaya", "strby": "John", "lastModified": "2021-01-31"},
//     {"serialnumber": "Plannification Familiale", "designation": "HD Gothèye", "strby": "Ben", "lastModified": "2021-01-31"},
//     {"serialnumber": "Plannification Familiale", "designation": "HD Gaya", "strby": "John", "lastModified": "2021-01-31"},
//     {"serialnumber": "Consultation Externe", "designation": "HD Gothèye", "strby": "John", "lastModified": "2021-01-31"}
//     ];

    // $scope.uploadFile = function() {
    // var file = $scope.myFile;
    // console.log('file is ' );
    // console.dir(file);
    // var uploadUrl = "localhost:3000/file";
    // fileUpload.uploadFileToUrl(file, uploadUrl);
    // };

    // var uploader = $scope.uploader = new FileUploader({
    //     url: 'upload.php'
    //     //,timeout: 2000
    // });

    // // FILTERS
  
    // // a sync filter
    // uploader.filters.push({
    //     name: 'syncFilter',
    //     fn: function(item /*{File|FileLikeObject}*/, options) {
    //         console.log('syncFilter');
    //         return this.queue.length < 10;
    //     }
    // });
  
    // // an async filter
    // uploader.filters.push({
    //     name: 'asyncFilter',
    //     fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
    //         console.log('asyncFilter');
    //         setTimeout(deferred.resolve, 1e3);
    //     }
    // });

    // // CALLBACKS

    // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    //     console.info('onWhenAddingFileFailed', item, filter, options);
    // };
    // uploader.onAfterAddingFile = function(fileItem) {
    //     console.info('onAfterAddingFile', fileItem);
    // };
    // uploader.onAfterAddingAll = function(addedFileItems) {
    //     console.info('onAfterAddingAll', addedFileItems);
    // };
    // uploader.onBeforeUploadItem = function(item) {
    //     console.info('onBeforeUploadItem', item);
    // };
    // uploader.onProgressItem = function(fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    // uploader.onProgressAll = function(progress) {
    //     console.info('onProgressAll', progress);
    // };
    // uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //     console.info('onSuccessItem', fileItem, response, status, headers);
    // };
    // uploader.onErrorItem = function(fileItem, response, status, headers) {
    //     console.info('onErrorItem', fileItem, response, status, headers);
    // };
    // uploader.onCancelItem = function(fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteItem = function(fileItem, response, status, headers) {
    //     console.info('onCompleteItem', fileItem, response, status, headers);
    // };

    // uploader.onTimeoutItem = function(fileItem) {
    //     console.info('onTimeoutItem', fileItem);
    // };

    // uploader.onCompleteAll = function() {
    //     console.info('onCompleteAll');
    // };

    // console.info('uploader', uploader);
    }]);