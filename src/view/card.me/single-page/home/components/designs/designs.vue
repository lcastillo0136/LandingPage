<template>
  <div class="design-container" id="designs">
    <h2 class="text-center mt-3 d-none d-md-block ">Fabulosos diseños</h2>
    <div class="d-md-none">
      <h2 class="text-center mt-3">Fabulosos diseños</h2>
      <a-carousel class="design-list" draggable :slidesToShow="slidesToShow" :centerMode="true" arrows id="designs">
        <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow"></div>
        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 0"></div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-1.png" />
          </div>
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-2.png" />
          </div>
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-3.png" />
          </div>
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-4.png" />
          </div>
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-5.png" />
          </div>
        </div>
      </a-carousel>
    </div>
    <div class="d-none d-md-block floating-hand-container">
      <img src="/img/phone-in-hand.png" class="floating-hand" draggable="false" />
      <!-- <img src="/img/designs/design-1.png" class="selected-design" /> -->
      <a-carousel class="design-list" draggable :slidesToShow="3" :centerMode="true" arrows id="designs">
        <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow">
          <img src="/img/carousel-arrow.png" class="" />
        </div>
        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 0">
          <img src="/img/carousel-arrow.png" class="" />
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-1.png" />
          </div>
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-2.png" />
          </div>
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-3.png" />
          </div>
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-4.png" />
          </div>
        </div>
        <div class="design-card">
          <div>
            <img src="/img/designs/design-5.png" />
          </div>
        </div>
      </a-carousel>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'designs',
    data() {
      return {
        slidesToShow: 1
      }
    },
    computed: {
      // slidesToShow() {
      //   return this._slidesToShow
      // }
    },
    beforeMount() {

    }
  }
</script>
<style lang="scss">
  .design-list {
    &.ant-carousel .slick-slide {
      overflow: hidden;
      transform: scale(0.85);
      transition: transform 125ms linear;
      user-select: none;
      &.slick-current {
        transform: scale(1);
      }
      img {
        max-width: 100%;
      }
    }

    &.ant-carousel .slick-slide h3 {
      color: #fff;
    }

    .design-card > div {
      background: #fff;
      height: auto;
      text-align: center;
      margin: 15px;
      border-radius: 7px;
      position: relative;
      margin-bottom: 35px;
      width: 220px;
      max-width: 90%;
      &::after {
        content: "";
        position: absolute;
        bottom: -12px;
        background: #bdbdbd;
        width: 90%;
        height: 3px;
        border-radius: 50%;
        filter: blur(3px);
        left: 5%;
      }
    }

    .custom-slick-arrow.slick-arrow {
      z-index: 1;
      height: 273px;
      top: 21px;
      width: 60px;
    }

    .design-card {
      display: flex !important;
      justify-content: center;
    }
  }

  .design-container {
    position: relative;
    height: 684px;
    display: flex;
    flex-direction: column;
    
    .floating-hand-container {
      width: 100%;
      .floating-hand {
        position: absolute;
        width: 500px;
        bottom: 0px;
        z-index: 10;
        right: 50%;
        transform: translateX(345px);
      }
      .selected-design {
        position: absolute;
        right: 296px;
        top: 46px;
        width: 204px;
      }
      .design-list {
        max-width: 976px;
        /* position: absolute; */
        margin-left: auto;
        margin-right: auto;
        margin-top: 31px;
        .slick-slide {
          .design-card > div {
            width: 203px;
            max-height: 437px;
            overflow: hidden;
            &::after {
              bottom: 0px;
              width: 100%;
              left: 0;
              box-shadow: 0px 0px 12px -2px #ededed;
            }
          }
        }
        .custom-slick-arrow {
          z-index: 1;
          height: 70px;
          top: 50%;
          width: 70px;
          transform: translateY(-50%);
          left: 0;
          &.slick-next {
            transform: translateY(-50%) rotate(180deg);
            left: auto;
            right: 0;
          }
        }
        .slick-list::after {
          position: absolute;
          bottom: 0;
          height: 100%;
          width: 100%;
          content: "";
          background: linear-gradient(to left, #fff 0%, #fff0 36% );
          pointer-events: none;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .slick-list::before {
          position: absolute;
          bottom: 0;
          height: 100%;
          width: 100%;
          content: "";
          background: linear-gradient(to right, #fff 0%, #fff0 36% );
          pointer-events: none;
          z-index: 999;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          left: 0;
        }
      }
    }

    .design-carousel-container {
      display: inline-block;
      width: 500px;
      flex: 1 1 auto;
    }

    @media only screen and (max-width: 720px) { 
      height: auto;
    }
  }
</style>