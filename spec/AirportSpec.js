'use strict';

describe('Airport', function() {
  var airport;
  var plane;
  var weather;

  beforeEach(function(){
    airport = new Airport(weather);
    plane = jasmine.createSpy('plane');
    weather = jasmine.createSpyObj('weather',['isStormy'])
  });

    it('has no planes by default', function(){
      expect(airport.planes()).toEqual([]);
    });

  describe('under normal conditions', function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(false);
    });

    it('can clear planes for landing', function(){
      airport.clearForLanding(plane);
      expect(airport.planes()).toEqual([plane]);
    });
    it('can clear planes for takeoff', function(){
      airport.clearForLanding(plane);
      airport.clearForTakeOff(plane);
      expect(airport.planes()).toEqual([]);
    });
  });

  describe('under stormy conditions', function(){
    beforeEach(function(){
      weather.isStormy.and.returnValue(true);
    });

    it('does not clear a plane for landing', function(){
      expect(function(){ airport.clearForLanding(plane); }).toThrowError('cannot land during storm');
    });
    it('does not clear a plane for takeoff', function(){
      expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('cannot take off during storm');
    });
  });
});
