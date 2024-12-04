<script>
	import 'normalize.css';
	import '$lib/styles.scss';

	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props();
</script>

<svelte:head>
	<title>JT Trading Cards</title>
	<meta name="description" content="Welcome to the exciting world of Jonny Thaw Trading Cards" />

	<meta property="og:title" content="JT Trading Cards" />
	<meta
		property="og:description"
		content="Welcome to the exciting world of Jonny Thaw Trading Cards"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tcg.jthaw.club/" />
	<meta property="og:image" content={`https://tcg.jthaw.club/social.jpg`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="JT Trading Cards" />
	<meta property="twitter:url" content="https://tcg.jthaw.club" />
	<meta
		name="twitter:description"
		content="Welcome to the exciting world of Jonny Thaw Trading Cards"
	/>
	<meta name="twitter:image" content={`https://tcg.jthaw.club/social.jpg`} />

	<meta name="theme-color" content="#0000000" />

	<link rel="icon" href="/favicon.ico" />
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

<header>
	<h1>JT Trading Cards</h1>

	<div class="links">
		<a href="https://www.youtube.com/watch?v=u7tUsPA2Yxs" target="_blank">Video Opening</a>
		<a
			href="https://jthaw.us7.list-manage.com/subscribe?u=84095c56a160c7e330e287eab&id=960a557bd2"
			target="_blank"
			class="sold-out">Store</a
		>
	</div>
</header>

{@render children()}

<footer>
	<a href="https://jthaw.me" target="_blank">jthaw.me</a><br /><br />

	<div class="logos">
		<enhanced:img src="/static/logos/fleer.png" alt="" />
		<enhanced:img src="/static/logos/panini.png" alt="" />
		<enhanced:img src="/static/logos/topps.png" alt="" />
	</div>
</footer>

<style lang="scss">
	header {
		display: flex;

		justify-content: space-between;
		align-items: center;
		flex-direction: column;

		padding: 20px 20px;

		@media screen and (min-width: 768px) {
			flex-direction: row;
			padding: 20px 50px;
		}

		h1 {
			color: #00c4df;

			margin: 0;
			padding: 0;
		}
	}

	.links {
		display: flex;

		gap: 20px;

		font-weight: bold;

		a {
			position: relative;

			color: #f24b17;
			text-transform: uppercase;
			text-decoration: none;

			&:hover,
			&:focus-visible {
				opacity: 0.75;
			}

			&.sold-out:after {
				position: absolute;

				top: 100%;
				left: 50%;

				transform: translateX(-50%) rotate(-1deg);

				white-space: nowrap;

				content: 'Sold Out';

				font-size: 10px;

				background-color: #f24b17;
				color: white;

				border-radius: 3px;

				padding: 1px 5px;
			}
		}
	}

	footer {
		text-align: center;

		a {
			font-weight: bold;
			text-transform: uppercase;
			color: #00c4df;

			text-decoration: none;

			&:hover,
			&:focus-visible {
				opacity: 0.75;
			}
		}

		.logos {
			display: flex;

			justify-content: center;

			mix-blend-mode: multiply;

			gap: 30px;

			padding: 0 50px 50px;

			opacity: 0.5;

			img {
				height: 30px;
				width: auto;

				filter: grayscale(1);
			}
		}
	}
</style>
