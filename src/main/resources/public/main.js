$(document).ready(function() {
	addPageBehavior();
});

var cuitClick;
var padronClick;
var botonDetalle = "<button type='button' class='btn btn-circle btn-warning btn-sm'>Ver Detalle</button>";

function drawPadrones() {
	toastr.success("El proceso de búsqueda ha comenzado.");
	var cuit = $("#inputCuit").val().replace(/\-/g, '');
	$(".blue-hoki").each(function() {
        var id = this.id;
        $.ajax({
            url : "/padrones/" + cuit + "/" + id,
            async : false,
            type : "GET",
            dataType : "json",
            contentType : "application/json"
        }).done(function(data) {
            if (data.data.cuit) {
            	$("#" + id + " .div-fields").show();
            	$("#" + id + " .div-date").hide();
                drawPortlet(data.data, id);
            } else {
            	$.ajax({
            		url : "padrones/fecha/" + id,
         			async : false,
     		    	type : "GET",
   			    }).done(function(data) {
            		$("#" + id + " .div-fields").hide();
            		$("#" + id + " .div-date").show();
            		if (data) {
            			$("#" + id + " .div-date").html("Última Actualización: " + data.data.fecha_modif);
            		}
            	});
            }
        }).fail(function() {
            toastr.error("Hubo un problema al buscar el cuit seleccionado en el padrón " + this.id + ".");
        });
    });
}

function drawPortlet(data, id) {
	switch (id) {
	case "afip":
		drawAfip(data);
		break;
	case "agip":
		drawAgip(data);
		break;
	case "apocrifos":
		drawApocrifos(data);
		break;
	case "arbaIibb":
		drawArbaIibb(data);
		break;
	case "cabaAgrecau":
		drawCabaAgrecau(data);
		break;
	case "cabaArt31":
		drawCabaArt31(data);
		break;
	case "cabaArt33":
		drawCabaArt33(data);
		break;
	case "cabaMagsup":
		drawCabaMagsup(data);
		break;
	case "cabaRg816":
		drawCabaRg816(data);
		break;
	case "comarbitral":
		drawComarbitral(data);
		break;
	case "cordobaCmPercep":
		drawCordobaCmPercep(data);
		break;
	case "cordobaExcluidoPercep":
		drawCordobaExcluidoPercep(data);
		break;
	case "cordobaLocalesPercep":
		drawCordobaLocalesPercep(data);
		break;
	case "cordobaMontoFijoReten":
		drawCordobaMontoFijoReten(data);
		break;
	case "cordobaPasibleReten":
		drawCordobaPasibleReten(data);
		break;
	case "cordobaSujetoNoPasiblesPercep":
		drawCordobaSujetoNoPasiblesPercep(data);
		break;
	case "embargos":
		drawEmbargos(data);
		break;
	case "nombresAfip":
		drawNombresAfip(data);
		break;
	case "rg17":
		drawRg17(data);
		break;
	case "rg18":
		drawRg18(data);
		break;
	case "rg830":
		drawRg830(data);
		break;
	case "rg1904":
		drawRg1904(data);
		break;
	case "rg2681":
		drawRg2681(data);
		break;
	case "rg3692":
		drawRg3692(data);
		break;
	case "saltaActivos":
		drawSaltaActivos(data);
		break;
	case "saltaExentos":
		drawSaltaExentos(data);
		break;
	case "sanjuanRs":
		drawSanjuanRs(data);
		break;
	case "sanjuan":
		drawSanjuan(data);
		break;
	case "tucumanContribuyente":
		drawTucumanContribuyente(data);
		break;
	}
}
function drawAfip(data) {
	$("#afip #cuit").val(data.cuit);
	$("#afip #nombre").val(data.nombre);
	$("#afip #imp_ganan").val(data.imp_ganan);
	$("#afip #imp_iva").val(data.imp_iva);
	$("#afip #monotributo").val(data.monotributo);
	$("#afip #integ_soc").val(data.integ_soc);
	$("#afip #empleador").val(data.empleador);
	$("#afip #act_mono").val(data.act_mono);
	$("#afip #fecha_modif").val(data.fecha_modif);
}

function drawAgip(data) {
	$("#agip #nombre").val(data.nombre);
	$("#agip #txtFechaPublic").val(data.fecha_public);
	$("#agip #txtFechaDesde").val(data.fecha_desde);
	$("#agip #txtFechaHasta").val(data.fecha_hasta);
	$("#agip #cuit").val(data.cuit);
	$("#agip #tipoContri").val(data.tipo_contri);
	$("#agip #alta").val(data.alta);
	$("#agip #cambio").val(data.cambio);
	$("#agip #alicuota").val(data.alicuota);
	$("#agip #alicuotaAux").val(data.alicuota_aux);
	$("#agip #grpPerce").val(data.grp_perce);
	$("#agip #grpReten").val(data.grp_reten);
	$("#agip #fechaModificado").val(data.fecha_modif);
}

