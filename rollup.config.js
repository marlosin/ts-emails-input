import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import sass from 'rollup-plugin-sass'
import html from 'rollup-plugin-html'
import { eslint } from 'rollup-plugin-eslint'
import copy from 'rollup-plugin-copy'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'dist/bundle.js',
  },
  plugins: [
    resolve({
      extensions: ['.ts', '.css', '.sass'],
      browser: true,
    }),
    sass({
      output: 'dist/bundle.css',
      options: {
        includePaths: [
          'src/assets/styles'
        ],
      },
    }),
    html({
			include: 'src/**/*.html',
    }),
    eslint({
      fix: true,
      include: [
        'src/*.ts'
      ],
    }),
    commonjs(),
    typescript({ noEmitOnError: false, inlineSources: true }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/assets/images/**/*', dest: 'dist/assets/images' },
      ]
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('dist'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  }
}

function serve () {
  let started = false

  return {
    writeBundle () {
      if (!started) {
        started = true

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        })
      }
    }
  }
}
