<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//CI_Controller esto especifica que este archivo es un controlador dentro del framework
class Login extends CI_Controller {

	public $cedula;

	public $password;

	public function login()
	{
		$this->cedula    = $_POST['cedula']; // please read the below note
        $this->password  = $_POST['password'];
        $this->load->model('AccesoModel');
        $result=$this->AccesoModel->login($cedula, $password);
        if ($result===1) {
        	$this->load->view('principal');
        }else{
        	echo "Datos incorrectos";
        }
        $this->load->controller('Login');
	}
}