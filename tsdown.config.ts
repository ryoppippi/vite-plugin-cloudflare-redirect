import type { UserConfig } from 'tsdown';

export default ({
	entry: [
		'./index.ts',
	],
	outDir: 'dist',
	format: 'esm',
	clean: true,
	sourcemap: true,
	minify: false,
	treeshake: true,
	dts: true,
	publint: true,
	unused: true,
	exports: {
		customExports(pkg) {
			pkg['.'] = {
				bun: './index.ts',
				types: `./dist/index.d.ts`,
				default: `./dist/index.js`,
			};
			return pkg;
		},
	},
	nodeProtocol: true,
	onSuccess: 'sort-package-json',
}) satisfies UserConfig as UserConfig;
