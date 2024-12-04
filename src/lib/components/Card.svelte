<script>
	import Back from '$lib/Card/Back.jpg?w=100&enhanced';

	let { onHover = () => {}, onClick = () => {}, src, name, interactive = true } = $props();

	let tagName = $derived(interactive ? 'button' : 'div');
	let role = $derived(interactive ? 'button' : 'role');

	function getName(n) {
		const [number, filename] = n.split('/').pop().split('_');

		return {
			number: parseInt(number),
			filename: filename.split('.jpg').shift()
		};
	}

	let nameParts = $derived(getName(name));
</script>

<svelte:element
	this={tagName}
	aria-label={nameParts.filename}
	class="card btn-reset"
	onmouseenter={() => onHover(nameParts)}
	onclick={() => onClick(nameParts.number)}
	{role}
>
	<span class="card-face">
		<enhanced:img {src} alt="" />
	</span>
	<span class="card-face card-face--back">
		<enhanced:img src={Back} alt="" />
	</span>
</svelte:element>

<style lang="scss">
	.card {
		position: relative;

		display: inline-grid;

		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		&:hover,
		&:focus-visible {
			transform: scale(1.5);
		}
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

		animation: {
			name: WAVE;
			duration: 3s;
			// direction: alternate;
			iteration-count: infinite;
			timing-function: linear;
		}

		&--back {
			--from-deg: -180deg;
			--to-deg: 180deg;

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

	@keyframes WAVE {
		from {
			transform: rotate3d(1, 0, 0, 20deg) rotate3d(0, 1, 0, var(--from-deg, -5deg));
		}
		to {
			transform: rotate3d(1, 0, 0, 20deg) rotate3d(0, 1, 0, var(--to-deg, 355deg));
		}
	}
</style>
