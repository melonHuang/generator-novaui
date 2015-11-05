'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cat\'s pajamas ' + chalk.red('BaomituComponent') + ' generator!'
    ));

    var prompts = [{
        type: 'input',
        name: 'elementname',
        message: 'your element name(in lowercase, dash style)',
        default: 'my-element'
    }];

    this.prompt(prompts, function (props) {
        this.name = props.elementname;
        this.nameUc = firstLetterUc(dashToCamelCase(this.name));
      done();
    }.bind(this));
  },
  writing: {
        readme: function() {
            var path = this.templatePath('README.md');
            var dest = this.destinationPath('README.md');
            this.template(path, dest);
        },
        history: function() {
            var path = this.templatePath('HISTORY.md');
            var dest = this.destinationPath('HISTORY.md');
            this.template(path, dest);
        },
        test: function() {
            var path = this.templatePath('tests/index.html');
            var dest = this.destinationPath('tests/index.html');
            this.template(path, dest);
        },
        gulpfile: function() {
            var path = this.templatePath('gulpfile.js');
            var dest = this.destinationPath('gulpfile.js');
            this.template(path, dest);
        },
        package: function() {
            var path = this.templatePath('package.json');
            var dest = this.destinationPath('package.json');
            this.template(path, dest);
        },
        src: function() {
            var path = this.templatePath('src/my-element/main.html');
            var dest = this.destinationPath('src/' + this.name + '/main.html');
            this.template(path, dest);
        }
  }

});

function firstLetterUc(str) {
    return str[0].toUpperCase() + str.slice(1);
}

var _caseMap = {};
function dashToCamelCase(dash) {
  var mapped = _caseMap[dash];
  if (mapped) {
    return mapped;
  }
  // TODO(sjmiles): is rejection test actually helping perf?
  if (dash.indexOf('-') < 0) {
    return _caseMap[dash] = dash;
  }
  return _caseMap[dash] = dash.replace(/-([a-z])/g, function(m) {
      return m[1].toUpperCase();
    }
  );
}
