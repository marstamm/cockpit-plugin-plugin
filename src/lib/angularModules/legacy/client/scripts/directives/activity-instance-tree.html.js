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

module.exports = `<!-- # CE - camunda-cockpit-ui/client/scripts/directives/activity-instance-tree.html -->
<div class="tree-node" >

  <div id="{{ node.id }}"
       ng-class="{ 'state-running': !node.endTime, 'state-completed' : node.endTime && !node.canceled, 'state-canceled': node.endTime && node.canceled }"
       class="tree-node-group">

    <span class="tree-node-label"
          ng-class="{ 'selected' : node.isSelected, 'has-children': node.children.length }">

      <button class="btn btn-link btn-control-link btn-toggle"
              ng-if="node.children.length"
              ng-click="toggleOpen()">
        <span class="glyphicon"
           ng-class="{ 'glyphicon-menu-right' : !node.isOpen, 'glyphicon-menu-down' : node.isOpen }"></span>
      </button>

      <button class="btn btn-link btn-control-link btn-control remove"
              ng-click="deselect($event)">
        <span class="glyphicon glyphicon-remove"></span>
      </button>

      <span class="{{ symbolIconName(node.activityType) }}"
            uib-tooltip="{{ node.activityType }}"></span>

      <a ng-click="select($event)"
         tooltip-placement="right"
         uib-tooltip="{{ node.name }}">
        {{ node.name }}
      </a>

    </span>

    <!-- running -->
    <span ng-if="!node.endTime"
          class="tree-node-addon activity-instance-running"
          uib-tooltip="{{ 'ACTIVITY_INSTANCE_TOOLTIP_RUNNING' | translate }}"
          tooltip-placement="right">
      <span class="glyphicon glyphicon-adjust"></span>
    </span>

    <!-- completed -->
    <span ng-if="node.endTime && !node.canceled"
          class="tree-node-addon activity-instance-completed"
          uib-tooltip="{{ 'ACTIVITY_INSTANCE_TOOLTIP_COMPLETED' | translate }}"
          tooltip-placement="right">
      <span class="glyphicon glyphicon-ok-circle"></span>
    </span>

    <!-- canceled -->
    <span ng-if="node.endTime && node.canceled"
          class="tree-node-addon activity-instance-canceled"
          uib-tooltip="{{ 'ACTIVITY_INSTANCE_TOOLTIP_CANCELED' | translate }}"
          tooltip-placement="right">
      <span class="glyphicon glyphicon-ban-circle"></span>
    </span>

  </div>

  <ul class="list-unstyled" ng-show="node.isOpen" ng-if="node.children.length">
    <li ng-repeat="child in node.children">
      <div activity-instance-tree="child"
           selection="selection"
           on-element-click="propogateSelection(id, activityId, $event)"
           order-children-by="orderChildrenBy()">
      </div>
    </li>
  </ul>
</div>
<!-- / CE - camunda-cockpit-ui/client/scripts/directives/activity-instance-tree.html -->
`;
