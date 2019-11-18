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

// TODO add cubes manager
KylinApp.service('cubesManager', function (CubeDescService,SweetAlert) {

    this.currentCube = {};

    this.cubeMetaFrame={};

    this.getCubeDesc = function(_cubeName){
      CubeDescService.query({cube_name: _cubeName}, {}, function (detail) {
        if (detail.length > 0&&detail[0].hasOwnProperty("name")) {
          return detail[0];
        }else{
          SweetAlert.swal('糟糕...', "没有加载多维数据集详细信息。", 'error');
        }
      }, function (e) {
        if(e.data&& e.data.exception){
          var message =e.data.exception;
          var msg = !!(message) ? message : '无法采取行动。';
          SweetAlert.swal('糟糕...', msg, 'error');
        }else{
          SweetAlert.swal('糟糕...', "无法采取行动。", 'error');
        }
      });

  }

})
