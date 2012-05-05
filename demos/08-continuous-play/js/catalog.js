var CATALOG = (function () {

	var catalog = {
		songs : [
			{ 
				'id' : 50,
				'title' : 'Winamp Llama Demo',
				'basePath' : '../../src/audio/llama', 
				'formats' : [ 'ogg', 'mp3' ]
			},
			{ 
				'id' : 100,
				'title' : 'Abducted By Robots',
				'basePath' : '../../src/audio/AbductedByRobots', 
				'formats' : [ 'ogg', 'mp3' ]
			},
			{
				'id' : 200,
				'title' : 'We Are Captives',
				'basePath' : '../../src/audio/WeAreCaptives',
				'formats' : [ 'ogg', 'mp3' ]
			},
			{
				'id' : 300,
				'title' : 'Escape',
				'basePath' : '../../src/audio/Escape',
				'formats' : [ 'ogg', 'mp3' ]
			}
		]
	};

	return catalog;
})();
