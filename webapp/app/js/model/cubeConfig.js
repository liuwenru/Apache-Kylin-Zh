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

KylinApp.constant('cubeConfig', {

  //~ Define metadata & class
  measureParamType: ['column', 'constant'],
  measureExpressions: ['SUM', 'MIN', 'MAX', 'COUNT', 'COUNT_DISTINCT',"TOP_N", 'RAW','EXTENDED_COLUMN','PERCENTILE'],
  dimensionDataTypes: ["string", "tinyint", "int", "bigint", "date"],
  cubePartitionTypes: ['APPEND'],
  engineType:[
    {name:'MapReduce',value: 2},
    {name:'Spark',value: 4}
  ],
  joinTypes: [
    {name: '左', value: 'left'},
    {name: '内部', value: 'inner'}
  ],
  queryPriorities: [
    {name: '正常', value: 50},
    {name: '低', value: 70},
    {name: '高', value: 30}
  ],
  measureDataTypes: [
    {name: 'INT', value: 'int'},
    {name: 'BIGINT', value: 'bigint'},
    {name: 'DECIMAL', value: 'decimal'},
    {name: 'DOUBLE', value: 'double'},
    {name: 'DATE', value: 'date'},
    {name: 'STRING', value: 'string'}
  ],
  distinctDataTypes: [
    {name: '错误率 < 9.75%', value: 'hllc(10)'},
    {name: '错误率 < 4.88%', value: 'hllc(12)'},
    {name: '错误率 < 2.44%', value: 'hllc(14)'},
    {name: '错误率 < 1.72%', value: 'hllc(15)'},
    {name: '错误率 < 1.22%', value: 'hllc(16)'},
    {name: '精确地（需要更多的内存和存储空间）', value: 'bitmap'}
  ],
  topNTypes: [
    {name: '前 10', value: "topn(10)"},
    {name: '前 100', value: "topn(100)"},
    {name: '前 500', value: "topn(500)"},
    {name: '前 1000', value: "topn(1000)"},
    {name: '前 5000', value: "topn(5000)"},
    {name: '前 10000', value: "topn(10000)"}
  ],
  dftSelections: {
    measureExpression: 'SUM',
    measureParamType: 'column',
    measureDataType: {name: 'BIGINT', value: 'bigint'},
    distinctDataType: {name: '错误率 < 4.88%', value: 'hllc12'},
    queryPriority: {name: '正常', value: 50},
    cubePartitionType: 'APPEND',
    topN:{name: '前 100', value: "topn(100)"}
  },
    dictionaries: ["true", "false"],
    encodings:[
      {name:"字典",value:"value"},
      {name:"定长",value:"fixed_length"},
      {name:"int（已弃用）",value:"int"}
    ],
    intEncodingOptions: [1,2,3,4,5,6,7,8],
//    cubes config
  theaditems: [
    {attr: '名称', name: 'Name'},
    {attr: '状态', name: 'Status'},
    {attr: '尺寸', name: 'Cube Size'},
    {attr: '输入记录数', name: 'Source Records'},
    {attr: '上次构建时间', name: 'Last Build Time'},
    {attr: '所有者', name: 'Owner'},
    {attr: '创建时间UTC', name: 'Create Time'}
  ],
  streamingAutoGenerateMeasure:[
    {name:"开始的年份",type:"date"},
    {name:"开始的季度",type:"date"},
    {name:"开始的月份",type:"date"},
    {name:"开始的星期",type:"date"},
    {name:"开始的天数",type:"date"},
    {name:"开始的小时",type:"timestamp"},
    {name:"开始的分钟",type:"timestamp"}
  ],
  partitionDateFormatOpt:[
    'yyyy-MM-dd HH:mm:ss',
    'yyyy-MM-dd HH:mm',
    'yyyy-MM-dd HH',
    'yyyy-MM-dd',
    'yyyyMMddHHMMSS',
    'yyyyMMddHHMM',
    'yyyyMMddHH',
    'yyyyMMdd',
    // 'timestamp',
    // 'other'
  ],
  partitionTimeFormatOpt:[
    'HH:mm:ss',
    'HH:mm',
    'HH',
    // 'other'
  ],
  rowKeyShardOptions:[
    true,false
  ],
  statusNeedNofity:['ERROR', 'DISCARDED', 'SUCCEED'],
  buildDictionaries:[
    {name:"全局词典", value:"org.apache.kylin.dict.GlobalDictionaryBuilder"},
    {name:"段字典", value:"org.apache.kylin.dict.global.SegmentAppendTrieDictBuilder"}
  ],
  needSetLengthEncodingList:['fixed_length','fixed_length_hex','int','integer'],
  snapshotStorageTypes: [
    {name: '元存储', value: 'metaStore'},
    {name: 'HBase', value: 'hbase'}
  ],
  baseChartOptions: {
    chart: {
      type: 'sunburstChart',
      height: 500,
      duration: 250,
      groupColorByParent: false,
      tooltip: {
        contentGenerator: function(obj) {
          var preCalculatedStr = '';
          if (typeof obj.data.existed !== 'undefined' && obj.data.existed !== null) {
            preCalculatedStr = '<tr><td align="right"><b>Existed:</b></td><td>' + obj.data.existed + '</td></tr>';
          }
          var rowCountRateStr = '';
          if (obj.data.row_count) {
            rowCountRateStr = '<tr><td align="right"><b>Row Count:</b></td><td>' + obj.data.row_count + '</td></tr><tr><td align="right"><b>Rollup Rate:</b></td><td>' + (obj.data.row_count * 100 / obj.data.parent_row_count).toFixed(2) + '%</td></tr>';
          }
          return '<table><tbody>'
          + '<tr><td align="right"><i class="fa fa-square" style="color: ' + obj.color + '; margin-right: 15px;" aria-hidden="true"></i><b>Name:</b></td><td class="key"><b>' + obj.data.name +'</b></td></tr>'
          + '<tr><td align="right"><b>ID:</b></td><td>' + obj.data.cuboid_id + '</td></tr>'
          + '<tr><td align="right"><b>查询数：</b></td><td>' + obj.data.query_count + '  [' + (obj.data.query_rate * 100).toFixed(2) + '%]</td></tr>'
          + '<tr><td align="right"><b>完全匹配数：</b></td><td>' + obj.data.exactly_match_count + '</td></tr>'
          + rowCountRateStr
          + preCalculatedStr
          + '</tbody></table>';
        }
      }
    },
    title: {
      enable: true,
      text: '',
      className: 'h4',
      css: {
        position: 'relative',
        top: '30px'
      }
    },
    subtitle: {
      enable: true,
      text: '',
      className: 'h5',
      css: {
        position: 'relative',
        top: '40px'
      }
    }
  },
  currentCaption: {
    enable: true,
    html: '<div>Existed: <i class="fa fa-square" style="color:#38c;"></i> Hottest '
          + '<i class="fa fa-square" style="color:#7bd;"></i> Hot '
          + '<i class="fa fa-square" style="color:#ade;"></i> Warm '
          + '<i class="fa fa-square" style="color:#cef;"></i> Cold '
          + '<i class="fa fa-square" style="color:#999;"></i> Retire</div>',
    css: {
      position: 'relative',
      top: '-35px',
      height: 0
    }
  },
  recommendCaption: {
    enable: true,
    html: '<div>New: <i class="fa fa-square" style="color:#3a5;"></i> Hottest '
      + '<i class="fa fa-square" style="color:#7c7;"></i> Hot '
      + '<i class="fa fa-square" style="color:#aea;"></i> Warm '
      + '<i class="fa fa-square" style="color:#cfc;"></i> Cold '
      + '<i class="fa fa-square" style="color:#f94;"></i> Mandatory</div>',
    css: {
      position: 'relative',
      top: '-35px',
      height: 0,
      'text-align': 'left',
      'left': '-12px'
    }
  }
});