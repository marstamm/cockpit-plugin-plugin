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

var angular = require("../../../../camunda-bpm-sdk-js/vendor/angular"),
  template = require("./cam-widget-password.html.js");

module.exports = [
  "camAPI",
  "debounce",
  "$translate",
  "$sce",
  function(camAPI, debounce, $translate, $sce) {
    return {
      scope: {
        password: "=camWidgetPasswordPassword",
        isValid: "=?camWidgetPasswordValid"
      },

      link: function($scope) {
        var passwordPolicyProvider = camAPI.resource("password-policy");
        var variablePolicyIsActive = false;
        $scope.loadingState = "DEACTIVATED";

        $scope.tooltipText = "";
        var policyText = $translate.instant("PASSWORD_POLICY_TOOLTIP");

        function createRules() {
          passwordPolicyProvider.get().then(function(res) {
            if (!res) {
              variablePolicyIsActive = false;
              $scope.isValid = true;
              $scope.loadingState = "DEACTIVATED";
              return;
            }
            variablePolicyIsActive = true;
            policyText += "<ul>";
            res.rules.forEach(function(rule) {
              policyText +=
                "<li>" +
                $translate.instant(rule.placeholder, rule.parameter) +
                "</li>";
            });
            policyText += "</ul>";

            $scope.tooltipText = $sce.trustAsHtml(policyText);

            // update State
            handlePasswordUpdate();
          });
        }
        createRules();

        var handlePasswordUpdate = function() {
          if (!variablePolicyIsActive) return;

          $scope.isValid = false;
          if (!$scope.password) {
            $scope.tooltipText = $sce.trustAsHtml(policyText);
            $scope.loadingState = "NOT_OK";
            return;
          }
          $scope.loadingState = "LOADING";

          createRestCall();
        };

        // Wait a second for more user input before validating
        var createRestCall = debounce(function() {
          if (!$scope.password) {
            return;
          }

          passwordPolicyProvider
            .validate($scope.password, function(err, res) {
              if (err) {
                $scope.loadingState = "NOT_OK";
                $scope.tooltipText = $sce.trustAsHtml(
                  $translate.instant("PASSWORD_POLICY_TOOLTIP_ERROR")
                );
                return;
              }
              if (res.valid) {
                $scope.loadingState = "OK";
                $scope.isValid = true;
              } else {
                $scope.loadingState = "NOT_OK";
                $scope.isValid = false;

                $scope.tooltipText = $translate.instant(
                  "PASSWORD_POLICY_TOOLTIP_PARTIAL"
                );
                $scope.tooltipText += "<ul>";
                res.rules.forEach(function(rule) {
                  if (!rule.valid) {
                    $scope.tooltipText +=
                      "<li>" +
                      $translate.instant(rule.placeholder, rule.parameter) +
                      "</li>";
                  }
                });
                $scope.tooltipText += "</ul>";

                $scope.tooltipText = $sce.trustAsHtml($scope.tooltipText);
              }
            })
            .catch(angular.noop);
        }, 1000);

        $scope.$watch("[password]", handlePasswordUpdate, true);
      },
      template: template
    };
  }
];
