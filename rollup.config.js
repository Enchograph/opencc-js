import generatePackageJson from 'rollup-plugin-generate-package-json';

export default [
    {
        input: 'src/cn2t.js',
        output: [
            {
                file: 'dist/umd/cn2t.js',
                format: 'umd',
                name: 'OpenCC'
            },
            {
                file: 'dist/esm/cn2t.js',
                format: 'es',
            }
        ]
    }
];
