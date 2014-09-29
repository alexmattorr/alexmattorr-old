module.exports = function (grunt) {

    //  Load Grunt Tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*

            Styleguide

        */

        // parse dynamic style sheets
        dss: {
            guide: {
                files: {
                    'dist/styleguide/': 'assets/sass/**/*.{css,scss,sass,less,styl}'
                },
                options: {
                    template: 'assets/styleguide/template/',
                    parsers: {
                        template: function(i, line, block, file) {
                            return line;
                        },
                        
                        data: function(i, line, block, file) {
                            var data = {},
                                lines = block.match(/[^\r\n]+/g).map(function(val, i) {
                                    return val.trim()
                                });

                            if (lines.indexOf("@data") != -1 && lines.indexOf("@data-end") != -1) {
                                data = lines.slice(lines.indexOf("@data") + 1, lines.indexOf("@data-end")).join("");
                                data = JSON.parse(data);
                            }

                            return JSON.stringify(data);
                        }
                    }   
                }
            }
        },


        /*
    
            Icons

        */

        // minify SVG files
        svgmin: {    
            production: {               
                options: { 
                    removeViewBox: false,
                    removeUselessStrokeAndFill: false 
                },
                files: [{
                    expand: true,
                    cwd: 'assets/svg/',
                    src: ['**/*.svg'],
                    dest: 'dist/assets/svg/',
                    ext: '.svg'
                }]
            }
        },

        // compile icon files from svgs - generate fallback css
        grunticon: {
            options: {
                pngcrush: true
            },
            production: {
                files: [{
                    expand: true,
                    cwd: 'dist/assets/svg',
                    src: ['*.svg', '*.png'],
                    dest: 'dist/assets/svg'
                }],
                options: {
                    pngfolder: "fallback",
                    loadersnippet: "grunticon.loader.js"
                }
            }
        },



        /*

            Styles
        
        */

        // turn that shass into css
        sass: {
            production: {
                options: {
                    sourcemap: true
                },

                files: {
                    'dist/assets/style/style.css': 'assets/sass/style.scss'
                }
            }

        }, 

        // provide support for our browsers
        autoprefixer: {
            production: {
                src: 'dist/assets/style/style.css',
                dest: 'dist/assets/style/style.css'
            }
        },
        
        // combine common media queries
        cmq: {
            production: {
                files: {
                    'dist/assets/style/min/style.css': 'dist/assets/style/style.css'
                }
            },
        },

        // shrinkage (it was cold)
        cssmin: {
            compress: {
                files: {
                    'dist/assets/style/min/style.css': ['dist/assets/style/min/style.css'],
                }
            }
        },


        /*
    
            Scripts
                - bower_concat: pulls main files from bower installs
                - concat: mash up files
                - uglify: remove cruft for production
                - jshint: validate js

        */


        bower_concat: {
            build: {
                bowerOptions: {
                    offline: true
                },
                dest: 'tmp/lib.js',
                dependencies: {
                    'underscore': 'jquery'
                }
            }
        },

         // compile All Javascript
        concat_sourcemap: {
            options: {
                sourceRoot: "",
                sourcesContent: true
            },
            lib: {
                src: [
                    'tmp/lib.js'
                ],

                dest:'dist/assets/scripts/lib.js'

            },

            app: {
                src: [
                    'assets/app/app.js',
                    'assets/app/modules/**/*.js'
                ],
                dest: 'dist/assets/scripts/app.js'
            }
        },

        uglify: {
            options: {
                mangle: true,
                compress: true,
                preserveComments: false
            },
            build: {
                files: {
                    'dist/assets/scripts/app.min.js' : ['dist/assets/scripts/app.js'],
                    'dist/assets/scripts/lib.min.js' : ['dist/assets/scripts/lib.js']
                }
            }
        },

        jshint: {
            beforeconcat: {
                options: {
                    expr: {
                        ExpressionStatements: true
                    },
                    asi: true
                },
                src: ['assets/scripts/**/*.js', 'assets/app/**/*.js']
            },

            afterconcat: {
                options: {
                    expr: {
                        ExpressionStatements: true
                    },
                    asi: true
                },
                src: ['dist/assets/scripts/app.js']
            }
        },

        /*
    
            Templates
                - stencil: compules dot.js files using stencil

        */

        stencil: {
            main: {
                options: {
                    env: {
                        title: 'Dev',
                        version: '<%= pkg.version %>'
                    },
                    partials: 'assets/templates/base',
                    templates: 'assets/templates',
                    dot_template_settings: {
                        strip: false
                    }
                },
                files: [{
                      expand: true,
                      src: 'assets/templates/pages/**/*.dot.html',
                      dest: 'dist/html',
                      ext: '.html',
                      flatten: true
                }]
            }
        },

        
        /*
    
            Watch/Copy

        */

        watch: {
            styles: {
                files: [
                    'assets/sass/**/*.scss', 
                    'assets/app/**/*.js', 
                    'assets/app.js', 
                    'assets/templates/**/*.dot.html', 
                    'assets/templates/**/*.md',
                    'assets/templates/**/*.json'
                ],
                tasks: [
                    'styles', 
                    'scripts', 
                    'stencil',
                    'dss',
                    'uglify', 
                    'copy',
                    'clean'
                ]
            },

            light: {
                files: [
                    'assets/sass/**/*.scss',
                    'assets/templates/**/*.dot.html', 
                ],
                tasks: [
                    'styles',
                    'stencil', 
                    'copy',
                    'clean' 
                ]
            },

            stylesg: {
                files: ['assets/sass/**/*.scss', 'assets/styleguide/**/*', 'assets/templates/**/*.dot.html'],
                tasks: ['sg']
            },
            
            options: {
                // spawn: false,
                // interrupt: true,
                debounceDelay: 150
            }
        },

        copy: {
            main: {
                files: [
                    // img
                    {
                        expand: true,
                        src: 'assets/img/**',
                        dest: 'dist/',
                        filter: 'isFile'
                    },
                     // lib
                    {
                        expand: true,
                        src: 'assets/library/**',
                        dest: 'dist/',
                        filter: 'isFile'
                    },
                     // script
                    {
                        expand: true,
                        src: 'assets/scripts/**',
                        dest: 'dist/',
                        filter: 'isFile'
                    },
                    // copy and rename version controlled packages
                    {
                        expand: true, 
                        cwd: 'dist/', 
                        src: ['assets/svg/*.txt'], 
                        dest: 'dist/assets/svg/', 
                        rename: function(dest, src) {
                            return dest + 'grunticon.loader.js';
                        }
                    },
                    // rename .txt to .js (grunticon)
                    {
                        expand: true, 
                        cwd: 'dist/', 
                        src: ['assets/svg/*.txt'], 
                        dest: 'dist/assets/svg/', 
                        rename: function(dest, src) {
                            return dest + 'grunticon.loader.js';
                        }
                    }
                ]
            },

            versionedScripts: {
                options: { flatten: true },
                files: {
                    'dist/assets/scripts/jnpr-<%= pkg.version %>.js': 'dist/assets/scripts/jnpr.min.js',
                    'dist/assets/library/lib-<%= pkg.version %>.js' : 'dist/assets/library/lib.js',
                    'dist/assets/style/style-<%= pkg.version %>.css': 'dist/assets/style/style.min.css'
                }
            },

            styleguide: {
                files: [{
                    cwd: 'dist/',
                    expand: true,
                    src: 'assets/svg/*',
                    dest: 'dist/styleguide/'
                }]
            }
        },

        clean: ['tmp/']
    });


    // Define Tasks
    
     // Default Task
    grunt.registerTask('default', ['dev']);

    //dss styleguide
    grunt.registerTask('sg', ['styles', 'dss', 'copy:styleguide']); // styleguide:all

    // icons
    grunt.registerTask('svg_min', ['svgmin', 'grunticon', 'copy:styleguide']);

    // main tasks
    grunt.registerTask('scripts', ['bower_concat', 'concat_sourcemap']);
    grunt.registerTask('styles', ['sass', 'autoprefixer', 'cmq', 'cssmin']);


    // Build Tasks    
    grunt.registerTask('dev', [
        'clean',
        'styles',
        'scripts',
        'stencil',
        'dss',
        'uglify',
        'copy',
        'clean',
        'watch'
    ]);

    grunt.registerTask('light', [
        'clean',
        'styles',
        'stencil',
        'copy',
        'clean',
        'watch:light'
    ]);
    
};