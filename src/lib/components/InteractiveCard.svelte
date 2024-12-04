<script>
	import Back from '$lib/Card/Back.jpg?w=1500&enhanced';
	import { listenCb, onWindowResize } from '$lib/utils';

	let { src, name } = $props();

	function getName(n) {
		const [number, filename] = n.split('/').pop().split('_');

		return {
			number: parseInt(number),
			filename: filename.split('.jpg').shift()
		};
	}

	let dimensions = $state({
		width: 1,
		height: 1
	});

	let mouse = $state({
		x: 0.5,
		y: 0
	});

	let mousePerc = $derived({
		x: 1 - mouse.x / dimensions.width,
		y: 1 - mouse.y / dimensions.height
	});

	let nameParts = $derived(getName(name));

	function onMouseMove(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	function onTouchMove(e) {
		e.returnValue = false;
		mouse.x = e.touches[0].clientX;
		mouse.y = e.touches[0].clientY;
	}

	function onResize() {
		dimensions.width = window.innerWidth;
		dimensions.height = window.innerHeight;
	}

	$effect(() => {
		const unlisten = [
			listenCb(document, 'mousemove', onMouseMove),
			listenCb(document, 'touchmove', onTouchMove),
			onWindowResize(onResize)
		];

		onResize();
		mouse.x = dimensions.width / 2;

		return () => unlisten.forEach((cb) => cb());
	});

	function onTouchStart(e) {
		e.returnValue = false;
		return false;
	}
</script>

<div
	ontouchstart={onTouchStart}
	class="card btn-reset"
	style={`--x: ${mousePerc.x}; --y: ${mousePerc.y}`}
>
	<span class="card-face">
		<enhanced:img {src} alt="" />
	</span>
	<span class="card-face card-face--back">
		<enhanced:img src={Back} alt="" />
	</span>
</div>

<style lang="scss">
	.card {
		position: relative;

		display: inline-grid;

		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		--total: 360deg;
		--perc: 0;

		// @supports (hover: hover) {
		// }
	}

	.card-face {
		display: inline-block;

		grid-column: 1;
		grid-row: 1;

		overflow: hidden;

		backface-visibility: hidden;

		isolation: isolate;
		overflow: hidden;

		border-radius: 3%;

		transform: rotate3d(1, 0, 0, calc((var(--y) * 50deg) - 25deg))
			rotate3d(0, 1, 0, calc(((var(--x) - 0.5) * var(--total)) + var(--mod, 0deg)));

		filter: drop-shadow(2px 2px 30px rgba(0, 0, 0, 0.15));

		// animation: {
		// 	name: WAVE;
		// 	duration: 3s;
		// 	// direction: alternate;
		// 	iteration-count: infinite;
		// 	timing-function: linear;
		// }

		&--back {
			--mod: -180deg;

			img {
				margin-top: 2px;
			}
		}

		img {
			transform: scale(1.1);
			width: var(--size);
			height: auto;
		}
	}

	// @keyframes WAVE {
	// 	from {
	// 		;
	// 	}
	// 	to {
	// 		transform: rotate3d(1, 0, 0, 20deg) rotate3d(0, 1, 0, var(--to-deg, 355deg));
	// 	}
	// }
</style>
