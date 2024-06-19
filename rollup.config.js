// rollup.config.js

const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = [
  {
    input: 'src/components/vanilla/index.js', // Archivo de entrada para componentes Vanilla
    output: {
      file: 'dist/vanilla/bundle.js',
      format: 'es', // Formato de salida: ES module
      sourcemap: true
    },
    plugins: [
      resolve(), // Resolver módulos Node
      commonjs(), // Convertir CommonJS a ES modules
    ]
  },
  {
    input: 'src/components/lit/index.js', // Archivo de entrada para componentes Lit
    output: {
      file: 'dist/lit/bundle.js',
      format: 'es', // Formato de salida: ES module
      sourcemap: true
    },
    plugins: [
      resolve(), // Resolver módulos Node
      commonjs(), // Convertir CommonJS a ES modules
    ]
  }
];
