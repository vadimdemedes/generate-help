'use strict';

/**
 * Dependencies
 */

var readFile = require('fs').readFileSync;
var help = require('../');

require('chai').should();


/**
 * Tests
 */

describe ('generate-help', function () {

  it ('usage only', function () {
    var params = {
      usage: 'hello [options]'
    };

    test(params, 'usage-only.txt');
  });

  it ('usage and description', function () {
    var params = {
      usage: 'hello [options]',
      desc: 'Super cool command'
    };

    test(params, 'usage-and-desc.txt');
  });

  it ('usage and options', function () {
    var params = {
      usage: 'hello [options]',
      options: {
        help: {
          alias: 'h',
          desc: 'Display help'
        },

        force: {
          aliases: ['f'],
          desc: 'Force something'
        },

        verbose: {
          desc: 'Be verbose'
        }
      }
    };

    test(params, 'usage-and-options.txt');
  });

  it ('usage and commands', function () {
    var params = {
      usage: 'hello [options] <command>',
      commands: [{
        name: 'hi',
        desc: 'Say hi'
      }, {
        name: 'yo',
        desc: 'Say yo'
      }]
    };

    test(params, 'usage-and-commands.txt');
  });

  it ('usage, options and commands', function () {
    var params = {
      usage: 'hello [options] <command>',
      options: {
        help: {
          alias: 'h',
          desc: 'Display help'
        },

        force: {
          aliases: ['f'],
          desc: 'Force something'
        },

        verbose: {
          desc: 'Be verbose'
        }
      },
      commands: [{
        name: 'hi',
        desc: 'Say hi'
      }, {
        name: 'yo',
        desc: 'Say yo'
      }]
    };

    test(params, 'usage-options-and-commands.txt');
  });

  it ('description only', function () {
    var params = {
      desc: 'Super cool command'
    };

    test(params, 'desc-only.txt');
  });

});


/**
 * Helpers
 */

function test (params, path) {
  var expectedOutput = readFile(__dirname + '/fixtures/' + path, 'utf-8');

  help(params).should.equal(expectedOutput);
}
