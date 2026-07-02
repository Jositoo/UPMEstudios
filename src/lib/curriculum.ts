export interface CurriculumSubject {
  name: string;
  credits: number;
  type: string;
  semester: string;
  code: string;
  course: number; // 1, 2, 3, 4, 5 (for optativas)
}

export const curriculum: CurriculumSubject[] = [
  // PRIMER CURSO
  { name: 'CÁLCULO I', credits: 6, type: 'Básica', semester: '1º', code: '125000401', course: 1 },
  { name: 'CARTOGRAFÍA', credits: 6, type: 'Obligatoria', semester: '1º', code: '125000417', course: 1 },
  { name: 'EXPRESIÓN GRÁFICA', credits: 6, type: 'Básica', semester: '1º', code: '125000416', course: 1 },
  { name: 'FÍSICA I', credits: 6, type: 'Básica', semester: '1º', code: '125000406', course: 1 },
  { name: 'PROGRAMACIÓN I', credits: 6, type: 'Básica', semester: '1º', code: '125000408', course: 1 },
  { name: 'ÁLGEBRA Y GEOMETRÍA', credits: 6, type: 'Básica', semester: '2º', code: '125000403', course: 1 },
  { name: 'BASES DE DATOS', credits: 6, type: 'Básica', semester: '2º', code: '125000409', course: 1 },
  { name: 'ESTADÍSTICA', credits: 6, type: 'Básica', semester: '2º', code: '125000402', course: 1 },
  { name: 'FÍSICA II', credits: 6, type: 'Básica', semester: '2º', code: '125000407', course: 1 },
  { name: 'TOPOGRAFÍA', credits: 6, type: 'Obligatoria', semester: '2º', code: '125000427', course: 1 },

  // SEGUNDO CURSO
  { name: 'AJUSTE DE OBSERVACIONES', credits: 6, type: 'Obligatoria', semester: '3º', code: '125000405', course: 2 },
  { name: 'CÁLCULO II', credits: 4.5, type: 'Básica', semester: '3º', code: '125000404', course: 2 },
  { name: 'GEODESIA', credits: 6, type: 'Obligatoria', semester: '3º', code: '125000428', course: 2 },
  { name: 'PROGRAMACIÓN II', credits: 4.5, type: 'Básica', semester: '3º', code: '125000410', course: 2 },
  { name: 'SISTEMAS DE INFORMACIÓN GEOGRÁFICA', credits: 4.5, type: 'Obligatoria', semester: '3º', code: '125000418', course: 2 },
  { name: 'TRATAMIENTO DIGITAL DE IMÁGENES', credits: 4.5, type: 'Obligatoria', semester: '3º', code: '125000435', course: 2 },
  { name: 'CARTOGRAFÍA MATEMÁTICA', credits: 4.5, type: 'Obligatoria', semester: '4º', code: '125000420', course: 2 },
  { name: 'FOTOGRAMETRÍA', credits: 4.5, type: 'Obligatoria', semester: '4º', code: '125000431', course: 2 },
  { name: 'INFRAESTRUCTURA DE DATOS ESPACIALES I', credits: 4.5, type: 'Obligatoria', semester: '4º', code: '125000419', course: 2 },
  { name: 'MÉTODOS TOPOGRÁFICOS', credits: 6, type: 'Obligatoria', semester: '4º', code: '125000429', course: 2 },
  { name: 'ORGANIZACIÓN Y GESTIÓN DE EMPRESAS', credits: 6, type: 'Básica', semester: '4º', code: '125000445', course: 2 },
  { name: 'TELEDETECCIÓN', credits: 4.5, type: 'Obligatoria', semester: '4º', code: '125000430', course: 2 },

  // TERCER CURSO
  { name: 'ANÁLISIS ESPACIAL', credits: 4.5, type: 'Obligatoria', semester: '5º', code: '125000424', course: 3 },
  { name: 'BASES DE DATOS ESPACIALES', credits: 4.5, type: 'Obligatoria', semester: '5º', code: '125000423', course: 3 },
  { name: 'DISEÑO Y COMUNICACIÓN CARTOGRÁFICA', credits: 6, type: 'Obligatoria', semester: '5º', code: '125000422', course: 3 },
  { name: 'MODELADO Y NORMALIZACIÓN DE LA INFORMACIÓN GEOGRÁFICA', credits: 6, type: 'Obligatoria', semester: '5º', code: '125000438', course: 3 },
  { name: 'REDES Y SERVICIOS DE TELECOMUNICACIÓN', credits: 4.5, type: 'Obligatoria', semester: '5º', code: '125000436', course: 3 },
  { name: 'TRANSFORMACIÓN E INTEGRACIÓN DE INFORMACIÓN GEOGRÁFICA', credits: 4.5, type: 'Obligatoria', semester: '5º', code: '125000439', course: 3 },
  { name: 'ANÁLISIS DE SERIES TEMPORALES', credits: 4.5, type: 'Obligatoria', semester: '6º', code: '125000440', course: 3 },
  { name: 'CARTOGRAFÍA TEMÁTICA', credits: 4.5, type: 'Obligatoria', semester: '6º', code: '125000425', course: 3 },
  { name: 'PROGRAMACIÓN DE CLIENTES LIGEROS', credits: 6, type: 'Obligatoria', semester: '6º', code: '125000413', course: 3 },
  { name: 'PROGRAMACIÓN DE SERVICIOS WEB', credits: 4.5, type: 'Obligatoria', semester: '6º', code: '125000412', course: 3 },
  { name: 'REDES INALÁMBRICAS DE SENSORES', credits: 4.5, type: 'Obligatoria', semester: '6º', code: '125000437', course: 3 },
  { name: 'TELEDETECCIÓN APLICADA', credits: 6, type: 'Obligatoria', semester: '6º', code: '125000434', course: 3 },

  // CUARTO CURSO
  { name: 'BIG DATA GEOESPACIAL', credits: 4.5, type: 'Obligatoria', semester: '7º', code: '125000442', course: 4 },
  { name: 'DISEÑO Y GESTIÓN DE PROYECTOS DE SISTEMAS DE INFORMACIÓN GEOGRÁFICA', credits: 4.5, type: 'Obligatoria', semester: '7º', code: '125000421', course: 4 },
  { name: 'DISEÑO Y GESTIÓN DE PROYECTOS SOFTWARE', credits: 4.5, type: 'Obligatoria', semester: '7º', code: '125000411', course: 4 },
  { name: 'ENGLISH FOR PROFESSIONAL AND ACADEMIC COMMUNICATION', credits: 6, type: 'Obligatoria', semester: '7º u 8º', code: '125000448', course: 4 },
  { name: 'GESTIÓN DE PROYECTOS Y ACTIVOS TECNOLÓGICOS', credits: 6, type: 'Obligatoria', semester: '7º', code: '125000447', course: 4 },
  { name: 'INFRAESTRUCTURAS DE DATOS ESPACIALES II', credits: 4.5, type: 'Obligatoria', semester: '7º', code: '125000426', course: 4 },
  { name: 'PROYECTOS DE APLICACIONES DE LAS TECNOLOGÍAS GEOESPACIALES', credits: 6, type: 'Obligatoria', semester: '8º', code: '125000441', course: 4 },
  { name: 'ASIGNATURAS OPTATIVAS y/o PRÁCTICAS ACADÉMICAS EXTERNAS', credits: 12, type: 'Optativa', semester: '8º', code: '', course: 4 },
  { name: 'TRABAJO FIN DE GRADO', credits: 12, type: 'TFG', semester: '7º u 8º', code: '125000400', course: 4 },

  // OPTATIVIDAD (Asigned to course 5 for grouping purposes)
  { name: 'DERECHO CIVIL Y ADMINISTRATIVO', credits: 6, type: 'Optativa', semester: '8º', code: '125000446', course: 5 },
  { name: 'DESARROLLO DE APLICACIONES GEOMÁTICAS EN DISPOSITIVOS MÓVILES', credits: 6, type: 'Optativa', semester: '8º', code: '125000415', course: 5 },
  { name: 'GESTIÓN Y VALORACIÓN CATASTRAL', credits: 6, type: 'Optativa', semester: '8º', code: '125000433', course: 5 },
  { name: 'INFORMÁTICA GRÁFICA', credits: 6, type: 'Optativa', semester: '8º', code: '125000414', course: 5 },
  { name: 'MODELADO DE LA INFORMACIÓN DE LA CONSTRUCCIÓN (BIM)', credits: 6, type: 'Optativa', semester: '8º', code: '125000432', course: 5 },
  { name: 'PRÁCTICAS EN EMPRESA 1', credits: 6, type: 'Optativa', semester: '7º u 8º', code: '125000449', course: 5 },
  { name: 'PRÁCTICAS EN EMPRESA 2', credits: 6, type: 'Optativa', semester: '7º u 8º', code: '125000450', course: 5 },
  { name: 'RIESGOS NATURALES', credits: 6, type: 'Optativa', semester: '8º', code: '125000444', course: 5 },
  { name: 'SISTEMAS DE AYUDA A LA TOMA DE DECISIONES ESPACIALES', credits: 6, type: 'Optativa', semester: '8º', code: '125000443', course: 5 },
];
