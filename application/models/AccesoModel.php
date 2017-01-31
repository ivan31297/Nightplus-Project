<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//CI_Model, especifica que este archivo es un modelo dentro del framework
class AccesoModel extends CI_Model {

	public function __construct()
    {
            parent::__construct();
    }


	public function login($cedula, $password)
	{
		//SELECT * FROM acceso WHERE personas_cedula=$cedula AND password=$password;
		$data=array('personas_cedula'=> $cedula, 'password'=>$password);
		$this->db->select('*');
		$this->db->from('acceso');
		$this->db->where($data);
		$query= $this->db->get();
		if (is_null($query)) {
			return 0;
		}else{
			return 1;
		}



	}

}