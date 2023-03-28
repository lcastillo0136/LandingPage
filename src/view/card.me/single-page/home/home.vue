<template>
  <main class="home-page landing">
    <Header></Header>
    
    <section class="pb-4 bg-hero">
      <b-container class="pt-5 overflow-hidden text-center text-sm-left">
        <b-row>
          <b-col cols="12" lg="6" md="12" sm="12">
            <h1>
              Tarjeta de<br class="d-none d-sm-linear" />
              presentación <br class="d-none d-sm-linear" />
              digital
            </h1>
            <svg
              class="my-5 d-none d-md-block"
              width="487"
              height="34"
              viewBox="0 0 487 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 30C73.6307 10.3798 266.914 -17.0885 483 30"
                stroke="#54BD95"
                stroke-width="8"
                stroke-linecap="round"
              />
            </svg>
            <div class="d-block d-md-none py-1">
              
            </div>
            <div class="hero-description mt-3">
              Comparte tu tarjeta digital sin limites por medio de tu QR
              <br />
              ¡Somos la tarjeta digital del futuro!.
              <br />
              <div class="icons-list mb-4">
                <b-icon-whatsapp></b-icon-whatsapp>
                <b-icon-instagram></b-icon-instagram>
                <b-icon-facebook></b-icon-facebook>
                <b-icon-twitter></b-icon-twitter>
                <b-icon-envelope></b-icon-envelope>
              </div>
            </div>
            <div class="d-block d-md-none py-2">
              
            </div>
          </b-col>
          <br class="d-none d-sm-block" />
          <b-col cols="12" lg="6" md="12" sm="12" v-if="companyCard">
            <!-- <b-img
              alt="hero image"
              class="img-fluid"
              :src="require(`@/assets/img/hero-img.png`)"
            ></b-img> -->
            <CardPage ref="previewCard" :user="companyCard" :homeView="true"></CardPage>
          </b-col>
        </b-row>
      </b-container>
    </section>
    
    <Designs></Designs>

    <section class="bg-green-light py-5">
      <b-container class="overflow-hidden">
        <b-row>
          <b-col cols="12" lg="12" md="12" sm="12" class="mt-sm-5">
            <h2>Increibles beneficios</h2>
            <div class="d-flex flex-row">
              <div class="d-flex flex-column">
                <div class="d-flex flex-row mt-4">
                  <div class="d-flex align-items-start">
                    <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_d_0_1)"><rect x="9" y="5" width="60" height="60" fill="white"></rect></g>
                      <g transform="matrix(0.15 0 0 0.15 22 18)" >
                       <path style="fill: #54BD95;" d="M 175.897 141.476 C 162.64801 141.476 150.787 147.52 142.917 156.994 L 142.917 156.994 L 91.72301 127.928 C 93.31501 123.448 94.19001 118.631004 94.19001 113.611 C 94.19001 108.592 93.31501 103.775 91.72301 99.295 L 91.72301 99.295 L 142.91301 70.222 C 150.78201 79.699 162.645 85.745 175.895 85.745 C 199.529 85.745 218.757 66.51 218.757 42.866 C 218.759 19.229 199.531 0 175.897 0 C 152.26 0 133.03 19.229 133.03 42.865 C 133.03 47.885002 133.90399 52.703003 135.497 57.184002 L 135.497 57.184002 L 84.304 86.258 C 76.435 76.786 64.575 70.744 51.329002 70.744 C 27.689003 70.744 8.456001 89.97301 8.456001 113.61 C 8.456001 137.246 27.689001 156.475 51.329002 156.475 C 64.575005 156.475 76.434006 150.43301 84.303 140.962 L 84.303 140.962 L 135.49701 170.029 C 133.904 174.51001 133.029 179.32901 133.029 184.35 C 133.029 207.98601 152.259 227.21501 175.89601 227.21501 C 199.53001 227.21501 218.75801 207.98502 218.75801 184.35 C 218.759 160.71 199.531 141.476 175.897 141.476 z M 175.897 15 C 191.26001 15 203.759 27.5 203.759 42.864998 C 203.759 58.238 191.26001 70.743996 175.897 70.743996 C 160.531 70.743996 148.03 58.237995 148.03 42.864998 C 148.03 27.5 160.531 15 175.897 15 z M 51.33 141.476 C 35.961002 141.476 23.457003 128.97499 23.457003 113.611 C 23.457003 98.245 35.961002 85.745 51.33 85.745 C 66.693 85.745 79.191 98.245 79.191 113.611 C 79.191 128.975 66.692 141.476 51.33 141.476 z M 175.897 212.216 C 160.531 212.216 148.03 199.715 148.03 184.351 C 148.03 168.981 160.531 156.476 175.897 156.476 C 191.26001 156.476 203.759 168.981 203.759 184.351 C 203.759 199.715 191.26 212.216 175.897 212.216 z" stroke-linecap="round" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h5>Comparte</h5>
                    <p class="text-muted">
                      Comparte facilmente en Whatsapp, Facebook, Instagram y TikTok.
                    </p>
                  </div>
                </div>
                <div class="d-flex flex-row mt-4">
                  <div class="d-flex align-items-start">
                    <svg
                      width="78"
                      height="78"
                      viewBox="0 0 78 78"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_0_1)">
                        <rect x="9" y="5" width="60" height="60" fill="white" />
                      </g>
                      
                      <g transform="matrix(0.05 0 0 0.05 13 10)">
                        <path style="fill: #54bd95;" d="M 737.673809 863.903745 L 737.673809 800.13335 L 672.503531 800.13335 L 672.503531 863.949794 Z M 834.943157 863.949794 C 850.8975240000001 863.949794 863.949794 850.8965 863.949794 834.943157 L 863.949794 800.1343730000001 L 801.488207 800.1343730000001 L 801.488207 863.9037450000001 M 415.311891 223.865627 L 415.311891 415.312914 L 223.864604 415.312914 L 223.864604 223.865627 L 415.311891 223.865627 M 450.120674 160.050206 L 189.05582 160.050206 C 173.10247600000002 160.050206 160.049183 173.1035 160.049183 189.05684300000001 L 160.049183 450.120674 C 160.049183 466.075041 173.102477 479.127311 189.05582 479.127311 L 450.119651 479.127311 C 466.072995 479.127311 479.126288 466.074017 479.126288 450.120674 L 479.126288 189.056843 C 479.127312 173.1035 466.074018 160.050206 450.120674 160.050206 L 450.120674 160.050206 z M 319.588759 319.589782 M 287.681048 319.589782 C 287.681048 337.2119239111659 301.9666165888341 351.4974925 319.5887585 351.4974925 C 337.2109004111659 351.4974925 351.496469 337.2119239111659 351.496469 319.589782 C 351.496469 301.9676400888341 337.2109004111659 287.6820715 319.5887585 287.6820715 C 301.9666165888341 287.6820715 287.681048 301.9676400888341 287.681048 319.589782 Z M 800.134373 223.865627 L 800.134373 415.312914 L 608.688109 415.312914 L 608.688109 223.865627 L 800.134373 223.865627 M 834.943157 160.050206 L 573.879326 160.050206 C 557.924959 160.050206 544.872689 173.1035 544.872689 189.05684300000001 L 544.872689 450.120674 C 544.872689 466.075041 557.9259830000001 479.127311 573.879326 479.127311 L 834.9431569999999 479.127311 C 850.897524 479.127311 863.9497939999999 466.074017 863.9497939999999 450.120674 L 863.949794 189.056843 C 863.950817 173.1035 850.897523 160.050206 834.943157 160.050206 L 834.943157 160.050206 z M 704.411241 319.589782 M 672.5035300000001 319.589782 C 672.5035300000001 337.2119239111659 686.7890985888342 351.4974925 704.4112405000001 351.4974925 C 722.0333824111659 351.4974925 736.3189510000001 337.2119239111659 736.3189510000001 319.589782 C 736.3189510000001 301.9676400888341 722.0333824111659 287.6820715 704.4112405000001 287.6820715 C 686.7890985888342 287.6820715 672.5035300000001 301.9676400888341 672.5035300000001 319.589782 Z M 415.311891 608.687086 L 415.311891 800.134373 L 223.864604 800.134373 L 223.864604 608.687086 L 415.311891 608.687086 M 450.120674 544.871665 L 189.05582 544.871665 C 173.10247600000002 544.871665 160.049183 557.9249590000001 160.049183 573.878302 L 160.049183 834.942133 C 160.049183 850.8965000000001 173.102477 863.94877 189.05582 863.94877 L 450.119651 863.94877 C 466.07401799999997 863.94877 479.126288 850.8954759999999 479.126288 834.942133 L 479.126288 573.878303 C 479.127312 557.924959 466.074018 544.871665 450.120674 544.871665 L 450.120674 544.871665 z M 319.588759 704.410218 M 287.681048 704.410218 C 287.681048 722.0323599111658 301.9666165888341 736.3179285 319.5887585 736.3179285 C 337.2109004111659 736.3179285 351.496469 722.0323599111658 351.496469 704.410218 C 351.496469 686.7880760888341 337.2109004111659 672.5025075 319.5887585 672.5025075 C 301.9666165888341 672.5025075 287.681048 686.7880760888341 287.681048 704.410218 Z M 834.943157 544.871665 L 799.363824 544.871665 L 799.363824 672.502507 L 735.548403 672.502507 L 735.548402 544.871665 L 573.879326 544.871665 C 557.924959 544.871665 544.872689 557.9249590000001 544.872689 573.878302 L 544.872689 834.942133 C 544.872689 850.8965000000001 557.9259830000001 863.94877 573.879326 863.94877 L 608.68811 863.94877 L 608.68811 800.133349 L 608.68811 736.3179279999999 L 608.68811 672.5025069999999 L 672.5035310000001 672.5025069999999 L 672.5035310000001 736.3179279999999 L 863.950817 736.317928 L 863.950817 573.8783020000001 C 863.950817 557.924959 850.897523 544.871665 834.943157 544.871665 z" stroke-linecap="round" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h5>Codigo QR</h5>
                    <p class="text-muted">
                      Generacion automatica de tu codigo QR personalizado.
                    </p>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column">
                <div class="d-flex flex-row mt-4">
                  <div class="d-flex align-items-start">
                    <svg
                      width="78"
                      height="78"
                      viewBox="0 0 78 78"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_0_1)">
                        <rect x="9" y="5" width="60" height="60" fill="white" />
                      </g>

                      <g transform="matrix(0.05 0 0 0.05 13 10)"  >
                        <path style="fill: #54bd95;" d="M 451.84 326.826667 C 451.84 326.826667 477.44 315.306667 493.653333 333.653333 C 509.86666599999995 352.42666599999995 551.253333 424.10666599999996 551.253333 495.78666699999997 C 551.253333 567.4666669999999 533.333333 643.8399999999999 514.133333 669.013333 C 495.78666599999997 694.613333 477.44 694.613333 463.36 685.226667 C 449.70666700000004 676.266667 234.66666700000002 512 223.146667 507.30666700000006 C 211.20000000000002 502.61333400000007 206.933334 514.1333340000001 218.45333300000001 576 C 229.97333300000003 640 211.20000000000002 657.493333 194.986667 660.053333 C 179.20000000000002 661.3333329999999 130.56 648.533333 128 518.8266669999999 C 125.866667 389.54666699999996 160.426667 368.63999999999993 176.64 368.63999999999993 C 206.93333299999998 368.63999999999993 438.186667 576 453.97333299999997 574.293333 C 468.05333299999995 572.16 474.88 484.266666 447.99999999999994 414.71999999999997 C 417.28 339.626667 451.8399999999999 326.826667 451.8399999999999 326.826667 M 823.4666669999999 197.54666699999999 C 901.12 351.573333 896 497.493333 896 512 C 896 526.506667 901.12 672.426667 823.466667 826.4533329999999 C 823.466667 826.4533329999999 803.4133340000001 849.92 773.12 835.8399999999999 C 743.253333 821.7599999999999 753.493333 785.0666669999999 753.493333 785.0666669999999 C 753.493333 785.0666669999999 816.64 663.4666669999999 814.933333 514.133333 L 814.933333 512 C 816.64 362.66666699999996 753.4933329999999 238.933333 753.4933329999999 238.933333 C 753.4933329999999 238.933333 743.2533329999999 202.24 773.1199999999999 188.16 C 803.4133329999999 174.07999999999998 823.4666669999999 197.54666699999999 823.4666669999999 197.54666699999999 M 672.8533329999999 266.66666699999996 C 736.426666 382.29333399999996 732.1599999999999 497.49333399999995 731.306667 512 C 732.16 526.506667 736.426667 636.586667 672.8533329999999 761.6 C 672.8533329999999 761.6 652.8 785.066667 622.5066669999999 770.986667 C 592.6399999999999 756.906667 602.8799999999999 720.213334 602.8799999999999 720.213333 C 602.8799999999999 720.213332 643.8399999999999 661.333333 650.2399999999999 514.133333 L 650.2399999999999 512 C 645.9733329999999 363.946667 602.8799999999999 308.48 602.8799999999999 308.48 C 602.8799999999999 308.48 592.6399999999999 271.36 622.5066669999999 257.70666700000004 C 652.7999999999998 243.62666700000003 672.8533339999999 266.666667 672.8533329999999 266.666667 z" stroke-linecap="round" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h5>NFC</h5>
                    <p class="text-muted">
                      Comparte tu tarjeta digital con una sola tarjeta atravez de la tecnologia NFC.
                    </p>
                  </div>
                </div>
                <div class="d-flex flex-row mt-4">
                  <div class="d-flex align-items-start">
                    <svg
                      width="78"
                      height="78"
                      viewBox="0 0 78 78"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_0_1)">
                        <rect x="9" y="5" width="60" height="60" fill="white" />
                      </g>
                      <path
                        d="M46.5 23.75C45.5054 23.75 44.5516 24.1451 43.8483 24.8483C43.1451 25.5516 42.75 26.5054 42.75 27.5V42.5C42.75 43.4946 43.1451 44.4484 43.8483 45.1517C44.5516 45.8549 45.5054 46.25 46.5 46.25C47.4946 46.25 48.4484 45.8549 49.1517 45.1517C49.8549 44.4484 50.25 43.4946 50.25 42.5C50.25 41.5054 49.8549 40.5516 49.1517 39.8483C48.4484 39.1451 47.4946 38.75 46.5 38.75H31.5C30.5054 38.75 29.5516 39.1451 28.8483 39.8483C28.1451 40.5516 27.75 41.5054 27.75 42.5C27.75 43.4946 28.1451 44.4484 28.8483 45.1517C29.5516 45.8549 30.5054 46.25 31.5 46.25C32.4946 46.25 33.4484 45.8549 34.1517 45.1517C34.8549 44.4484 35.25 43.4946 35.25 42.5V27.5C35.25 26.5054 34.8549 25.5516 34.1517 24.8483C33.4484 24.1451 32.4946 23.75 31.5 23.75C30.5054 23.75 29.5516 24.1451 28.8483 24.8483C28.1451 25.5516 27.75 26.5054 27.75 27.5C27.75 28.4946 28.1451 29.4484 28.8483 30.1517C29.5516 30.8549 30.5054 31.25 31.5 31.25H46.5C47.4946 31.25 48.4484 30.8549 49.1517 30.1517C49.8549 29.4484 50.25 28.4946 50.25 27.5C50.25 26.5054 49.8549 25.5516 49.1517 24.8483C48.4484 24.1451 47.4946 23.75 46.5 23.75Z"
                        stroke="#54BD95"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <filter
                          id="filter0_d_0_1"
                          x="0"
                          y="0"
                          width="78"
                          height="78"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="4" />
                          <feGaussianBlur stdDeviation="4.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_0_1"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_0_1"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <h5>Compromiso</h5>
                    <p class="text-muted">
                      Navegue rápidamente e interactúe con su audiencia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    
    <CreateCard @onRegister="onRegisterCreateCard" :loading="showLoading" ref="CreateCardComponent"></CreateCard>

    <section class="pb-5">
      <b-container class="mt-5">
        <div class="d-flex flex-column">
          <h2 class="mx-auto">
            Nuestros Precios
          </h2>
          <p class="text-muted mx-auto text-700">
            Elija el plan que mejor se adapte a sus necesidades, no dude en contactarnos
          </p>

          <b-row class="mx-lg-5 mt-2">
            <b-col cols="12" lg="4" md="4" sm="12" class="mt-2">
              <b-card class="rounded-lg shadow" no-body>
                <b-card-body class="d-flex flex-column">
                  <div class="text-center flex-fill d-flex flex-column">
                    <h4>¡Gratis!</h4>
                    <p class="text-muted">Atrévete a probar tus superpoderes</p>
                    <span class="d-inline">
                      <div class="money">&#36;0</div>
                    </span>
                    <div class="light-green p-3 justify-content-between mt-4 rounded-lg d-flex flex-column flex-fill">
                      <div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Recibe el primer mes gratis</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Código QR único</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Funcionalidad para compartir</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Función de agregar contacto</span>
                        </div>
                      </div>
                      <b-button :to="{ name: 'register' }" block class="rounded-lg btn-white shadow-sm">
                        Registrate gratis
                      </b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="12" lg="4" md="4" sm="12" class="mt-2">
              <b-card class="rounded-lg primary-card shadow" bg-variant="primary" no-body>
                <b-card-body class="d-flex flex-column">
                  <div class="text-center text-white position-relative flex-fill d-flex flex-column">
                    <h4>Anualidad</h4>
                    <p>
                      Extiende el poder
                    </p>
                    <span class="d-inline">
                      <div class="money">&#36;10 USD</div>
                    </span>
                    <div class="bg-white p-3 justify-content-between mt-4 rounded-lg d-flex flex-column flex-fill">
                      <div class="text-black">
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Recibe primer mes gratis</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Recibe 1 año de servicio</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Código QR único</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Funcionalidad para compartir</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Función de agregar contacto</span>
                        </div>
                      </div>
                      <b-button :to="{ name: 'register' }" block variant="primary text-white" class="rounded-lg">
                        Registrate ahora
                      </b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-card>
            </b-col>
            <b-col cols="12" lg="4" md="4" sm="12" class="mt-2">
              <b-card class="rounded-lg shadow" no-body>
                <b-card-body class="d-flex flex-column">
                  <div class="text-center flex-fill d-flex flex-column">
                    <h4>Negocio</h4>
                    <p class="text-muted mb-1">Revela nuevos superpoderes</p>
                    <span class="d-inline">
                      <div class="money">
                        <small class="fs-30 text-muted">Próximamente</small>
                      </div>
                    </span>
                    <div class="light-green p-3 justify-content-between mt-4 rounded-lg d-flex flex-column flex-fill">
                      <div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>

                          <span class="ml-2">Registra a tus socios</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>

                          <span class="ml-2">Diseño personalizado</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Código QR para cada socio</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Funcionalidad para compartir</span>
                        </div>
                        <div class="d-flex flex-row my-3 align-items-center">
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM12.8355 16.2959L17.8779 11.0959L16.4421 9.70358L12.0894 14.1923L9.5295 11.7554L8.15054 13.204L11.4281 16.324L12.1458 17.0072L12.8355 16.2959Z"
                              fill="#54BD95"
                            />
                          </svg>
                          <span class="ml-2">Función de agregar contacto</span>
                        </div>
                      </div>
                      <b-button :to="{ name: 'contacts' }" block class="rounded-lg btn-white shadow-sm">Contacto</b-button>
                    </div>
                  </div>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <section class="bg-dark text-white pt-5 pb-4">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" sm="12" md="6">
            <h2>La gente está hablando de esto</h2>
            <p>
              Proteger el medio ambiente reduciendo el consumo de plástico y papel
            </p>
            <div class="d-flex flex-column mt-5 pt-4">
              <h3>Viraliza tu contenido</h3>
              Comparte y deja que otros compartan tu tarjeta en cualquier red social con un solo clic.
            </div>
          </b-col>
          <b-col cols="12" lg="6" sm="12" md="6">
            <b-card bg-variant="monocrhome" class="px-lg-5 pb-lg-5">
              <a-form-model class="register-form validate-form" ref="registerForm" :rules="rules" :model="form">
                <div class="d-flex flex-column">
                  <div class="d-flex mx-auto mb-4">
                    <img src="/img/logo-footer.svg" style="max-height: 100px;max-width: 100%;"/>
                  </div>

                  <div>
                    <a-form-model-item prop="first_name" label="Nombre">
                      <a-input type="text" class="" placeholder="Nombre" v-model="form.first_name" size="large" :disabled="showLoading">
                      </a-input>
                    </a-form-model-item>
                  </div>
                  <div class="my-2">
                    <a-form-model-item prop="email" label="Correo electrónico">
                      <a-input type="email" class="" placeholder="Correo electrónico" v-model="form.email" size="large" :disabled="showLoading">
                        <template #prefix>
                          <b-icon-envelope></b-icon-envelope>
                        </template>
                      </a-input>
                    </a-form-model-item>
                  </div>
                  <div>
                    <a-form-model-item prop="realPassword" label="Contraseña">
                      <a-input :type="passwordType" :placeholder="$t('login.form.password')" v-model="form.realPassword" size="large" ref="password1" :disabled="showLoading" :maxLength="20" >
                        <template #prefix>
                          <b-icon-key></b-icon-key>
                        </template>
                        <template #suffix>
                          <b-icon-eye-slash font-scale="1.5" @click.stop.prevent="togglePassword" v-if="passwordType =='password'"></b-icon-eye-slash>
                          <b-icon-eye font-scale="1.5" @click.stop.prevent="togglePassword" v-else></b-icon-eye>
                        </template>
                      </a-input>
                    </a-form-model-item>
                  </div>
                  <div class="my-2">
                    <a-form-model-item prop="realPassword2" label="Confirmar contraseña">
                      <a-input :type="passwordType2" placeholder="Confirmar contraseña" v-model="form.realPassword2" size="large" :disabled="showLoading" :maxLength="20">
                        <template #prefix>
                          <b-icon-key></b-icon-key>
                        </template>
                        <template #suffix>
                          <b-icon-eye-slash font-scale="1.5" @click.stop.prevent="togglePassword2" v-if="passwordType2 =='password'"></b-icon-eye-slash>
                          <b-icon-eye font-scale="1.5" @click.stop.prevent="togglePassword2" v-else></b-icon-eye>
                        </template>
                      </a-input>
                    </a-form-model-item>
                  </div>

                  <a-form-model-item prop="policy_terms">
                    <div class="contact100-form-checkbox">
                      <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" v-model="form.policy_terms">
                      <label class="label-checkbox100" for="ckb1">
                        <span class="check"><b-icon-check-2 font-scale="1.2"></b-icon-check-2></span>
                        <span class="txt1">
                          Estoy de acuerdo con los
                          <router-link :to="{ name: 'terms-conditions' }"class="txt2 hov1">
                            Términos de Usuario
                          </router-link>
                        </span>
                      </label>
                    </div>
                  </a-form-model-item>
                  <div class="my-2">
                    <b-button block variant="primary" class="text-white" :loading="showLoading" @click.stop.prevent="handleRegister">
                      Registrarse x <small>1 mes gratis</small>
                    </b-button>
                  </div>
                  <div class="clearfix">
                    <span class="float-right">o
                      <b-link href="#" class="text-white" @click="$bvModal.show('login-1')">Inicia sesión</b-link>
                    </span>
                  </div>
                </div>
              </a-form-model>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="bg-dark text-white pt-4 bg-darker">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" md="6">
            <div>
              <div>
                <img src="/img/logo-footer-2.svg" style="max-height: 100px;"/>
              </div>
            </div>
          </b-col>
          <b-col cols="12" lg="6" md="6">
            <b-row style="justify-content: end !important; text-align: right;">
              <b-col lg="4" md="4" sm="12" cols="12" class="d-flex flex-column mt-3" >
                <b-link :to="{ name: 'terms-conditions' }" class="text-white">Terminos y condiciones</b-link>
                <b-link :to="{ name: 'faq' }" class="text-white">Preguntas Frecuentes</b-link>
                <b-link :to="{ name: 'contacts' }" class="text-white">Contactanos</b-link>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="py-5 bg-dark text-white bg-darker">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" md="6" sm="6">
            <h6>@ 2022 powered with <b-icon-heart style="color: hotpink; margin: 2px 5px;"></b-icon-heart> by <a target="_blank" href="https://www.zibasoft.com/">Zibasoft</a></h6>
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
    <!-- <a href="https://wa.me/5218181175165?text=¡Hola! Podrías darme más información de Onlycards" target="_blank" class="whatsapp-chat-link">
      <img src="/whatsapp_chat.png" alt="" border="0" />
    </a> -->
  </main>
  <!-- /main content -->
