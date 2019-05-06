module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {  
            server: {  
                command: 'node server.js'  // command: 'node server.js'
            },
            options: {  // task's options
                stdout: true,
                stderr: true
            }
        },
        // less: {
        //     development: {
        //         options: {
        //             // cleancss: true,
        //             // report: 'min',
        //             // paths: 'css/bootstrap'
        //         },
        //         files: {
        //             'css/bootstrap.css': 'less/styles.less'
        //         }
        //     }
        // },

        watch: {
            server: {
                files: [
                    'www/js/**/*.js',
                    'www/css/**/*.css',
                    'www/**/*.html'
                ],
                options: {
                    livereload: true
                }

            }
            // less: {  
            //     files: ['less/*.less'],  
            //     tasks: ['less'],
            //     options: {
            //         nospawn: true
            //     }
            // }
        },

        concurrent: {
            target: ['watch', 'shell'],  // concurrent tasks
            options: {
                logConcurrentOutput: true  // to console
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent', /*'less'*/]);  

};