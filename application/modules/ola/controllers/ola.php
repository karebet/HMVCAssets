<?php 
/**
* 
*/
class Ola extends MX_Controller
{
	
	function __construct()
	{
		parent::__construct();
	}
	public function index()
	{
		$data['county']="Indonesia";
		$this->load->view('ola_view', $data);
	}
}
