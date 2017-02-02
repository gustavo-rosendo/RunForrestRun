var SoundManager = (function() 
{
	var instance;

	function create() 
	{
		var theme_song;
		var jump_audio;
		var game_over;
		var collect_coin;

		return {
			init: function() 
			{
				theme_song = new Audio("data/audio/sonic-jump-fever.mp3");
				//theme_song = new Audio("data/audio/run-forrest-run-theme.mp3");
				theme_song.loop = true;
				jump_audio = new Audio("data/audio/sonic-jump.mp3");
				game_over = new Audio("data/audio/game-over.mp3");
				collect_coin_1 = new Audio("data/audio/coin-sound.mp3");
				collect_coin_2 = new Audio("data/audio/coin-sound.mp3");
				collect_coin_3 = new Audio("data/audio/coin-sound.mp3");
			},
			playSoundTheme: function()
			{
				if(theme_song)
					theme_song.play(true);
			},
			playSoundJump: function()
			{
				if(jump_audio) {
					jump_audio.play(true);
				}
			},
			playSoundGameOver: function()
			{
				if(game_over)
					game_over.play(true);
			},
			playSoundCollectCoin: function()
			{
				if(collect_coin_1 && (collect_coin_1.currentTime == 0 || 
									collect_coin_1.ended == true)) {
					collect_coin_1.play(true);
				} 
				else if(collect_coin_2 && (collect_coin_2.currentTime == 0 || 
										 collect_coin_2.ended == true)) {
					collect_coin_2.play(true);
				}
				else if(collect_coin_3 && (collect_coin_3.currentTime == 0 || 
										 collect_coin_3.ended == true)) {
					collect_coin_3.play(true);
				}
			},
			pauseSoundTheme: function()
			{
				if(theme_song)
					theme_song.pause();
			},
			pauseSoundJump: function()
			{
				if(jump_audio)
					jump_audio.pause();
			},
			pauseSoundGameOver: function()
			{
				if(game_over)
					game_over.pause();
			},
			pauseSoundCollectCoin: function()
			{
				if(collect_coin)
					collect_coin.pause();
			}
		};
	}

	return {
		getInstance: function () {
			if(!instance) {
				instance = create();
			}
			return instance;
		}
	};	
})();