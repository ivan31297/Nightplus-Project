<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//CI_Model, especifica que este archivo es un modelo dentro del framework
class Mdl_AccesoModel extends CI_Model {

	public function __construct()
    {
            parent::__construct();
            $this->load->database();
    }


	public function login($cedula, $password)
	{

		//SELECT eb.estado, b.id bodega_id, b.nombre, eb.cargos_id cargo_id, b.estado estado_bodega, b.direccion,
		// b.bodegas_id principal, ca.descripcion 
		//FROM acceso a JOIN empleados_bodegas eb ON a.Personas_cedula=eb.Personas_cedula 
		//JOIN bodegas b on b.id=eb.bodegas_id JOIN cargos ca ON ca.id=eb.cargos_id 
		//WHERE a.Personas_cedula=$cedula AND a.password=$password AND eb.estado=1 AND (eb.cargos_id=1 OR eb.cargos_id=2);
		$data=array('a.personas_cedula'=> $cedula, 'a.password'=>$password, 'eb.estado'=>'1');
		$this->db->select('eb.estado, b.id bodega_id, b.nombre, eb.cargos_id cargo_id, b.estado estado_bodega, b.direccion, b.bodegas_id principal, ca.descripcion');
		$this->db->from('acceso as a');
		$this->db->join('empleados_bodegas as eb', 'a.Personas_cedula=eb.Personas_cedula');
		$this->db->join('bodegas as b', 'b.id=eb.bodegas_id');
		$this->db->join('cargos as ca', 'ca.id=eb.cargos_id');
		$this->db->where($data);
		//segmento del where que va encerrado en parentesis.
		$this->db->group_start();
		$this->db->where('eb.cargos_id',1);
		$this->db->or_where('eb.cargos_id',2);
		$this->db->group_end();
		//fin del segmento. cierra parentesis.
		$query= $this->db->get();
		//verificar que haya un resultado;
		if ($query->num_rows()<1) {
			return 0;
		}else{
			$result=$query->result_array();//solo me trae el resultado de la consulta
			$this->db->select('fecha_corte');
			$this->db->from('clientes');
			if (is_null($result[0]['principal'])) {
				//SELECT fecha_corte FROM clientes WHERE bodega_pricipal=$result[0]['bodega_id'];
				$this->db->where('bodega_principal', $result[0]['bodega_id']);
			}else{
				//SELECT fecha_corte FROM clientes WHERE bodega_pricipal=$result[0]['principal'];
				$this->db->where('bodega_principal', $result[0]['principal']);
			}
			$consulta_fecha=$this->db->get();
			$fecha_corte=$consulta_fecha->result_array();
			$hoy=date('Y-m-d');
			//86400 es el numero de segundos que tiene un dia y es por eso que se divide en 86400 para 
			//que la resta nos de en dias
			$dias	= (strtotime($fecha_corte[0]['fecha_corte'])-strtotime($hoy))/86400;
			//floor es la funcion para redondear 
			$dias = floor($dias);
			if($dias>=0){
				session_start();
				$_SESSION['usuario']=$result;
				if ($dias<=2) {
					return "Faltan ".$dias." días para su fecha de corte";
				}else{
					return 1;
				}
			}else{
				return -2;
			}
	}
}
}