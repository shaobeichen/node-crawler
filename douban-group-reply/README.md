## douban-robot

豆瓣小组顶帖机器人。

### 使用方法

1. `git clone https://github.com/nswbmw/douban-robot.git` or `npm i douban-robot`
2. 修改 config.json 配置中的 `group`、`cookie` 和 `messages` 字段
3. `npm start`

**Tips:** `cookie` 中的 `"` 需要转义，形式如下：

```
bid=\"XXWORfU/T5c\"; ll=\"108287\"; ps=y; _pk_
ref.100001.8cb4=%5B%22%22%2C%22%22%2C1429783265%2C%22https%3A%2F%2Fwww.douban.
com%2Flink%3Furl%3DyUt9Py6FSZNDWyRju1SZLp0xRNka-by-sNskrJOt_ucAuZYBrCjViwfsVEJkvyPf%26wd%3D-webkit-slider-
thumb%26issp%3D1%26f%3D8%26ie%3Dutf-8%26tn%3Dbaiduhome_pg%26inputT%3D718%22%5D; _pk_
id.100001.8cb4=2c7bf72a69eb7011.1423025822.20.1429783265.1429701341.; __
utma=20149280.1703046748.1423015823.1429701341.1429783265.27; __utmz=20149280.1329783265.27.25.
utmcsr=douban|utmccn=(organic)|utmcmd=organic|utmctr=-webkit-slider-thumb; __utmv=30149280.4783; viewed=\"26301597
_25867920\"; ap=1; ue=\"xxx@xxx.com\"; dbcl2=\"46833543:1mybRtGBr3s\"; ck=\"p-zf\"; push_noty_num=0; push_
doumail_num=0
```

### 郑重声明

本程序仅供测试，如将其用于不正当用途而带来法律问题，本人概不负责。