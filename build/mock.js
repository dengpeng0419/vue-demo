var MockJS = require('mockjs');

var MockData = {
  '/fp/user/fixedOrderDetail': {
    'resultCode': 0,
    'resultMsg': '',
    'resultData': {
      'title': '计息中，300天后可以赎回',
      'productId|+1': 1,
      'productType': 0,
      'channelId|1': ['bsb', 'tfb'],
      'bankName|1': ['招商银行', '建设银行', '工商银行', '交通银行', '中国银行', '包商银行', '天府银行', '浦发银行'],
      'name|1': ['财富走向 100天', '安心计划1年'],
      'interestRate|1': ['6.18%', '4.52%'],
      'duration|1': ['120天', '1年'],
      'investAmount|10000-99999.1-2': 1,
      'latestIncome|100-5000.1-2': 1,
      'totalIncome|100-5000.1-2': 1,
      'interestStartDate': '@date(yyyy.MM.dd)',
      'interestDay|1-365': 1,
      'interestEndDate': '@date(yyyy.MM.dd)',
      'tradeTime': '@date(yyyy.MM.dd)',
      'interestEndDay|1-100': 1,
      'repayLastdate': '@date(yyyy.MM.dd)',
    }
  }
};

function ResData(url) {
    var key, data;
    for (key in MockData) {
        if (url.indexOf(key) > -1) {
            data = MockJS.mock(MockData[key]);
            break;
        }
    }
    return data;
}

module.exports = ResData;
