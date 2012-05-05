(function () {

	var catalogViewModel;
	var playImage = '../../src/images/play.png';
	var pauseImage = '../../src/images/pause.png';
	var currentSong;

	var buttonClickHandler = function (viewModel) {

		if (currentSong != viewModel) {
			if (currentSong != null) {
				currentSong.buttonImage(playImage);
			}
			currentSong = viewModel;
		}

		PLAYER.togglePlay(viewModel.id);	
		viewModel.buttonImage(
			viewModel.buttonImage() === playImage ?
				pauseImage : playImage);
	};

	
	function SongViewModel (model) {
		this.id = model.id;
		this.title = model.title;
		this.buttonImage = ko.observable(playImage);
		this.buttonClick = buttonClickHandler;
	}

	function CatalogViewModel (catalog) {
		this.songs = [];
		this.title = 'HTML5 Audio Player';
		
		for (var i = 0; i < catalog.songs.length; i++) {
			this.songs.push(
				new SongViewModel( catalog.songs[i] ) );
			PLAYER.addTrack(catalog.songs[i]);
		}
	}

	window.addEventListener('load', function () {

		catalogViewModel = new CatalogViewModel(CATALOG);
		ko.applyBindings(catalogViewModel);

		PLAYER.trackEnded( function (id) {
			currentSong.buttonImage(playImage);
			currentSong = null;
		});

	});

})();
