<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//CI_Model, especifica que este archivo es un modelo dentro del framework
class AccesoModel extends CI_Model {

	public function __construct()
    {
            parent::__construct();
    }


	public function login($cedula, $password)
	{
		//SELECT eb.estado, b.id bodega_id, b.nombre, eb.cargos_id cargo_id, b.estado estado_bodega, b.direccion,
		// b.bodegas_id principal, ca.descripcion 
		//FROM acceso a JOIN empleados_bodegas eb ON a.Personas_cedula=eb.Personas_cedula 
		//JOIN bodegas b on b.id=eb.bodegas_id JOIN cargos ca ON ca.id=eb.cargos_id 
		//WHERE a.Personas_cedula=$cedula AND a.password=$password AND eb.estado=1 AND (eb.cargos_id=1 OR eb.cargos_id=2);
		$data=array('a.personas_cedula'=> $cedula, 'a.password'=>$password, 'eb.estado'=>1);
		$this->db->select('eb.estado, b.id bodega_id, b.nombre, eb.cargos_id cargo_id, b.estado estado_bodega, b.direccion, 
		b.bodegas_id principal, ca.descripcion');
		$this->db->from('acceso as a');
		$this->db->join('empleados_bodegas as eb', 'a.Personas_cedula=eb.Personas_cedula');
		$this->db->join('bodegas as b', 'b.id=eb.bodegas_id');
		$this->db->join('cargos as ca', 'ca.id=eb.cargos_id')
		$this->db->where($data);
		$this->db->group_start();
		$this->db->where('eb.cargos_id',1);
		$this->db->or_where('eb.cargos_id',2);
		$this->db->group_end();
		$query= $this->db->get();
		if (is_null($query)) {
			return 0;
		}else{
			$result=$query->result();
			if (is_null($result['principal'])) {
				$this->db
					->select('fecha_corte');
					->from('clientes');
					->where('bodega_principal', $result['id_bodega']);
			}else{
				$this->db
					->select('fecha_corte');
					->from('clientes');
					->where('bodega_principal', $result['principal']);
			}
			$consulta_fecha=$this->db->get();
			$fecha_corte=$consulta_fecha->result();
			$hoy=new DateTime("now");
			$interval = date_diff($fecha_corte, $hoy);
			return $interval;
			if($interval>0){
				session_start();
				$_SESSION['usuario']=$result;
				if ($interval<=2) {
					return "Faltan ".$interval." días para su fecha de corte";
				}
			}else{
				return -2;
			}
		}



	}

}