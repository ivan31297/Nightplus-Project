<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//CI_Controller esto especifica que este archivo es un controlador dentro del framework
class Login extends CI_Controller {

	public $cedula;

	public $password;

	public function login()
	{
                if ((isset($_POST['cedula']) && isset($_POST['password']))&&($_POST['cedula']!=null
                        || $_POST['password']!=null)) {
                        $this->cedula    = $_POST['cedula'];
                        $this->password  = $_POST['password'];
                        $this->load->model('AccesoModel');
                        $result=$this->AccesoModel->login($cedula, $password);
                        if ($result===1) {
                                $this->load->view('principal');
                        }else{
                                echo "Datos incorrectos";
                        }
                        $this->load->controller('Login');
                }else{
                        echo "-1";
                }
                
        }
}