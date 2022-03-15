/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

angular.lowercase = text => (text || '').toLowerCase();

import {messagesEn} from '../translation/messages_en.json';
import messagesEs from '../translation/messages_es.json';
import messagesFr from '../translation/messages_fr.json';
import  {dataset} from '../configfile/datasetlist';


var app =  angular.module('app', [
    'openmrs-contrib-uicommons',
    'openmrs-contrib-uicommons.header',
    'openmrs-contrib-uicommons.breadcrumbs'

]).config(['openmrsTranslateProvider', translateConfig])
.config(['$qProvider', function ($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
  }]);;

app.controller('AppMainController', ['$scope', '$http', '$filter', function($scope, $http, $filter){

    var vm = this;
    vm.links = {};
    vm.links["Rapportage vers DHIS2"] = "link1/";
	vm.appTitle = "Rapportage vers DHIS2";

    //For Select Items initialization
    $scope.selected = dataset.dataSetList[0];
    $scope.dataSets = dataset.dataSetList;

    //Setting reporting period dates
    var date = new Date();
    $scope.dateDebut = (new Date(date.getFullYear(), date.getMonth()-1,1 ));
    $scope.dateFin = (new Date(date.getFullYear(), date.getMonth(),0));
    var periodDate = $scope.dateDebut;
    $scope.period = $filter('date')(periodDate, "MMM-yyyy");


    //Select the starting date of the reporting period, the end date and the period will be updated.
    $scope.onChange = function(){
        var newDate = $scope.dateDebut;
        $scope.dateFin = (new Date(newDate.getFullYear(), newDate.getMonth()+1,0));
        $scope.period = $filter('date')(newDate, "MMM-yyyy");
    }

    $scope.onSend = function(){
        var dataToPost = {"dataSetDetails": $scope.selected, "startDate": $scope.dateDebut, "endDate": $scope.dateFin};
        console.log("Sending data to DHIS2: ", JSON.stringify(dataToPost));
    }
}]);

function translateConfig(openmrsTranslateProvider) {
    openmrsTranslateProvider.addTranslations('en', messagesEn);
    openmrsTranslateProvider.addTranslations('es', messagesEs);
    openmrsTranslateProvider.addTranslations('fr', messagesFr);
};


export default app;