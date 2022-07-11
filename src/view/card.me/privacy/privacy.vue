<template>
  <main class="home-page bg-hero wrapper privacy">
    <b-navbar toggleable="md">
      <b-container class="d-flex align-items-center">
        <b-navbar-brand class="mt-0" :to="{ name: 'home' }">
          <img src="/img/logo.png" style="max-height: 100px;" />
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <div class="mx-lg-5 d-lg-flex flex-lg-row" v-if="!hasToken">
              <b-nav-item @click="$bvModal.show('login-1')">Entrar</b-nav-item>
              <b-button :to="{ name: 'register' }" class="rounded-lg text-white" variant="primary">Registrarte</b-button>
            </div>
            <div class="mx-lg-2 d-lg-flex flex-lg-row" v-else>
              <b-nav-item :to="{ name: 'profile-details' }">Hola, <b>@{{ User.username }}</b></b-nav-item>
              <b-button class="rounded-lg text-white" variant="primary" @click="dispachLogout">Salir</b-button>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <Login></Login>
    <RegisterForm></RegisterForm>
    <div class="container bg-white p-4 radius-1 jumbotron">
      <section class="pt-5 pb-3">
        <div class="container">
          <div class="row">
            <div class="col-xl-11 mx-auto col-12">
              <h2 class="mt-3 m-grey-text text-uppercase">AVISO DE PRIVACIDAD</h2>
              <p class="mt-3 grey-text regular">Este Aviso de privacidad explica cómo Zibasoft. ("Zibasoft", "nosotros", "nos" o "nuestro") recopila, usa, divulga y procesa información personal (como se define a continuación) en relación con nuestro sitio web (el “Sitio”) y el contenido relacionado, la plataforma, los servicios, las aplicaciones móviles y web, las demostraciones de productos y otras funciones que se ofrecen en o a través de los servicios en línea (colectivamente, los “Servicios”). No aborda nuestras prácticas de privacidad relacionadas con los solicitantes de empleo, empleados y otro personal de Zibasoft.</p>
              <h2 class="mt-3 m-grey-text text-uppercase">¿QUÉ ES LA INFORMACIÓN PERSONAL?</h2>
              <p class="mt-3 grey-text regular">Cuando usamos el término "Información personal" en este Aviso de privacidad, nos referimos a la información que identifica, se relaciona con, describe, es razonablemente capaz de asociarse o podría vincularse razonablemente, directa o indirectamente, a un individuo. No incluye información agregada o no identificada que se mantiene en una forma que no es razonablemente capaz de asociarse o vincularse con un individuo.</p>
              <h2 class="mt-3 m-grey-text text-uppercase">NUESTRA COLECCIÓN DE INFORMACIÓN PERSONAL</h2>
              <p class="mt-3 grey-text regular">A veces, recopilamos Información personal automáticamente cuando una persona interactúa con nuestros Servicios y, a veces, recopilamos Información personal directamente de una persona. En ocasiones, podemos recopilar información personal sobre una persona de otras fuentes y de terceros, incluso antes de nuestra primera interacción directa.</p>
              <p class="mt-3 cyan-text regular">Información personal recopilada de individuos directamente</p>
              <p class="mt-3 grey-text regular">Recopilamos la siguiente información personal que nos envían los visitantes de nuestro sitio, las personas a través de demostraciones de nuestros productos y los titulares de cuentas:</p>
              <ul class="mt-3 terms-list regular">
                <li><span class="cyan-text">Información del contacto</span>, incluyendo nombre, dirección de correo electrónico, país/región, número de teléfono y preferencias de comunicación.</li>
                <li><span class="cyan-text">Información demográfica</span>, incluida la edad</li>
                <li><span class="cyan-text">Información de la cuenta</span>, incluidos el nombre, el nombre de la empresa, el empleador, el cargo, el estado de promoción laboral, la dirección de correo electrónico, el número de teléfono, la dirección comercial, el sitio web, el nombre de usuario y la contraseña, la información del perfil, la imagen del perfil, la información de la libreta de direcciones, la información del equipo, la información del departamento, el pago y el historial de compras información y cualquier otra información que nos proporcione, como sus intereses e historial educativo. Tenga en cuenta que utilizamos un proveedor externo para procesar pagos en nuestro nombre y no aceptamos pagos directamente a través de nuestros Servicios.</li>
                <li><span class="cyan-text">Información de notas de interacción</span>, incluido el tema de la interacción, la fecha de la interacción, la ubicación de la interacción, las citas, los detalles de la llamada, las notas de la reunión y otra información que proporcione en las notas de una interacción.</li>
                <li><span class="cyan-text">Información de consulta</span>, incluida la información proporcionada en los mensajes personalizados enviados a través de los formularios o la información de contacto proporcionada en nuestro Sitio.</li>
                <li><span class="cyan-text">Información de demostración y redes</span>, incluida la información de contacto, el cargo, el nombre de la empresa, la cantidad de empleados en su empresa y los detalles de la videoconferencia.</li>
                <li><span class="cyan-text">Información de la encuesta</span>, incluida la información proporcionada en cualquier pregunta enviada a través de encuestas o el contenido de cualquier testimonio.</li>
                <li><span class="cyan-text">Información de suscripción</span>, incluyendo su identificación de suscriptor, información de contacto de la cuenta e información relacionada con la transacción.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="py-0">
        <div class="container">
          <div class="row">
            <div class="col-xl-11 mx-auto">
              <h2 class="text-uppercase">INFORMACIÓN PERSONAL RECOGIDA AUTOMÁTICAMENTE</h2>
              <p>Como ocurre con la mayoría de las plataformas digitales, nosotros y nuestros proveedores externos también podemos recopilar Información personal del dispositivo de una persona, acciones de navegación y patrones de uso del sitio automáticamente cuando visitan o interactúan con nuestros Servicios del sitio, que pueden incluir datos de registro (como protocolo de Internet (dirección IP), sistema operativo, tipo de navegador, identificación del navegador, la URL ingresada y la página/campaña de referencia, fecha/hora de la visita, el tiempo dedicado a nuestros Servicios del sitio y cualquier error que pueda ocurrir durante la visita a nuestros Servicios del sitio) , datos analíticos (como la ruta electrónica tomada a nuestro Sitio de Servicios, a través de nuestro Sitio de Servicios y al salir de nuestro Sitio de Servicios, así como el uso y la actividad en nuestro Sitio de Servicios) y datos de ubicación (como la ubicación geográfica general basada en los datos de registro que nosotros o nuestros recopilan los proveedores externos). <br> Nosotros y nuestros proveedores externos podemos usar (i) cookies o pequeños archivos de datos que se almacenan en la computadora de una persona y (ii) otras tecnologías relacionadas, como balizas web, píxeles, scripts integrados, tecnologías de identificación de ubicación y tecnologías de registro. (colectivamente, "cookies") para recopilar automáticamente esta información personal. Por ejemplo, nuestros Servicios utilizan Google Analytics, un servicio de análisis web proporcionado por Google, Inc. ("Google"), para recopilar y ver informes sobre el tráfico en nuestros Servicios. Se puede obtener más información sobre el uso de Google Analytics para estos fines analíticos y no publicitarios visitando la política de privacidad de Google <a href="https://policies.google.com/technologies/partner-sites" class="cyan-text"> aquí </a> y las opciones de exclusión actualmente disponibles de Google están disponibles <a href="https://tools.google.com/dlpage/gaoptout" class="cyan-text"> aquí</a>. <br> Para administrar las cookies, una persona puede cambiar la configuración de su navegador para: (i) notificarle cuando recibe una cookie, para que la persona pueda elegir si la acepta o no; (ii) deshabilitar las cookies existentes; o (iii) rechazar automáticamente las cookies. Tenga en cuenta que hacerlo puede afectar negativamente la experiencia de una persona al usar nuestros Servicios, ya que algunas funciones y ofertas pueden no funcionar correctamente o no funcionar en absoluto. Según el dispositivo y el sistema operativo de una persona, es posible que la persona no pueda eliminar o bloquear todas las cookies. Además, si una persona desea rechazar las cookies en todos los navegadores y dispositivos, deberá hacerlo en cada navegador en cada dispositivo que utilice activamente. Una persona también puede configurar sus opciones de correo electrónico para evitar la descarga automática de imágenes que pueden contener tecnologías que nos permitirían saber si ha accedido a nuestro correo electrónico y ha realizado ciertas funciones con él. </p>
              <h2 class="text-uppercase">DATOS PERSONALES DE TERCEROS</h2>
              <p class="mb-1">También obtenemos Información Personal de terceros; que a menudo combinamos con la información personal que recopilamos de forma automática o directamente de un individuo.</p>
              <p>Podemos recibir las mismas categorías de información personal que se describen anteriormente de los siguientes terceros:</p>
              <ul class="mt-3 terms-list regular">
                <li><span class="cyan-text">Su empleador/empresa: </span> Si su empleador o empresa (incluidos los representantes de su empleador y/o empresa y los titulares de cuentas de administrador) participa en nuestros Servicios, podemos recibir su información de ellos. Si a otro usuario se le ha proporcionado acceso a su cuenta a través del modo delegado o asistente, es posible que recibamos su información de ellos. También podemos recibir su información de los miembros del equipo de su empresa y colegas del departamento.</li>
                <li><span class="cyan-text">Otros Usuarios de nuestros Servicios: </span> Si comparte su información con un usuario de nuestros Servicios, como a través de un código QR, un enlace generado por Zibasoft o una tarjeta de presentación física, podemos recibir su información de ellos. También podemos recibir su información de un usuario de nuestros Servicios que ingresa manualmente su información en los Servicios, incluida cualquier información ingresada o compartida en notas de interacción, o que conecta su libreta de direcciones.</li>
                <li><span class="cyan-text">Plataformas de terceros: </span> Cuando una persona conecta una cuenta de plataforma de terceros a nuestros Servicios, podemos recibir cierta información sobre las personas que permiten que la plataforma de terceros comparta con terceros. Por ejemplo, si usted o el titular de la cuenta de administrador conectan su cuenta de Google, Outlook o Salesforce a nuestros Servicios, podemos recibir su información, como información de contacto, información de empleo, datos de reuniones, su libreta de direcciones y datos de calendario.</li>
                <li><span class="cyan-text">Redes sociales: </span> Cuando una persona interactúa con nuestros Servicios a través de varias redes sociales, como cuando alguien pone "Me gusta" en Facebook o nos sigue o comparte nuestro contenido en Google, Facebook, Twitter u otras redes sociales, podemos recibir información sobre personas que permiten que la red social comparta con terceros. Los datos que recibimos dependen de la configuración de privacidad de un individuo con la red social. Las personas siempre deben revisar y, si es necesario, ajustar su configuración de privacidad en sitios web de terceros y redes y servicios de medios sociales antes de compartir información y/o vincularlos o conectarlos a otros servicios.</li>
                <li><span class="cyan-text">Proveedores de servicio: </span> Nuestros proveedores de servicios que realizan servicios únicamente en nuestro nombre, como proveedores de encuestas y marketing, recopilan información personal y, a menudo, comparten parte o la totalidad de esta información con nosotros. </li>
                <li><span class="cyan-text">Proveedores de información: </span> Es posible que de vez en cuando obtengamos información de terceros proveedores de información para corregir o complementar la información personal que recopilamos. Por ejemplo, podemos obtener información de contacto actualizada de proveedores de información externos para volver a conectarnos con una persona.</li>
                <li><span class="cyan-text">Fuentes disponibles públicamente: </span> Recopilamos información personal sobre personas que de otro modo no tenemos, como información de contacto, información de fuentes de noticias, información relacionada con el empleo e información de interés en los servicios, de fuentes disponibles públicamente. Podemos combinar esta información con la información que recopilamos directamente de un individuo. Usamos esta información para contactar a las personas, para actualizar a los usuarios sobre sus contactos en las noticias, para enviar publicidad o materiales promocionales o para personalizar nuestros Servicios y para comprender mejor la demografía de las personas con las que interactuamos.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="py-0">
        <div class="container">
          <div class="row">
            <div class="col-xl-11 mx-auto">
              <h2 class="text-uppercase">NUESTRO USO DE INFORMACIÓN PERSONAL</h2>
              <p>Utilizamos la información personal que recopilamos para: </p>
              <ul class="mt-2 regular">
                <li>Cumplir o satisfacer el motivo por el cual se proporcionó la información, como cumplir con nuestras obligaciones contractuales, brindar los Servicios que ha solicitado y procesar transacciones;</li>
                <li>Administrar nuestra organización y sus operaciones diarias; </li>
                <li>Comunicarse con personas, incluso por correo electrónico, mensajes de texto, redes sociales y/o llamadas telefónicas;</li>
                <li>Solicite a las personas que completen encuestas sobre nuestra organización, las organizaciones con las que nos asociamos y los servicios; </li>
                <li>Facilitar y proporcionar nuestros Servicios y demostraciones de productos;</li>
                <li>Comercializar nuestros Servicios a individuos, incluso a través de correo electrónico, correo directo, teléfono o mensaje de texto;</li>
                <li>Administrar, mejorar y personalizar nuestros Servicios, incluso reconociendo a una persona y recordando su información cuando regresa a nuestros Servicios;</li>
                <li>Procesar el pago de nuestros Servicios; </li>
                <li>Facilitar los beneficios y servicios para el cliente, incluida la atención al cliente a través de nuestros servicios de centro de comando; </li>
                <li>Identificar y analizar cómo las personas usan nuestro Sitio y Servicios;</li>
                <li>Llevar a cabo investigaciones y análisis sobre nuestra base de clientes y nuestros Servicios;</li>
                <li>Mejorar y personalizar nuestros Servicios para abordar las necesidades e intereses de nuestra base de clientes y otras personas con las que interactuamos;</li>
                <li>Probar, mejorar, actualizar y monitorear los Servicios, o diagnosticar o solucionar problemas tecnológicos; </li>
                <li>Ayudar a mantener la seguridad, la protección y la integridad de nuestra propiedad y Servicios, activos tecnológicos y negocios;</li>
                <li>Defender, proteger o hacer cumplir nuestros derechos o los contratos y acuerdos aplicables;</li>
                <li>Prevenir, investigar o dar aviso de fraude o actividad ilegal o delictiva; y</li>
                <li>Cumplir con las obligaciones legales. </li>
              </ul>
              <p>Cuando una persona decide ponerse en contacto con nosotros, es posible que necesitemos información adicional para cumplir con la solicitud o responder a las consultas. Podemos proporcionar divulgaciones de privacidad adicionales cuando el alcance de la consulta/solicitud y/o la Información personal que requerimos queden fuera del alcance de este Aviso de privacidad. En ese caso, las divulgaciones de privacidad adicionales regirán cómo podemos procesar la información proporcionada en ese momento.</p>
              <h2 class="text-uppercase">NUESTRA DIVULGACIÓN DE INFORMACIÓN PERSONAL</h2>
              <p>Divulgamos información personal de las siguientes maneras:</p>
              <ul class="mt-3 terms-list regular">
                <li><span class="cyan-text">Afiliados. </span> Podemos compartir información personal con otras empresas de propiedad o bajo el control de Zibasoft, y otras empresas de propiedad o bajo propiedad común como Zibasoft, lo que también incluye nuestras subsidiarias (es decir, cualquier organización que poseemos o controlamos) o nuestra sociedad de cartera final (es decir, cualquier organización que nos posee o nos controla) y cualquier subsidiaria de su propiedad, particularmente cuando colaboramos en la prestación de los Servicios.</li>
                <li><span class="cyan-text">Su empleador/empresa: </span> Si su empleador o empresa (incluidos los representantes de su empleador y/o empresa y los titulares de cuentas de administrador) participa en nuestros Servicios, podemos divulgarles su información. Si a una persona se le ha proporcionado acceso a su cuenta a través del modo de asistente, podemos revelarle su información. También podemos divulgar su información a los miembros del equipo de su empresa y colegas del departamento.</li>
                <li><span class="cyan-text">Otros Usuarios de nuestros Servicios: </span> Si comparte su información con un usuario de nuestros Servicios, como a través de un código QR, un enlace generado por Zibasoft o una tarjeta de presentación física, podemos divulgarles su información. También podemos divulgar su información a un usuario de nuestros Servicios que recibe su información de otros usuarios de los Servicios, como cualquier información ingresada o compartida en notas de interacción.</li>
                <li><span class="cyan-text">Proveedores de encuestas: </span> Compartimos información personal con terceros que nos ayudan a entregar nuestras ofertas de encuestas y procesar las respuestas.</li>
                <li><span class="cyan-text">Proveedores de marketing: </span> Coordinamos y compartimos información personal con nuestros proveedores de marketing para comunicarnos con las personas sobre los servicios que ponemos a su disposición.</li>
                <li><span class="cyan-text">Proveedores de servicios de atención al cliente y comunicaciones: </span> Compartimos información personal con terceros que nos ayudan a brindar nuestros servicios al cliente y facilitar nuestras comunicaciones con las personas que envían consultas. </li>
                <li><span class="cyan-text">Otros proveedores de servicios: </span> Además de los terceros identificados anteriormente, contratamos a otros proveedores de servicios externos que realizan servicios comerciales u operativos para nosotros o en nuestro nombre, como alojamiento de sitios web, aprovisionamiento de infraestructura, servicios de TI, servicios de análisis, servicios administrativos.</li>
                <li><span class="cyan-text">Otros asuntos según sea necesario para prestar servicios: </span> Podemos compartir información personal con terceros con los que una persona interactúa a través de nuestros Servicios o según sea necesario para cumplir con una solicitud o transacción, incluidos, por ejemplo, servicios de procesamiento de pagos.</li>
                <li><span class="cyan-text">Transacción Comercial o Reorganización: </span> Podemos participar o estar involucrados en una transacción comercial corporativa, como una fusión, adquisición, empresa conjunta o financiación o venta de activos de la empresa. Podemos divulgar información personal a un tercero durante la negociación, en relación con o como un activo en dicha transacción comercial corporativa. La información personal también puede divulgarse en caso de insolvencia, quiebra o administración judicial.</li>
                <li>
                  <span class="cyan-text">
                    Obligaciones y Derechos Legales: </span> Podemos divulgar información personal a terceros, como asesores legales y agentes del orden:
                  <ul>
                    <li>en relación con el establecimiento, ejercicio o defensa de reclamaciones legales; </li>
                    <li>para cumplir con las leyes o para responder a solicitudes legales y procesos legales;</li>
                    <li>para proteger nuestros derechos y propiedad y los derechos y propiedad de otros, incluso para hacer cumplir nuestros acuerdos y políticas;</li>
                    <li>para detectar, suprimir o prevenir el fraude; </li>
                    <li>para proteger nuestra salud y seguridad y la de otros; o </li>
                    <li>según lo requiera la ley aplicable.</li>
                  </ul>
                </li>
                <li><span class="cyan-text">De lo contrario con consentimiento o dirección: </span> Podemos divulgar información personal sobre un individuo a ciertos terceros o públicamente con su consentimiento o dirección. Por ejemplo, con el consentimiento o la dirección de una persona, podemos publicar su testimonio en nuestro Sitio o publicaciones relacionadas con el servicio. </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="py-0">
        <div class="container">
          <div class="row">
            <div class="col-xl-11 mx-auto">
              <h2 class="text-uppercase">INFORMACIÓN PERSONAL DE LOS NIÑOS</h2>
              <p>Nuestros Servicios no están dirigidos a niños menores de 13 años, y no tenemos la intención de recopilarlos ni solicitarlos a sabiendas, Información personal. Si una persona es menor de 13 años, no debe usar nuestros Servicios ni proporcionarnos con cualquier Información personal, ya sea directamente o por otros medios. Si un niño menor de 13 años nos ha proporcionado información personal, recomendamos a los padres o tutores del niño que se comuniquen con nosotros para solicitar que eliminemos la información personal de nuestros sistemas. Si nos enteramos de que cualquier Información personal que recopilamos ha sido proporcionada por un niño menor de 13 años, eliminaremos de inmediato esa Información personal.</p>
              <h2 class="text-uppercase">ENLACES A SITIOS WEB O SERVICIOS DE TERCEROS</h2>
              <p>Nuestro Sitio y Servicios pueden incluir enlaces a sitios web, complementos y aplicaciones de terceros. Excepto cuando publiquemos, enlacemos o adoptemos o hagamos referencia expresa a este Aviso de privacidad, este Aviso de privacidad no se aplica y no somos responsables de ninguna práctica de información personal de sitios web y servicios en línea de terceros o las prácticas de otros terceros. fiestas. Para conocer las prácticas de información personal de terceros, visite sus respectivos avisos de privacidad. </p>
            </div>
          </div>
        </div>
      </section>
      <section class="pt-0 pb-md-5 pb-4">
        <div class="container">
          <div class="row">
            <div class="col-xl-11 mx-auto">
              <h2 class="mt-3 m-grey-text text-uppercase">ACTUALIZACIONES A ESTE AVISO DE PRIVACIDAD</h2>
              <p class="mt-3 grey-text regular">Actualizaremos este Aviso de Privacidad de vez en cuando. Cuando hagamos cambios a este Aviso de privacidad, cambiaremos la fecha al comienzo de este Aviso de privacidad. Si realizamos cambios sustanciales en este Aviso de privacidad, notificaremos a las personas por correo electrónico a su dirección de correo electrónico registrada, mediante una publicación destacada en este Sitio o nuestros Servicios, o a través de otros canales de comunicación apropiados. Todos los cambios serán efectivos a partir de la fecha de publicación a menos que se indique lo contrario.</p>
              <h2 class="mt-3 m-grey-text text-uppercase">CONTÁCTENOS</h2>
              <p class="mt-3 grey-text regular">Si tiene alguna pregunta o solicitud en relación con este Aviso de privacidad u otros asuntos relacionados con la privacidad, envíe un correo electrónico a support@zibasoft.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="py-5 bg-dark text-white">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" md="6" sm="6">
            <h6>@ 2022 powered with <b-icon-heart></b-icon-heart> by <a target="_blank" href="https://www.zibasoft.com/">Zibasoft</a></h6>
          </b-col>
          <b-col cols="12" lg="6" md="6" sm="6">
            <div class="clearfix">
              <h6 class="float-lg-right float-md-right">
                <router-link :to="{ name: 'privacy' } ">Política de privacidad</router-link>
              </h6>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <a-back-top id="toTop">
      <b-icon-chevron-up></b-icon-chevron-up>
    </a-back-top>
  </main>