</template>
<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import { getServerFile } from '@/libs/util'
  import { registerCustomer, postOrder, getProduct } from '@/api/data'
  import { getCard } from '@/api/user'
  import { BIconPlayFill, BIconArrowRight, BIconGithub, BIconGlobe } from 'bootstrap-vue'

  import Designs from './components/designs'
  import CreateCard from './components/create-card'
  import CardPage from '../../card-page'
  import Header from '../../components/header/header'

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', 'G-GVVVD42784');

  export default {
    props: {
    },
    components: {
      BIconPlayFill,
      BIconArrowRight,
      BIconGithub,
      BIconGlobe,
      CardPage,
      Header,
      Designs,
      CreateCard
    },
    data () {
      return {
        form: {
          first_name: '',
          email: '',
          realPassword: '',
          realPassword2: '',
          user_id: '',
          username: '',
          policy_terms: false
        },
        rules: {
          first_name: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else {
              callback();
            }
          }, trigger: 'change' }],
          email: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
              callback(new Error('No es un correo valido'));
            }else {
              callback();
            }
          }, trigger: 'change' }],
          realPassword: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } else if (value !== this.form.realPassword2 && this.form.realPassword2) {
              callback(new Error('Las contraseñas no coinciden'));
            } else if (value.length > 20) {
              callback(new Error('Caracteres maximos permitidos: 20'));
            } else {
              callback();
              if (this.form.realPassword == this.form.realPassword2) {
                this.$refs.registerForm.validateField('realPassword2')
              }
            }
          }, trigger: 'change' }],
          realPassword2: [{ validator: (rule, value, callback) => {
            if ((value === '' || !value)) {
              callback(new Error('Favor de no dejar este campo vacío'));
            } if (value !== this.form.realPassword) {
              callback(new Error('Las contraseñas no coinciden'));
            } else {
              callback();
              if (this.form.realPassword == this.form.realPassword2) {
                this.$refs.registerForm.validateField('realPassword')
              }
            }
          }, trigger: 'change' }],
          policy_terms: [{ validator: (rule, value, callback) => {
            debugger;
            if (!value) {
              callback(new Error('Favor de no dejar este campo vacío'))
            } else {
              callback();
            }
          }, trigger: 'change' }],
        },
        showLoading: false,
        passwordType: 'text',
        passwordType2: 'text',
        policyTerms: false,
        companyCard: null
      }
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
      appName () {
        return this.settings?.COMPANY_NAME
      },
      appImage () {
        return getServerFile('public/company/company_logo.png')
      }
    },
    methods: {
      ...mapActions([
        'handleLogOut',
        'handleLogin'
      ]),
      handleRegister () {
        this.showLoading = true
        this.$refs.registerForm.validate().then(valid => {
          if (valid) {
            registerCustomer({
              email: this.form.email, 
              password: this.form.realPassword, 
              first_name: this.form.first_name,
              password_confirmation: this.form.realPassword2,
            }).then((response) => {
              this.showLoading = false
              if (response.data.success) {
                this.$notification.success({
                  message: this.$t('register.messages.success.registered'),
                  description: 'Generando componentes para tarjeta digital...'
                })
                this.form.user_id = response.data.data.id
                this.form.username = response.data.data.username
                this.handleLogin({
                  userName: this.form.username, 
                  password: this.form.realPassword, 
                  remember: true
                }).then(() => {
                  this.$router.push({ name: 'profile-details' })
                }).catch((error) => {
                });
              } else {  
              }
            }).catch((reason) => {
              this.showLoading = false
              if (reason.data.message) {
                this.$notification.error({
                  message: 'No se pudo crear el usuario',
                  description: this.$t(`errors.${reason.data.message}`)
                })
              } else if (reason.data.error) {
                Object.keys(reason.data.error).forEach((e) => {
                  this.$notification.error({
                    message: 'No se pudo crear el usuario',
                    description: this.$t(`errors.${e}.${reason.data.error[e][0]}`)
                  })
                });
              }
            })
          } else {
            this.showLoading = false
          }
        }).catch((error) => {
          this.showLoading = false
        });
      },
      dispachLogout () {
        this.handleLogOut()
      },
      togglePassword() {
        this.passwordType = this.passwordType == 'password' ? 'text' : 'password'
      },
      togglePassword2() {
        this.passwordType2 = this.passwordType2 == 'password' ? 'text' : 'password'
      },
      toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      },
      loadCompanyCard() {
        this.$fingerprint.get((components) => {
          let _fingerprint = this.$fingerprint.x64hash128(components.map((pair) => { return pair.value }).join(), 31)
          getCard({ 
            fingerprint: _fingerprint,
            uuid: '67c41a4e-8340-4a2a-b8bf-49aa399ca842'
          }).then(({ data }) => data).then((result) => {
            this.companyCard = { ... result.data }

            this.toDataURL(this.companyCard.avatar, (dataUrl) => {
              this.companyCard.base_image = dataUrl
            })
          }).catch((err) => {
            
          }).then(() => {
            
          })
        });
      },
      onRegisterCreateCard(user, fallback) {
        if (this.$refs.CreateCardComponent.valid) {
          this.showLoading = true
          registerCustomer({ ...user }).then((response) => {
            this.showLoading = false
            if (response.data.success) {
              this.$notification.success({
                message: this.$t('register.messages.success.registered'),
                description: 'Generando componentes para tarjeta digital...'
              })
              this.form.user_id = response.data.data.id
              this.form.username = response.data.data.username
              this.handleLogin({
                userName: response.data.data.username, 
                password: response.data.data.password, 
                remember: true
              }).then(() => {
                this.$router.push({ name: 'profile-details' })
                this.$notification.success({
                  message: this.$t('register.messages.success.registered'),
                  description: 'En breve te llegara un correo electrónico con la información de inicio de sesión.'
                })
              }).catch((error) => {
              });
            } else {  
            }
          }).catch((reason) => {
            this.showLoading = false
            if (reason.data.message) {
              this.$notification.error({
                message: 'No se pudo crear el usuario',
                description: this.$t(`errors.${reason.data.message}`)
              })
            } else if (reason.data.error) {
              Object.keys(reason.data.error).forEach((e) => {
                this.$notification.error({
                  message: 'No se pudo crear el usuario',
                  description: this.$t(`errors.${e}.${reason.data.error[e][0]}`)
                })
              });
            }
          })
          // setTimeout(() => {
          //   fallback() 
          //   this.showLoading = false
          // }, 3000)
        }
      }
    },
    mounted() {
      this.loadCompanyCard()
      this.$nextTick().then(()=>{
        setTimeout(()=> {
          this.togglePassword2()
          this.togglePassword()
        }, 300)
      })
    }
  }