function drawApocrifos(data) {
	$("#apocrifos #cuit").val(data.cuit);
	$("#apocrifos #fechaDesde").val(data.fecha_desde);
	$("#apocrifos #fechaDePublicacion").val(data.fecha_public);
	$("#apocrifos #observacion").val(data.observacion);
	$("#apocrifos #fechaModificado").val(data.fecha_modif);
}

function drawArbaIibb(data) {
	$("#arbaIibb #cuit").val(data.cuit);
	$("#arbaIibb #regimen").val(data.regimen);
	$("#arbaIibb #fechaPublic").val(data.fecha_public);
	$("#arbaIibb #fechaDesde").val(data.fecha_desde);
	$("#arbaIibb #fechaHasta").val(data.fecha_hasta);
	$("#arbaIibb #tipoContri").val(data.tipo_contri);
	$("#arbaIibb #marcaAlta").val(data.marca_alta);
	$("#arbaIibb #alicuota").val(data.alicuota);
	$("#arbaIibb #cambioAlicuota").val(data.cambio_alicuota);
	$("#arbaIibb #numeroDeGrupo").val(data.nro_grupo);
	$("#arbaIibb #fechaModificado").val(data.fecha_modif);
}

function drawCabaAgrecau(data) {
	$("#cabaAgrecau #cuit").val(data.cuit);
	$("#cabaAgrecau #ag").val(data.ag);
	$("#cabaAgrecau #dv").val(data.dv);
	$("#cabaAgrecau #nombre").val(data.nombre);
	$("#cabaAgrecau #norma").val(data.norma);
	$("#cabaAgrecau #vigencia").val(data.vigencia);
	$("#cabaAgrecau #fechaModificado").val(data.fecha_modif);
}

function drawCabaArt31(data) {
	$("#cabaArt31 #cuit").val(data.cuit);
	$("#cabaArt31 #nombre").val(data.nombre);
	$("#cabaArt31 #fechaModificado").val(data.fecha_modif);
}

function drawCabaArt33(data) {
	$("#cabaArt33 #sol").val(data.sol);
	$("#cabaArt33 #cuit").val(data.cuit);
	$("#cabaArt33 #nombre").val(data.nombre);
	$("#cabaArt33 #calle").val(data.calle);
	$("#cabaArt33 #puerta").val(data.puerta);
	$("#cabaArt33 #piso").val(data.piso);
	$("#cabaArt33 #dpto").val(data.dpto);
	$("#cabaArt33 #torre").val(data.torre);
	$("#cabaArt33 #barrio").val(data.barrio);
	$("#cabaArt33 #codigoPostal").val(data.cod_pos);
	$("#cabaArt33 #anexo").val(data.anexo);
	$("#cabaArt33 #fechaModificado").val(data.fecha_modif);
}

function drawCabaMagsup(data) {
	$("#cabaMagsup #nombre").val(data.nombre);
	$("#cabaMagsup #fechaDePublicacion").val(data.fecha_public);
	$("#cabaMagsup #fechaDesde").val(data.fecha_desde);
	$("#cabaMagsup #fechaHasta").val(data.fecha_hasta);
	$("#cabaMagsup #cuit").val(data.cuit);
	$("#cabaMagsup #tipoDeContribuyente").val(data.tipo_contri);
	$("#cabaMagsup #marcaAlta").val(data.marca_alta);
	$("#cabaMagsup #marcaCambio").val(data.marca_cambio);
	$("#cabaMagsup #alicuotaPercepcion").val(data.alicuota_perce);
	$("#cabaMagsup #alicuotaAuxiliar").val(data.alicuota_aux);
	$("#cabaMagsup #grupoPercepcion").val(data.grp_perce);
	$("#cabaMagsup #grupoRetencion").val(data.grp_reten);
	$("#cabaMagsup #fechaModificado").val(data.fecha_modif);
}

function drawCabaRg816(data) {
	$("#cabaRg816 #nombre").val(data.nombre);
	$("#cabaRg816 #fechaDePublicacion").val(data.fecha_public);
	$("#cabaRg816 #fechaDesde").val(data.fecha_desde);
	$("#cabaRg816 #fechaHasta").val(data.fecha_hasta);
	$("#cabaRg816 #cuit").val(data.cuit);
	$("#cabaRg816 #tipoDeContribuyente").val(data.tipo_contri);
	$("#cabaRg816 #marcaAlta").val(data.marca_alta);
	$("#cabaRg816 #marcaAlicuota").val(data.marca_alicuota);
	$("#cabaRg816 #alicuotaPercepcion").val(data.alicuota_perce);
	$("#cabaRg816 #alicuotaRetencion").val(data.alicuota_reten);
	$("#cabaRg816 #grupoPercepcion").val(data.grp_perce);
	$("#cabaRg816 #grupoRetencion").val(data.grp_reten);
	$("#cabaRg816 #fechaModificado").val(data.fecha_modif);
}

