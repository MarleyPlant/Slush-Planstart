/*
 * slush-planstart
 * https://github.com/MarleyPlant/slush-planstart
 *
 * Copyright (c) 2017, Marley Joseph Plant
 * Licensed under the MIT license.
 */


'use strict';

var gulp = require('gulp'),
    clear = require('clear'),
    colors = require('colors'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    download = require('gulp-download'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path')



function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }
    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

gulp.task('default', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your project?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What is the description?'
    }, {
        name: 'appVersion',
        message: 'What is the version of your project?',
        default: '0.1.0'
    }, {
        name: 'authorName',
        message: 'What is the author name?',
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: 'What is the author email?',
        default: defaults.authorEmail
    }, {
        name: 'userName',
        message: 'What is the github username?',
        default: defaults.userName
    }, {
        name: 'frameworks',
        message: 'Allrighty so now your gonna need some frameworks, what you after?',
        type: 'list',
        choices: [{
                    name: 'Bootstrap',
                    value: 'Bootstrap',
                    checked: true
                  }, {
                    name: 'Bulma',
                    value: 'Bulma',
                    checked: false
                  }, {
                    name: 'FlatUI',
                    value: 'includeFlatUI',
                    checked: false
                  }]
    }, {
        type: 'confirm',
        name: 'includeTemplate',
        message: 'Include Template?'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Finish Install?'
    }];
    //Ask
    clear();
    console.log(" \n\
                ______ _             _____ _             _    \n\
                | ___ \ |           /  ___| |           | |   \n\
                | |_/ / | __ _ _ __ \ `--.| |_ __ _ _ __| |_  \n\
                |  __/| |/ _` | '_ \ `--. \ __/ _` | '__| __| \n\
                | |   | | (_| | | | /\__/ / || (_| | |  | |_  \n\
                \_|   |_|\__,_|_| |_\____/ \__\__,_|_|   \__| \n\
                                                              \n\
                                                              \n\ ".rainbow)

    inquirer.prompt(prompts,
        function (answers) {
            if (!answers.moveon) {
                return done();
            }

            console.log("Allrighty so i'm going to start generating ".green + answers.appName + " for you sit tight while I download and compile all the requirements!".green)


            answers.appNameSlug = _.slugify(answers.appName);
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});
