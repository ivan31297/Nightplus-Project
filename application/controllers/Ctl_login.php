<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
date_default_timezone_set('America/Bogota');
//CI_Controller esto especifica que este archivo es un controlador dentro del framework
class Ctl_login extends CI_Controller {

	

	public function login()
	{
                $this->load->model('Mdl_AccesoModel');
                if ((isset($_POST['cedula']) && isset($_POST['password']))&&($_POST['cedula']!=null
                        || $_POST['password']!=null)) {
                        $cedula    = $_POST['cedula'];
                        $password  = $_POST['password'];
                        $result=$this->Mdl_AccesoModel->login($cedula, $password);
                        echo $result;
                }else{
                        echo "Hubo un error en la petición";
                }
	}
}