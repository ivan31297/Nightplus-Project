<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//CI_Model, especifica que este archivo es un modelo dentro del framework
class Mdl_Ventas extends CI_Model {

	public function __construct()
    {
            parent::__construct();
            $this->load->database();
    }


	public function resumenVentasBodega($bodegaPrincipal, $fechaInicio)
	{
		//SELECT b.nombre, SUM(i.valor*i.cantidad) as vendido 
		//FROM inventario i 
		//JOIN bodegas b on i.bodegas_origen=b.id
		//WHERE b.bodegas_id=3 AND i.fecha>='2017-1-1'
		//GROUP BY b.nombre;
		$data=array('b.bodegas_id'=> $bodegaPrincipal, 'i.fecha'=>$fechaInicio);
		$this->db->select('b.nombre, SUM(i.valor*i.cantidad) as vendido');
		$this->db->from('inventario as i');
		$this->db->join('bodegas as b', 'i.bodegas_origen=b.id');
		$this->db->where('b.bodegas_id', $bodegaPrincipal);
		$this->db->where('i.fecha >=', $fechaInicio);
		$this->db->group_by("b.nombre");
		$this->db->order_by("vendido","desc");
		$query= $this->db->get();
		return $query->result_array();
		if ($query->num_rows()<1) {
			return 0;
		}else{
			return $query->result_array();
		}
	}

	public function resumenVentasBodegaMes($bodega,$anio){
		/*SELECT MONTH(i.fecha) as mes, SUM(valor*cantidad) as vendido 
		FROM inventario i
		JOIN bodegas b on i.bodegas_origen=b.id
		wHERE bodegas_origen=5 AND YEAR(i.fecha)='2017' 
		GROUP BY b.nombre, MONTH(fecha) 
		ORDER BY mes ASC*/
		$this->db->select('MONTH(i.fecha) as mes, SUM(i.valor*i.cantidad) as vendido');
		$this->db->from('inventario as i');
		$this->db->join('bodegas as b', 'i.bodegas_origen=b.id');
		$this->db->where('i.bodegas_origen', $bodega);
		$this->db->where('YEAR(i.fecha)', $anio);
		$this->db->group_by("MONTH(i.fecha)");
		$this->db->order_by("mes","ASC");
		$query= $this->db->get();
		return $query->result_array();
		if ($query->num_rows()<1) {
			return 0;
		}else{
			return $query->result_array();
		}
	}

	public function bodegasVentasPrincipal($bodegaPrincipal, $anio){
		/*SELECT i.bodegas_origen, b.nombre
		FROM inventario i
		JOIN bodegas b on b.id=i.bodegas_origen
		WHERE b.bodegas_id=3 AND YEAR(i.fecha)='2017'
		GROUP BY i.bodegas_origen*/
		$this->db->select('i.bodegas_origen as id, b.nombre');
		$this->db->from('inventario as i');
		$this->db->join('bodegas as b', 'i.bodegas_origen=b.id');
		$this->db->where('b.bodegas_id', $bodegaPrincipal);
		$this->db->where('YEAR(i.fecha)', $anio);
		$this->db->group_by("i.bodegas_origen");
		$this->db->order_by("i.bodegas_origen","ASC");
		$query= $this->db->get();
		return $query->result_array();
		if ($query->num_rows()<1) {
			return 0;
		}else{
			return $query->result_array();
		}
	}
	public function mesesVentasPrincipal($bodegaPrincipal, $anio){
		/*SELECT MONTH(i.fecha)
		FROM inventario i
		JOIN bodegas b ON b.id=i.bodegas_origen
		WHERE b.bodegas_id=3 AND YEAR(i.fecha)='2017'
		GROUP BY MONTH(i.fecha)*/
		$this->db->select('MONTH(i.fecha) as mes');
		$this->db->from('inventario as i');
		$this->db->join('bodegas as b', 'i.bodegas_origen=b.id');
		$this->db->where('b.bodegas_id', $bodegaPrincipal);
		$this->db->where('YEAR(i.fecha)', $anio);
		$this->db->group_by("MONTH(i.fecha)");
		$query= $this->db->get();
		return $query->result_array();
		if ($query->num_rows()<1) {
			return 0;
		}else{
			return $query->result_array();
		}
	}
}