import ts from '@rollup/plugin-typescript'
export default {
    input: 'src/index.ts',
    output: {
        format: 'umd',
        file: 'dist/index.js',
        name: 'xlsx_to_json'
    },
    plugins: [ts({
        tsconfig: "tsconfig.json"
    })]
}