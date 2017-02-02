CoinManager.prototype = new Object();
CoinManager.prototype.constructor = CoinManager;

const COIN_MAX = 10;

function CoinManager() {
	
	this.m_coinsArray=[];
	this.m_distBetweenCoins;
	
	var canvasW = window.innerWidth - 21;
	var canvasH = window.innerHeight - 21;
	var sm;
	var character;

	var initial_X = 0;
	var initial_Y = 0;
	
	this.init = function() {
		//initialize and spawn the coins on the screen
		
		this.m_distBetweenCoins = Number(canvasW) / COIN_MAX;
		
		for(var i = 0; i < COIN_MAX; i++) {
			this.m_coinsArray.push(new Coin());
			this.m_coinsArray[i].m_id = this.m_id;
			this.m_coinsArray[i].m_type = this.m_type;
			this.m_coinsArray[i].m_x = this.m_x;
			this.m_coinsArray[i].m_y = this.m_y;
			this.m_coinsArray[i].m_w = this.m_w;
			this.m_coinsArray[i].m_h = this.m_h;
			this.m_coinsArray[i].m_velocity = this.m_velocity;
			this.m_coinsArray[i].m_spriteList = this.m_spriteList;
			this.m_coinsArray[i].init();
			
			//spawn the coin on the screen
			var pos_x = this.m_x + (i * this.m_distBetweenCoins);
			this.m_coinsArray[i].m_x = pos_x;
			
			var pos_y = Math.random()*(g_backgroundHeight/4.0)+(g_backgroundHeight/2.0);
			this.m_coinsArray[i].m_y = pos_y;
			
			this.m_coinsArray[i].m_isEnabled = (Math.random() >= 0.5)? true : false;
			
		}
		
		sm = SceneManager.getInstance();
		character = sm.getCharacter();

		initial_X = this.m_x;
		initial_Y = this.m_y;
	}

	this.restart = function() {
		this.m_x = initial_X;
		this.m_y = initial_Y;

		//Re-spawn the coins on the screen
		for(var i = 0; i < COIN_MAX; i++) {
			var pos_x = this.m_x + (i * this.m_distBetweenCoins);
			this.m_coinsArray[i].m_x = pos_x;
			
			var pos_y = Math.random()*(g_backgroundHeight/4.0)+(g_backgroundHeight/2.0);
			this.m_coinsArray[i].m_y = pos_y;
			
			this.m_coinsArray[i].m_isEnabled = (Math.random() >= 0.5)? true : false;
			
		}
	}
	
	this.update = function(dt) {
		
		for(var i = 0; i < this.m_coinsArray.length; i++) {
			//When the coin was not collected and has gone offscreen
			if(this.m_coinsArray[i].m_x < -2.0*this.m_coinsArray[i].m_w)
			{
				//Re-spawn coin!
				var pos_x = this.m_coinsArray[i].m_x + (COIN_MAX * this.m_distBetweenCoins);
				this.m_coinsArray[i].m_x = pos_x;
				
				var pos_y = Math.random()*(g_backgroundHeight/4.0)+(g_backgroundHeight/2.0);
				this.m_coinsArray[i].m_y = pos_y;
				
				this.m_coinsArray[i].m_isEnabled = (Math.random() >= 0.5)? true : false;
			}
			
			//if coin is enabled, check for collision with the character
			if(this.m_coinsArray[i].m_isEnabled) {
				this.m_coinsArray[i].isCollisionCharacter(character);
			}
			
			this.m_coinsArray[i].update(dt);
		}
	}
	
	this.render = function(context) {
		for(var i = 0; i < this.m_coinsArray.length; i++) {
			this.m_coinsArray[i].render(context);
		}
	}
	
	
}