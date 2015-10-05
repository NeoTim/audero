'use strict';

module.exports = function (grunt) {

   require('time-grunt')(grunt);

   require('jit-grunt')(grunt, {
      configureRewriteRules: 'grunt-connect-rewrite',
      responsive_images: 'grunt-responsive-images',
      scsslint: 'grunt-scss-lint',
      sprite: 'grunt-spritesmith',
      useminPrepare: 'grunt-usemin'
   });

   var config = {
      app: 'app',
      dist: 'dist',
      tmp: '.tmp'
   };

   var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
   var serveStatic = require('serve-static');

   grunt.initConfig({
      config: config,

      watch: {
         assemble: {
            files: ['<%= config.app %>/views/**/*.{hbs,json}'],
            tasks: ['assemble']
         },
         bower: {
            files: ['bower.json'],
            tasks: ['wiredep']
         },
         js: {
            files: ['<%= config.app %>/scripts/**/*.js'],
            tasks: ['jscs', 'jshint', 'browserify']
         },
         jstest: {
            files: ['test/spec/**/*.js'],
            tasks: ['test:watch']
         },
         sass: {
            files: ['<%= config.app %>/styles/**/*.scss'],
            tasks: ['scsslint', 'sass', 'postcss']
         },
         livereload: {
            options: {
               livereload: '<%= connect.options.livereload %>'
            },
            files: [
               '<%= config.dist %>/**/*.html',
               '<%= config.tmp %>/scripts/*.js',
               '<%= config.tmp %>/styles/*.css',
               '<%= config.app %>/images/**/*'
            ]
         }
      },

      connect: {
         options: {
            port: 9000,
            open: true,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
         },
         rules: [
            {
               from: '(^((?!.js|.css|images|\/$).)*$)',
               to: '$1.html'
            }
         ],
         livereload: {
            options: {
               middleware: function (connect) {
                  return [
                     rewriteRulesSnippet,
                     serveStatic(config.tmp),
                     connect().use('/bower_components', serveStatic('./bower_components')),
                     serveStatic(config.app),
                     serveStatic(config.dist),
                     connect().use('/' + config.app + '/styles', serveStatic('./' + config.app + '/styles'))
                  ];
               }
            }
         },
         test: {
            options: {
               open: false,
               port: 9001,
               middleware: function (connect) {
                  return [
                     serveStatic(config.tmp),
                     serveStatic('test'),
                     connect().use('/bower_components', serveStatic('./bower_components')),
                     serveStatic(config.app)
                  ];
               }
            }
         },
         dist: {
            options: {
               base: '<%= config.dist %>',
               livereload: false
            }
         }
      },

      clean: {
         dist: {
            files: [{
               dot: true,
               src: [
                  '<%= config.tmp %>',
                  '<%= config.dist %>/*'
               ]
            }]
         },
         server: '<%= config.tmp %>'
      },

      jshint: {
         options: {
            jshintrc: '.jshintrc',
            force: true,
            reporter: require('jshint-stylish')
         },
         dist: [
            '<%= config.app %>/scripts/**/*.js',
            '!<%= config.app %>/scripts/vendor/*',
            'test/spec/**/*.js'
         ]
      },

      jscs: {
         options: {
            config: '.jscsrc',
            fix: true,
            force: true
         },
         dist: '<%= jshint.dist %>'
      },

      scsslint: {
         options: {
            colorizeOutput: true,
            config: '.scss-lint.yml',
            force: true
         },
         dist: [
            '<%= config.app %>/styles/**/*.scss',
            '!<%= config.app %>/styles/generic/_normalize.scss',
            '!<%= config.app %>/styles/objects/_csswizardry-grids.scss'
         ]
      },

      mocha: {
         all: {
            options: {
               run: true,
               urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
            }
         }
      },

      assemble: {
         options: {
            assets: '<%= config.app %>',
            data: '<%= config.app %>/views/data/*.json',
            layout: '<%= config.app %>/views/layouts/master.hbs',
            layoutDir: '<%= config.app %>/views/layouts/',
            partials: '<%= config.app %>/views/partials/*.hbs'
         },
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.app %>/views/pages/',
               src: '*.hbs',
               dest: '<%= config.dist %>'
            }]
         },
         projects: {
            options: {
               layout: '<%= config.app %>/views/layouts/project.hbs'
            },
            files: [{
               expand: true,
               cwd: '<%= config.app %>/views/pages/',
               src: 'projects/*.hbs',
               dest: '<%= config.dist %>'
            }]
         }
      },

      sass: {
         options: {
            sourceMap: true
         },
         dist: {
            files: {
               '<%= config.tmp %>/styles/mq.css': '<%= config.app %>/styles/mq.scss',
               '<%= config.tmp %>/styles/no-mq.css': '<%= config.app %>/styles/no-mq.scss'
            }
         }
      },

      responsive_images: {
         options: {
            engine: 'im',
            createNoScaledImage: true,
            sizes: [
               {
                  name: 'mobile',
                  width: 480
               },
               {
                  name: 'phablet',
                  width: 768
               }
            ]
         },
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.app %>/images/',
               src: [
                  '**/*.{gif,jpeg,jpg,png}',
                  '!sprite/**/*.*',
                  '!**/*-{original,mobile,phablet}.{gif,jpeg,jpg,png}'
               ],
               dest: '<%= config.app %>/images/'
            }]
         }
      },

      sprite: {
         all: {
            src: '<%= config.app %>/images/sprite/**/*.*',
            dest: '<%= config.tmp %>/images/sprite.png',
            destCss: '<%= config.tmp %>/styles/sprite.css',
            cssTemplate: 'sprite.handlebars',
            algorithm: 'binary-tree'
         }
      },

      postcss: {
         options: {
            map: true,
            processors: [
               require('autoprefixer')({
                  browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
               })
            ]
         },
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.tmp %>/styles/',
               src: '*.css',
               dest: '<%= config.tmp %>/styles/'
            }]
         }
      },

      wiredep: {
         app: {
            options: {
               exclude: [/html5shiv/]
            },
            ignorePath: /(\.\.\/){1,2}/,
            src: ['<%= config.app %>/views/layouts/*.hbs']
         }
      },

      filerev: {
         dist: {
            src: [
               '<%= config.dist %>/scripts/**/*.js',
               '<%= config.dist %>/styles/*.css',
               '<%= config.dist %>/images/**/*.*',
               '<%= config.dist %>/*.{ico,png}'
            ]
         }
      },

      useminPrepare: {
         options: {
            dest: '<%= config.dist %>'
         },
         html: '<%= config.dist %>/index.html'
      },

      usemin: {
         options: {
            assetsDirs: [
               '<%= config.dist %>',
               '<%= config.dist %>/images',
               '<%= config.dist %>/styles'
            ],
            blockReplacements: {
               js: function (block) {
                  var asyncScripts = ['/scripts/main.js'];
                  var isAsync = block.async || asyncScripts.indexOf(block.dest) > -1;

                  return '<script src="' + block.dest + '" ' + (isAsync ? 'defer async' : '') + '><\/script>';
               }
            }
         },
         html: ['<%= config.dist %>/**/*.html'],
         css: ['<%= config.dist %>/styles/**/*.css']
      },

      imagemin: {
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.app %>/images',
               src: [
                  '**/*.*',
                  '!sprite/**/*.*'
               ],
               dest: '<%= config.dist %>/images'
            }, {
               expand: true,
               flatten: true,
               cwd: '<%= config.tmp %>/images',
               src: '*.*',
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
               removeRedundantAttributes: false,
               useShortDoctype: true
            },
            files: [{
               expand: true,
               cwd: '<%= config.dist %>',
               src: '**/*.html',
               dest: '<%= config.dist %>'
            }]
         }
      },

      copy: {
         dist: {
            files: [{
               expand: true,
               dot: true,
               cwd: '<%= config.app %>',
               dest: '<%= config.dist %>',
               src: '*.{ico,png,txt,htaccess,xml,php}'
            }, {
               expand: true,
               cwd: '<%= config.app %>',
               src: ['demo/*', 'downloads/*'],
               dest: '<%= config.dist %>'
            }]
         }
      },

      modernizr: {
         dist: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
            extra: {
               shiv: false,
               printshiv: false
            },
            files: {
               src: [
                  '<%= config.dist %>/scripts/*.js',
                  '<%= config.dist %>/styles/*.css',
                  '!<%= config.dist %>/scripts/vendor/*'
               ]
            },
            uglify: true
         }
      },

      browserify: {
         options: {
            browserifyOptions: {
               debug: true
            }
         },
         dist: {
            files: {
               '<%= config.tmp %>/scripts/main.js': '<%= config.app %>/scripts/**/*.js'
            }
         }
      },

      concurrent: {
         server: [
            'jshint',
            'browserify',
            'scsslint',
            'sass',
            'assemble',
            'sprite'
         ],
         dist: [
            'jshint',
            'browserify',
            'scsslint',
            'sass',
            'responsive_images',
            'assemble',
            'sprite'
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
         'configureRewriteRules',
         'jscs',
         'concurrent:server',
         'postcss',
         'connect:livereload',
         'watch'
      ]);
   });

   grunt.registerTask('test', function (target) {
      if (target !== 'watch') {
         grunt.task.run([
            'clean:server',
            'postcss'
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
      'concurrent:dist',
      'imagemin',
      'useminPrepare',
      'postcss',
      'concat',
      'cssmin',
      'uglify',
      'copy:dist',
      'modernizr',
      'filerev',
      'usemin',
      'htmlmin'
   ]);

   grunt.registerTask('default', [
      'newer:jshint',
      'newer:jscs',
      'newer:scsslint',
      'test',
      'build'
   ]);
};