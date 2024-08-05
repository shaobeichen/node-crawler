import fs from 'fs'
import ora from 'ora'
import chalk from 'chalk'
import { post } from './request.js'
import { sleep } from './utils.js'

// 基准线
const BENCH = 15000

// 参数
const query = {
  aid: 2608,
  uuid: 7399540357413635593,
  spider: 0,
  verifyFp: 'verify_lzgmb7gb_Ox3TKl0G_CGo9_4P6A_9WUz_9nfgMIdBSAvS',
  fp: 'verify_lzgmb7gb_Ox3TKl0G_CGo9_4P6A_9WUz_9nfgMIdBSAvS',
  msToken:
    'yvOrYVJHZdWn9WWE8h8SVaVzpgBYREJ608J-50R9smXGvcBOOzaPC00czyiqHF4OVpEtK38RnIHcNEbljOB3kRD50ywhOpQRCK0ub734vbmGT_Wf-sTsvPBh99-bjA%3D%3D',
  a_bogus: 'OXldfc2GMsm1K-ARm7DT9a%2FtQKb0YW5sgZEzcJPaeULJ',
}

// 总次数
let total = 0

const main = async () => {
  total++

  const spinner = ora({
    text: chalk.yellow(`请求启动 第${total}次`),
    color: 'yellow',
  })

  spinner.start()
  spinner.succeed()

  const body = {
    id_type: 2,
    sort_type: 200,
    cate_id: '6809637767543259144',
    cursor: '0',
    limit: 20,
  }
  const result = await post('/recommend_api/v1/article/recommend_cate_feed', body, {
    params: query,
  })

  let data = []
  if (result.data) {
    data = result.data
      .filter((v) => v.article_info.view_count > BENCH)
      .map((v) => {
        return {
          url: 'https://juejin.cn/post/' + v.article_id,
          title: v.article_info.title,
          view: v.article_info.view_count,
        }
      })
    console.log(chalk.green(`> 请求完成 ${data.length}条数据`))

    const webhook =
      'https://o53whwfws2.feishu.cn/base/automation/webhook/event/EqLjaLb9ewxvFVhXxRocUfOLnjc'

    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      await sleep(500)
      await post(webhook, element)
      console.log(chalk.green(`> 已插入一条数据 「${element.title}」`))
    }
  }

  await sleep(3000)

  main()
}

main()
