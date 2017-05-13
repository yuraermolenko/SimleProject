// Generated on 2015-05-25 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
   grunt.loadNpmTasks('grunt-postcss');
   var autoprefixer = require('autoprefixer-core');

   // Time how long tasks take. Can help when optimizing build times
   require('time-grunt')(grunt);

   require('jit-grunt')(grunt);

   // Load grunt tasks automatically
   //require('load-grunt-tasks')(grunt);

   // Configurable paths
   var config = {
      app: 'app'
   };

   // Define the configuration for all the tasks
   grunt.initConfig({

      // Project settings
      config: config,

      phantomas: {
         /* https://github.com/stefanjudis/grunt-phantomas */
         grunt: {
            options: {
               assertions: {
                  'assetsWithQueryString': 3,
                  'biggestLatency': 1400,
                  'bodyHTMLSize': 10500,
                  'commentsSize': 55,
                  'consoleMessages': 0,
                  'hiddenContentSize': 65,
                  'jsErrors': 0,
                  'gzipRequests': {
                     'type': '<',
                     'value': 8
                  },
                  'medianResponse': 400,
                  'nodesWithInlineCSS': 0,
                  'requests': 30,
                  'timeToFirstImage': 1100,
                  'DOMelementsCount': 200,
                  'DOMqueries': 10
               },
               // additionalStylesheet : '/Users/stefan/Desktop/custom2.css',
               // buildUi              : false,
               // output               : 'json',
               // limitIncludedRuns    : false,
               indexPath: './phantomas/',
               options: {
                  'timeout': 30
               },
               url: 'http://gruntjs.com/'
            }
         }
      },



      //Task to generate static analysis reports via plato
      plato: {
         dist: {
            options: {
               complexity: {
                  logicalor: false,
                  switchcase: false,
                  forin: true,
                  trycatch: true
               }
            },
            files: {
               'maintenance': ['<%= config.app %>/scripts/**/*.js']
            }
         }
      },
      // Watches files for changes and runs tasks based on the changed files
      watch: {
         bower: {
            files: ['bower.json'],
            tasks: ['wiredep']
         },
         js: {
            files: ['<%= config.app %>/scripts/{,*/}*.js'],
            tasks: ['jshint'],
            options: {
               livereload: true
            }
         },
         gruntfile: {
            files: ['Gruntfile.js']
         },
         sass: {
            files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
            tasks: ['sass:dist']
         },
         styles: {
            files: ['<%= config.app %>/css/{,*/}*.css'],
            tasks: ['postcss:dist'],
            options: {
               livereload: true
            }
         },
         livereload: {
            options: {
               livereload: '<%= connect.options.livereload %>'
            },
            files: [
               '<%= config.app %>/{,*/}*.html',
               '<%= config.app %>/templates/{,*/}*.html',
               '<%= config.app %>/images/{,*/}*'
            ]
         }
      },

      postcss: {
         options: {
            map: true,
            processors: [
               require('autoprefixer')
            ]
         },
         dist: {
            src: 'app/css/*.css'
         }
      },

      // The actual grunt server settings
      connect: {
         options: {
            port: 10000,
            open: true,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
         },
         livereload: {
            options: {
               middleware: function (connect) {
                  return [
                     connect.static('.tmp'),
                     connect().use('/bower_components', connect.static('./bower_components')),
                     connect.static(config.app)
                  ];
               }
            }
         }
      },

      // Empties folders to start fresh
      clean: {
         dist: {
            files: [{
               dot: true,
               src: [
                  '.tmp',
                  '<%= config.dist %>/*',
                  '!<%= config.dist %>/.git*'
               ]
            }]
         },
         server: '.tmp'
      },

      // Make sure code styles are up to par and there are no obvious mistakes
      jshint: {
         options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
         },
         all: [
            'Gruntfile.js',
            '<%= config.app %>/scripts/{,*/}*.js',
            '!<%= config.app %>/scripts/vendor/*',
            'test/spec/{,*/}*.js'
         ]
      },

      // Mocha testing framework configuration options
      mocha: {
         all: {
            options: {
               run: true,
               urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
            }
         }
      },

      // Compiles Sass to CSS and generates necessary files if requested
      sass: {
         options: {
            sourceMap: true,
            includePaths: ['bower_components']
         },
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.app %>/styles',
               src: ['*.{scss,sass}'],
               dest: '<%= config.app %>/css',
               ext: '.css'
            }]
         }
      },

      // Add vendor prefixed styles
      autoprefixer: {
         options: {
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
         },
         dist: {
            files: [{
               expand: true,
               cwd: '.<%= config.app %>/css',
               src: '{,*/}*.css',
               dest: '<%= config.app %>/optimized'
            }]
         }
      },

      // Automatically inject Bower components into the HTML file
      wiredep: {
         app: {
            ignorePath: /^\/|\.\.\//,
            src: ['<%= config.app %>/index.html'],
            exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
         },
         sass: {
            src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
            ignorePath: /(\.\.\/){1,2}bower_components\//
         }
      },

      // Renames files for browser caching purposes
      rev: {
         dist: {
            files: {
               src: [
                  '<%= config.dist %>/scripts/{,*/}*.js',
                  '<%= config.dist %>/styles/{,*/}*.css',
                  '<%= config.dist %>/styles/fonts/{,*/}*.*',
                  '<%= config.dist %>/*.{ico,png}'
               ]
            }
         }
      },

      // Reads HTML for usemin blocks to enable smart builds that automatically
      // concat, minify and revision files. Creates configurations in memory so
      // additional tasks can operate on them
      useminPrepare: {
         options: {
            dest: '<%= config.dist %>'
         },
         html: ['<%= config.app %>/index.html']
      },

      // Performs rewrites based on rev and the useminPrepare configuration
      usemin: {
         options: {
            assetsDirs: [
               '<%= config.dist %>',
               '<%= config.dist %>/images',
               '<%= config.dist %>/styles'
            ]
         },
         html: ['<%= config.dist %>/{,*/}*.html'],
         css: ['<%= config.dist %>/styles/{,*/}*.css']
      },

      // The following *-min tasks produce minified files in the dist folder
      imagemin: {
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.app %>/images',
               src: '{,*/}*.{gif,jpeg,jpg,png}',
               dest: '<%= config.dist %>/images'
            }]
         }
      },

      svgmin: {
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.app %>/images',
               src: '{,*/}*.svg',
               dest: '<%= config.dist %>/images'
            }]
         }
      },

      htmlmin: {
         dist: {
            options: {
               collapseBooleanAttributes: true,
               collapseWhitespace: true,
               conservativeCollapse: true,
               removeAttributeQuotes: true,
               removeCommentsFromCDATA: true,
               removeEmptyAttributes: true,
               removeOptionalTags: true,
               removeRedundantAttributes: true,
               useShortDoctype: true
            },
            files: [{
               expand: true,
               cwd: '<%= config.dist %>',
               src: [
                  'templates/**/*.html',
                  'index.html'
               ],
               dest: '<%= config.dist %>'
            }]
         }
      },

      // By default, your `index.html`'s <!-- Usemin block --> will take care
      // of minification. These next options are pre-configured if you do not
      // wish to use the Usemin blocks.
      cssmin: {
         dist: {
            files: {
               '<%= config.dist %>/styles/main.css': [
                  '.tmp/styles/{,*/}*.css',
                  '<%= config.app %>/styles/{,*/}*.css'
               ]
            }
         }
      },
      uglify: {
         options: {
            mangle: false
         },
         dist: {
            files: {
               '<%= config.dist %>/scripts/scripts.js': [
                  '<%= config.dist %>/scripts/scripts.js'
               ]
            }
         }
      },
      concat: {
         dist: {}
      },

      // Copies remaining files to places other tasks can use
      copy: {
         dist: {
            files: [{
               expand: true,
               dot: true,
               cwd: '<%= config.app %>',
               dest: '<%= config.dist %>',
               src: [
                  '*.{ico,png,txt}',
                  'images/{,*/}*.webp',
                  '{,*/}*.html',
                  'assets/languages/{,*/}*.*',
                  'theme/{,*/}*.*',
                  'vendors/{,*/}*.*',
                  'theme/{,*/}*.*',
                  'assets/img/{,*/}*.*',
                  'styles/fonts/{,*/}*.*',
                  'templates/**/*'
               ]
            }, {
               src: 'node_modules/apache-server-configs/dist/.htaccess',
               dest: '<%= config.dist %>/.htaccess'
            }, {
               expand: true,
               dot: true,
               cwd: '.',
               src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
               dest: '<%= config.dist %>'
            }]
         },
         styles: {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>/styles',
            dest: '.tmp/styles/',
            src: '{,*/}*.css'
         }
      },

      // Run some tasks in parallel to speed up build process
      concurrent: {
         server: [
            'sass:dist',
            'copy:styles'
         ],
         test: [
            'copy:styles'
         ],
         dist: [
            'sass',
            'copy:styles',
            'imagemin',
            'svgmin'
         ]
      }
   });


   grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
      if (grunt.option('allow-remote')) {
         grunt.config.set('connect.options.hostname', '0.0.0.0');
      }
      if (target === 'dist') {
         return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      grunt.task.run([
         'clean:server',
         'wiredep',
         'connect:livereload',
         'sass:dist',
         'postcss:dist',
         'watch'
      ]);
   });

   grunt.registerTask('server', function (target) {
      grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
      grunt.task.run([target ? ('serve:' + target) : 'serve']);
   });

   grunt.registerTask('test', function (target) {
      if (target !== 'watch') {
         grunt.task.run([
            'clean:server',
            'concurrent:test',
            'autoprefixer'
         ]);
      }

      grunt.task.run([
         'connect:test',
         'mocha'
      ]);
   });

   grunt.registerTask('build', [
      'clean:dist',
      'wiredep',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'cssmin',
      'uglify',
      'copy:dist',
      'rev',
      'usemin',
      'htmlmin'
   ]);

   grunt.registerTask('default', [
      'newer:jshint',
      'test',
      'build'
   ]);
};
