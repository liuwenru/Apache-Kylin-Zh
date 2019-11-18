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

KylinApp.controller('IndexCtrl', function ($scope, $location, $anchorScroll) {
  // Settings about carousel presentation.
  $scope.myInterval = 5000;
  // Data url for 1x1 pixel transparent gif.
  var carouselImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  $scope.slides = [
    {
      image: carouselImg,
      caption: 'Kylin',
      text: '准备好数据进行分析'
    },
    {
      image: carouselImg,
      caption: 'Kylin',
      text: '处理和转换来自多个来源的数据'
    },
    {
      image: carouselImg,
      caption: 'Kylin',
      text: '零编码无需部署即可利用Hadoop的强大功能'
    }
  ];
});
