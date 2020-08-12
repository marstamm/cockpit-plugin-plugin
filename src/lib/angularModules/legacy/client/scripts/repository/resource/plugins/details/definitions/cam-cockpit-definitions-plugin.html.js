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

module.exports = `<div cam-widget-loader
     loading-state="{{ loadingState }}"
     text-empty="{{ 'REPOSITORY_DEPLOYMENT_DEFINITIONS_TEXT_EMPTY_1' | translate }}"
     text-error="{{ textError }}">
  <table class="definitions cam-table">
    <thead>
      <tr>
        <th class="name">{{ 'REPOSITORY_DEPLOYMENT_NAME' | translate }}</th>
        <th class="key">{{ 'REPOSITORY_DEPLOYMENT_KEY' | translate }}</th>
        <th ng-if="!isDmnResource(resource)"
            class="instance-count">{{ 'REPOSITORY_DEPLOYMENT_INSTANCE_COUNTS' | translate }}</th>
        <th ng-if="isDmnResource(resource)"
            class="version">{{ 'REPOSITORY_DEPLOYMENT_VERSION' | translate }}</th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="definition in definitions">
        <td class="name">
          <a ng-if="!isCmmnResource(resource) || hasCasePlugin"
             ng-href="{{ getDefinitionLink(definition, resource) }}">
            {{ definition.name || definition.key || definition.id }}
          </a>
          <span ng-if="isCmmnResource(resource) && !hasCasePlugin">
            {{ definition.name || definition.key || definition.id }}
          </span>
        </td>

        <td class="key">
          {{ definition.key }}
        </td>

        <td ng-if="!isDmnResource(resource)"
            class="instance-count">
          <span ng-if="!definition.instances.$loaded">
            <span class="glyphicon glyphicon-refresh animate-spin"></span>&nbsp;{{ 'REPOSITORY_DEPLOYMENT_LOADING' | translate }}
          </span>
          <span ng-if="definition.instances.$loaded">
            {{ definition.instances.count }}
          </span>
          <span ng-if="definition.instances.$error">
            {{ 'REPOSITORY_DEPLOYMENT_COULD_NOT_LOAD' | translate }}
          </span>
        </td>

        <td ng-if="isDmnResource(resource)"
            class="version">
          <span>
            {{ definition.version }}
          </span>
        </td>

      </tr>
    </tbody>
  </table>

  <div ng-if="isDmnResource(resource)">
    <h4>{{ 'REPOSITORY_DEPLOYMENT_DECISION_TEXT' | translate }}</h4>
    <div cam-widget-loader
         loading-state="{{ drdLoadingState }}"
         text-empty="{{ 'REPOSITORY_DEPLOYMENT_DEFINITIONS_TEXT_EMPTY_2' | translate }}"
         text-error="{{ drdTextError }}">
      <table class="drd-definitions cam-table">
        <thead>
          <tr>
            <th class="name">{{ 'REPOSITORY_DEPLOYMENT_NAME' | translate }}</th>
            <th class="key">{{ 'REPOSITORY_DEPLOYMENT_KEY' | translate }}</th>
            <th class="version">{{ 'REPOSITORY_DEPLOYMENT_VERSION' | translate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">
              <a ng-if="hasDrdPlugin"
                 ng-href="{{ getDrdLink(drd) }}">
                {{ drd.name || drd.key || drd.id }}
              </a>
              <span ng-if="!hasDrdPlugin">
                {{ drd.name || drd.key || drd.id }}
              </span>
            </td>

            <td class="key">
              {{ drd.key }}
            </td>

            <td class="version">
              {{ drd.version }}
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ul uib-pagination ng-if="pages.total > pages.size"
      class="pagination-sm"

      page="pages.current"
      ng-model="pages.current"
      ng-change="onPaginationChange()"

      total-items="pages.total"
      items-per-page="pages.size"

      max-size="7"
      boundary-links="true"></ul>
</div>
`;
