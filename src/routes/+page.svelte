<script lang="ts">
	import axios from 'axios';

	let pokemon: any[] = [];

	let pagination: any = {
		page: 1,
		search: '',
		user: ''
	};

	let timer: NodeJS.Timeout;

	function debounceSearch(key: "search" | "user", value: string) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			pagination[key] = value;
			pagination.page = 1;
			pagination = pagination;
		}, 500);
	}

	function nextPage() {
		pagination.page++;
		pagination = pagination;
	}

	function prevPage() {
		pagination.page--;
		pagination = pagination;
	}

	async function copyId(id: string) {
		try {
			navigator.clipboard.writeText(id);
		} catch (err) {
			console.error('Could not copy text:', err);
		}
	}

	$: {
		axios
			.get(
				`https://garug-pokemon-bot.herokuapp.com/pokemon?page=${pagination.page}&name=${
					pagination.search
				}&user=${pagination.user}`
			)
			.then((response) => (pokemon = response.data));
	}
</script>

<main>
	<section class="filters">
		<h1>Filters</h1>
		<form class="filter-form">
			<input
				on:keyup={({ target: { value } }) => debounceSearch('search', value)}
				type="text"
				placeholder="Species"
			/>
			<input
				on:keyup={({ target: { value } }) => debounceSearch('user', value)}
				type="text"
				placeholder="User"
			/>
		</form>
	</section>
	<section class="result">
		<h1>Result</h1>
		<table class="result-table">
			<thead>
				<tr>
					<th>ID</th>
					<th />
					<th>Power</th>
					<th>Species</th>
					<th>Dex Nº</th>
				</tr>
			</thead>
			<tbody>
				{#each pokemon as poke}
					<tr>
						<td
							>{poke.id}
							<span on:click={() => copyId(poke.id)}>copy</span></td
						>
						<td class="pokemon-icon">
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${poke.id_dex}.png`}
								alt={`Icon of ${poke.name}`}
							/>
						</td>
						<td>{poke.total.toFixed(0)}</td>
						<td>{poke.name}</td>
						<td>{poke.id_dex}</td>
					</tr>
				{/each}
			</tbody>
			<tr />
		</table>
		<div class="pagination">
			<button disabled={pagination.page === 1} on:click={prevPage}>prev</button>
			<p class="pagination-info">Actual page: {pagination.page}</p>
			<button on:click={nextPage}>next</button>
		</div>
	</section>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap');

	main {
		display: flex;
		gap: 8px;
		max-width: 1280px;
		margin: 0 auto;
	}

	h1 {
		font-weight: bolder;
		font-size: 32px;
		margin-top: 8px;
		margin-bottom: 16px;
	}

	button {
		padding: 8px 16px;
		font-weight: bolder;
		background: #5ac4c7;
		cursor: pointer;
		border-radius: 8px;
	}

	button:disabled {
		cursor: default;
		background: #282b37;
	}

	/* Table */
	table {
		width: 100%;
	}

	th,
	td {
		padding: 8px;
	}

	tbody tr:not(:last-child) {
		border-bottom: 1px solid #282b37;
	}

	thead tr {
		border-bottom: 4px solid #282b37;
	}

	/* Form */
	input {
		padding: 8px 16px;
		border-radius: 8px;
		background: #282b37;
	}

	/* Filters */
	.filters {
		width: 300px;
	}

	.filter-form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	/* Result */
	.result-table {
		margin-bottom: 16px;
	}

	.result {
		width: 100%;
	}

	.pagination {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pagination-info {
		margin: 0 16px;
	}
</style>
