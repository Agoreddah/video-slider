var VideoSlider = function(){
	
	var self = {};
	
	self.slides = document.getElementsByClassName("slide");
	self.index = 0;
	
	self.video;
	self.slide;
	self.direction;
	self.animationSpeed = 0.75;
	self.isAnimating = false;
	self.lastSlide = document.getElementsByClassName('slide')[self.slides.length - 1];
	self.lastAnimation = false;

	self.controls = document.getElementsByClassName('control');
	
	self.animation1 = function(){
		
	};
	
	self.animation2 = function(){
		var tl2 = new TimelineLite();
		var title = document.getElementById('anim2-title'),
			text1 = document.getElementById('anim2-text1'),
			text2 = document.getElementById('anim2-text2'),
			text3 = document.getElementById('anim2-text3'),
			text4 = document.getElementById('anim2-text4'),
			styles = {opacity:0, x:-115};
			tl2.from(title, speed, styles);
			tl2.from(text1, speed, styles);
			tl2.from(text2, speed, styles);
			tl2.from(text3, speed, styles);
			tl2.from(text4, speed, styles);
			tl2.play();
	};
	
	self.animation3 = function(){
		var tl3 = new TimelineLite();
		var title = document.getElementById('anim3-title'),
			text = document.getElementsByClassName('anim3-text'),
			len = text.length,
			i = 0,
			styleTitle = {opacity:0, x:-115},
			styleText = {opacity:0, y:-35};
			
		tl3.from(title, speed, styleTitle);
		
		for(i, len; i < len; i ++){
			tl3.from(text[i], speed, styleText);		
		}
		tl3.play();
	}; 
			  
	self.controlActiveClass = function(slide){
		var i = 0,
			slides = document.getElementsByClassName("slide"),
			len = slides.length;
		
		for(i, len; i< len; i++){
			if(self.slides[i] === slide){
				slide.classList.add('active');
			}
			else{
				self.slides[i].classList.remove('active');
			}
		}
	};
	
	self.controlActiveVideo = function(video){
		var i = 0,
			videos = document.getElementsByTagName("video"),
			len = videos.length;
		
		for(i, len; i< len; i++){
			if(videos[i] === video){
				video.classList.add('active');
			}
			else{
				videos[i].classList.remove('active');
			}
		}
	};
	
	self.resetVideos = function(){
		var videos = document.getElementsByTagName('video'),
			len = videos.length,
			i = 0;
			
		for(i, len; i < len; i++){
			if(videos[i].id === self.video.id){
				console.log('cool');
			}
			else{
				videos[i].currentTime = 0;
			}
		}			
	};
	
	self.showControls = function(){
		if(self.index === 0){
			self.controls[0].classList.add('hidden');
		}
		else if(self.index === (self.slides.length - 1)){
			self.controls[1].classList.add('hidden');
		}
		else{
			for(var i = 0; i < self.controls.length; i++){
				self.controls[i].classList.remove('hidden');
			}
		}
	};
	
	self.initControls = function(){
		self.showControls();
		for(var i = 0; i < self.controls.length; i++){
			self.controls[i].addEventListener('click', function(e){
				
				self.slide = '.slide' + (videoSlider.index + 1);
				
				if(this.classList[1] === 'right' && self.isAnimating === false){
					console.log('clicked right');
			  		if(self.index < self.slides.length - 1){
			  			self.index += 1;
			  		}
			  		else{
			  			self.index = self.slides.length - 1;
			  		}
			  		self.video = document.querySelector(self.slide + ' .video-front');
			  		self.direction = 'right';
			  	}
			  	
			  	if(this.classList[1] === 'left' && self.isAnimating === false){
			  		console.log('clicked left');
			  		if(self.index > 0){
			  			self.index -= 1;
			  		}
			  		else{
			  			self.index = 0;
			  		}
			  		self.video = document.querySelector(self.slide + ' .video-back');
			  		self.direction = 'left';
			  	}
			  	self.controlActiveVideo(self.video);
			  	self.runAnimation(self.direction);
			  	
			});
		}
		
	};
	
	self.runAnimation = function(direction){
		console.log('animation is running');
		console.log('index: ' + self.index);
		console.log('slide: ' + self.slide);
		console.log(self.video);

		if(self.lastAnimation === true && direction === 'right'){
			self.video.play();
			self.resetVideos();
		}
		else{
			self.video.play();
			self.resetVideos();
		}
					

		var timer = setInterval(function(){
			self.isAnimating = true;
			if(self.video.ended === true && self.slides[self.index] === self.lastSlide){
				self.lastAnimation = true;				
			}
			else{
				self.lastAnimation = false;
			}
			if(self.video.ended === true){
				self.controlActiveClass(self.slides[self.index], direction);
				self.isAnimating = false;
				clearInterval(timer);
				self.showControls();
				console.log('animation stopped');
				self.runUiAnimation();
			}
		},self.video.duration / 100);
	
	};
	
	self.runUiAnimation = function(){
		switch(self.index){
			case 0:
				//self.animation1();
				break;
			case 1:
				self.animation2();
				break;
			case 2:
				self.animation3();
				break;
			default:
				break;
		}
	};
	
	self.init = function(){
		self.initControls();
	};
			  

			  
			  
	return self;
};
