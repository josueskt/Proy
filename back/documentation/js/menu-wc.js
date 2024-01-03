'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">back documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-077c846b89ca5272ba49e4a7afc9f06550dabd203788d2c1f1509f64a64efe0b7a4de3859af79bd73364f6022cac7798a7bc142b9977c9c0b6213ce4553d400c"' : 'data-bs-target="#xs-controllers-links-module-AppModule-077c846b89ca5272ba49e4a7afc9f06550dabd203788d2c1f1509f64a64efe0b7a4de3859af79bd73364f6022cac7798a7bc142b9977c9c0b6213ce4553d400c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-077c846b89ca5272ba49e4a7afc9f06550dabd203788d2c1f1509f64a64efe0b7a4de3859af79bd73364f6022cac7798a7bc142b9977c9c0b6213ce4553d400c"' :
                                            'id="xs-controllers-links-module-AppModule-077c846b89ca5272ba49e4a7afc9f06550dabd203788d2c1f1509f64a64efe0b7a4de3859af79bd73364f6022cac7798a7bc142b9977c9c0b6213ce4553d400c"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AutorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutorController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/BuscadorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuscadorController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CambioContraController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CambioContraController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CargaLLoteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CargaLLoteController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CarreraController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarreraController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DescargaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DescargaController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/EstadisticasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstadisticasController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GetLibroController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetLibroController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/LibroController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibroController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/LoginController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/MateriaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MateriaController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/MilibroController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MilibroController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/NacionalidadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NacionalidadController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TestController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UsuariosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-077c846b89ca5272ba49e4a7afc9f06550dabd203788d2c1f1509f64a64efe0b7a4de3859af79bd73364f6022cac7798a7bc142b9977c9c0b6213ce4553d400c"' : 'data-bs-target="#xs-injectables-links-module-AppModule-077c846b89ca5272ba49e4a7afc9f06550dabd203788d2c1f1509f64a64efe0b7a4de3859af79bd73364f6022cac7798a7bc142b9977c9c0b6213ce4553d400c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-077c846b89ca5272ba49e4a7afc9f06550dabd203788d2c1f1509f64a64efe0b7a4de3859af79bd73364f6022cac7798a7bc142b9977c9c0b6213ce4553d400c"' :
                                        'id="xs-injectables-links-module-AppModule-077c846b89ca5272ba49e4a7afc9f06550dabd203788d2c1f1509f64a64efe0b7a4de3859af79bd73364f6022cac7798a7bc142b9977c9c0b6213ce4553d400c"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AutorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BuscadorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuscadorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CambioContraService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CambioContraService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CargaLLoteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CargaLLoteService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CarreraService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarreraService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DescargaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DescargaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EstadisticasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstadisticasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GetLibroService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetLibroService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LibroService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibroService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoginService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MateriaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MateriaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NacionalidadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NacionalidadService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SqlService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SqlService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsuariosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Libro_Upload.html" data-type="entity-link" >Libro_Upload</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUser.html" data-type="entity-link" >RegisterUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Libro.html" data-type="entity-link" >Libro</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/login.html" data-type="entity-link" >login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/materia.html" data-type="entity-link" >materia</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});