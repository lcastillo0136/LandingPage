export default {
  errors: {
    bday: {
      invalid_date: 'Invalid birthday date',
      max_date_limit: 'Invalid birthday date',
    }, 
    password: {
      wrong_confirmed_password: 'Passwords do not match'
    },
    email: {
      not_available: 'Email not available'
    }
  },
  home: {
    title: '首頁',
    new_users: '新增用户',
    total_clicks: '累计点击',
    total_QnA: '新增问答',
    total_share: '分享统计',
    total_chat: '新增互动',
    total_pages: '新增页面',
    total_interview: '直接访问',
    email_marketing: '邮件营销',
    affiliate_advertising: '联盟广告',
    video_advertising: '视频广告',
    search_engine: '搜索引擎',
    users_access: '用户访问来源',
    users_activity: '每周用户活跃量'
  },
  example: {
    total: '总量',
    carrier_network: '运营商/网络服务',
    bank_securities: '银行/证券',
    gaming_video: '游戏/视频',
    catering_takeaway: '餐饮/外卖',
    courier_ecommerce: '快递/电商'
  },
  login: {
    title: '登錄',
    form: {
      title: '欢迎登录',
      username: '请输入用户名',
      password: '请输入密码',
      forgot_question: 'Forgot password?',
      login: '登录',
      logout: '退出登录',
      login_form: 'Back',
      recover: 'Recover',
      or: 'Or'
    },
    register: {
      invitation: 'Do not have an account yet?',
      now: 'Register now!'
    },
    social: {
      facebook: 'Login with Facebook',
      google: 'Login with Google',
      linkedin: 'Login with Linkedin'
    },
    messages: {
      error: {
        username: 'Username cannot be empty',
        password: 'Password cannot be empty',
        email: '無效的電子郵件格式',
        missing_info: 'Missing Information'
      },
      success: {
        welcome: 'Welcome user: {username}',
        recover_send: 'New Password sended to {username}'
      }
    },
    tips: {
      bottom: 'Enter any username and password'
    }
  },
  register: {
    title: 'Register',
    form: {
      title: 'Please register to My Doctor!',
      name: { 
        label: 'Name',
        placeholder: 'Your name'
      },
      last_name: {
        label: 'Last name',
        placeholder: 'Your last name'
      },
      email: {
        label: 'Email',
        placeholder: 'Your email address'
      },
      password: {
        label: 'Password',
        placeholder: 'Your password'
      },
      confirm_password: {
        label: 'Confirm password',
        placeholder: 'Confirm password'
      },
      agree_terms: 'I Agree to the <strong>Terms &amp; Conditions</strong>',
      send: 'Submit',
      footer_tip: 'Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet. Eum no atqui putant democritum, velit nusquam sententiae vis no.'
    },
    messages: {
      error: {
        missing_info: 'Missing Information',
        empty_name: 'Please fill this field',
        empty_email: 'Please fill this field',
        invalid_email: 'Invalid email format',
        empty_password: 'Please fill this field',
        incorrect_password: 'Passwords do not match',
        please_accept_terms: 'Please accept terms and conditions',
        'Network Error': 'Unable to connect to web server'
      },
      success: {
        registered: 'successfully user registered'
      }
    }
  },
  register_doctor: {
    title: 'Register doctor',
    form: {
      title: 'It\'s time to find you!',
      content: {
        lead: 'Te pri adhuc simul. No eros errem mea. Diam mandamus has ad. Invenire senserit ad has, has ei quis iudico, ad mei nonumes periculis.',
        box_1: {
          title: 'Let patients to Find you!',
          content: 'Ut nam graece accumsan cotidieque. Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet.',
        },
        box_2: {
          title: 'Easly manage Bookings',
          content: 'Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet. Eum no atqui putant democritum, velit nusquam sententiae vis no.'
        },
        box_3: {
          title: 'Instantly via Mobile',
          content: 'Eos eu epicuri eleifend suavitate, te primis placerat suavitate his. Nam ut dico intellegat reprehendunt, everti audiam diceret in pri, id has clita consequat suscipiantur.'
        }
      },
      name: 'Name',
      last_name: 'Last Name',
      specialization: 'Specialization',
      city: 'City',
      country: 'Country',
      address: 'Address',
      mobile_phone: 'Mobile Phone',
      office_phone: 'Office Phone',
      email_address: 'Email Address',
      submit: 'Submit',
      footer_tip: 'Ut nam graece accumsan cotidieque. Has voluptua vivendum accusamus cu. Ut per assueverit temporibus dissentiet.'
    },
    messages: {
      error: {
        missing_info: 'Missing Information'
      },
      success: {
        sended: 'successfully Doctor registered'
      }
    }
  },
  list_page: {
    title: 'List Page'
  },
  contacts: {
    title: 'Contact us',
    header: {
      title: 'Contacts Info',
      administration: 'Administration',
      questions: 'General questions',
      directions: {
        title: 'Get directions',
        enter_location: 'Enter your location',
        send: 'Get directions'
      }
    },
    form: {
      title: 'Contact us',
      legend: 'Mussum ipsum cacilds, vidis litro abertis.',
      name: 'Name',
      last_name: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      message: 'Hello doctor',
      submit: 'Submit'
    },
    messages: {
      error: {
        missing_info: 'Missing information'
      },
      success: {
        sended: 'successfully Info sended'
      }
    }
  },
  i18n: {
    title: '多语言',
    content: '这是模态框内容',
    modalTitle: '模态框题目',
    buttonText: '显示模态框',
    tip: '注：仅此页做了多语言，其他页面没有在多语言包中添加语言内容',
    select_date: 'Select date',
    select_time: 'Select time'
  },
  join: {
    title: '社区',
    qq_number: 'QQ 群号: {number}',
    zhihu_column: 'iView 知乎专栏',
    juejin: '掘金',
    bilibili: '活动直播间',
    twitter: '推特'
  },
  treeSelect: {
    update_selected_data: '更新选中数据',
    update_tree_data: '更新树数据'
  },
  countTo: {
    title: 'count-to组件基础用法',
    total: '总',
    times: '次',
    left_right: '可添加左右文字',
    custom_style: '自定义样式',
    format_data: '设置数据格式',
    convert_data: '转换单位简化数据',
    custom_units: {
      title: '自定义单位',
      raw: '原始数据：{number} => '
    },
    async_data: '可异步更新数据',
    example: '综合实例',
    qty: {
      thousand: '千多',
      tenthousand: '万多',
      over_hundred_thousand: '十万多',
      over_million: '百万多',
      over_ten_million: '千万多',
      billion: '亿多',
      dozen: '十多',
      hundred: '百多'
    }
  },
  dragList: {
    toDo: '待办事项',
    completion: '完成事项',
    operation_record: '操作记录'
  },
  dragDrawer: {
    content: 'drawer组件是对iview的drawer组件的封装，在支持drawer所有api的基础上，支持可拖动和footer底部插槽',
    direction: '方向',
    left: '左',
    right: '右',
    whether_draggable: '是否可拖动',
    close: '关闭',
    open: '打开',
    container_drawer: '容器内抽屉',
    open_fullscreen: '打开全屏抽屉',
    example: {
      title: '这是标题'
    },
    show_miltilayer: '显示多层'
  },
  orgTree: {
    documentation: '文档',
    menu: {
      editorial_department: '编辑部门',
      view_department: '查看部门',
      new_sector: '新增子部门',
      delete_department: '删除部门',
      click: '点击了《{label}》节点的\'{key}\'菜单'
    }
  },
  treeTable: {
    name: '树状表格组件',
    based_on: '基于',
    develop: '进行开发',
    fixed_some: '修复了一些bug',
    add_features: '添加了一些新属性',
    supported_slot: '支持使用',
    perfom_custom_column: '进行自定义列渲染内容',
    see_documentation: '文档请看',
    columns: {
      name: '名称',
      gender: '性别',
      score: '得分了',
      likes: '喜欢'
    }
  },
  cropper: {
    button: '确认提交',
    button_crop: '裁剪',
    upload_image: '上传图片',
    messages: {
      success: {
        upload: '上传成功〜'
      }
    }
  },
  table: {
    export_csv: '导出为Csv文件',
    columns: {
      name: '名称',
      email: '电子邮件',
      create_time: '创建时间',
      handle: '处理',
      delete_message: '你确定要删除吗?',
      delete_button: '自定义删除'
    },
    search_placeholder: '输入关键字搜索',
    search_button: '搜索'
  },
  richEditor: {
    button: '修改编辑器内容'
  },
  icons: {
    builtin_icon: 'iView内置图标',
    feature: 'Icons组件支持自定义图标的显示，具体自定义图标字体文件的制作请参考文档。',
    feature2: 'CommonIcon组件同时支持iView内置图标类型和自定义图标类型，为了区别这两种类型，需要在自定义图标名称前加下划线"_"'
  },
  uploadTable: {
    upload_csv: '上传Csv文件',
    tip_upload: '点击上传Csv文件',
    utilsjs: {
      tip: 'util.js提供两个方法用来实现这个功能',
      get_array: '将Csv文件解析为二维数组',
      get_table: '将二维数组转为表格数据，具体请看文档'
    },
    csv_first_row: '第一行是標題',
    only_csv_files: '只能上传Csv文件',
    only_csv_files_again: '只能上传Csv文件，请重新上传'
  },
  pasteTable: {
    paste_tip: '使用Tab键换列，使用回车键换行',
    show_data: '显示表格数据',
    messages: {
      error: {
        irregular: '您的内容不规范',
        row_irregular: '您的第{errorIndex}行数据不规范，请修改'
      }
    }
  },
  uploadExcel: {
    title: '导入EXCEL',
    upload_file: '上传文件',
    success: '成功',
    messages: {
      info: {
        file_deleted: '上传的文件已删除！'
      },
      error: {
        file_type: '文件类型错误',
        no_excel: '文件：{name}不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。',
        reading: '文件读取出错'
      },
      success: {
        read: '文件读取成功'
      }
    }
  },
  exportExcel: {
    title: '导出EXCEL',
    export_file: '导出文件',
    example: {
      columns: {
        primary: '一级分类',
        secondary: '二级分类',
        tertiary: '三级分类'
      },
      result: '分类列表'
    },
    messages: {
      error: {
        empty: '表格数据不能为空！'
      }
    }
  },
  toolsMethods: {
    add_label: '添加一个标签',
    dynamic_routing: '动态路由',
    add: '添加',
    parameter: '参数',
    close_this: '关闭工具方法页',
    close_manually: '手动关闭页面'
  },
  arguPage: {
    params: {
      close_button: '调用closeTag方法关闭本页'
    },
    query: {
      close_button: '调用closeTag方法关闭本页'
    }
  },
  errorStore: {
    content1: 'iview-admin会自动将你程序中的错误收集起来，你可以将错误日志发给后端保存起来。如果你不需要这个功能，将\'./src/config/index.js\'里的plugin的\'error-store\'属性删掉即可。',
    content2: '另外在开发环境下，你程序中的错误都会被收集起来，这样可能不利于你排查错误，你可以将\'./src/config/index.js\'的\'error-store\'的\'developmentOff\'设为true。',
    content3: '如果你只是想收集错误日志，不希望登录用户看到错误日志，你可以不提供查看日志的入口，只需将\'./src/config/index.js\'的\'error-store\'的\'showInHeader\'设为false。',
    click_test_error: '点击测试触发程序错误',
    click_test_ajax_error: '点击测试触发ajax接口请求错误',
    ajax_error_404: 'ajax接口请求是请求easy-mock的一个不存在接口，所以服务端会报404错误，错误收集机制会收集这个错误，测试的时候有一定网络延迟，所以点击按钮之后稍等一会才会收集到错误。'
  },
  errorLogger: {
    button_export: '导出日志记录',
    logger_note: '注：这里只会显示成功保存到服务端的错误日志，而且页面错误日志不会在浏览器持久化存储，刷新页面即会丢失',
    columns: {
      serial_number: '序号',
      type: '类型',
      code: '编码',
      information: '信息',
      url: '網址',
      time: '时间'
    },
    file_name: '错误日志'
  },
  directives: {
    show_modal: '显示可拖动弹窗',
    this_button_draggable: '这个按钮也是可以拖动的',
    modal_title: '标题',
    drag_here: '拖动这里即可拖动整个弹窗',
    copy_button: '複製',
    copy_succed: '复制成功',
    copy_failedd: '复制失败',
    entered_input: '这是输入的内容'
  },
  multilevel: {
    level: {
      menu: '多级菜单',
      second: '二级-{second}',
      third: '{third}级{forth}'
    }
  },
  messageCenter: {
    unread_message: '未读消息',
    read_message: '已读消息',
    recycle_bin: '回收站',
    title_delete: '删除',
    title_restore: '还原'
  },
  menu: {
    components: {
      title: '组件',
      submenu: {
        tree_select_page: {
          title: '樹狀下拉選擇器'
        },
        count_to_page: {
          title: '数字渐变'
        },
        drag_list_page: {
          title: '拖拽列表'
        },
        drag_drawer_page: {
          title: '可拖動抽屜'
        },
        org_tree_page: {
          title: '組織結構樹'
        },
        tree_table_page: {
          title: '樹狀表格'
        },
        cropper_page: {
          title: '圖片裁剪'
        },
        tables_page: {
          title: '多功能表格'
        },
        split_pane_page: {
          title: '分割窗口'
        },
        markdown_page: {
          title: 'Markdown編輯器'
        },
        editor_page: {
          title: '富文本編輯器'
        },
        icons_page: {
          title: '自定義圖標'
        }
      }
    },
    img_cropper_page: '圖片編輯器',
    update: {
      title: '上傳數據',
      submenu: {
        update_table_page: {
          title: '上傳CSV文件'
        },
        update_paste_page: {
          title: '粘貼表格數據'
        }
      }
    },
    join_page: {
      title: 'QQ群'
    },
    doc: {
      title: '文檔'
    },
    multilevel: {
      title: '多级菜单',
      submenu: {
        level_1: {
          title: 'Level-1'
        },
        level_2: {
          title: 'Level-2'
        },
        level_2_1: {
          title: 'Level-2-1'
        },
        level_2_3: {
          title: 'Level-2-3'
        },
        level_2_2: {
          title: 'Level-2-2',
          submenu: {
            level_2_2_1: {
              title: 'Level-2-2-1'
            },
            level_2_2_2: {
              title: 'Level-2-2-2'
            }
          }
        }
      }
    },
    directive_page: {
      title: '指令'
    },
    excel: {
      title: 'Excel',
      submenu: {
        'upload-excel': {
          title: '上傳excel'
        },
        'export-excel': {
          title: '導出excel'
        }
      }
    },
    tools_methods_page: {
      title: '工具函數'
    },
    error_store_page: {
      title: '錯誤收集'
    },
    error_logger_page: {
      title: '錯誤日誌'
    },
    query: '帶參路由',
    params: '動態路由'
  },
  top: {
    message_page: {
      title: '消息中心'
    },
    fullscreen: {
      open: '全屏',
      exit: '退出全屏'
    },
    tags: {
      close_all: '关闭所有',
      close_other: '关闭其他'
    }
  },
  date: {
    week: {
      Mon: '周一',
      Tue: '周二',
      Wed: '周三',
      Thu: '周四',
      Fri: '周五',
      Sat: '周六',
      Sun: '周日'
    }
  },
  modal: {
    close: {
      title: '确定要关闭这一页吗?'
    }
  },
  footer: {
    about: 'Nosotros',
    about_us: 'Acerca de nosotros',
    blog: 'Blog',
    faq: 'Preguntas frecuentes',
    login: 'Inicio de sesión',
    register: 'Registrar',
    useful_links: 'Accesos rápidos',
    doctors: 'Doctores',
    clinic: 'Clinicas',
    specialization: 'Especialidad',
    join_doctor: 'Unete como doctor',
    download_app: 'Descarga a App',
    contact_us: 'Contacta con nosotros',
    follow_us: 'Siguenos',
    terms_conditions: 'Terminos y Condiciónes',
    privacy: 'Privacidad'
  },
  header: {
    menu: {
      home: 'Home',
      home_default: 'Home Default',
      home_2: 'Home Default 2',
      home_3: 'Home Default 3',
      home_4: 'Home Default 4',
      revolution_slider: 'Revolution Slider',
      home_cookie: 'With Cookie bar (EU law)',
      pages: 'Pages',
      list_page: 'List Page',
      list_grid: 'List Grid Page',
      list_map: 'List Map Page',
      detail_page: 'Detail Page',
      detail_page_2: 'Detail Page 2',
      detail_page_3: 'Detail Page 3',
      blog: 'Blog',
      badges: 'Badges',
      login: 'Login',
      login_2: 'Login 2',
      register_doctor: 'Register Doctor',
      register: 'Register',
      contacts: 'Contacts',
      extra_elements: 'Extra Elements',
      detail_working_booking: 'Detail Working Booking',
      booking_page: 'Booking Page',
      confirm_page: 'Confirm Page',
      faq_page: 'FAQ Page',
      comming_soon: 'Comming Soon',
      responsive_pricing_table: 'Responisve Pricing Table',
      responsive_pricing_table_2: 'Responsive Pricing Table 2',
      working_doctor_register: 'Working doctor register',
      icon_pack_1: 'Icon Pack 1',
      icon_pack_2: 'Icon Pack 2',
      icon_pack_3: 'Icon Pack 3',
      no_found_page: '404 Page',
      menu_v2: 'Menu V2',
      admin: 'Admin',
      buy_template: 'Buy this template'
    }
  },
  home_page: {
    app_section: {
      application: 'Application',
      download_app: 'Download',
      app_name: '{name} App',
      download_now: 'Now!',
      app_description: 'I\'ve created a simple app where you can search for head lice and track your progress and see if you are out of lice yet. Check it out at https://mydoctorapp.com Check out my projects on GitHub Mydoctor App & my project http://getchik.me - A mobile app for tracking kids with cancer'
    }
  },
  types: {
    all: 'All',
    pacient: 'Pacients',
    doctor: 'Doctors',
    nurse: 'Nurses',
    clinic: 'Clinics',
    client: 'Clients',
    customer: 'Customers',
    provider: 'Providers',
    enfermero_a: 'Nurses',
    sucursal: 'Offices',
    clinicas: 'Clinics'
  },
  sorts: {
    closest: 'Closest', 
    best_rated: 'Best rated', 
    oldest: 'Oldest', 
    youngest: 'Youngest',
    most_viewed: 'Most Viewed'
  },
  details_page: {
    title: 'Medical Information'
  },
  booking_page: {
    title: 'Schedule appontment & payment'
  },
  profile: {
    title: 'Profile'
  },
  payment_status : {
    CANCELED: 'Cancelled',
    PAID: 'Paid',
    PENDING: 'Pending',
    AWAITING: 'Awaiting payment',
    COMPLETED: 'Completed',
    DECLINED: 'Declined',
    REFUNDED: 'Refunded',
    DISPUTED: 'Disputed',
  }, 
  appointment_status: {
    SCHEDULED: 'Scheduled',
    NO_SHOW: 'No show',
    PENDING_APPROVAL: 'pending approval',
    REQUEST_EXPIRED: 'request expired',
    NEW_TIME_PROPOSED: 'New time proposed',
    PENDING_RESCHEDULE: 'Pending reschedule',
  },
  invoice_page: {
    title: 'Order details'
  }
}
