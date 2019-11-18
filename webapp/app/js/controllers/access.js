/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

KylinApp.controller('AccessCtrl', function ($scope, AccessService, MessageService, AuthenticationService, SweetAlert) {

  $scope.accessTooltip = "<div style='text-align: left'>" +
  "<label>访问对项目意味着什么？</label>" +
  "<ul><li>查询：访问查询多维数据集</li>" +
  "<li>操作：可以重建，恢复和取消作业。 还包括对多维数据集查询的访问。</li>" +
  "<li>管理：访问编辑/删除多维数据集。 还包括对多维数据集操作的访问。</li>" +
  "<li>管理：完全访问多维数据集和作业，包括访问管理。</li></ul></div>";

  $scope.authorities = null;
  AuthenticationService.authorities({}, function (authorities) {
    $scope.authorities = authorities.stringList;
  });

  $scope.resetNewAcess = function () {
    $scope.newAccess = null;
  }

  $scope.renewAccess = function (entity) {
    $scope.newAccess = {
      uuid: entity.uuid,
      sid: null,
      principal: true,
      permission: 'READ'
    };
  }

  $scope.grant = function (type, entity, grantRequst) {
    var uuid = grantRequst.uuid;
    delete grantRequst.uuid;
    AccessService.grant({type: type, uuid: uuid}, grantRequst, function (accessEntities) {
      entity.accessEntities = accessEntities;
      $scope.resetNewAcess();
//            MessageService.sendMsg('Access granted!', 'success', {});
      SweetAlert.swal('成功!', '授予访问权限!', 'success');
    }, function (e) {
      grantRequst.uuid = uuid;
      if (e.status == 404) {
//                MessageService.sendMsg('User not found!', 'error', {});
        SweetAlert.swal('糟糕...', '找不到使用者!!', 'error');
      }
      else {
        if (e.data && e.data.exception) {
          var message = e.data.exception;
          var msg = !!(message) ? message : '无法采取行动。';
          SweetAlert.swal('糟糕...', msg, 'error');
        } else {
          SweetAlert.swal('糟糕...', "无法采取行动。", 'error');
        }

      }
    });
  }

  $scope.update = function (type, entity, access, permission) {
    var updateRequst = {
      accessEntryId: access.id,
      permission: permission
    };
    AccessService.update({type: type, uuid: entity.uuid}, updateRequst, function (accessEntities) {
      entity.accessEntities = accessEntities;
//            MessageService.sendMsg('Access granted!', 'success', {});
      SweetAlert.swal('', '授予访问权限!', 'success');
    }, function (e) {
      if (e.data && e.data.exception) {
        var message = e.data.exception;
        var msg = !!(message) ? message : '无法采取行动。';
        SweetAlert.swal('糟糕...', msg, 'error');
      } else {
        SweetAlert.swal('糟糕...', "无法采取行动。", 'error');
      }
    });

  }

  $scope.revoke = function (type, access, entity) {
    SweetAlert.swal({
      title: '',
      text: '您确定要撤消访问权限吗?',
      type: '',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "是",
      closeOnConfirm: true
    }, function (isConfirm) {
      if(isConfirm){
      var revokeRequst = {
        type: type,
        uuid: entity.uuid,
        accessEntryId: access.id,
        sid: access.sid.principal
      };
      AccessService.revoke(revokeRequst, function (accessEntities) {
        entity.accessEntities = accessEntities.accessEntryResponseList;
        SweetAlert.swal('成功!', '该访问权限已被撤消。', 'success');
      }, function (e) {
        if (e.data && e.data.exception) {
          var message = e.data.exception;
          var msg = !!(message) ? message : '无法采取行动。';
          SweetAlert.swal('糟糕...', msg, 'error');
        } else {
          SweetAlert.swal('糟糕...', "无法采取行动。", 'error');
        }
      });
      }
    });

  }
});

