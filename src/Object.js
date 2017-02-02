function Object()
{
	this.m_id;
	this.m_type; //RECT, CIRCLE, PLANE
	this.m_position; //current position of the object in the canvas
	this.m_mass; //the mass of the object will affect the resulting force applied to it
	this.m_velocity;
	this.m_x;
	this.m_y;
	this.m_w;
	this.m_h;
	
	this.m_spriteList = [];
	this.m_currentSprite;
	
	this.init = function()
	{
		
	}

	this.restart = function() 
	{

	}

	this.update = function(dt)
	{
		
	}

	this.render = function()
	{
		
	}
}

Object.prototype.toString = function()
{
	return '[Object "' + this.m_id + '"]';
}