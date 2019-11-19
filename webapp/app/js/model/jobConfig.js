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

KylinApp.constant('jobConfig', {
  allStatus: [
    {name: '新建', value: 0},
    {name: '待处理', value: 1},
    {name: '正在运行', value: 2},
    {name: '已停止', value: 32},
    {name: '已完成', value: 4},
    {name: '错误', value: 8},
    {name: '废弃', value: 16}
  ],
  timeFilter: [
    {name: '最后一天', value: 0},
    {name: '过去一周', value: 1},
    {name: '过去一个月', value: 2},
    {name: '过去一年', value: 3},
    {name: '所有', value: 4},
  ],
  theaditems: [
    {attr: 'name', name: '任务名称'},
    {attr: 'related_cube', name: '多维数据集'},
    {attr: 'progress', name: '进展'},
    {attr: 'last_modified', name: '上次修改时间'},
    {attr: 'duration', name: '持续时间'}
  ],
  searchMode: [
    {name: 'cubing运算', value: 'CUBING_ONLY'},
    {name: '检查点', value: 'CHECKPOINT_ONLY'},
    {name: '所有', value: 'ALL'}
  ],
  queryitems: [
  {attr: 'server', name: '服务'},
  {attr: 'user', name: '用户'},
  {attr: 'sql', name: 'Sql'},
  {attr: 'adj', name: '描述'},
  {attr: 'running_seconds', name: '运行秒数'},
  {attr: 'start_time', name: '开始时间'},
  {attr: 'last_modified', name: '上一次更改'},
  {attr: 'thread', name: '线程'}
]

});
