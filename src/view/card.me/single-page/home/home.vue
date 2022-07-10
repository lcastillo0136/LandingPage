<template>
  <main class="home-page">
    <b-navbar toggleable="md">
      <b-container class="d-flex align-items-center">
        <b-navbar-brand class="mt-0">
          <img src="/img/logo.png" style="max-height: 100px;"/>
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
    <section class="pb-5 bg-hero">
      <b-container class="pt-5">
        <b-row>
          <b-col cols="12" lg="6" md="6" sm="12">
            <h1>
              Estamos para <br />
              Aumentar tú <br />
              Productividad
            </h1>
            <svg
              class="my-5"
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

            <p class="hero-description">
              Hagamos que su trabajo llegue a mas clientes y alcance nuevos horizontes junto con la presentación de su tarjeta digital.
            </p>
          </b-col>
          <br class="d-none d-sm-block" />
          <b-col cols="12" lg="6" md="6" sm="12">
            <b-img
              alt="hero image"
              class="img-fluid"
              :src="require(`@/assets/img/hero-img.png`)"
            ></b-img>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="bg-green-light py-5">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" md="6" sm="12">
            <h2>Tarjeta de presentación digital</h2>
            <div class="my-5">
              <p class="text-muted">
                Las tarjetas de presentación digitales son una nueva forma de compartir su información de contacto y contenido importante que lo ayudan a hacer crecer su red profesional y su negocio.
              </p>
            </div>
            <div class="d-flex flex-row">
              <p class="text-muted">
                Cualquier persona puede crear tarjetas digitales en cuestión de minutos. Puedes personalizarlos con tu logo y foto personal.
              </p>
            </div>
          </b-col>
          <b-col cols="12" lg="6" md="6" sm="12" class="mt-sm-5">
            <div class="d-flex flex-column">
              <div class="d-flex flex-row">
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
                    <g clip-path="url(#clip0_0_1)">
                      <path
                        d="M51.5 35H46.5L42.75 46.25L35.25 23.75L31.5 35H26.5"
                        stroke="#54BD95"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
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
                      <clipPath id="clip0_0_1">
                        <rect
                          width="30"
                          height="30"
                          fill="white"
                          transform="translate(24 20)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h5>Publicación</h5>
                  <p class="text-muted">
                    Planifique, colabore y publique su contenido que impulse un compromiso y un crecimiento significativos para su marca.
                  </p>
                </div>
              </div>
              <div class="d-flex flex-row my-lg-5">
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
                      d="M50.512 39.8626C49.7168 41.7432 48.473 43.4004 46.8894 44.6892C45.3057 45.9781 43.4305 46.8594 41.4276 47.2561C39.4247 47.6528 37.3551 47.5528 35.3997 46.9648C33.4444 46.3769 31.6628 45.3189 30.2108 43.8834C28.7588 42.4479 27.6805 40.6785 27.0703 38.73C26.4601 36.7815 26.3365 34.7132 26.7103 32.7059C27.0841 30.6986 27.9439 28.8134 29.2146 27.2151C30.4853 25.6169 32.1281 24.3542 33.9995 23.5376"
                      stroke="#54BD95"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M51.5 35C51.5 33.3585 51.1767 31.733 50.5485 30.2165C49.9203 28.6999 48.9996 27.3219 47.8388 26.1612C46.6781 25.0004 45.3001 24.0797 43.7835 23.4515C42.267 22.8233 40.6415 22.5 39 22.5V35H51.5Z"
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
                  <h5>Analítica</h5>
                  <p class="text-muted">
                    Analice su rendimiento y alcance nuevos horizontes.
                  </p>
                </div>
              </div>
              <div class="d-flex flex-row">
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
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section>
      <b-container class="pt-5 mt-5">
        <b-row>
          <b-col cols="12" md="4" lg="4" sm="12">
            <h2>Características <br class="d-none d-lg-block" />disponibles</h2>
          </b-col>
          <b-col
            cols="12"
            md="5"
            lg="5"
            sm="12"
            class="d-flex align-items-center"
          >
            <p class="text-muted">
              Ofrecemos una variedad de características interesantes que pueden ayudarlo a aumentar su productividad en el trabajo y administrar su proyecto fácilmente.
            </p>
          </b-col>
          <b-col
            cols="12"
            md="3"
            lg="3"
            sm="12"
            class="d-flex align-items-center"
          >
            <b-button
              class="rounded-lg ml-lg-auto text-white"
              variant="primary"
              size="lg"
              :to="{ name: 'register' }"
              >Comencemos</b-button
            >
          </b-col>
        </b-row>
        <b-row class="mt-5 p-lg-5">
          <b-col cols="12" lg="4" md="4" sm="4">
            <b-card class="rounded-lg border-0 card-feature">
              <b-img
                alt="feature"
                class="img-fluid img-feature"
                :src="require(`@/assets/img/features/collboration_cloud.png`)"
              >
              </b-img>
              <b-card-text class="pt-2">
                <h5>Personalización</h5>
                <p class="text-muted">
                  Aquí puede manejar la información que se muestra virtualmente
                </p>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col cols="12" lg="4" md="4" sm="4">
            <b-card class="rounded-lg border-0 card-feature">
              <b-img
                alt="feature"
                class="img-fluid img-feature"
                :src="require(`@/assets/img/features/cloud_storage.png`)"
              ></b-img>
              <b-card-text class="pt-2">
                <h5>Siempre en línea</h5>
                <p class="text-muted">
                  Se puede acceder inmediatamente a la tarjeta a través de una simple URL sin necesidad de descargar y registrarse en una aplicación
                </p>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col cols="12" lg="4" md="4" sm="4">
            <b-card class="rounded-lg border-0 card-feature">
              <b-img
                alt="feature"
                class="img-fluid img-feature"
                :src="require(`@/assets/img/features/daily_analytics.png`)"
              >
              </b-img>
              <b-card-text class="pt-2">
                <h5>Siempre disponible</h5>
                <p class="text-muted">
                  Guárdalo en la pantalla de inicio del móvil, nunca más te quedarás sin tarjetas.
                </p>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <div class="bg-section-product">
      <section>
        <b-container class="pt-5 mt-5">
          <b-row>
            <b-col lg="6" md="6" sm="12">
              <h2>
                ¿Qué beneficios <br class="d-none d-lg-block" />
                obtendrás?
              </h2>
              <div class="d-flex flex-column mt-5">
                <div class="my-1 d-flex flex-row align-items-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                      fill="#54BD95"
                    />
                  </svg>
                  <p class="ml-2 mb-0">Enlaces a tus redes sociales</p>
                </div>
                <div class="my-1 d-flex flex-row align-items-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                      fill="#54BD95"
                    />
                  </svg>
                  <p class="ml-2 mb-0">Chat directo con tu WhatsApp</p>
                </div>
                <div class="my-1 d-flex flex-row align-items-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                      fill="#54BD95"
                    />
                  </svg>
                  <p class="ml-2 mb-0">Ubicación de tu negocio</p>
                </div>
                <div class="my-1 d-flex flex-row align-items-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                      fill="#54BD95"
                    />
                  </svg>
                  <p class="ml-2 mb-0">1 año de servicio</p>
                </div>
                <div class="my-1 d-flex flex-row align-items-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM15.6318 19.8961L21.8379 13.4961L20.4021 12.1039L14.8858 17.7926L11.5695 14.6357L10.1905 16.0843L14.2245 19.9243L14.9421 20.6074L15.6318 19.8961Z"
                      fill="#54BD95"
                    />
                  </svg>
                  <p class="ml-2 mb-0">Incluye código QR</p>
                </div>
              </div>
            </b-col>
            <b-col lg="6" md="6" sm="12">
              <b-img
                alt="hero"
                :src="require(`@/assets/img/hero-img-2.png`)"
                class="img-fluid"
              ></b-img>
            </b-col>
          </b-row>
        </b-container>
      </section>
      <!-- <section class="pb-5">
        <b-container class="mt-5">
          <div class="d-flex flex-column">
            <h2 class="mx-auto">
              Choose Plan <br />
              Thats's Right For Your
            </h2>
            <p class="text-muted mx-auto text-700 my-4">
              Choose plan that works best for you, feel free to contact us
            </p>
            <b-col lg="3" md="4" sm="10" cols="12" class="mx-auto">
              <div
                class="bg-white p-2 rounded-lg d-flex justify-content-between align-items-center font-weight-bold shadow-lg"
              >
                <span>Bil Monthly</span>
                <b-button
                  variant="primary"
                  size="lg"
                  class="text-white rounded-lg"
                  >Bil Yearly</b-button
                >
              </div>
            </b-col>

            <b-row class="mx-lg-5 mt-5">
              <b-col cols="12" lg="4" md="4" sm="12" class="mt-2">
                <b-card class="rounded-lg shadow">
                  <div class="text-center d-flex flex-column">
                    <h4>Free</h4>
                    <p class="text-muted">Have a go test your superpowers</p>
                    <span class="d-inline">
                      <div class="money">&#36;0</div>
                    </span>
                  </div>
                  <div class="light-green p-2 mt-4 rounded-lg">
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">2 Users</span>
                    </div>
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">2 Files</span>
                    </div>
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">Public Share & Comments</span>
                    </div>
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">Chat & Support</span>
                    </div>
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">New income apps</span>
                    </div>
                    <b-button block class="rounded-lg btn-white shadow-sm"
                      >Signup for free</b-button
                    >
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" lg="4" md="4" sm="12" class="mt-2">
                <b-card
                  class="rounded-lg primary-card shadow"
                  bg-variant="primary"
                >
                  <div>
                    <div
                      class="text-center d-flex flex-column text-white position-relative"
                    >
                      <h4>Pro</h4>
                      <p>
                        Experientce the power<br />
                        of invinity posibilities
                      </p>
                      <span class="d-inline">
                        <div class="money">&#36;8</div>
                      </span>
                      <div class="my-4">
                        <div class="p-2 card-saving rounded-lg d-inline">
                          Save $50 a year
                        </div>
                      </div>
                    </div>
                    <div class="bg-white p-3 rounded-lg">
                      <div class="d-flex flex-row my-3">
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

                        <span class="ml-2">4 Users</span>
                      </div>
                      <div class="d-flex flex-row my-3">
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

                        <span class="ml-2">All Apps</span>
                      </div>
                      <div class="d-flex flex-row my-3">
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

                        <span class="ml-2">Unlimited editable exports</span>
                      </div>
                      <div class="d-flex flex-row my-3">
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

                        <span class="ml-2">Folder and Callobration</span>
                      </div>
                      <div class="d-flex flex-row my-3">
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

                        <span class="ml-2">All incomming apps</span>
                      </div>
                      <b-button
                        block
                        variant="primary text-white"
                        class="rounded-lg"
                        >Go to pro</b-button
                      >
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" lg="4" md="4" sm="12" class="mt-2">
                <b-card class="rounded-lg shadow">
                  <div class="text-center d-flex flex-column">
                    <h4>Business</h4>
                    <p class="text-muted">
                      Unveil new superpowers and join the Design Leaque
                    </p>
                    <span class="d-inline">
                      <div class="money">&#36;16</div>
                    </span>
                  </div>
                  <div class="light-green p-3 mt-4 rounded-lg">
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">2 Users</span>
                    </div>
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">2 Files</span>
                    </div>
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">Public Share & Comments</span>
                    </div>
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">Chat & Support</span>
                    </div>
                    <div class="d-flex flex-row my-3">
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

                      <span class="ml-2">New income apps</span>
                    </div>
                    <b-button block class="rounded-lg btn-white shadow-sm"
                      >Goto Business</b-button
                    >
                  </div>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </b-container>
      </section> -->
    </div>

    <section class="bg-dark text-white pt-5">
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
            <b-card bg-variant="monocrhome" class="p-lg-5">
              <a-form-model class="register-form validate-form" ref="registerForm" :rules="rules" :model="form">
                <div class="d-flex flex-column">
                  <div class="d-flex mx-auto">
                    <img src="/img/footer.png" style="max-height: 100px;"/>
                  </div>

                  <h3 class="text-center">Comenzemos</h3>
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
                      <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" v-model="policyTerms">
                      <label class="label-checkbox100" for="ckb1">
                        <span class="check"><b-icon-check-2 font-scale="1.2"></b-icon-check-2></span>
                        <span class="txt1">
                          Estoy de acuerdo con los
                          <router-link :to="{ path: '/terminos-y-condiciones' }"class="txt2 hov1">
                            Términos de Usuario
                          </router-link>
                        </span>
                      </label>
                    </div>
                  </a-form-model-item>
                  <div class="my-2">
                    <b-button block variant="primary" class="text-white" :loading="showLoading" @click.stop.prevent="handleRegister">Registrate</b-button
                    >
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
    <section class="bg-dark text-white pt-5">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" md="6">
            <div>
              <div>
                <img src="/img/footer.png" style="max-height: 100px;"/>
              </div>
            </div>
          </b-col>
          <b-col cols="12" lg="6" md="6">
            <b-row style="justify-content: end !important; text-align: right;">
              <b-col lg="4" md="4" sm="12" cols="12" class="d-flex flex-column mt-3" >
                <h6 class="mt-2 mb-4">Product</h6>
                <b-link href="#" class="text-white">Update</b-link>
                <b-link href="#" class="text-white">Security</b-link>
                <b-link href="#" class="text-white">Beta Test</b-link>
                <b-link href="#" class="text-white">Pricing product</b-link>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="py-5 bg-dark text-white">
      <b-container>
        <b-row>
          <b-col cols="12" lg="6" md="6" sm="6">
            <h6>@ 2022 powered with <b-icon-heart></b-icon-heart> by zibasoft</h6>
          </b-col>
          <b-col cols="12" lg="6" md="6" sm="6">
            <div class="clearfix">
              <h6 class="float-lg-right float-md-right">
                Terms and Conditions . Privacy Policy
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
  <!-- /main content -->
</template>

<script>
  import { getServerFile } from '@/libs/util'
  import { registerCustomer, postOrder, getProduct } from '@/api/data'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import { BIconPlayFill, BIconArrowRight, BIconGithub, BIconGlobe } from 'bootstrap-vue'
  import RegisterForm from './components/register'
  import Login from './components/login'

  export default {
    props: {
    },
    components: {
      BIconPlayFill,
      BIconArrowRight,
      BIconGithub,
      BIconGlobe,
      RegisterForm,
      Login
    },
    data () {
      return {
        form: {
          first_name: '',
          email: '',
          realPassword: '',
          realPassword2: '',
          user_id: '',
          username: ''
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
    },
    mounted() {
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
  .home-page {
    .navbar {
      min-height: 100px;
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
</style>