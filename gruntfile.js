module.exports = function(grunt) {

  // 定义任务
  grunt.initConfig({
    watch: {
      pug: {
        files: ['app/views/**'],
        // tasks: ['livereload'],
        options: {
          // nospawn: true,
          // interrupt: false,
          // debounceDelay: 250,
          livereload: true
        }
      },
      js: {
        files: ['public/js/**', 'app/models/**/*.js', 'app/schemas/**/*.js'],
        // tasks: ['jshint'],
        // tasks: ['livereload'],
        options: {
          // nospawn: true,
          // interrupt: false,
          // debounceDelay: 250,
          livereload: true
        }
      }
    },

    // reload: {
    //   port: 35279,
    //   liveReload: {},
    //   proxy: {
    //     host: 'localhost',
    //     port: '3000'
    //   }
    // },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchFolders: ['./'],
          debug: true,
          delayTime: 1, // 等待时间，防止多次重启
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
    },

    // 传入两个任务：nodemon和watch
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch') // 只要有文件修改，重新执行你在里面注册好的任务
  grunt.loadNpmTasks('grunt-nodemon') // 事实监听app.js，如果其有变动就重启
  grunt.loadNpmTasks('grunt-concurrent') // 针对慢任务（less），阻塞任务（node）
  //grunt.loadNpmTasks("grunt-reload")

  grunt.option('force', true) // 防止由于语法错误中断整个服务
  grunt.registerTask('default', ['concurrent'])
  //grunt.registerTask('livereload', ['reload', 'watch'])

  // 测试
  grunt.registerTask('test', ['mochaTest'])
}