function drawComarbitral(data) {
	$("#comarbitral #nroiibb").val(data.nroiibb);
	$("#comarbitral #cuit").val(data.cuit);
	$("#comarbitral #nombre").val(data.nombre);
	$("#comarbitral #fecha").val(data.fecha);
}

function drawCordobaCmPercep(data) {
	$("#cordobaCmPercep #cuit").val(data.cuit);
	$("#cordobaCmPercep #nombre").val(data.nombre);
	$("#cordobaCmPercep #nroDeInscripto").val(data.nroInscrip);
}

function drawCordobaExcluidoPercep(data) {
	$("#cordobaExcluidoPercep #cuit").val(data.cuit);
	$("#cordobaExcluidoPercep #nombre").val(data.nombre);
	$("#cordobaExcluidoPercep #nroDeInscripto").val(data.nroInscrip);
}

function drawCordobaLocalesPercep(data) {
	$("#cordobaLocalesPercep #cuit").val(data.cuit);
	$("#cordobaLocalesPercep #nombre").val(data.nombre);
	$("#cordobaLocalesPercep #nroDeInscripto").val(data.nroInscrip);
}

function drawCordobaMontoFijoReten(data) {
	$("#cordobaMontoFijoReten #cuit").val(data.cuit);
	$("#cordobaMontoFijoReten #nombre").val(data.nombre);
	$("#cordobaMontoFijoReten #nroDeInscripto").val(data.nroInscrip);
}

function drawCordobaPasibleReten(data) {
	$("#cordobaPasibleReten #cuit").val(data.cuit);
	$("#cordobaPasibleReten #nombre").val(data.nombre);
	$("#cordobaPasibleReten #nroDeInscripto").val(data.nroInscrip);

}

function drawCordobaSujetoNoPasiblesPercep(data) {
	$("#cordobaSujetoNoPasiblesPercep #cuit").val(data.cuit);
	$("#cordobaSujetoNoPasiblesPercep #nombre").val(data.nombre);
	$("#cordobaSujetoNoPasiblesPercep #nroDeInscripto").val(data.nroInscrip);
	$("#cordobaSujetoNoPasiblesPercep #fechaDesde").val(data.fechaDesde);
	$("#cordobaSujetoNoPasiblesPercep #fechaHasta").val(data.fechaHasta);
}

function drawEmbargos(data) {
	$("#embargos #cuit").val(data.cuit);
	$("#embargos #fechaDePublicacion").val(data.fecha_public);
	$("#embargos #numero").val(data.numero);
	$("#embargos #nombre").val(data.nombre);
	$("#embargos #fechaModificado").val(data.fecha_modif);
}

function drawNombresAfip(data) {
	$("#nombresAfip #cuit").val(data.cuit);
	$("#nombresAfip #nombre").val(data.nombre);
}

function drawRg17(data) {
	$("#rg17 #cuit").val(data.cuit);
	$("#rg17 #nombre").val(data.nombre);
	$("#rg17 #fechaDesde").val(data.fecha_desde);
	$("#rg17 #fechaHasta").val(data.fecha_hasta);
	$("#rg17 #porcentaje").val(data.porcentaje);
	$("#rg17 #resolucion").val(data.resolucion);
	$("#rg17 #tipoDeCertificado").val(data.tipo_certificado);
	$("#rg17 #fechaModificado").val(data.fecha_modif);
}

function drawRg18(data) {
	$("#rg18 #cuit").val(data.cuit);
	$("#rg18 #nombre").val(data.nombre);
	$("#rg18 #fechaDesde").val(data.fecha_desde);
	$("#rg18 #fechaHasta").val(data.fecha_hasta);
	$("#rg18 #inciso").val(data.inciso);
	$("#rg18 #fechaModificado").val(data.fecha_modif);
}

function drawRg830(data) {
	$("#rg830 #cuit").val(data.cuit);
	$("#rg830 #numeroDeCertificado").val(data.nro_certificado);
	$("#rg830 #periodoFiscal").val(data.periodo_fiscal);
	$("#rg830 #porcentaje").val(data.porcentaje);
	$("#rg830 #resolucionGeneral").val(data.res_gral);
	$("#rg830 #estado").val(data.estado);
	$("#rg830 #numeroDeLegajo").val(data.nro_legajo);
	$("#rg830 #fechaDesde").val(data.fecha_desde);
	$("#rg830 #fechaDePublicacion").val(data.fecha_publicacion);
	$("#rg830 #fechaHasta").val(data.fecha_hasta);
	$("#rg830 #fechaModificado").val(data.fecha_modif);
}