</template>
<script>
  import { getServerFile } from '@/libs/util'
  import { registerCustomer, postOrder, getProduct } from '@/api/data'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import { BIconPlayFill, BIconArrowRight, BIconGithub, BIconGlobe } from 'bootstrap-vue'
  import RegisterForm from '../single-page/home/components/register'
  import Login from '../single-page/home/components/login'

  export default {
    name: 'Privacy',
    components: {
      BIconPlayFill,
      BIconArrowRight,
      BIconGithub,
      BIconGlobe,
      RegisterForm,
      Login
    },
    computed: {
      ...mapGetters([
        'hasToken',
        'settings',
        'getUser'
      ]),
      User() {
        return this.getUser || {}
      },
      appName() {
        return this.settings?.COMPANY_NAME
      },
      appImage() {
        return getServerFile('public/company/company_logo.png')
      },
      site() {
        return `${location.protocol}//${location.host}`
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut',
        'handleLogin'
      ]),
      dispachLogout() {
        this.handleLogOut()
      }
    },
}
</script>
<style lang="scss">
  .home-page.privacy {
    &.box_list .wrapper {
      margin-top: 0 !important;
      padding-top: 30px !important;
    }
  }

  .home-page.privacy {
    .navbar {
      min-height: 100px;
    }

    @media only screen and (max-width: 450px) {
      .navbar {
        padding: 0.5rem 1rem !important;

        .navbar-brand {
          max-width: 50%;
        }
      }
    }

    &.bg-hero {
      padding-top: 0px !important;
      padding-bottom: 0px;
      margin-top: 0 !important;
      min-height: 100%;
    }

    .grey-text {
      color: #666;
    }

    .cyan-text {
      color: #30a2ae;
    }

    .regular {
      font-weight: 500 !important;
    }
}
</style>