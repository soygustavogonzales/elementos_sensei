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
	$box =$('.box'), 
	$caja = $('#caja'),
	$pencil = $('.pencil'),
	$eraser = $('.eraser'),
	$btnElements = $('.box-left .btn-control'),
	whiteboard = new fabric.Canvas('objetos',{
		backgroundColor:'transparent',
		width:wScreen,
		height:hScreen
	})
	;
  /*

  cad es generado mediante: 
  canvas.toJSON() : genera un objeto json con todos los elementos que contiene y con los atributos del canvas(fondo y sus demas opciones)
  canvas.toDatalessJSON(): genera un objeto json ... investigar mas.
  
  EL OBEJTO JSON GENERADO DEBE SER ENVIADO AL BACKEND PARA QUE SEA RENDERIZADO POR EL OTRO TERMINAL CONECTADO Y ASI 
  TODOS LOS USUARIOS PUEDAN VER EN TIEMPO REAL LO QUE SE HACE EN UNA PIZARRA.
  */
  var cad = '{"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":true,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":true,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(0, 0, 0, 0)"}';
  var cad1 = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1310" height="718" style="background-color: #F2F1F0" xml:space="preserve"><desc>Created with Fabric.js 1.4.11</desc><defs></defs><rect x="-25" y="-25" rx="0" ry="0" width="50" height="50" style="stroke: none; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #f55; fill-rule: source-over; opacity: 0.7;" transform="translate(25 25)"/><circle cx="0" cy="0" r="20" style="stroke: none; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: green; fill-rule: source-over; opacity: 1;" transform="translate(120 120) "/><polygon points="-10 15,0 -15,10 15" style="stroke: none; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: blue; fill-rule: source-over; opacity: 1;" transform="translate(60 65)"/><path d="M 0 0 L 200 100 L 170 200 z" style="stroke: none; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: cyan; fill-rule: source-over; opacity: 1;" transform="translate(220 220)" stroke-linecap="round" /><path d="M 0 0 L 200 100 z" style="stroke: #333; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: black; fill-rule: source-over; opacity: 1;" transform="translate(300.5 170.5)" stroke-linecap="round" /><path d="M 121.32 0 L 44.58 0 C 36.67 0 29.5 3.22 24.31 8.41 c -5.19 5.19 -8.41 12.37 -8.41 20.28 c 0 15.82 12.87 28.69 28.69 28.69 c 0 0 4.4 0 7.48 0 C 36.66 72.78 8.4 101.04 8.4 101.04 C 2.98 106.45 0 113.66 0 121.32 c 0 7.66 2.98 14.87 8.4 20.29 l 0 0 c 5.42 5.42 12.62 8.4 20.28 8.4 c 7.66 0 14.87 -2.98 20.29 -8.4 c 0 0 28.26 -28.25 43.66 -43.66 c 0 3.08 0 7.48 0 7.48 c 0 15.82 12.87 28.69 28.69 28.69 c 7.66 0 14.87 -2.99 20.29 -8.4 c 5.42 -5.42 8.4 -12.62 8.4 -20.28 l 0 -76.74 c 0 -7.66 -2.98 -14.87 -8.4 -20.29 C 136.19 2.98 128.98 0 121.32 0 z" style="stroke: none; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: source-over; opacity: 1;" transform="translate(121 141)" stroke-linecap="round" /><g transform="translate(192.4 239.95) rotate(30)"><image xlink:href="file:///home/ggonzales/Escritorio/fabric.js-1.4.11/dist/la-creacion.jpg" x="-150" y="-75" style="stroke: none; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: source-over; opacity: 0.55;" width="300" height="150" preserveAspectRatio="none"></image></g><g transform="translate(191.65 126)"><text font-family="Times New Roman" font-size="40" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: source-over; opacity: 1;" transform="translate(-91.65 39)"><tspan x="0" y="-26" fill="rgb(0,0,0)">hello world</tspan></text></g><g transform="translate(108.3 104)"><text font-family="Times New Roman" font-size="40" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: ; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: source-over; opacity: 1;" transform="translate(-108.3 39)"><tspan x="122.13" y="-104" fill="rgb(0,0,0)">this is</tspan><tspan x="44.41" y="-52" fill="rgb(0,0,0)">a multiline</tspan><tspan x="156.62" y="0" fill="rgb(0,0,0)">text</tspan><tspan x="0" y="52" fill="rgb(0,0,0)">aligned right!</tspan></text></g></svg>'
  var cad2 = {"objects":[{"type":"rect","originX":"left","originY":"top","left":0,"top":0,"width":50,"height":50,"fill":"#f55","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0.7,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","rx":0,"ry":0},{"type":"circle","originX":"left","originY":"top","left":100,"top":100,"width":40,"height":40,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","radius":20},{"type":"triangle","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":30,"fill":"blue","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":""},{"type":"path","originX":"left","originY":"top","left":120,"top":120,"width":200,"height":200,"fill":"cyan","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","path":[["M",0,0],["L",200,100],["L",170,200],["z"]],"pathOffset":{"x":0,"y":0}},{"type":"path","originX":"left","originY":"top","left":200,"top":120,"width":200,"height":100,"fill":"black","stroke":"#333","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","path":[["M",0,0],["L",200,100],["z"]],"pathOffset":{"x":0,"y":0}},{"type":"path","originX":"left","originY":"top","left":56.5,"top":22,"width":129,"height":238,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","path":[["M",121.32,0],["L",44.58,0],["C",36.67,0,29.5,3.22,24.31,8.41],["c",-5.19,5.19,-8.41,12.37,-8.41,20.28],["c",0,15.82,12.87,28.69,28.69,28.69],["c",0,0,4.4,0,7.48,0],["C",36.66,72.78,8.4,101.04,8.4,101.04],["C",2.98,106.45,0,113.66,0,121.32],["c",0,7.66,2.98,14.87,8.4,20.29],["l",0,0],["c",5.42,5.42,12.62,8.4,20.28,8.4],["c",7.66,0,14.87,-2.98,20.29,-8.4],["c",0,0,28.26,-28.25,43.66,-43.66],["c",0,3.08,0,7.48,0,7.48],["c",0,15.82,12.87,28.69,28.69,28.69],["c",7.66,0,14.87,-2.99,20.29,-8.4],["c",5.42,-5.42,8.4,-12.62,8.4,-20.28],["l",0,-76.74],["c",0,-7.66,-2.98,-14.87,-8.4,-20.29],["C",136.19,2.98,128.98,0,121.32,0],["z"]],"pathOffset":{"x":-8,"y":-97}},{"type":"image","originX":"left","originY":"top","left":100,"top":100,"width":300,"height":150,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":30,"flipX":false,"flipY":false,"opacity":0.55,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","src":"file:///home/ggonzales/Escritorio/fabric.js-1.4.11/dist/la-creacion.jpg","filters":[],"crossOrigin":""},{"type":"text","originX":"left","originY":"top","left":100,"top":100,"width":183.3,"height":52,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","text":"hello world","fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"left","path":null,"textBackgroundColor":"","useNative":true},{"type":"text","originX":"left","originY":"top","left":0,"top":0,"width":216.6,"height":208,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","text":"this is\na multiline\ntext\naligned right!","fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.3,"textDecoration":"","textAlign":"right","path":null,"textBackgroundColor":"","useNative":true}],"background":"#F2F1F0"};
  console.log(typeof cad2 === "string")
  console.log(JSON.stringify(cad2))
  var cad2_ = JSON.stringify(cad2)
  console.log(JSON.parse(cad2_))
  /*
  fabric.loadSVGFromString(cad1, function(objects, options) {
    console.log(objects)
    //console.log(JSON.stringify(objects))
    var obj = fabric.util.groupSVGElements(objects, options);
    //whiteboard.add(obj).renderAll();
    whiteboard.loadFromJSON(JSON.stringify(objects)).renderAll()
  });
  */
  //whiteboard.loadFromJSON(cad)
  //whiteboard.loadFromDatalessJSON(cad2_)
	$container = $('#objetos').parent()
	$container.css({
		position:'absolute'
	})
	$canvas[0].width = wScreen
	$canvas[0].height = hScreen
	$canvas.activate = false
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

	function enabledPencilWrite () {
		if(!$canvas.activate){//si esta desactivado
			$canvas.css({
				'z-index':4
			})
		}
		$canvas.activate = true
	}

	function disabledPencilWrite () {
		if($canvas.activate){
			$canvas.css({
				'z-index':2
			})
		}
		$canvas.activate = false
	}

	$pencil.click(enabledPencilWrite)
	$box.mouseleave(disabledPencilWrite)
	
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