function drawRg1904(data) {
	$("#rg1904 #cuit").val(data.cuit);
	$("#rg1904 #numeroCertificado").val(data.nro_certificado);
	$("#rg1904 #periodoFiscal").val(data.periodo_fiscal);
	$("#rg1904 #porcentaje").val(data.porcentaje);
	$("#rg1904 #resolucionGeneral").val(data.res_gral);
	$("#rg1904 #estado").val(data.estado);
	$("#rg1904 #fechaDesde").val(data.fecha_desde);
	$("#rg1904 #fechaHasta").val(data.fecha_hasta);
	$("#rg1904 #fechaModificado").val(data.fecha_modif);
}

function drawRg2681(data) {
	$("#rg2681 #cuit").val(data.cuit);
	$("#rg2681 #tipoSujeto").val(data.tipo_sujeto);
	$("#rg2681 #codigoEstado").val(data.cod_estado);
	$("#rg2681 #descripcionEstado").val(data.des_estado);
	$("#rg2681 #autorizaDeduccion").val(data.autoriza_deduccion);
	$("#rg2681 #declaracionesJuradas").val(data.ddjj);
	$("#rg2681 #codigoInciso").val(data.cod_inciso);
	$("#rg2681 #numeroDeCertificado").val(data.nro_certificado);
	$("#rg2681 #ordenJudicial").val(data.orden_judicial);
	$("#rg2681 #fechaEmision").val(data.fecha_emision);
	$("#rg2681 #fechaAdmision").val(data.fecha_adm);
	$("#rg2681 #fechaDesde").val(data.fecha_desde);
	$("#rg2681 #fechaHasta").val(data.fecha_hasta);
	$("#rg2681 #fechaArchivo").val(data.fecha_archivo);
	$("#rg2681 #fechaModificado").val(data.fecha_modif);
}

function drawRg3692(data) {
	$("#rg3692 #cuit").val(data.cuit);
	$("#rg3692 #nombre").val(data.nombre);
	$("#rg3692 #registro").val(data.registro);
	$("#rg3692 #situacion").val(data.situacion);
	$("#rg3692 #fechaDePublicacion").val(data.fecha_public);
	$("#rg3692 #fechaModificado").val(data.fecha_modif);
}

function drawSaltaActivos(data) {
	$("#saltaActivos #cuit").val(data.cuit);
	$("#saltaActivos #nombre").val(data.nombre);
	$("#saltaActivos #indicador").val(data.indicador);
	$("#saltaActivos #numero").val(data.numero);
	$("#saltaActivos #otros").val(data.otros);
	$("#saltaActivos #fechaModificado").val(data.fecha_modif);
}

function drawSaltaExentos(data) {
	$("#saltaExentos #cuit").val(data.cuit);
	$("#saltaExentos #nombre").val(data.nombre);
	$("#saltaExentos #indicador").val(data.indicador);
	$("#saltaExentos #numero").val(data.numero);
	$("#saltaExentos #fechaModificado").val(data.fecha_modif);
}

function drawSanjuanRs(data) {
	$("#sanjuanRs #cuit").val(data.cuit);
	$("#sanjuanRs #nroDeInscripto").val(data.num_inscrip);
	$("#sanjuanRs #razonSocial").val(data.razon_social);
	$("#sanjuanRs #regimen").val(data.regimen);
	$("#sanjuanRs #fechaModificado").val(data.fecha_modif);
}

function drawSanjuan(data) {
	$("#sanjuan #cuit").val(data.cuit);
	$("#sanjuan #nombre").val(data.nombre);
	$("#sanjuan #nroDeInscripto").val(data.num_inscrip);
	$("#sanjuan #fechaModificado").val(data.fecha_modif);
}

function drawTucumanContribuyente(data) {
	$("#tucumanContribuyente #cuit").val(data.cuit);
	$("#tucumanContribuyente #exento").val(data.exento);
	$("#tucumanContribuyente #convenio").val(data.convenio);
	$("#tucumanContribuyente #fechaDesde").val(data.fechaDesde);
	$("#tucumanContribuyente #fechaHasta").val(data.fechaHasta);
	$("#tucumanContribuyente #razonSocial").val(data.razonSocial);
}

function addPageBehavior() {
	$("#inputCuit").inputmask({
		"mask" : "99-99999999-9",
		placeholder : ""
	});

	$("#inputCuitBtn").click(function() {
		var cuit = $("#inputCuit").val().replace(/\-/g, '');
		drawPadrones();
	});
}
