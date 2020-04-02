export default {
  home: {
    title: 'Inicio',
    new_users: 'Nuevos usuarios',
    total_clicks: 'Total clicks',
    total_QnA: 'Total PyR',
    total_share: 'Veces Compartidas',
    total_chat: 'Mensajes Totales',
    total_pages: 'páginas Totales',
    total_interview: 'Entrevistas Totales',
    email_marketing: 'Correo Publicidad',
    affiliate_advertising: 'Publicidad Afiliada',
    video_advertising: 'Publicidad Video',
    search_engine: 'Motor de busqueda',
    users_access: 'Acceso de usuarios',
    users_activity: 'Actividad de usuarios'
  },
  example: {
    total: 'Total',
    carrier_network: 'Servicios de operador/Red',
    bank_securities: 'Banco/Valoes',
    gaming_video: 'Juegos/Video',
    catering_takeaway: 'Catering/Comida para llevar',
    courier_ecommerce: 'Mensajería/e-commerce'
  },
  login: {
    title: 'Entrar en sesion',
    form: {
      title: 'Ingresa, por favor',
      username: 'Por favor, ingrese su nombre de usuario',
      password: 'Por favor, ingrese su contraseña',
      login: 'Iniciar Sesion',
      logout: 'Cerrar Sesion'
    },
    messages: {
      error: {
        username: 'El nombre de usaurio no puede estar vacío',
        password: 'La contraseña no puede estar vacía',
        email: 'Formato de email invalido'
      }
    },
    tips: {
      bottom: 'Captura cualquier usuario y contraseña'
    }
  },
  i18n: {
    title: 'Internaciónalización',
    content: 'este es el contenido del modal.',
    modalTitle: 'Titulo Modal',
    buttonText: 'Mostrar Modal',
    tip: 'Nota: Solo esta página es multi-languaje, otras páginas no agregan contenido de lenguaje al paquete multi-languaje.',
    select_date: 'Seleccióna fecha',
    select_time: 'Seleccióna el tiempo'
  },
  join: {
    title: 'Comunidad',
    qq_number: 'QQ Numero de grupo: {number}',
    zhihu_column: 'iView conoce la columna',
    juejin: 'Juejin',
    bilibili: 'Sala de eventos en vivo',
    twitter: 'Twitter'
  },
  treeSelect: {
    update_selected_data: 'Actualizar datos selecciónados',
    update_tree_data: 'Actualizar datos del árbol'
  },
  countTo: {
    title: 'Count-to uso basico del componente',
    total: 'Total',
    times: 'de veces',
    left_right: 'Agregar texto izq. y der.',
    custom_style: 'Estilo personalizado',
    format_data: 'Formato de datos',
    convert_data: 'Convertir unidades para simplificar datos',
    custom_units: {
      title: 'Unidades personalizadas',
      raw: 'Datos sin procesar：{number} => '
    },
    async_data: 'Los datos pueden ser actualizados asyncronamente',
    example: 'Ejemplo completo',
    qty: {
      thousand: 'Mil',
      tenthousand: 'Diez mil',
      over_hundred_thousand: 'arriba de 100,000',
      over_million: 'arriba del millon',
      over_ten_million: 'arriba de diez millones',
      billion: 'Billon',
      dozen: 'Dozena',
      hundred: 'Cien'
    }
  },
  dragList: {
    toDo: 'To-Do',
    completion: 'Completion',
    operation_record: 'Operation record'
  },
  dragDrawer: {
    content: 'El componente drawer es una encapsulación del componente drawer dentro de iview. Adminte ranuras arrastrables y de pie de página con base en el soporte de todas las apis del drawer',
    direction: 'Dirección',
    left: 'Izq',
    right: 'Der',
    whether_draggable: 'Arrastrable',
    close: 'Apagar',
    open: 'Encender',
    container_drawer: 'Contenedor Drawer',
    open_fullscreen: 'Abrir en pantalla completa',
    example: {
      title: 'Este es el titulo'
    },
    show_miltilayer: 'Mostrar múltiples capas'
  },
  orgTree: {
    documentation: 'Documentación',
    menu: {
      editorial_department: 'Departamento Editorial',
      view_department: 'Ver Departamento',
      new_sector: 'Nuevo subsector',
      delete_department: 'Eliminar Departamento',
      click: 'Click en el menu \'{key}\' del nodo "{label}"'
    }
  },
  treeTable: {
    name: 'Componente Tree Table',
    based_on: 'basado en',
    develop: '',
    fixed_some: 'Varios errores arreglados',
    add_features: 'Agregadas nuevas funciónalidades',
    supported_slot: 'Soporta el uso',
    perfom_custom_column: 'para realizar renderizado de columna personalizado',
    see_documentation: 'Ver la documentación',
    columns: {
      name: 'Nombre',
      gender: 'Genero',
      score: 'Puntuación',
      likes: 'Hobbies'
    }
  },
  cropper: {
    button: 'Confirmar Envio',
    button_crop: 'Cortar',
    upload_image: 'Cargar Imagen',
    messages: {
      success: {
        upload: 'Imagen guardada~'
      }
    }
  },
  table: {
    export_csv: 'Exportar como archivo .Csv',
    columns: {
      name: 'Nombre',
      email: 'Email',
      create_time: 'Fecha de Creación',
      handle: 'Acciónes',
      delete_message: '¿Estas seguro que lo quieres eliminar?',
      delete_button: 'Eliminar personalizado'
    },
    search_placeholder: 'Buscar por palabra clave',
    search_button: 'Buscar'
  },
  richEditor: {
    button: 'Modificar contenido del editor'
  },
  icons: {
    builtin_icon: 'icono incorporado de iView',
    feature: 'El componente Icons soporta mostrar iconos personalizados. Para la creación de fuentes con iconos personalizados, por favor refiérase a la documentación.',
    feature2: 'El componente CommonIcon soporta ambos icono incorporado tipo iView y tipo personalizado. Para distinguir estos dos tipos, necesita agregar un guion-bajo al nombre del icono personalizado "_"'
  },
  uploadTable: {
    upload_csv: 'Subir archivo .Csv',
    tip_upload: 'Sube le archivo .Csv con el boton',
    utilsjs: {
      tip: 'util.js usa dos funcióneas para completar esta acción',
      get_array: 'Convierte un archivo .Csv en una matriz bidimenciónal',
      get_table: 'Convierte una matriz bidimenciónal en datos tabulares, consulta la documentación para mas detalles'
    },
    csv_first_row: 'Primera linea es cabezera',
    only_csv_files: 'Solo se pueden subir archivos .Csv',
    only_csv_files_again: 'Solo archivos .Csv son permitidos, por favor intente de nuevo.'
  },
  pasteTable: {
    paste_tip: 'Usa la tecla \'Tab\' para cambiar de columnas, usa la tecla \'Enter\' para ajustar el texto',
    show_data: 'Mostrar datos tabulares',
    messages: {
      error: {
        irregular: 'Tu contenido es irregular',
        row_irregular: 'Tu información en la fila {errorIndex} es irregular，por favor modificalo'
      }
    }
  },
  uploadExcel: {
    title: 'Importar Excel',
    upload_file: 'Subir archivos',
    success: 'Éxito',
    messages: {
      info: {
        file_deleted: 'El archivo a sido eliminado！'
      },
      error: {
        file_type: 'Tipo de archivo invalido',
        no_excel: 'Archivo：{name} no es un archivo de excel，por favor elija un archivo con extensión .xlsx o .xls。',
        reading: 'Error extrayendo información del archivo'
      },
      success: {
        read: 'Información leida correctamente'
      }
    }
  },
  exportExcel: {
    title: 'Exportar Excel',
    export_file: 'Exportar Archivo',
    example: {
      columns: {
        primary: 'Clasificación primaria',
        secondary: 'Clasificación secundaria',
        tertiary: 'Clasificación terciaria'
      },
      result: 'Lista de categorias'
    },
    messages: {
      error: {
        empty: 'El formulario no puede estar vacío！'
      }
    }
  },
  toolsMethods: {
    add_label: 'Agregar etiqueta',
    dynamic_routing: 'Router dynamico',
    add: 'Agregar ',
    parameter: 'Parameter',
    close_this: 'Cerrar página Tools Methods',
    close_manually: 'Cerrar página manualmente'
  },
  arguPage: {
    params: {
      close_button: 'Llama la función \'closeTag\' para cerrar esta página'
    },
    query: {
      close_button: 'Llama la función \'closeTag\' para cerrar esta página'
    }
  },
  errorStore: {
    content1: 'iview-admin automaticamente recogera errores en tu programa, puedes enviar el registro de errores al back-end para guardarlo. Si no necesitas esta mejora, elimina el atributo \'error-store\' del plugin en esta ruta \'./src/config/index.js\'.',
    content2: 'Adiciónalemnte, en el ambiente de desarrollo, los errores en tu programa seran recogidos. Esto puede no ayudarte a corregir los errores. Tu puedes cambiar \'./src/config/index.js\'\'error-store\'\'developmentOff\' y ponerlo en true.',
    content3: 'Si tu quieres recoger errores en el registro y no buscas que usuarios en sesion vean el registro de errores, puedes negarles el acceso a la vista de registros, solo agrega \'./src/config/index.js\' \'error-store\' \'ShowInHeader\' y ponerlo en false.',
    click_test_error: 'Click para probar el disparo de error',
    click_test_ajax_error: 'Click para probar la funciónalidad request de ajax respondiendo error',
    ajax_error_404: 'La interface de peticiónes ajax es una interfaz no existente para el easy-mock request, por lo tanto el servidor responera un error 404, y el mecanismo recolector de errores cachara este error. Existe un cierto retardo de red durante la prueba, por lo tanto sera recolectado despues de que le des al boton de error.'
  },
  errorLogger: {
    button_export: 'Exportar Registros',
    logger_note: 'Nota: Solo los registros mostrados aqui seran los que se guarden en el servidor, y el listado no se quedara persistente en el navegador, la información sera eliminada cuando se recargue la página',
    columns: {
      serial_number: 'Numero de Serie',
      type: 'Tipo',
      code: 'Codigo',
      information: 'Información',
      url: 'URL',
      time: 'Hora / Fecha'
    },
    file_name: 'Error log'
  },
  directives: {
    show_modal: 'Mostrar ventana emergente arrastrable',
    this_button_draggable: 'Este botón también es arrastrable',
    modal_title: 'Titulo',
    drag_here: 'Agarra aquí para arrastrar toda la ventana emergente',
    copy_button: 'Copiar',
    copy_succed: 'Copia exitosa',
    copy_failedd: 'Copia fallida',
    entered_input: 'Esto es lo que se ingresa'
  },
  multilevel: {
    level: {
      menu: 'Multi-nivel menu',
      second: 'Nivel-{second}',
      third: 'Nivel {third}-{forth}'
    }
  },
  messageCenter: {
    unread_message: 'Mensajes sin leer',
    read_message: 'Mensajes leidos',
    recycle_bin: 'Basura',
    title_delete: 'Borrar',
    title_restore: 'Restaurar'
  },
  menu: {
    components: {
      title: 'Componentes',
      submenu: {
        tree_select_page: {
          title: 'Selector tipo árbol'
        },
        count_to_page: {
          title: 'Contador'
        },
        drag_list_page: {
          title: 'Listas arrastrable'
        },
        drag_drawer_page: {
          title: 'Modal Lateral'
        },
        org_tree_page: {
          title: 'Árbol organigrama'
        },
        tree_table_page: {
          title: 'Tabla tipo árbol'
        },
        cropper_page: {
          title: 'Cortador de imagen'
        },
        tables_page: {
          title: 'Tablas'
        },
        split_pane_page: {
          title: 'Panel con división'
        },
        markdown_page: {
          title: 'Editor de marcado'
        },
        editor_page: {
          title: 'Editor texto enriquecido'
        },
        icons_page: {
          title: 'Iconos personalizados'
        }
      }
    },
    img_cropper_page: 'Editor-Imagen',
    update: {
      title: 'Actualizar',
      submenu: {
        update_table_page: {
          title: 'Cargar .CSV'
        },
        update_paste_page: {
          title: 'Pegar datos de tabla'
        }
      }
    },
    join_page: {
      title: 'Grupo QQ'
    },
    doc: {
      title: 'Documentación'
    },
    multilevel: {
      title: 'Multi-nivel',
      submenu: {
        level_1: {
          title: 'Nivel-1'
        },
        level_2: {
          title: 'Nivel-2'
        },
        level_2_1: {
          title: 'Nivel-2-1'
        },
        level_2_3: {
          title: 'Nivel-2-3'
        },
        level_2_2: {
          title: 'Nivel-2-2',
          submenu: {
            level_2_2_1: {
              title: 'Nivel-2-2-1'
            },
            level_2_2_2: {
              title: 'Nivel-2-2-2'
            }
          }
        }
      }
    },
    directive_page: {
      title: 'Directivas'
    },
    excel: {
      title: 'Excel',
      submenu: {
        'upload-excel': {
          title: 'Cargar Excel'
        },
        'export-excel': {
          title: 'Exportar Excel'
        }
      }
    },
    tools_methods_page: {
      title: 'Métodos de herramientas'
    },
    error_store_page: {
      title: 'Colección de errores'
    },
    error_logger_page: {
      title: 'Registro de Errores'
    },
    query: 'Query',
    params: 'Params'
  },
  top: {
    message_page: {
      title: 'Centro de mensajes'
    },
    fullscreen: {
      open: 'Pantalla Completa',
      exit: 'Salir de pantalla completa'
    },
    tags: {
      close_all: 'Cerrar todo',
      close_other: 'Cerrar otras'
    }
  },
  date: {
    week: {
      Mon: 'Lun',
      Tue: 'Mar',
      Wed: 'Mie',
      Thu: 'Jue',
      Fri: 'Vie',
      Sat: 'Sab',
      Sun: 'Dom'
    }
  },
  modal: {
    close: {
      title: 'Esta seguro que quiere cerrar esta pagina?'
    }
  }
}
