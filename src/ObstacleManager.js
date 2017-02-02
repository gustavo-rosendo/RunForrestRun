ObstacleManager.prototype = new Object();
ObstacleManager.prototype.constructor = ObstacleManager;

const OBSTACLE_MAX = 3;

function ObstacleManager() {
	
	this.m_obstaclesArray=[];
	this.m_distBetweenObstacles;
	
	var canvasW = window.innerWidth - 21;
	var canvasH = window.innerHeight - 21;
	var sm;
	var character;

	var initial_X;
	var initial_Y;
	
	this.init = function() {
		//initialize and spawn the obstacles on the screen
		
		this.m_distBetweenObstacles = Number(canvasW) / OBSTACLE_MAX;
		
		for(var i = 0; i < OBSTACLE_MAX; i++) {
			this.m_obstaclesArray.push(new Obstacle());
			this.m_obstaclesArray[i].m_id = this.m_id;
			this.m_obstaclesArray[i].m_type = this.m_type;
			this.m_obstaclesArray[i].m_x = this.m_x;
			this.m_obstaclesArray[i].m_y = this.m_y;
			this.m_obstaclesArray[i].m_w = this.m_w;
			this.m_obstaclesArray[i].m_h = this.m_h;
			this.m_obstaclesArray[i].m_velocity = this.m_velocity;
			this.m_obstaclesArray[i].m_spriteList = this.m_spriteList;
			this.m_obstaclesArray[i].init();
			
			//spawn the obstacle on the screen
			var pos_x = this.m_x + (i * this.m_distBetweenObstacles);
			this.m_obstaclesArray[i].m_x = pos_x;
						
			this.m_obstaclesArray[i].m_isEnabled = (Math.random() >= 0.5)? true : false;
		}
		
		sm = SceneManager.getInstance();
		character = sm.getCharacter();

		initial_X = this.m_x;
		initial_Y = this.m_y;
	}

	this.restart = function() {
		this.m_x = initial_X;
		this.m_y = initial_Y;

		//Re-spawn the obstacles on the screen
		for(var i = 0; i < OBSTACLE_MAX; i++) {
			var pos_x = this.m_x + (i * this.m_distBetweenObstacles);
			this.m_obstaclesArray[i].m_x = pos_x;
						
			this.m_obstaclesArray[i].m_isEnabled = (Math.random() >= 0.5)? true : false;
		}
	}
	
	this.update = function(dt) {
		
		for(var i = 0; i < this.m_obstaclesArray.length; i++) {
			//When the obstacle has gone offscreen
			if(this.m_obstaclesArray[i].m_x < -this.m_obstaclesArray[i].m_w)
			{
				//Re-spawn it!
				var pos_x = this.m_obstaclesArray[i].m_x + (OBSTACLE_MAX * this.m_distBetweenObstacles);
				this.m_obstaclesArray[i].m_x = pos_x;
								
				this.m_obstaclesArray[i].m_isEnabled = (Math.random() >= 0.5)? true : false;
			}
			
			//if obstacle is enabled, check for collision with the character
			if(this.m_obstaclesArray[i].m_isEnabled) {
				this.m_obstaclesArray[i].isCollisionCharacter(character);
			}
			
			this.m_obstaclesArray[i].update(dt);
		}
	}
	
	this.render = function(context) {
		for(var i = 0; i < this.m_obstaclesArray.length; i++) {
			this.m_obstaclesArray[i].render(context);
		}
	}
	
	
}