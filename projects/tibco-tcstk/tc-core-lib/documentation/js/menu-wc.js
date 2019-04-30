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
                    <a href="index.html" data-type="index-link">@tibco-tcstk/tc-core-lib documentation</a>
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
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/TcCoreLibModule.html" data-type="entity-link">TcCoreLibModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' : 'data-target="#xs-components-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' :
                                            'id="xs-components-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' }>
                                            <li class="link">
                                                <a href="components/TibcoCloudConfigurationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudErrorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudLoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudMenuBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudMenuBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudMultipleSubscriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudMultipleSubscriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudNavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudNavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudNewElementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudNewElementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudSelectTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudSelectTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudSettingLandingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudSettingLandingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudSettingMenuEntryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudSettingMenuEntryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudSettingsGeneralComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudSettingsGeneralComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudSplashScreenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudSplashScreenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TibcoCloudWidgetHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TibcoCloudWidgetHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' : 'data-target="#xs-directives-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' :
                                        'id="xs-directives-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' }>
                                        <li class="link">
                                            <a href="directives/OnCreateDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">OnCreateDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' : 'data-target="#xs-injectables-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' :
                                        'id="xs-injectables-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' }>
                                        <li class="link">
                                            <a href="injectables/RequestCacheService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RequestCacheService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TcButtonsHelperService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TcButtonsHelperService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' : 'data-target="#xs-pipes-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' :
                                            'id="xs-pipes-links-module-TcCoreLibModule-51a239ce56e09a533d355f600bcacb24"' }>
                                            <li class="link">
                                                <a href="pipes/DurationSincePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DurationSincePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/EllipsisPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EllipsisPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/HighlightPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HighlightPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/OrderByDatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderByDatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReversePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReversePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccessToken.html" data-type="entity-link">AccessToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountInfo.html" data-type="entity-link">AccountInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountsInfo.html" data-type="entity-link">AccountsInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthInfo.html" data-type="entity-link">AuthInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Claim.html" data-type="entity-link">Claim</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigurationMenuConfig.html" data-type="entity-link">ConfigurationMenuConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigurationMenuEntry.html" data-type="entity-link">ConfigurationMenuEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/GeneralConfig.html" data-type="entity-link">GeneralConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/GeneralLandingPageConfig.html" data-type="entity-link">GeneralLandingPageConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/LandingPageConfig.html" data-type="entity-link">LandingPageConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/LandingPageItemConfig.html" data-type="entity-link">LandingPageItemConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginPrefill.html" data-type="entity-link">LoginPrefill</a>
                            </li>
                            <li class="link">
                                <a href="classes/Owner.html" data-type="entity-link">Owner</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleAttribute.html" data-type="entity-link">RoleAttribute</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteAction.html" data-type="entity-link">RouteAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sandbox.html" data-type="entity-link">Sandbox</a>
                            </li>
                            <li class="link">
                                <a href="classes/SandboxList.html" data-type="entity-link">SandboxList</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharedStateContent.html" data-type="entity-link">SharedStateContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharedStateEntry.html" data-type="entity-link">SharedStateEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharedStateList.html" data-type="entity-link">SharedStateList</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscription.html" data-type="entity-link">Subscription</a>
                            </li>
                            <li class="link">
                                <a href="classes/TcCoreCommonFunctions.html" data-type="entity-link">TcCoreCommonFunctions</a>
                            </li>
                            <li class="link">
                                <a href="classes/TibcoCloudTableDataSource.html" data-type="entity-link">TibcoCloudTableDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToolbarButton.html" data-type="entity-link">ToolbarButton</a>
                            </li>
                            <li class="link">
                                <a href="classes/UiAppConfig.html" data-type="entity-link">UiAppConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/UiAppIdConfig.html" data-type="entity-link">UiAppIdConfig</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LogService.html" data-type="entity-link">LogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestCacheService.html" data-type="entity-link">RequestCacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcButtonsHelperService.html" data-type="entity-link">TcButtonsHelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcGeneralConfigService.html" data-type="entity-link">TcGeneralConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcGeneralLandingPageConfigService.html" data-type="entity-link">TcGeneralLandingPageConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcLoginService.html" data-type="entity-link">TcLoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcSharedStateService.html" data-type="entity-link">TcSharedStateService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthErrorInterceptor.html" data-type="entity-link">AuthErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/CachingInterceptor.html" data-type="entity-link">CachingInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/MockingInterceptor.html" data-type="entity-link">MockingInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ConfigurationMenuConfigResolver.html" data-type="entity-link">ConfigurationMenuConfigResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/GeneralConfigResolver.html" data-type="entity-link">GeneralConfigResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/GeneralLandingPageConfigResolver.html" data-type="entity-link">GeneralLandingPageConfigResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginPrefillResolver.html" data-type="entity-link">LoginPrefillResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Deserializable.html" data-type="entity-link">Deserializable</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});