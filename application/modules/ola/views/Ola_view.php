<!DOCTYPE html>
<html>
<head>
	<title>HMVCA (Hierarchical Model–View–Controller Assets)</title>
	<?php $this->load->assets('css'); ?>
</head>
<body>
	<div class="alert">
		<h1>Halo, from {<span id="ina"><?php echo $county ?></span>}</h1>
		<div id="mygame"></div>
		<div id="myrestartbutton" ><button onclick="restartGame()">Restart</button></div>
		<div id="canvascontainer"></div>
		<div class="info">
			<i class="fa fa-mouse-pointer"></i> / <i class="fa fa-arrows"></i> : move object, using mouse pointer/arrows on keyboard<br>
			for question : @karebetconnec / karebetconec@gmail.com
		</div>
	</div>
	<script
	src="https://code.jquery.com/jquery-3.1.1.min.js"
	integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
	crossorigin="anonymous"></script>
	<script src="https://use.fontawesome.com/89fb3312ee.js"></script>
	<?php $this->load->assets('js'); ?>
</body>

</html>
