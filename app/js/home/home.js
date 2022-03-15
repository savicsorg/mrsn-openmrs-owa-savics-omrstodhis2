import angular from 'angular';
import uiRouter from 'angular-ui-router';
import breadcrumbsComponent from './components/breadcrumbs.component.js';
import translateComponent from './components/translate.component.js';
import headerComponent from './components/header.component.js';
import notificationComponent from './components/notification.component.js';

import uicommons from 'openmrs-contrib-uicommons';

let homeModule = angular.module('home', [ uiRouter, 'openmrs-contrib-uicommons'])
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            template: require('./home.html')
        });

    })
    .config(['$qProvider', function ($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
    }])

    // To prevent adding Hash bangs(#!/) instead of simple hash(#/) in Angular >1.5

    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.hashPrefix('');
    }])

    .component('breadcrumbsComponent', breadcrumbsComponent)
    .component('translateComponent', translateComponent)
    .component('headerComponent', headerComponent)
    .component('notificationComponent', notificationComponent);

export default homeModule;
