
function Sprite()
{
	this.m_id;
	this.m_width;
	this.m_height;
		
	this.m_imgSrc;
	this.m_image;
	
	this.m_frameIndex;
	this.m_tickCount;
	this.m_ticksPerFrame;
	
	this.m_loop;
	this.m_bounce_loop;
	
	this.m_speed;
	
	this.m_incrementPos = -1;
	
	this.init = function(spriteID, imgSrc, width, height,
						 frameIndex, numFrames, 
						 ticksPerFrame, loop, 
						 bounceLoop, speed)
	{
		this.m_id = spriteID;
		this.m_width = width;
		this.m_height = height;
		this.m_frameIndex = frameIndex;
		this.m_numFrames = numFrames;
		this.m_tickCount = 0;
		this.m_ticksPerFrame = ticksPerFrame;
		this.m_loop = loop;
		this.m_bounce_loop = bounceLoop;
		this.m_speed = speed;
		
		this.m_image = new Image();
		this.m_image.src = imgSrc;
	}
	
	this.resetSprite = function() {
		this.m_frameIndex = 0;
		this.m_tickCount = 0;
		this.m_incrementPos = -1;
	}
	
	this.update = function(dt)
	{		
		this.m_tickCount++;
		if(this.m_tickCount > this.m_ticksPerFrame)
		{
			this.m_tickCount = 0;

			if(this.m_bounce_loop == false)
			{
				if(this.m_frameIndex < this.m_numFrames - 1)
				{
					//Go to the next frame
					this.m_frameIndex++;
				}
				else if(this.m_loop)
				{
					this.m_frameIndex = 0;
				}
			}
			else
			{
				if(this.m_frameIndex > this.m_numFrames - 2)
				{
					this.m_incrementPos *= -1;
				}
				else if(this.m_frameIndex < 1)
				{
					this.m_incrementPos *= -1;
				}
				this.m_frameIndex += this.m_incrementPos;
			}
			
		}
	}
	
	this.draw = function(context, position_x, position_y, scale_x, scale_y)
	{
		//Define scale_x and scale_y as default parameters 
		//(if they are not passed to the function assume default value of 1.0)
		scale_x = (scale_x != undefined) ? scale_x : 1.0;
		scale_y = (scale_y != undefined) ? scale_y : 1.0;
		
		if(this.m_image != undefined && this.m_image != null)
		{
			context.drawImage(this.m_image,
		                  this.m_frameIndex * this.m_width,
						  0,
						  this.m_width,
						  this.m_height,
						  position_x,
						  position_y,
						  this.m_width * scale_x,
						  this.m_height * scale_y);
		}
	}
}