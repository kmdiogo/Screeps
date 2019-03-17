module.exports = function(grunt) {
    // Show time for tasks
    require('time-grunt')(grunt);

    // Default Config
    var config = require('./.screeps.json');
    var output_directory = grunt.option('output_directory') || config.output_directory;

    var currentdate = new Date();
    grunt.log.subhead('Task Start: ' + currentdate.toLocaleString())
    grunt.log.writeln('Screeps Directory: ' + output_directory)

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-file-append')

    grunt.initConfig({
        // Add version variable using current timestamp.
        file_append: {
            versioning: {
                files: [
                    {
                        append: "\nglobal.SCRIPT_VERSION = "+ currentdate.getTime() + "\n",
                        input: `${output_directory}/version.js`,
                    }
                ]
            }
        },

        shell: {
            ScreepPack: {
                options: {
                    stdout: true
                },
                command: "py ScreepPack.py"
            }
        }

    });

    grunt.registerTask('default',  ['shell:ScreepPack', 'file_append:versioning']);
  };