'use strict';

angular.module('YaDespesas')
  .service('manager', function manager() { 

    this.debtViewUpdated = true;

    this.monthViewUpdated = true;

    this.isDebtViewUpdated = function() {
      if(!this.debtViewUpdated) {
        this.debtViewUpdated = true;
        return false;
      }

      return true;
    }

    this.isMonthViewUpdated = function() {
      if(!this.monthViewUpdated) {
        this.monthViewUpdated = true;
        return false;
      }

      return true;
    }
  });
