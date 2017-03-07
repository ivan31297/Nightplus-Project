<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
date_default_timezone_set('America/Bogota');
//CI_Controller esto especifica que este archivo es un controlador dentro del framework
class Ctl_Ventas extends CI_Controller {

	
        public function resumenVentasBodega(){
                $this->load->model('Mdl_Ventas');
                if (isset($_POST['bodega_principal']) && isset($_POST['fecha_inicio']) && $_POST['bodega_principal']!=null &&$_POST['fecha_inicio']!=null) {
                        $bodegaPrincipal=$_POST['bodega_principal'];
                        $fechaInicio=$_POST['fecha_inicio'];
                        $result=$this->Mdl_Ventas->resumenVentasBodega($bodegaPrincipal,$fechaInicio);
                        echo json_encode($result);
                }else{
                        echo "Hubo un error en la petición";
                }        
        }

        public function resumenVentasBodegaMes(){
                $this->load->model('Mdl_Ventas');
                if (isset($_POST['bodega_principal']) && isset($_POST['anio']) && $_POST['bodega_principal']!=null &&$_POST['anio']!=null) {
                        $bodegaPrincipal=$_POST['bodega_principal'];
                        $anio=$_POST['anio'];
                        $resultBodegas=$this->Mdl_Ventas->bodegasVentasPrincipal($bodegaPrincipal,$anio);
                        $bodegasVentas=array();
                        foreach ($resultBodegas as $fila) {
                                array_push($bodegasVentas, $fila);
                        }
                        $resultMeses=$this->Mdl_Ventas->mesesVentasPrincipal($bodegaPrincipal,$anio);
                        $mesesVentas=array();
                        $labels = array();
                        foreach ($resultMeses as $fila) {
                                array_push($mesesVentas, $fila['mes']);
                                $mesLabel=$this->obtenerMes($fila['mes']);
                                array_push($labels, $mesLabel);
                        }
                        $datosImp=array();
                        foreach ($bodegasVentas as $bodega) {
                                $datosBodega=$this->Mdl_Ventas->resumenVentasBodegaMes($bodega['id'],$anio);
                                $vendidoMes=array();
                                foreach ($mesesVentas as $month) {
                                        $vendido=0;
                                        foreach ($datosBodega as $dato) {
                                                if ($dato['mes']===$month) {
                                                        $vendido=$dato['vendido'];
                                                }
                                        }
                                        array_push($vendidoMes, $vendido);
                                }
                                array_push($datosImp, array('bodega'=>$bodega['nombre'], 'datos'=>$vendidoMes));
                                
                        }
                        $fechaInicio=$anio.'1-1';
                        $ventasBodegaTotal=$this->Mdl_Ventas->resumenVentasBodega($bodegaPrincipal,$fechaInicio);
                        $respuesta = array('labels' => $labels, 'datos'=>$datosImp, 'totales'=>$ventasBodegaTotal);
                        echo json_encode($respuesta);
                }else{
                        echo "Hubo un error en la petición";
                }
        }
        public function obtenerMes($numMes){
                if ($numMes==1) {
                        return "Enero";
                }elseif ($numMes==2) {
                        return "Febrero";
                }elseif ($numMes==3) {
                        return "Marzo";
                }elseif ($numMes==4) {
                        return "Abril";
                }elseif ($numMes==5) {
                        return "Mayo";
                }elseif ($numMes==6) {
                        return "Junio";
                }elseif ($numMes==7) {
                        return "Julio";
                }elseif ($numMes==8) {
                        return "Agosto";
                }elseif ($numMes==9) {
                        return "Septiembre";
                }elseif ($numMes==10) {
                        return "Octubre";
                }elseif ($numMes==11) {
                        return "Noviembre";
                }else{
                        return "Diciembre";
                }
        }
}