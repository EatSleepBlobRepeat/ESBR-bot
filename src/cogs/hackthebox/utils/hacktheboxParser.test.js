const { expect } = require('chai');

const HTBparser = require('./hacktheboxParser');

const validDay = '5';
const invalidDayOrLimit = 'lol';
const validUsername = 'username';
const validLimit = '50';

describe('Hackthebox argument parser', () => {
  describe('with no args', () => {
    it('should throw error if there is no arguments', () => {
      try {
        HTBparser([]);
      } catch (/** @type {Error} */e) {
        expect(e.message).to.equal('Invalid arguments');
      }
    });
  });

  describe('with 1 arg', () => {
    it("should return day as integer if there is one argument and it's integer", () => {
      const parsedArg = HTBparser([validDay]);
      expect(parsedArg.day).to.equal(parseInt(validDay, 10));
      expect(parsedArg.limit).to.eq(null);
      expect(parsedArg.by).to.eq(null);
    });
    it("should throw error if there is one argument and it's not integer", () => {
      try {
        HTBparser([invalidDayOrLimit]);
      } catch (e) {
        expect(e.message).to.equal('Invalid day value');
      }
    });
  });
  describe('with 2 args', () => {
    it('should throw error if there are 2 arguments', () => {
      try {
        HTBparser(['arg1', 'arg2']);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
    });
  });
  describe('with 3 arguments', () => {
    it('should throw error if first argument is not integer', () => {
      try {
        HTBparser(['arg1', 'arg2', 'arg3']);
      } catch (e) {
        expect(e.message).to.equal('Invalid day value');
      }
    });
    it("should throw error if second argument is not 'by' or 'limit'", () => {
      try {
        HTBparser(['5', 'arg2', 'arg3']);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
    });
    it("should not throw error if 2nd arg is 'by'", () => {
      const parsedArgs = HTBparser([validDay, 'by', validUsername]);
      expect(parsedArgs.day).to.equal(parseInt(validDay, 10));
      expect(parsedArgs.by).to.equal(validUsername);
      expect(parsedArgs.limit).to.eq(null);
    });
    it("should throw error if 2nd arg is 'limit' but 3rd arg is not integer", () => {
      try {
        HTBparser([validDay, 'limit', invalidDayOrLimit]);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
    });
    it('should not throw error if 2nd arg is "limit" but 3rd arg is integer', () => {
      const parsedArgs = HTBparser([validDay, 'limit', validLimit]);
      expect(parsedArgs.day).to.equal(parseInt(validDay, 10));
      expect(parsedArgs.by).to.eq(null);
      expect(parsedArgs.limit).to.equal(parseInt(validLimit, 10));
    });
  });
  describe('with 5 arguments', () => {
    it('should throw error if first argument is not integer', () => {
      try {
        HTBparser(['arg1', 'arg2', 'arg3', 'arg4', 'arg5']);
      } catch (e) {
        expect(e.message).to.equal('Invalid day value');
      }
    });
    it("should throw error if 2nd argument and 4th arg is not 'by' and 'limit' or vice verca", () => {
      try {
        HTBparser([validDay, 'arg2', 'arg3', 'arg4', 'arg5']);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
      try {
        HTBparser([validDay, 'by', validUsername, 'notlimit', validLimit]);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
      try {
        HTBparser([validDay, 'notby', validUsername, 'limit', validLimit]);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
      try {
        HTBparser([validDay, 'notlimit', validUsername, 'by', validLimit]);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
      try {
        HTBparser([validDay, 'limit', validUsername, 'notby', validLimit]);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
    });

    it("should throw error if 2nd and 3rd arg is same, 'by' or 'limit'", () => {
      try {
        HTBparser([validDay, 'by', validUsername, 'by', validUsername]);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
      try {
        HTBparser([validDay, 'limit', validLimit, 'limit', validLimit]);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
    });

    it("should throw error if 2nd argument is 'by' and 4th argument is 'limit' but 5th arg is not integer", () => {
      try {
        HTBparser([validDay, 'by', validUsername, 'limit', invalidDayOrLimit]);
      } catch (e) {
        expect(e.message).to.equal('Invalid arguments');
      }
    });

    it('should not throw error when the args are proper', () => {
      const parsedArg1 = HTBparser([validDay, 'by', validUsername, 'limit', validLimit]);
      expect(parsedArg1.day).to.equal(parseInt(validDay, 10));
      expect(parsedArg1.by).to.equal(validUsername);
      expect(parsedArg1.limit).to.equal(parseInt(validLimit, 10));

      const parsedArg2 = HTBparser([validDay, 'limit', validLimit, 'by', validUsername]);
      expect(parsedArg2.day).to.equal(parseInt(validDay, 10));
      expect(parsedArg2.by).to.equal(validUsername);
      expect(parsedArg2.limit).to.equal(parseInt(validLimit, 10));

      expect(parsedArg1.day).to.equal(parsedArg2.day);
      expect(parsedArg1.by).to.eq(parsedArg2.by);
      expect(parsedArg1.limit).to.eq(parsedArg2.limit);
    });
  });
});
