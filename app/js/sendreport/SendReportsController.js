import config from "../../config/config.json";

angular.module('SendReportsController', []).controller('SendReportsController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    
    date = new Date();
   
    $scope.appTitle = "Data Exchange with DHIS2";

    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $scope.dateDebut = (new Date(this.date.getFullYear(), this.date.getMonth()-1,1 )).toISOString().slice(0,10);
    $scope.dateFin = (new Date(this.date.getFullYear(), this.date.getMonth(),0)).toISOString().slice(0,10);
    $scope.period = (new Date(this.date.getFullYear(), this.date.getMonth()-1,1 )).toISOString().slice(0,10);
    $scope.dataSets = config.dataSetList;
    $scope.dataSetElement = $scope.dataSets[0];
    $scope.postData = {};
    
    
    function onSelectDateDebut() {

        $scope.period = $scope.dateDebut;
        $scope.dateFin = (new Date($scope.dateDebut.getFullYear(), $scope.dateDebut.getMonth(),0)).toISOString().slice(0,10);
    
    }

    //Post the Paylod built to OpenHIM
    $scope.onSend = function() {
        
        alert (buildPost());
        
    }


    // Build the payload to post to OpenHIM
    function buildPost() {
        postData = {
            "dataSetDetails":
                {
                    "id": $scope.dataSetElement.id,
                    "name": $scope.dataSetElement.shortName,
                    "shortName": $scope.dataSetElement.shortName,
                    "orgUnit": $scope.dataSetElement.orgUnit
                },
            "startDate": $scope.dateDebut,
            "endDate": $scope.dateFin
        }
        return postData;
    }

    function getOneDataSetById(dataSetId) {
        const dataSet = $scope.dataSets.find(dataSet => dataSet.id === dataSetId);
        if(dataSet){ 
            return dataSet;
        } else {
            throw new Error ('DataSet not found!')
        }
    }

    $scope.onSelectDataSet = function (event){
        const selectedDataSetId=event.target.value;
        $scope.dataSetElement = getOneDataSetById(selectedDataSetId);
        
    }

}]);