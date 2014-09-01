!function(window,document,undefined,$){
	var l = console,
	wScreen = screen.width - 0,
	draggin = false,
	jalandoEle = false,
	$ele = null,
	counter = 0,
	$body = $(document.body),
	hScreen = $body.height() ||screen.height - (24 + 61),//683
	$canvas = $('.pizarra'),
	$caja = $('#caja'),
	$btnElements = $('.box-left .btn-control'),
	whiteboard = new fabric.Canvas('objetos',{
		backgroundColor:'transparent',
		width:wScreen,
		height:hScreen
	})
	; 
	$canvas[0].width = wScreen
	$canvas[0].height = hScreen
	;
	var $tempCanvas = $(document.createElement('canvas'));
	$tempCanvas.attr('id','tempCanvas')
	$body.append($tempCanvas)
	var temp = new fabric.Canvas('tempCanvas',{
			backgroundColor:'transparent',
			width:150,
			height:150,
			selection:false
	})
	var $cont = $tempCanvas.parent()
	$cont.addClass('hide')
	$cont.css({
		position:'absolute',
		'z-index':6
	})


	function showPhantomEle (nomEle) {
		switch(nomEle) {
			case ('rectangle'):
				createRect(temp,{
					width:120,
					height:75,
					fill:'rgba(220,220,220,.1)',
					top: 25,
					left:0,
					shadow: 'rgba(0,0,0,1) 0px 0px 45px',
					stroke:'rgba(0,0,0,.2)',
					selectable:false
				})
				break;
			case ('circle'):
				createCircle(temp,{
					fill:'rgba(220,220,220,.1)',
					radius:50,
					top: 40,
					left:40,
					shadow: 'rgba(0,0,0,1) 0px 0px 45px',
					stroke:'rgba(0,0,0,.2)',
					selectable:false
				})
			break;
			case ('triangle'):
				createTriangle(temp,{
					width:100,
					height:75,
					fill:'rgba(220,220,220,.1)',
					top: 25,
					left:30,
					shadow: 'rgba(0,0,0,1) 0px 0px 45px',
					stroke:'rgba(0,0,0,.2)',
					selectable:false
				})
				break;
		}	
			
		//temp.add(rect).renderAll()
		$cont.removeClass('hide')
	}

	function hidePhantomEle () {
		temp.clear().renderAll()
		$cont.addClass('hide')
	}

	function selectionableEle (e){
			if(!jalandoEle){
				console.log("mousedown on box")
				jalandoEle = !jalandoEle
				ele = $(this).attr('name')
				console.log(ele)
				showPhantomEle(ele)
				$cont.css({
					top:(e.clientY-75),
					left:(e.clientX-75)
				})				
			}
		
	}

	function draggableEle (e){
	
		if(jalandoEle){
			$cont.css({
				top:(e.clientY-75),
				left:(e.clientX-75)
			})		
		}

	}

	function dropableEle (e) {
	
		if(jalandoEle){
			switch(true){
				case(e.clientX>175)://175 es el ancho del .box-left
					createEle(whiteboard,ele,e.clientX,e.clientY)//nombre elemento y sus coordenadas
				break;
			}
			hidePhantomEle()
			jalandoEle = !jalandoEle
		}
					

	}

	function createEle (canvas,nomEle,x,y){
		/*
		nomEle : nombre del elemento que se va a crear
		*/
		switch(nomEle){
			case('rectangle'):
				createRect(canvas,{
					width:150,
					height:70,
					fill:'transparent',
					top:y,
					left:x		
				})
				break;
			case('circle'):
				createCircle(canvas,{
					radius:40,
					fill:'transparent',
					top:y,
					left:x		
				})
				break;
			case('triangle'):
				createTriangle(canvas,{
					width:100,
					height:75,
					fill:'transparent',
					top:y,
					left:x		
				})
				break;
		}
	}

	function createRect (canvas,opt){
		var default_ = {
			width:100,
			height:50,
			fill:'transparent',
			stroke:'rgba(24,24,24,.4)',
			shadow: null,
			top: 100,
			left:100			
		}

		opt = $.extend(default_, opt);
		
		var rect = new fabric.Rect({
			width:opt.width,
			height:opt.height,
			fill:opt.fill,
			top:opt.top,
			left:opt.left,
			stroke:opt.stroke,
			shadow: opt.shadow
		})
		canvas.add(rect)
	}

	function createCircle (canvas,opt) {

		var default_ = {
			radius:30,
			fill:'transparent',
			stroke:'rgba(24,24,24,.4)',
			top: 100,
			left:100,
			shadow: null
		}

		opt = $.extend(default_, opt);
		var circle = new fabric.Circle({
			radius:opt.radius,
			fill:opt.fill,
			stroke:opt.stroke,
			top:opt.top,
			left:opt.left,
			shadow: opt.shadow
		})

		canvas.add(circle).renderAll()
	}

	function createTriangle (canvas,opt) {

		var default_ = {
			width:100,
			height:75,
			fill:'transparent',
			stroke:'rgba(24,24,24,.4)',
			top: 100,
			left:100,
			shadow: null
		}

		opt = $.extend(default_, opt);

		var triangle = new fabric.Triangle({
			width:opt.width,
			height:opt.height,
			fill:opt.fill,
			stroke:opt.stroke,
			top:opt.top,
			left:opt.left,
			shadow: opt.shadow
		})
		l.log(triangle)
		canvas.add(triangle).renderAll()
	}
	
$btnElements.mousedown(selectionableEle);
$body.mousemove(draggableEle);
$body.mouseup(dropableEle);


}(window,document,undefined,jQuery)