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

KylinApp.controller('AdminCtrl', function ($scope, AdminService, CacheService, TableService, loadingRequest, MessageService, ProjectService, $modal, SweetAlert,kylinConfig,ProjectModel,$window, MessageBox) {
  $scope.configStr = "";
  $scope.envStr = "";

  $scope.isCacheEnabled = function(){
    return kylinConfig.isCacheEnabled();
  }

  $scope.getEnv = function () {
    AdminService.env({}, function (env) {
      $scope.envStr = env.env;
      MessageBox.successNotify('服务器环境获得成功');
//            SweetAlert.swal('Success!', 'Server environment get successfully', 'success');
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

  $scope.getConfig = function () {
    AdminService.config({}, function (config) {
      $scope.configStr = config.config;
      MessageBox.successNotify('服务器配置成功');
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

  $scope.reloadConfig = function () {
    SweetAlert.swal({
      title: '',
      text: '您确定要重新加载配置吗',
      type: '',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "是",
      closeOnConfirm: true
    }, function (isConfirm) {
      if (isConfirm) {
        CacheService.reloadConfig({}, function () {
          MessageBox.successNotify('配置重新加载成功');
          $scope.getConfig();
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

  $scope.reloadMeta = function () {
    SweetAlert.swal({
      title: '',
      text: '您确定要重新加载元数据并清理缓存吗?',
      type: '',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "是",
      closeOnConfirm: true
    }, function (isConfirm) {
      if (isConfirm) {
        CacheService.clean({}, function () {
          MessageBox.successNotify('缓存重新加载成功');
          ProjectService.listReadable({}, function(projects) {
            ProjectModel.setProjects(projects);
          });
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

  $scope.calCardinality = function (tableName) {
    var _project = ProjectModel.selectedProject;
      if (_project == null){
        SweetAlert.swal('', "未选择项目。", 'info');
          return;
        }
    $modal.open({
      templateUrl: 'calCardinality.html',
      controller: CardinalityGenCtrl,
      resolve: {
        tableName: function () {
          return tableName;
        },
        scope: function () {
          return $scope;
        }
      }
    });
  }

  $scope.cleanStorage = function () {
    SweetAlert.swal({
      title: '',
      text: '您确定要清理未使用的HDFS和HBase空间?',
      type: '',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "是",
      closeOnConfirm: true
    }, function (isConfirm) {
      if (isConfirm) {
        AdminService.cleanStorage({}, function () {
          MessageBox.successNotify('存储已成功清理!');
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

  $scope.disableCache = function () {
    SweetAlert.swal({
      title: '',
      text: '您确定要禁用查询缓存?',
      type: '',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "是",
      closeOnConfirm: true
    }, function (isConfirm) {
      if (isConfirm) {
        AdminService.updateConfig({}, {key: 'kylin.query.cache-enabled', value: false}, function () {
          MessageBox.successNotify('缓存已成功禁用!');
          location.reload();
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

  $scope.enableCache = function () {
    SweetAlert.swal({
      title: '',
      text: '您确定要启用查询缓存?',
      type: '',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: "是",
      closeOnConfirm: true
    }, function (isConfirm) {
      if (isConfirm) {
        AdminService.updateConfig({}, {key: 'kylin.query.cache-enabled', value: true}, function () {
          MessageBox.successNotify('缓存成功启用!');
          location.reload();
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

  $scope.toSetConfig = function () {
    $modal.open({
      templateUrl: 'updateConfig.html',
      controller: updateConfigCtrl,
      scope: $scope,
      resolve: {}
    });
  }

  var CardinalityGenCtrl = function ($scope, $modalInstance, tableName, MessageService, MessageBox) {
    $scope.tableName = tableName;
    $scope.delimiter = 0;
    $scope.format = 0;
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.calculate = function () {
      $modalInstance.dismiss();
      loadingRequest.show();
      var _project = ProjectModel.selectedProject;
      if (_project == null){
        SweetAlert.swal('', "未选择项目。", 'info');
        return;
      }
      TableService.genCardinality({tableName: $scope.tableName, pro: _project}, {
        delimiter: $scope.delimiter,
        format: $scope.format
      }, function (result) {
        loadingRequest.hide();
        MessageBox.successNotify('基数作业已成功计算。 。 单击刷新按钮...');
      }, function (e) {
        loadingRequest.hide();
        if (e.data && e.data.exception) {
          var message = e.data.exception;
          var msg = !!(message) ? message : '无法采取行动。';
          SweetAlert.swal('糟糕...', msg, 'error');
        } else {
          SweetAlert.swal('糟糕...', "无法采取行动。", 'error');
        }
      });
    }
  };

  var updateConfigCtrl = function ($scope, $modalInstance, AdminService, MessageService, MessageBox) {
    $scope.state = {
      key: null,
      value: null
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    $scope.update = function () {
      AdminService.updateConfig({}, {key: $scope.state.key, value: $scope.state.value}, function (result) {
        MessageBox.successNotify('配置更新成功!');
        $modalInstance.dismiss();
        $scope.getConfig();
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
  };

  $scope.downloadBadQueryFiles = function(){
    var _project = ProjectModel.selectedProject;
    if (_project == null){
      SweetAlert.swal('', "未选择项目。", 'info');
      return;
    }
    var downloadUrl = Config.service.url + 'diag/project/'+_project+'/download';
    $window.open(downloadUrl);
  }


  $scope.getEnv();
  $scope.getConfig();
});
