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
    vm.selected = dataset.dataSetList[0];
    vm.dataSets = dataset.dataSetList;
    vm.responseStatus = "";
    vm.responseText = "";
    vm.postOperationStatus = false;


    //Setting reporting period dates
    var date = new Date();
    vm.dateDebut = (new Date(date.getFullYear(), date.getMonth()-1,1 ));
    vm.dateFin = (new Date(date.getFullYear(), date.getMonth(),0));
    var periodDate = vm.dateDebut;
    vm.period = $filter('date')(periodDate, "MMM-yyyy");


    //Select the starting date of the reporting period, the end date and the period will be updated.
    vm.onChange = function(){
        var newDate = vm.dateDebut;
        vm.dateFin = (new Date(newDate.getFullYear(), newDate.getMonth()+1,0));
        vm.period = $filter('date')(newDate, "MMM-yyyy");
    }

    vm.onSend = function(){

        vm.postOperationStatus = false;
        vm.responseStatus = "";
        vm.responseText = "";
        var dataToPost = {"dataSetDetails": vm.selected, "startDate": vm.dateDebut, "endDate": vm.dateFin};
        console.log("Sending data to DHIS2....: ", JSON.stringify(dataToPost));
        
        postToOpenHIM(JSON.stringify(dataToPost));
    }


    //Post data to OpenHIM
    var postToOpenHIM = function(dataJson){
        $http({
                method: 'POST',
                url: dataset.openhie.url,
                withCredentials: true,
                data: dataJson,
                headers: {
                    'Authorization': 'Basic ' + new Buffer.from(dataset.openhie.token + ':' + 'P@ssword').toString('base64'),
                    'Content-Type': 'application/json',
                    "Disable-WWW-Authenticate": "true"
                }
            }).then(function(response) { 
                //Success
                vm.responseStatus = 'SUCCES !';
                vm.responseText = 'Rapport envoyé vers DHIS2! Veuillez vous connecter à DHIS2 pour vérifier.';
                console.log(vm.responseStatus, vm.responseText, response.data);
                vm.postOperationStatus = true;

            }, function(response){
                //Exception
                vm.responseStatus = 'ECHEC !';
                vm.responseText = 'Rapport non envoyé! Veuillez contacter les techniciens du système.';
                console.log(response);
                vm.postOperationStatus = true;
        });
    }

}]);

function translateConfig(openmrsTranslateProvider) {
    openmrsTranslateProvider.addTranslations('en', messagesEn);
    openmrsTranslateProvider.addTranslations('es', messagesEs);
    openmrsTranslateProvider.addTranslations('fr', messagesFr);
};


export default app;