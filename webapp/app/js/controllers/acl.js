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
KylinApp.controller('AclCtrl', function ($scope, AclService, TableModel,loadingRequest,SweetAlert,$modal, ProjectModel, MessageBox) {
  $scope.tableModel = TableModel;
  $scope.tableUserAclList = [];
  $scope.tableGroupAclList = [];
  $scope.selectTableName = '';
  $scope.projectModel = ProjectModel;
  var loadTableAclList = function (loadtype) {
    if (!loadtype || loadtype === 'user') {
      AclService.getTableAclList({
        project:$scope.projectModel.selectedProject,
        tablename:$scope.selectTableName,
        type:'user'
      }, function (result) {
        $scope.tableUserAclList = result;
      })
    }
    if (!loadtype || loadtype === 'group') {
      AclService.getTableAclList({
        project: $scope.projectModel.selectedProject,
        tablename: $scope.selectTableName,
        type: 'group'
      }, function (result) {
        $scope.tableGroupAclList = result;
      })
    }

  }

  $scope.$watch('tableModel.selectedSrcTable.name',function(){
    $scope.selectTableName = TableModel.selectedSrcTable.database +'.'+ TableModel.selectedSrcTable.name
    if(!TableModel.selectedSrcTable.name || !$scope.projectModel) {
      return;
    }
    loadTableAclList();
  });
  $scope.delTableAcl = function (type, name) {
    SweetAlert.swal({
      title: '',
      text: "您确定要删除此表吗？",
      type: '',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "是",
	  cancelButtonText: "取消",
      closeOnConfirm: true
    }, function (isConfirm) {
      if (isConfirm) {
        loadingRequest.show();
        AclService.cancelAclSetOfTable({
          type:type,
          project: $scope.projectModel.selectedProject,
          tablename:$scope.selectTableName,
          username: name
        },function () {
          loadingRequest.hide();
          loadTableAclList(type);
          MessageBox.successNotify('表ACL删除成功完成');
        },function (e) {
          if (e.data && e.data.exception) {
            var message = e.data.exception;
            var msg = !!(message) ? message : '无法采取行动。';
            SweetAlert.swal('糟糕...', msg, 'error');
          } else {
            SweetAlert.swal('糟糕...', "无法采取行动。", 'error');
          }
          loadingRequest.hide();
        })
      }
    })
  }

  $scope.addTableAcl = function(model){
    $modal.open({
      templateUrl: 'addTableAcl.html',
      windowClass:"cubewindow",
      controller: AclAddCtrl,
      resolve: {
        scope: function () {
          return $scope;
        }
      }
    });
  }
  var AclAddCtrl = function ($scope, $modalInstance, AclService,SweetAlert,loadingRequest,ProjectModel,TableModel) {
    $scope.newTableAcl = {
      type: 'user',
      name: ''
    }
    $scope.selectTableName = TableModel.selectedSrcTable.database +'.'+ TableModel.selectedSrcTable.name
    $scope.projectModel = ProjectModel;
    $scope.tableUserAclBlackList = []
    $scope.tableGroupAclBlackList = []
    AclService.getTableAclBlackList({
      project: $scope.projectModel.selectedProject,
      tablename: $scope.selectTableName,
      type:'user'
    }, function (result) {
      $scope.tableUserAclBlackList = result;
    })
    AclService.getTableAclBlackList({
      project: $scope.projectModel.selectedProject,
      tablename: $scope.selectTableName,
      type:'group'
    }, function (result) {
      $scope.tableGroupAclBlackList = result;
    })

    $scope.userType = [{name:'User',value:'user'},{name:'Group',value:'group'}];
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.addAcl = function () {
      loadingRequest.show()
      AclService.saveAclSetOfTable({
        type:$scope.newTableAcl.type,
        project: $scope.projectModel.selectedProject,
        tablename:$scope.selectTableName,
        username: $scope.newTableAcl.name
      },{},function () {
        loadingRequest.hide();
        MessageBox.successNotify('表ACL添加成功');
        loadTableAclList()
        $scope.cancel()
      },function (e) {
        if (e.data && e.data.exception) {
          var message = e.data.exception;
          var msg = !!(message) ? message : '无法采取行动。';
          SweetAlert.swal('糟糕...', msg, 'error');
        } else {
          SweetAlert.swal('糟糕...', "无法采取行动。", 'error');
        }
        loadingRequest.hide();
      })
    }
  }
})
