<template>
  <div class="mission-vision-section">
    <a-carousel autoplay>
      <div class="u-palette-1-light-3 u-radius-10 u-shape-round">
        <h4 class="u-text u-text-1">Quienes Somos</h4>
        <p class="u- u-heading-font u-text u-text-2">Somos una empresa de tecnologías orgullosamente mexicana fundada en Monterrey N. L. en el año 2021 por cinco emprendedores que han unido sus sueños y esfuerzos para materializar un proyecto en el que la principal filosofía es hacer las cosas de manera diferente, siempre por encima de los estándares, trabajando de forma inteligente y eficiente, innovando y buscando siempre la generación de valor.</p>
      </div>
      <div>
        <div class="u-palette-1-light-3 u-radius-10 u-shape-round">
          <h4 class="u-align-center u-text u-text-1">Nuestra misión</h4>
          <p class="u-align-justify u- u-heading-font u-text u-text-2">Nuestra misión como empresa es contribuir a hacer vidas más felices, entregando nuestro máximo esfuerzo y colaboración al desarrollo sustentable de nuestro entorno, colaboradores, sociedad, medio ambiente, gobierno, clientes y proveedores con el único fin de crear un mundo mejor.&nbsp;</p>
        </div>
      </div>
      <div>
        <div class="u-palette-1-light-3 u-radius-10 u-shape-round">
          <h4 class="u-text u-text-1">Nuestra Visión</h4>
          <p class=" u-heading-font u-text u-text-2">Ser reconocidos por nuestros clientes como una empresa con liderazgo y calidad en el desarrollo de aplicaciones.</p>
        </div>
      </div>
      <div>
        <div class="u-palette-1-light-3 u-radius-10 u-shape-round">
          <h4 class="u-text u-text-1">Nuestros Valores</h4>
          <p>
            <ul class="u-text u-text-2">
              <li>Buscamos siempre cumplir nuestra misión como empresa <b>comprometidos</b> con nuestro trabajo. </li>
              <li>Hacemos las cosas siempre con la mejor <b>calidad</b> desarrollando nuestro talento y habilidades. </li>
              <li>Buscamos generar ambiente de <b>confianza</b> con nuestros colaboradores, clientes y proveedores. </li> 
              <li>Entendemos que el <b>trabajo en equipo</b> es fundamental para nuestro desarrollo. </li>
              <li>Sentimos <b>responsabilidad</b> por nuestra empresa, nuestra sociedad y nuestro medio ambiente </li>
              <li>Consideramos la <b>honestidad</b> como uno de nuestros valores universales más importantes. </li> 
              <li>Nuestra <b>dedicación, perseverancia y constancia</b> nos ayudan a alcanzar las metas </li> 
              <li>Trabajamos con <b>disciplina</b> alineada a nuestros objetivos y generando valor. </li>
              <li>Creemos que el <b>respeto</b> es fundamental en las relaciones humanas.</li>
            </ul>
          </p>
        </div>
      </div>
    </a-carousel>
</div>
</template>
<script>
  export default {
    name: 'MisisonVision'
  }
</script>
<style lang="scss">
  .mission-vision-section {
    background-color: #5595e8;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .ant-carousel {
      background-color: #5595e8;
      max-width: 900px;
      overflow: hidden;
      .slick-slide {
        text-align: center;
        background-color: #5595e8;
        padding: 30px;
      }
    }

    .ant-carousel .slick-slide h3 {
      color: #fff;
    }
    .u-text-1 {
      margin: 0;
    }
    .u-text-2 {
      font-size: 1.25rem;
      font-style: italic;
      margin: 22px 0 0;
    }
    ul.u-text-2 {
      list-style: circle;
      text-align: left;
      max-width: 70%;
      margin: 0 auto;
      font-size: 16px;
      font-style: normal;
    }
    .u-palette-1-light-3 {
      padding: 30px;
    }
  }
</style>