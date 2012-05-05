(function () {

	var catalogViewModel;

	function SongViewModel (model) {
		this.id = model.id;
		this.title = model.title;
	}

	function CatalogViewModel (catalog) {
		this.songs = [];
		this.title = 'HTML5 Audio Player';
		
		for (var i = 0; i < catalog.songs.length; i++) {
			this.songs.push(
				new SongViewModel( catalog.songs[i] ) );
		}
	}

	window.addEventListener('load', function () {

		catalogViewModel = new CatalogViewModel(CATALOG);
		ko.applyBindings(catalogViewModel);

	});

})();
