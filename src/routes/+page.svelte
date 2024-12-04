<script>
	import { disablePageScroll, enablePageScroll } from '@fluejs/noscroll';

	import Card from '$lib/components/Card.svelte';
	import InteractiveCard from '$lib/components/InteractiveCard.svelte';
	import { scroll_lock } from '$lib/utils';

	const images = {
		mythic: Object.entries(
			import.meta.glob('$lib/Card/Mythic/*.jpg', {
				eager: true,
				query: {
					enhanced: true,
					w: 100
				}
			})
		),
		rare: Object.entries(
			import.meta.glob('$lib/Card/Rare/*.jpg', {
				eager: true,
				query: {
					enhanced: true,
					w: 100
				}
			})
		),
		uncommon: Object.entries(
			import.meta.glob('$lib/Card/Uncommon/*.jpg', {
				eager: true,
				query: {
					enhanced: true,
					w: 100
				}
			})
		),
		common: Object.entries(
			import.meta.glob('$lib/Card/Common/*.jpg', {
				eager: true,
				query: {
					enhanced: true,
					w: 100
				}
			})
		)
	};

	const large_images = {
		mythic: Object.entries(
			import.meta.glob('$lib/Card/Mythic/*.jpg', {
				eager: true,
				query: {
					enhanced: true,
					w: 1500
				}
			})
		),
		rare: Object.entries(
			import.meta.glob('$lib/Card/Rare/*.jpg', {
				eager: true,
				query: {
					enhanced: true,
					w: 1500
				}
			})
		),
		uncommon: Object.entries(
			import.meta.glob('$lib/Card/Uncommon/*.jpg', {
				eager: true,
				query: {
					enhanced: true,
					w: 1500
				}
			})
		),
		common: Object.entries(
			import.meta.glob('$lib/Card/Common/*.jpg', {
				eager: true,
				query: {
					enhanced: true,
					w: 1500
				}
			})
		)
	};

	let ordered = $derived([...images.mythic, ...images.rare, ...images.uncommon, ...images.common]);
	let large_ordered = $derived([
		...large_images.mythic,
		...large_images.rare,
		...large_images.uncommon,
		...large_images.common
	]);

	let displayName = $state(null);

	function onCardHover({ filename }) {
		displayName = filename;
	}

	let highlighted = $state(null);
	let dialogElement = null;

	function onCardClick(clickIndex) {
		highlighted = large_ordered[clickIndex - 1];

		dialogElement.showModal();
	}

	function onDialogClick(evt) {
		var rect = evt.currentTarget.getBoundingClientRect();
		var isInDialog =
			rect.top <= evt.clientY &&
			evt.clientY <= rect.top + rect.height &&
			rect.left <= evt.clientX &&
			evt.clientX <= rect.left + rect.width;
		if (!isInDialog) {
			dialogElement.close();
		}
	}

	$effect(() => {
		if (!!highlighted) {
			disablePageScroll();
		} else {
			enablePageScroll();
		}
	});
</script>

<dialog
	bind:this={dialogElement}
	class="highlight"
	onclick={onDialogClick}
	onclose={() => (highlighted = null)}
>
	{#if highlighted}
		<div class="highlight-card">
			<InteractiveCard name={highlighted[0]} src={highlighted[1].default} />
		</div>
	{/if}
</dialog>

<p class="description">
	Thanks so much for investing early in the Jonny Thaw trading card industry. These early cards will
	undoubtedly exponentially grow in value, so I trust this is as good as giving you a very large
	cash sum, so you are welcome. Please use the below table to work out which you have and which you
	need
</p>

<div class="gallery-wrap">
	{#if displayName}
		<div class="display">
			<span>{displayName}</span>
		</div>
	{/if}

	<div class="gallery">
		{#each ordered as [name, { default: image }]}
			<Card onHover={onCardHover} onClick={onCardClick} {name} src={image} />
		{/each}
	</div>
</div>

<style lang="scss">
	.gallery {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));

		gap: 35px;

		padding: 25px;

		@media screen and (min-width: 768px) {
			grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));

			gap: 50px;

			padding: 50px;
		}

		&-wrap {
			position: relative;
			max-width: 1500px;

			margin: 0 auto;
		}
	}

	.display {
		position: absolute;

		inset: 0;
		width: 100%;
		height: 100%;

		text-align: center;

		font-size: Min(15vw, 150px);
		font-weight: bold;

		line-height: 0.9;

		color: #00c4df;

		span {
			position: sticky;

			max-height: 100dvh;
			height: 100%;
			width: 100%;

			top: 0;

			display: flex;

			align-items: center;
			justify-content: center;

			padding: 50px;
		}
	}

	.highlight {
		border: none;
		overflow: visible;
		background-color: transparent;
		overscroll-behavior: contain;

		&-card {
			max-width: 400px;
			width: 100%;
		}

		&::backdrop {
			background-color: rgba(255, 255, 255, 0.85);
			opacity: 0.75;
		}
	}

	.description {
		max-width: 500px;

		font-weight: bold;
		font-size: 14px;

		margin: 40px auto 40px;
		padding: 0 20px;

		text-align: justify;

		@media screen and (min-width: 768px) {
			margin: 40px 30px 40px;
			text-align: left;
		}
	}
</style>
