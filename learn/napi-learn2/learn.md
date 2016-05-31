# 设计原则

根据restful的设计原则，一个请求，如果是不同的请求Method，对应不同的效果。
如:
http://napi.uc.cn/resources
GET: 获取资源集合
PUT: 替换掉整个资源集合
POST: 新建资源
DELETE: 删除资源集合

http://napi.uc.cn/resources/itemX
GET: 获取单个资源
PUT: 替换单个资源
POST: 新建资源，如果资源已存在，则忽略
DELETE: 删除单个资源
PATCH: 修改单个资源，只修改提供的相关属性，不会覆盖其它属性


# 新建对象
POST: /3/classes/:clazzName/objects?_app_id=xxxxx
