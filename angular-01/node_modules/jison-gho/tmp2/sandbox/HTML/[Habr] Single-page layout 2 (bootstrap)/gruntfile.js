module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    // cleancss: true,
                    // report: 'min',
                    // paths: 'www/css/bootstrap'
                },
                files: {
                    'www/css/bootstrap.css': 'less/styles.less'
                }
            }
        },

        watch: {
            less: {  
                files: ['less/*.less'],  
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'watch']);  

};