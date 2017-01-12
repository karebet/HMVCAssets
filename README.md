# HMVCAssets
Assest on modules

## Intermezzo HMVCAssets
Do you think about HMVC Assets on Codeigniter?
HMVC is a MVC in a plant in the modules, how when you build web with the HMVC usually.
How about Assests? Maybe the css and js?
How about we merge in a modules. is it really helpful? you no longer waste time long to scroll up and down to look for file assets which should be loaded in your modules.
## Getting Started

### Prerequisites
Install HMVC from [wiredesignz](https://bitbucket.org/wiredesignz/codeigniter-modular-extensions-hmvc)
### Installing
#### Step 1
Copy and paste, sourcecode below on "application/third_party/MX/Loader.php" . If do not want to elaborate, simply download the file Loader.php
```
/** Load a module Assets **/
public function assets($extention=null){
		/** 
			Load a module Assets
			Inspirated from Mr.Bimo and Friends @Togu Inovasi Teknologi.
			Code Writer: karebetconnec@gmail.com
			how to use?
			Step 1
			load css : $this->load->assets('css');
			load js : $this->load->assets('js');
			Step 2
			Create folder "assets", put "*.css/*.js" in "assets".
		**/
		$filecache = array('css'=>'','js'=>'');
		$path= 'application/modules/'.$this->_module.'/assets/';
		$pathcache='cacheassets';
		/*detect path assets in modules*/
		if (file_exists($path)) {
			/*list file path assets*/
			$list = glob('./'.$path.'*.'.$extention, GLOB_BRACE);
			foreach ($list as $key) {
				/*open file content and minify sourcecode*/
				if ($extention=='css') {
					$bcss = $filecache['css'].file_get_contents($key);
					$bcss = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $bcss);
				    $bcss = str_replace(["\r\n","\r","\n","\t",'  ','    ','     '], '', $bcss);
				    $bcss = preg_replace(['(( )+{)','({( )+)'], '{', $bcss);
				    $bcss = preg_replace(['(( )+})','(}( )+)','(;( )*})'], '}', $bcss);
				    $bcss = preg_replace(['(;( )+)','(( )+;)'], ';', $bcss);
					$filecache['css']= $bcss;
				}
				if ($extention=='js') {
					$bjs = $filecache['js'].file_get_contents($key);
					$bjs = preg_replace("/((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/", "", $bjs);
				    $bjs = str_replace(["\r\n","\r","\t","\n",'  ','    ','     '], '', $bjs);
				    $bjs = preg_replace(['(( )+\))','(\)( )+)'], ')', $bjs);
					$filecache['js']=$bjs;
				}
			}
			if (array_key_exists($extention, $filecache)) {
				if ($filecache[$extention]!='') {
					/*auto create path cache*/
					if (!file_exists('./'.$pathcache)) {
						mkdir('./'.$pathcache);
					}
					/*create file on path cache*/
					$errormessage = "Unable to open file ".$extention." on ".$pathcache ."!";
					$filename= $pathcache.'/'.md5($path).'.'.$extention;
					$fw = fopen('./'.$filename, "w") or die($errormessage);
					$txt = $filecache[$extention];
					fwrite($fw, $txt);
					fclose($fw);
					/*write script on html*/
					if ($extention=='css') {
						echo '<link rel="stylesheet" type="text/css" href="'.base_url($filename).'">';
					}
					if ($extention=='js') {
						echo '<script type="text/javascript" src="'.base_url($filename).'" ></script>';
					}
				}
			}
		}
	}
  ```
#### Step 2
Load assets on template views
  ```
  <!DOCTYPE html>
  <html>
    <head>
	    <?php $this->load->assets('css'); ?>
    </head>
    <body>
	    <?php $this->load->assets('js'); ?>
    </body>
  </html>
  ```
#### Step 3
Create folder "assets" on your modular, put your"*.css/*.js" in "assets".
  
## Thanks
