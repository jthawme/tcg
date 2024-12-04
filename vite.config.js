import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import svg from '@poppanator/sveltekit-svg';
import BuildManifest from './tools/BuildManifest.js';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		svg({
			includePaths: ['./src/lib/icons/'],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						// by default svgo removes the viewBox which prevents svg icons from scaling
						// not a good idea! https://github.com/svg/svgo/pull/1461
						params: { overrides: { removeViewBox: false } }
					},
					{
						name: 'convertColors',
						params: {
							currentColor: true
						}
					},
					{ name: 'removeAttrs', params: { attrs: '(width|height)' } }
				]
			}
		}),

		BuildManifest({
			manifest: {
				name: 'FSNP',
				short_name: 'FSNP',
				description: 'Jon Ryder',
				background_color: '#000'
			}
		})
	]
});
