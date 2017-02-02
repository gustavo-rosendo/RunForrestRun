
//-------- GLOBAL FLAGS ------------
const DEBUG_MODE = false;

//-------- GLOBAL VARIABLES ------------
var g_playerScore = 0;
var g_topScore = 0;
var GRAVITY = 150; //(m/s^2)
var g_gameOver = false;
var g_pauseGame = true;
var g_firstRender = true;
var g_backgroundWidth = 0;
var g_backgroundHeight = 0;

//-------- KEYBOARD EVENTS ------------
const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;
const KEY_W = 87;

var m_keyEvent = 0;
//---------

//---------- MOUSE EVENTS -------------
const MOUSE_DOWN = 11;
const MOUSE_UP = 12;
const MOUSE_MOVE = 13;

var m_mouseEvent = 0;

var m_mouse_x;
var m_mouse_y;
var m_current_x;
var m_current_y;
var m_dragDistance_x = 0;
var m_dragDistance_y = 0;
//---------

var m_unselectAll = false;

//---------- FPS CONTROL -------------
const FPS_LIMIT = 30;
var frame_time = 1000.0/FPS_LIMIT;
var fps_counter = 0;
var t_now;
var t_last;
var t_start;
var current_fps = 0;
//---------

var Singleton = (function ()
{
	var instance;
	
	function create ()
	{
		var m_sprite_manager; //private variable
		var m_scene_manager; // OBJECTS
		var m_sound_manager;
		
		return {
			init: function(main_canvas_id, text_canvas_id)
			{
				m_canvas = document.getElementById(main_canvas_id);
				m_canvas.setAttribute('tabindex', '0');
				m_canvas.setAttribute('height', window.innerHeight - 21);
				m_canvas.setAttribute('width', window.innerWidth - 21);

				m_canvas_text = document.getElementById(text_canvas_id);
				m_canvas_text.setAttribute('tabindex', '0');
				m_canvas_text.setAttribute('height', window.innerHeight - 21);
				m_canvas_text.setAttribute('width', window.innerWidth - 21);

				g_backgroundWidth = window.innerWidth - 21;
				g_backgroundHeight = window.innerHeight - 21;
								
				// m_canvas.onmousedown = function(evt){this.mouseDown(evt);}.bind(this);
				// m_canvas.onmousemove = function(evt){this.mouseMove(evt);}.bind(this);
				//m_canvas.onmouseup = function(evt){this.mouseUp(evt);}.bind(this);
						
				var body = document.getElementsByTagName("body");
				body[0].onmousedown = function(evt){this.mouseDown(evt);}.bind(this);
				body[0].onmousemove = function(evt){this.mouseMove(evt);}.bind(this);
				body[0].onmouseup = function(evt){this.mouseUp(evt);}.bind(this);
				body[0].onmouseleave = function(evt){this.mouseLeave(evt);}.bind(this);
				body[0].onresize = function(evt){this.onResize(evt);}.bind(this);

				body[0].onkeydown = function(evt){this.keyDown(evt);}.bind(this);
				body[0].onkeyup = function(evt){this.keyUp(evt);}.bind(this);

				m_context = m_canvas.getContext("2d");
				m_context_text = m_canvas_text.getContext("2d");
				
				//load sprites from XML file
				m_sprite_manager = SpriteManager.getInstance();
				m_sprite_manager.init('data/config/SpriteManager.xml');
				
				//load scene from XML file
				m_scene_manager = SceneManager.getInstance();
				m_scene_manager.init('data/config/SceneManager.xml');

				//load top score from the HTML5 local storage (if it's supported)
				if(typeof(Storage) !== "undefined") {
					g_topScore = localStorage.getItem("runforestgame_topscore");
					//In case it's the first time playing the game
					//there will be no local storage item, so set it with ZERO
					if(g_topScore == null) {
						g_topScore = 0;
					}
				} else {
				    g_topScore = 0;
				}
				
			},
			restart: function()
			{
				g_gameOver = false;
				g_pauseGame = true;
				g_firstRender = true;
				m_keyEvent = 0;
				m_mouseEvent = 0;
				g_playerScore = 0;

				m_context.clearRect(0, 0, m_canvas.width, m_canvas.height);
				m_context_text.clearRect(0, 0, m_canvas_text.width, m_canvas_text.height);
				
				m_scene_manager.restart();

				g_sound_manager.pauseSoundGameOver();
				g_sound_manager.playSoundTheme();
			},
			togglePause: function()
			{				
				g_pauseGame = !g_pauseGame;
				m_context_text.clearRect(0, 0, m_canvas_text.width, m_canvas_text.height);
				m_keyEvent = 0;
				m_mouseEvent = 0;
			},
			update: function(dt)
			{	
				if(!g_pauseGame) {
					m_sprite_manager.update(dt);
					m_scene_manager.update(dt);
				}
			},
			render: function()
			{
				// TO CLEAR THE SCREEN, DO NOT REMOVE THIS
				//m_canvas.width = m_canvas.width;
				m_context.clearRect(0, 0, m_canvas.width, m_canvas.height);
				
				m_scene_manager.render(m_context);
				
				// m_context.drawImage(imgBg, 10, 10);

				//Render the current Player score
				m_context.font = "30px Arial";
				m_context.fillText("Score: " + g_playerScore, 10, 50);

				//Render the Player's Top score
				m_context.font = "30px Arial";
				m_context.fillText("Top Score: " + g_topScore, 10, 90);
				
				//FPS counter
				//needs to be rendered after everything
				if(DEBUG_MODE) {
					m_context.font = "30px Arial";
					m_context.fillText("FPS: " + current_fps, 10, 130);					
				}								
			},
			destroy: function()
			{
				
			},
			// *** HANDLE MOUSE EVENT
			mouseUp: function(e)
			{
				m_mouseEvent = MOUSE_UP;
				m_unselectAll = true;
			},			
			mouseLeave: function(e)
			{
				g_pauseGame = true;
			},			
			mouseDown: function(e)
			{
				m_mouseEvent = MOUSE_DOWN;
				m_unselectAll = false;
					
				m_current_x = e.clientX;
				m_current_y = e.clientY;
			},			
			mouseMove: function(e)
			{
				// m_mouseEvent = MOUSE_MOVE;
				
				m_mouse_x = e.clientX;
				m_mouse_y = e.clientY;
			},			
			onResize: function(e)
			{
				m_canvas.setAttribute('height', window.innerHeight - 21);
				m_canvas.setAttribute('width', window.innerWidth - 21);

				m_canvas_text.setAttribute('height', window.innerHeight - 21);
				m_canvas_text.setAttribute('width', window.innerWidth - 21);
			},			
			// *** HANDLE KEY EVENT
			keyUp: function(evt)
			{
				switch(evt.keyCode)
				{
					case KEY_LEFT:
						//m_keyEvent = 0;
					break;
					case KEY_UP:
						//m_keyEvent = 0;
					break;
					case KEY_RIGHT:
						//m_keyEvent = 0;
					break;
					case KEY_DOWN:
						// m_keyEvent = 0;
					break;
					case KEY_A:
						// m_keyEvent = 0;
					break;
					case KEY_D:
						// m_keyEvent = 0;
					break;
					case KEY_S:
						// m_keyEvent = 0;
					break;
					case KEY_W:
						// m_keyEvent = 0;
					break;
					case KEY_SPACE:
						// m_keyEvent = 0;
					break;
					default:
						// m_keyEvent = 0;
				}
			},			
			keyDown: function(evt)
			{
				switch(evt.keyCode)
				{
					case KEY_LEFT:
						m_keyEvent = KEY_LEFT;
					break;
					case KEY_UP:
						m_keyEvent = KEY_UP;
					break;
					case KEY_RIGHT:
						m_keyEvent = KEY_RIGHT;
					break;
					case KEY_DOWN:
						m_keyEvent = KEY_DOWN;
					break;
					case KEY_A:
						m_keyEvent = KEY_A;
					break;
					case KEY_D:
						m_keyEvent = KEY_D;
					break;
					case KEY_S:
						m_keyEvent = KEY_S;
					break;
					case KEY_W:
						m_keyEvent = KEY_W;
					break;
					case KEY_SPACE:
						m_keyEvent = KEY_SPACE;
					break;
					default:
				}
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


// ****************************
var g_app;
var g_sound_manager;

// var imgBg;
function main_init()
{
	//Preload all sounds
	g_sound_manager = SoundManager.getInstance();
	g_sound_manager.init();

	g_app = Singleton.getInstance();
	g_app.init("canvas_panel", "canvas_text");

	g_sound_manager.playSoundTheme();
	
	requestAnimationFrame(main_loop);
}

function main_loop()
{
	t_now = Date.now();
	
	if(!t_last)
		t_last = t_now;
	
	if(!t_start)
		t_start = t_now;
	
	var dt = t_now - t_last;
	if(dt >= frame_time) //=>this is causing micro-freezes
	{
		if(!g_gameOver) {
			if(!g_pauseGame || g_firstRender) {
				if(g_firstRender) g_firstRender = false;

				g_app.update(dt);
				g_app.render();
			}
			else {
				//Render the PAUSE screen
				m_context_text.clearRect(0, 0, m_canvas_text.width, m_canvas_text.height);
				m_context_text.font = "30px Arial";
				m_context_text.fillText("Run Forrest! Run!", window.innerWidth/2.0 - 100, 100);
				m_context_text.fillText("Touch/press SPACE to start/pause the game!", window.innerWidth/2.0 - 250, 150);
			}
		} 
		else {
			g_sound_manager.pauseSoundTheme();

			//Render the GAME OVER screen
			m_context_text.clearRect(0, 0, m_canvas_text.width, m_canvas_text.height);
			m_context_text.font = "30px Arial";
			m_context_text.fillText("GAME OVER!", window.innerWidth/2.0 - 100, 100);
			m_context_text.fillText("Click/Touch to play again!", window.innerWidth/2.0 - 150, 150);
		}
		fps_counter++;
		t_last = t_now - (dt % frame_time);
	}
	
	if(t_now - t_start >= 1000.0)
	{
		current_fps = fps_counter;
		fps_counter = 0;
		t_start = t_now;
	}

	if(g_gameOver) {
		if(m_keyEvent == KEY_SPACE || m_mouseEvent == MOUSE_UP) {
			g_app.restart();
		}
	}
	else if(m_keyEvent == KEY_SPACE || (g_pauseGame && m_mouseEvent == MOUSE_UP)) {
		g_app.togglePause();
	}
	
	requestAnimationFrame(main_loop);
}

// ****************************

window.addEventListener("load", function()
{
	// imgBg = new Image();
	// imgBg.src = "data/img/mid_background3.jpg";
	main_init();
});