</script>

<style lang="scss">
  .home-page.landing {
    background: #dbf0eb;
    background: linear-gradient(119deg, #dbf0eb 0%, #f9f9f9ef 32%, #f9f9f9 66%, #dbf0eb 100%);
        
    .bg-dark.bg-darker {
      background-color: #28292c !important;
    }
    
    .whatsapp-chat-link {
      position: fixed;
      top: 250px;
      right: -6px;
      z-index: 1030; 
      
      img {
        width: 172px;
      }
    }
    
    @media only screen and (max-width: 450px) {
      .bg-hero {
        margin-top: -166px !important;
        padding-top: 125px !important;
        h1 {
          font-size: 30px !important;
          line-height: 36px !important;
        }
        svg {
          max-width: 100%;
        }
      }
      .whatsapp-chat-link {
        right: -114px;
      }
    }
  }
  .register-form {
    color: #fff;
    .ant-form-item-label {
      line-height: 1;
      & > label {
        color: #fff;
        line-height: 1;
      }
    }
    .has-feedback .ant-input-affix-wrapper .ant-input-suffix {
      padding-right: 0
    }
    
    .input-checkbox100 {
      display: none;
    }

    .label-checkbox100 {
      margin: 0;
      color: #fff;
      display: block;
      position: relative;
      padding-left: 26px;
      cursor: pointer;
      line-height: 1;
    }

    .label-checkbox100 > span.check {
      font-size: 13px;
      color: transparent;

      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background: #e6e6e6;
      left: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);
    }

    .input-checkbox100:checked + .label-checkbox100 > span.check {
      color: #c87ef0;
    }
  }
  .icons-list {
    display: flex;
    flex-direction: row;
    align-content: center;
    font-size: 1.7rem;
    gap: 10px;
    color: #666666e0;
    padding-top: 19px;
    .bi-whatsapp:hover {
      color: #4db565;
    }
    .bi-instagram:hover {
      color: #30618A;
    }
    .bi-facebook:hover {
      color: #3b5998;
    }
    .bi-twitter:hover {
      color: #1DA1F2 ;
    }
    .bi-envelope:hover {
      color: #d7b62a;
    }

    @media only screen and (max-width: 450px) {
      justify-content: center;
      padding-top: 0;
    }
  }
</style>