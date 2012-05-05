(function () {

	var catalogViewModel;
	var playImage = '../../src/images/play.png';
	var pauseImage = '../../src/images/pause.png';
	var currentSong;

	var buttonClickHandler = function (viewModel) {

		if (currentSong != viewModel) {
			if (currentSong != null) {
				currentSong.buttonImage(playImage);
				currentSong.percentComplete('0%');
			}
			currentSong = viewModel;
		}

		PLAYER.togglePlay(viewModel.id);	
		viewModel.buttonImage(
			viewModel.buttonImage() === playImage ?
				pauseImage : playImage);
	};

	var findSongById = function (id) {
		for (var i = 0; i < catalogViewModel.songs.length; i++) {
			if (catalogViewModel.songs[i].id === id) {
				return catalogViewModel.songs[i];
			}
		}
		return null;
	};

	var makePath = function (songModel, format) {
		var index = songModel.formats.indexOf(format);
		if (index < 0) {
			return null;
		}
		return songModel.basePath + '.' + 
			songModel.formats[index];
	};

	var progressClickHandler = function (viewModel, event) {
		if (viewModel === currentSong) {
			var div = $(event.currentTarget);
			var width = $(div).width();
			var percent = event.offsetX * 100 / width;
			PLAYER.scrub(viewModel.id, percent);
		}
	};
	
	function SongViewModel (model) {
		// basic stuff
		this.id = model.id;
		this.title = model.title;
		this.buttonImage = ko.observable(playImage);
		this.buttonClick = buttonClickHandler;

		// direct file link stuff
		this.mp3 = makePath(model, 'mp3');
		this.ogg = makePath(model, 'ogg');
		this.mp3Class = PLAYER.isMP3Supported() ? 
			'linkVisible' : 'linkInvisible';
		this.oggClass = PLAYER.isOGGSupported() ? 
			'linkVisible' : 'linkInvisible'; 

		// progress bar stuff
		this.percentComplete = ko.observable('0%');
		this.progressClick = progressClickHandler;

	}

	function CatalogViewModel (catalog) {

		this.songs = [];
		this.title = 'HTML5 Audio Player';
		
		this.continuous = ko.observable(true);
		this.continuousClick = function () { 
			PLAYER.continuous = this.continuous();
			return true; 
		};
		
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
			currentSong.percentComplete('0%');
			currentSong = null;
		});
		
		PLAYER.trackAdvanced( function (nextTrack) {
			var song = findSongById(nextTrack.id);
			currentSong = song;
			currentSong.buttonImage(pauseImage);				
		});
	
	
	
	});

	var updatePercentComplete = function () {
		if (currentSong != null) {
			currentSong.percentComplete(
				PLAYER.getPercentComplete(currentSong.id));
		}

		setTimeout(updatePercentComplete, 100);
	};

	setTimeout(updatePercentComplete, 100);


})();
