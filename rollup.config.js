import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.mjs',
    output: [
      {
        file: 'dist/jwccminify.cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: 'dist/jwccminify.mjs',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/jwccminify.umd.js',
        format: 'umd',
        name: 'JwccMinify',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [],
  },
  {
    input: 'src/index.mjs',
    output: [
      {
        file: 'dist/jwccminify.umd.min.js',
        format: 'umd',
        name: 'JwccMinify',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      terser(),
    ],
  },
];
