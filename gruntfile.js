module.exports = function(grunt) {

  // ��������
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
          delayTime: 1, // �ȴ�ʱ�䣬��ֹ�������
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },


    // ������������nodemon��watch
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch') // ֻҪ���ļ��޸ģ�����ִ����������ע��õ�����
  grunt.loadNpmTasks('grunt-nodemon') // ��ʵ����app.js��������б䶯������
  grunt.loadNpmTasks('grunt-concurrent') // ���������less������������node��
  //grunt.loadNpmTasks("grunt-reload")

  grunt.option('force', true) // ��ֹ�����﷨�����ж���������
  grunt.registerTask('default', ['concurrent'])
  //grunt.registerTask('livereload', ['reload', 'watch'])
}