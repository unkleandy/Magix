const state = () => {
	$.ajax({
		url: "ajax-state.php", // Le contrôleur/action de cette page appelle mon API.
		type: "POST"
	})
		.done(function (msg) {
			console.log(msg)
			let reponse = JSON.parse(msg);
			console.log(reponse);

			// traitement ici…

			setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
		})
}

window.addEventListener("load", () => {
	setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});
