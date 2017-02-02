
Character.prototype = new Rectangle();
Character.prototype.constructor = Character;

function Character() {
	
	var timeElapsed = 0;
	var jumpVo = -200.0;
	var jumpYo = 0;
	var initial_X = 0;
	var initial_Y = 0;
	var isJumping = false;
	var isDead = false;

	var maxVelocity = 6.0;
	var minVelocity = -5.0;
	
	this.m_currentState;
	this.CHARACTER_STATES = {
							WALK: 0, 
							JUMP: 1, 
							RUN: 2, 
							DIE: 3,
							BREAK: 4
							};
	
	this.SPRITE_IDS=["CHARACTER_WALK", "CHARACTER_JUMP", "CHARACTER_RUN", "CHARACTER_DIE"];
					
	this.m_spriteMap=[];
		
	this.init = function() {
		this.m_currentState = this.CHARACTER_STATES.WALK;
		for(var i = 0; i < this.SPRITE_IDS.length; i++) {
			this.m_spriteMap.push(-1);
			for(var j = 0; j < this.m_spriteList.length; j++) {
				if(this.m_spriteList[j].m_id == this.SPRITE_IDS[i]) {
					this.m_spriteMap[i] = j;
				}
			}
		}
		//Save the character's initial Y coordinate for when it's going to jump
		jumpYo = this.m_y;
		
		initial_X = this.m_x;
		initial_Y = this.m_y;
		timeElapsed = 0;
		isJumping = false;
		isDead = false;
	}

	this.restart = function() {
		this.m_y = initial_Y;
		this.m_x = initial_X;
		jumpYo = initial_Y;
		this.m_velocity = 0;
		timeElapsed = 0;
		isJumping = false;
		isDead = false;
		this.m_currentState = this.CHARACTER_STATES.WALK;
	}
	
	this.walk = function() {
		var sprite = this.m_spriteList[this.m_spriteMap[this.CHARACTER_STATES.WALK]];
		if(sprite != undefined) {
			this.m_currentSprite = sprite;
		}
	}
	
	this.jump = function(dt) {
		if(!isJumping) {
			if(g_sound_manager) {
				g_sound_manager.playSoundJump();
			}
			isJumping = true;
		}
		
		var sprite = this.m_spriteList[this.m_spriteMap[this.CHARACTER_STATES.JUMP]];
		if(sprite != undefined) {
			this.m_currentSprite = sprite;
		}
		
		// Y = -g*t^2/2 + Vo*t + Yo
		this.m_y = GRAVITY*Math.pow(timeElapsed, 2)/2 + jumpVo*timeElapsed + jumpYo;
		timeElapsed += (dt/500.0);
		
		//Check if jump has already finished
		if(this.m_y > jumpYo) {
			this.m_y = jumpYo;
			timeElapsed = 0;
			this.m_currentSprite.resetSprite();
			isJumping = false;
			this.m_currentState = this.CHARACTER_STATES.WALK;

			//Reset mouse event to avoid infinite loop on jump()
			m_mouseEvent = 0;
		}
	}
	
	this.run = function() {
		var sprite = this.m_spriteList[this.m_spriteMap[this.CHARACTER_STATES.RUN]];
		if(sprite != undefined) {
			this.m_currentSprite = sprite;
		}	

		(this.m_velocity < maxVelocity)? this.m_velocity += 0.5 : this.m_velocity = maxVelocity;

		//Go back to WALK state, otherwise it will keep increasing the velocity
		this.m_currentState = this.CHARACTER_STATES.WALK;
	}

	this.slowDown = function() {
		var sprite = this.m_spriteList[this.m_spriteMap[this.CHARACTER_STATES.WALK]];
		if(sprite != undefined) {
			this.m_currentSprite = sprite;
		}

		(this.m_velocity > minVelocity)? this.m_velocity -= 0.5 : this.m_velocity = minVelocity;

		//Go back to WALK state, otherwise it will keep slowing down
		this.m_currentState = this.CHARACTER_STATES.WALK;
	}
	
	this.die = function(dt) {
		if(!isDead) {
			//Reset the time so that the formula works fine
			timeElapsed = 0;
			isDead = true;
			//Play our deadly song :D
			if(g_sound_manager) {
				g_sound_manager.playSoundGameOver();
			}
		}

		var sprite = this.m_spriteList[this.m_spriteMap[this.CHARACTER_STATES.DIE]];
		if(sprite != undefined) {
			this.m_currentSprite = sprite;
		}

		// Y = -g*t^2/2 + Vo*t + Yo
		this.m_y = GRAVITY*Math.pow(timeElapsed, 2)/2 + jumpVo*timeElapsed/4.0 + jumpYo;
		timeElapsed += (dt/500.0);
		
		//Check if jump has already finished
		if(this.m_y > window.innerHeight) {
			timeElapsed = 0;
			this.m_currentSprite.resetSprite();
			this.checkTopScore();
			g_gameOver = true;
		}

	}
	
	this.keyHandler = function() {
		switch(m_keyEvent)
		{		
			case KEY_UP:
			case KEY_W:
				this.m_currentState = this.CHARACTER_STATES.JUMP;		
				//Event is consumed, reset it to ZERO
				m_keyEvent = 0;
			break;
			case KEY_RIGHT:
			case KEY_D:
				if(!isJumping) {
					this.m_currentState = this.CHARACTER_STATES.RUN;
				}
				m_keyEvent = 0;
			break;
			case KEY_LEFT:
			case KEY_A:
				if(!isJumping) {
					this.m_currentState = this.CHARACTER_STATES.BREAK;
				}
				m_keyEvent = 0;
			break;
			// case KEY_SPACE:
			// 	this.m_currentState = this.CHARACTER_STATES.JUMP;
			// 	m_keyEvent = 0;
			// break;
			default:
		}

		switch(m_mouseEvent)
		{		
			case MOUSE_DOWN:
			break;
			case MOUSE_UP:
				//Limit the jump control on the screen (x,y) because of the buttons
				if((m_current_x < 5.0 * m_canvas.getAttribute('width')/6.0) ||
				   (m_current_y > m_canvas.getAttribute('height')/6.0)) {
					this.m_currentState = this.CHARACTER_STATES.JUMP;
				}
			break;
			case MOUSE_MOVE:
			break;
			default:
		}
	}
	
	this.update = function(dt) {
		if(!isDead) {
			this.keyHandler();
		}
		switch(this.m_currentState) {
			case this.CHARACTER_STATES.WALK:
				this.walk();
				break;
			case this.CHARACTER_STATES.JUMP:
				this.jump(dt);
				break;
			case this.CHARACTER_STATES.RUN:
				this.run();
				break;
			case this.CHARACTER_STATES.BREAK:
				this.slowDown();
				break;
			case this.CHARACTER_STATES.DIE:
				jumpYo = this.m_y;
				this.die(dt);
				break;
			default:
		}
		
		this.m_x += this.m_velocity;

		var max_PosX = m_canvas.getAttribute('width') - this.m_w;
		var min_PosX = 0;
		if(this.m_x > max_PosX) {
			this.m_x = max_PosX;
		}
		else if(this.m_x < 0) {
			this.m_x = 0;
		}
	}
	
	this.render = function(context) {
		if(DEBUG_MODE) {
			context.strokeRect(this.m_x, this.m_y, this.m_w, this.m_h); //for collision detection
			//Parent.prototype.render.call(context); //=> doesn't work! 
		}
		this.m_currentSprite.draw(context, this.m_x, this.m_y);
	}

	this.changeState = function(newState) {
		//Just make sure the variable newState is valid, i.e., contains a valid state
		switch(newState) {
			case this.CHARACTER_STATES.WALK:
			case this.CHARACTER_STATES.JUMP:
			case this.CHARACTER_STATES.RUN:
			case this.CHARACTER_STATES.DIE:
				this.m_currentState = newState;
				break;
			default:
				this.m_currentState = this.CHARACTER_STATES.WALK; //default state
		}
	}

	this.checkTopScore = function() {
		if(typeof(Storage) !== "undefined") {
			var topScore = localStorage.getItem("runforestgame_topscore");

			if(g_playerScore > topScore) {
				localStorage.setItem("runforestgame_topscore", g_playerScore);
				g_topScore = g_playerScore;
			}
			else {
				g_topScore = topScore;
			}
		} else {
		    g_topScore = g_playerScore;
		}
	}
}