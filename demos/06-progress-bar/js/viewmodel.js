(function () {

	var catalogViewModel;
	var playImage = '../../src/images/play.png';
	var pauseImage = '../../src/images/pause.png';
	var currentSong;

	var buttonClickHandler = function (viewModel) {

		if (currentSong != viewModel) {
			if (currentSong != null) {
				currentSong.percentComplete('0%');
				currentSong.buttonImage(playImage);
			}
			currentSong = viewModel;
		}

		PLAYER.togglePlay(viewModel.id);	
		viewModel.buttonImage(
			viewModel.buttonImage() === playImage ?
				pauseImage : playImage);
	};

	var makePath = function (songModel, format) {
		var index = songModel.formats.indexOf(format);
		if (index < 0) {
			return null;
		}
		return songModel.basePath + '.' + 
			songModel.formats[index];
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
			currentSong.percentComplete('0%');
			currentSong = null;
		});

	});

	var updatePercentComplete = function () {
		if (currentSong != null) {
			currentSong.percentComplete(
				PLAYER.getPercentComplete());
		}

		setTimeout(updatePercentComplete, 100);
	};

	setTimeout(updatePercentComplete, 100);


})();
