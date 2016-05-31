bu_type 由 us 提供 -> nation_msg
res_code 由 app 提供
key = md5(bu_type + res_code + 'nation_msg')

1. 提交单条数据

POST 方式提交到:http://musa.ucweb.com:8000/bu_i/postdata.php?bu_type=xx&res_code=yy&key=zz
提交内容格式为:
{
  cond: "{(cou='JP')&&(fr='android')}",
  data: base64(消息内容的json),
  children: [ ],
  gzip: false
}




2. 提交多条数据

POST 方式提交到:http://musa.ucweb.com:8000/bu_i/postdata.php?bu_type=xx&res_code=yy&key=zz
提交内容格式为:
[
  {
    cond: 'cou=JP&fr=android',
    data: '{ "mes_id": 10000, "url": "http://xxxx"}',
    children: [ ]
  },
  {
    cond: 'cou=JP',
    data: '{ "mes_id": 10001, "url": "http://yyyy"}',
    children: [ ]
  }
]

问题：
直接提交数组
