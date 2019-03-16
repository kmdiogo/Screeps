module.exports = function(grunt) {
    // Show time for tasks
    var utils = require('./Gruntfile_Utils');
    require('time-grunt')(grunt);

    // Default Config
    var config = require('./.screeps.json');
    var private_directory = grunt.option('private_directory') || config.private_directory;

    var currentdate = new Date();
    grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
    grunt.log.writeln('Screeps Directory: ' + private_directory)

    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-file-append')
    grunt.loadNpmTasks("grunt-jsbeautifier")

    grunt.initConfig({

        // Remove all files from the dist folder.
        clean: {
            dist: [private_directory],
        },
          
        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
        // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
            screeps: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '**',
                        dest: private_directory,
                        filter: 'isFile',
                        rename: function (dest, src) {
                            // Change the path name utilize underscores for folders
                            return dest + src.replace(/\//g,'.');
                        }
                    }
                ],
            }
        },

        // Apply code styling
        jsbeautifier: {
            modify: {
                src: ["src/**/*.js"],
                options: {
                config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: ["src/**/*.js"],
                options: {
                mode: 'VERIFY_ONLY',
                config: '.jsbeautifyrc'
                }
            }
          },

        // Add version variable using current timestamp.
        file_append: {
            versioning: {
                files: [
                    {
                        append: "\nglobal.SCRIPT_VERSION = "+ currentdate.getTime() + "\n",
                        input: `${private_directory}\\version.js`,
                    }
                ]
            }
        },

    });

    grunt.registerTask('default',  ['clean', 'copy:screeps', 'file_append:versioning']);

    grunt.registerTask('test', ['jsbeautifier:verify']);
    grunt.registerTask('pretty', ['jsbeautifier:modify']);
  };