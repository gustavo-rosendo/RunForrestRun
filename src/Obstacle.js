
Obstacle.prototype = new Rectangle();
Obstacle.prototype.constructor = Obstacle;

function Obstacle() {
		
	this.SPRITE_IDS=["OBSTACLE"];
	this.m_spriteMap=[];

	var timeElapsed = 0;
	var jumpVo = -50.0;
	var jumpYo = 0;
		
	this.m_isEnabled;
	this.m_scale;

	this.init = function() {
		for(var i = 0; i < this.SPRITE_IDS.length; i++) {
			this.m_spriteMap.push(-1);
			for(var j = 0; j < this.m_spriteList.length; j++) {
				if(this.m_spriteList[j].m_id == this.SPRITE_IDS[i]) {
					this.m_spriteMap[i] = j;
					this.m_currentSprite = this.m_spriteList[j];
				}
			}
		}
		this.m_isEnabled = true;

		//Scale ranges from 0.25 to 0.58
		this.m_scale = Math.random()/3.0 + 0.25;
		//Update Obstacle's dimensions
		this.m_w *= this.m_scale;
		this.m_w -= this.m_w/3.0;
		this.m_h *= this.m_scale;

		//Save the obstacle's initial Y coordinate for when it's going to jump
		jumpYo = this.m_y;
	}
	
	this.update = function(dt) {
		//Update obstacle's X position according to its velocity
		this.m_x += this.m_velocity;

		//Make the obstacle "jump"
		// Y = -g*t^2/2 + Vo*t + Yo
		this.m_y = GRAVITY*Math.pow(timeElapsed, 2)/2 + jumpVo*timeElapsed + jumpYo;
		timeElapsed += (dt/1000.0);
		
		//Check if jump has already finished
		if(this.m_y > jumpYo) {
			this.m_y = jumpYo;
			timeElapsed = 0;
			this.m_currentSprite.resetSprite();
		}
	}
	
	this.render = function(context) {
		if(DEBUG_MODE) {
			context.strokeRect(this.m_x, this.m_y, this.m_w, this.m_h); //for collision detection
			//Parent.prototype.render.call(context); //=> doesn't work! 
		}
		if(this.m_isEnabled) {
			this.m_currentSprite.draw(context, this.m_x, this.m_y, this.m_scale, this.m_scale);
		}
	}

	this.isCollisionCharacter = function(character) {
		if(!character) return;
		
		var isColliding = character.isCollision(this);
		if(isColliding) {
			//tell the character that he has died :'(
			character.changeState(character.CHARACTER_STATES.DIE);
		}
	}
}