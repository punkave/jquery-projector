module.exports = function(grunt) {
  grunt.initConfig({
        less: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2
            },
            dev: {
              files: {
                "demo/css/styles.css": "demo/css/styles.less"
              }
            }
        },
        watch: {
            styles: {
               options: {
                    spawn: false,
                    event: ["added", "deleted", "changed"]
                },
                files: [ "demo/css/*.less"],
                tasks: [ "less:dev" ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask("default", ["watch"]);
};
