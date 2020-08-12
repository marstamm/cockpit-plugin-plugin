/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = `<!-- # CE - camunda-cockpit-ui/client/scripts/pages/decision-definition.html -->
<div class="ctn-fixed-view decision-page-layout">
  <div class="ctn-content-container"
       ctn-collapsable-parent="sidebar">

    <!-- tool bar -->
    <div class="ctn-toolbar">

      <!-- Toolbar actions are provided by plugins -->
      <span ng-repeat="tabProvider in decisionDefinitionActions">
        <view provider="tabProvider"
              vars="decisionDefinitionVars" />
      </span>

    </div>

    <!-- sidebar -->
    <div class="ctn-column ctn-sidebar ctn-scroll"
         cam-hover-area
         ctn-collapsable="left">
      <dl class="process-information">
        <dt>{{ 'DECISION_DEFINITION_DEFINITION_VERSION' | translate }}</dt>
        <dd class="definition-version">
          <span ng-if="!allDefinitions || !decisionDefinition"
                class="glyphicon glyphicon-refresh animate-spin"></span>

          <div class="dropdown"
               ng-if="allDefinitions && allDefinitions.length > 1"
               uib-dropdown>
            <span>
              <span change-version="decisionDefinition"
                    type="decision"></span>

              <a href
                 uib-dropdown-toggle
                 class="dropdown-toggle btn btn-xs btn-default">
                <span class="caret"></span>
              </a>
            </span>

            <ul uib-dropdown-menu class="dropdown-menu">
              <li ng-repeat="definition in allDefinitions">
                <a ng-href="#/decision-definition/{{ definition.id }}">
                  {{ definition.version }}
                </a>
              </li>
            </ul>
          </div>
          <span ng-if="allDefinitions && allDefinitions.length < 2 && decisionDefinition">
            {{ decisionDefinition.version }}
          </span>
        </dd>

        <dt>{{ 'DECISION_DEFINITION_VERSION_TAG' | translate }}</dt>
        <dd class="version-tag"
            ng-if="decisionDefinition.versionTag">{{ decisionDefinition.versionTag }}</dd>
        <dd class="version-tag"
            ng-if="!decisionDefinition.versionTag"><span class="null-value">{{ 'DECISION_DEFINITION_NULL' | translate }}</span></dd>

        <dt cam-widget-clipboard="decisionDefinition.id"
            cam-hoverable-title="definition-id">{{ 'DECISION_DEFINITION_DEFINITION_ID' | translate }}</dt>
        <dd cam-hover-trigger="definition-id">{{ decisionDefinition.id }}</dd>

        <dt cam-widget-clipboard="decisionDefinition.key"
            cam-hoverable-title="definition-key">{{ 'DECISION_DEFINITION_DEFINITION_KEY' | translate }}</dt>
        <dd class="definition-key"
            cam-hover-trigger="definition-key">{{ decisionDefinition.key }}</dd>

        <dt>{{ 'DECISION_DEFINITION_DEFINITION_NAME' | translate }}</dt>
        <dd class="definition-name"
            ng-if="decisionDefinition.name && decisionDefinition.name !== decisionDefinition.key">{{ decisionDefinition.name }}</dd>
        <dd class="definition-name"
            ng-if="!decisionDefinition.name || decisionDefinition.name === decisionDefinition.key"><span class="null-value">null</span></dd>


        <dt cam-widget-clipboard="decisionDefinition.historyTimeToLive"
            cam-hoverable-title="history-time-to-live">
            {{ 'DECISION_DEFINITION_HISTORY_TIME_TO_LIVE' | translate }}
        </dt>
        <dd class="history-time-to-live" cam-hover-trigger="history-time-to-live">
          <span time-to-live="decisionDefinition" resource="decision-definition"></span>
        </dd>

        <dt ng-if="decisionDefinition.tenantId"
            cam-widget-clipboard="decisionDefinition.tenantId"
            cam-hoverable-title="tenant-id">{{ 'DECISION_DEFINITION_TENANT_ID' | translate }}</dt>
        <dd class="tenant-id"
            ng-if="decisionDefinition.tenantId"
            cam-hover-trigger="tenant-id">{{ decisionDefinition.tenantId }}</dd>
        <dt ng-if="!decisionDefinition.tenantId">{{ 'DECISION_DEFINITION_TENANT_ID' | translate }}</dt>
        <dd class="tenant-id"
            ng-if="!decisionDefinition.tenantId"><span class="null-value">null</span></dd>

        <dt cam-widget-clipboard="decisionDefinition.deploymentId"
            cam-hoverable-title="deployment-id">{{ 'DECISION_DEFINITION_DEPLOYMENT_ID' | translate }}</dt>
        <dd class="deployment-id"
            cam-hover-trigger="deployment-id">
          <a ng-href="{{ getDeploymentUrl() }}">{{ decisionDefinition.deploymentId }}</a>
        </dd>

        <dt ng-if="decisionDefinition.decisionRequirementsDefinitionId"
            cam-widget-clipboard="decisionDefinition.decisionRequirementsDefinitionId"
            cam-hoverable-title="drd">{{ 'DECISION_DEFINITION_DECISION_REQUIREMENTS_DEFINITION' | translate }}</dt>
        <dd class="super-case-instance-id"
            ng-if="decisionDefinition.decisionRequirementsDefinitionId"
            cam-hover-trigger="drd">
          <a ng-if="hasDrdPlugin"
             ng-href="#/decision-requirement/{{decisionDefinition.decisionRequirementsDefinitionId}}/history">
            {{ decisionDefinition.decisionRequirementsDefinitionId }}
          </a>
          <span ng-if="!hasDrdPlugin">
            {{ decisionDefinition.decisionRequirementsDefinitionId }}
          </span>
        </dd>
        <dt ng-if="!decisionDefinition.decisionRequirementsDefinitionId">{{ 'DECISION_DEFINITION_DECISION_REQUIREMENTS_DEFINITION' | translate }}</dt>
        <dd class="super-case-instance-id"
            ng-if="!decisionDefinition.decisionRequirementsDefinitionId"><span class="null-value">{{ 'DECISION_DEFINITION_NULL' | translate }}</span></dd>
      </dl>

      <a class="hide-collapsable pull-right"></a>
    </div>


    <div class="ctn-column ctn-content"
         ctn-collapsable-parent="tabs">

      <!-- content top pane -->
      <div class="ctn-row ctn-content-top"
           ctn-collapsable="top">
        <div decision-table="tableXml"
             control="control"
             table="{{decisionDefinition.key}}"
             on-load="initializeTablePlugins()"
             style="height: 100%;padding:20px 10px;margin:0;"></div>
        <a class="hide-collapsable vertical-collapse"
           title="{{ 'DECISION_DEFINITION_SHOW_TABS' | translate }}"></a>

        <a class="maximize-collapsable vertical-collapse"
           maximize-parent-direction="left"
           title="{{ 'DECISION_DEFINITION_MAXIMIZE_DIAGRAM' | translate }}"></a>

        <a class="restore-collapsable vertical-collapse"
           maximize-parent-direction="left"
           title="{{ 'DECISION_DEFINITION_RESTORE_DEFAULT_SIZE' | translate }}"></a>
      </div>

      <!-- content bottom pane -->
      <div class="ctn-row ctn-content-bottom ctn-tabbed">
        <a class="show-collapsable vertical-collapse"
           title="{{ 'DECISION_DEFINITION_HIDE_TABS' | translate }}"></a>
        <ul class="nav nav-tabs"
            ng-if="decisionDefinitionTabs.length > 1">
          <li ng-class="{ active: selectedTab == tabProvider }"
              ng-repeat="tabProvider in decisionDefinitionTabs">
            <a href ng-click="selectTab(tabProvider)">{{ tabProvider.label | translate }}</a>
          </li>
        </ul>

        <h4 ng-if="decisionDefinitionTabs.length === 1">{{ decisionDefinitionTabs[0].label | translate }}:</h4>

        <div class="ctn-tabbed-content ctn-scroll"
             ng-if="decisionDefinitionTabs.length">
          <view provider="selectedTab"
                vars="decisionDefinitionVars" />
        </div>
      </div>

      <a class="show-collapsable"></a>
    </div>

  </div>

</div><!-- end .ctn-fixed-view -->
<!-- / CE - camunda-cockpit-ui/client/scripts/pages/decision-definition.html -->
`;
