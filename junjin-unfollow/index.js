const qs = require('qs')
const axios = require('axios')

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const common = {
  offset: 0,
  limit: 20,
  count: 1016,
}

const getList = async () => {
  try {
    const url = 'https://api.juejin.cn/user_api/v1/follow/followees'
    const query = {
      aid: 2608,
      uuid: 6945683283674433054,
      user_id: 3069492193143239,
      cursor: common.offset,
      limit: common.limit,
    }
    const { data } = await axios.get(`${url}?${qs.stringify(query)}`, {})

    const userIdList = data.data.data.map((v) => v.user_id)

    for (const userId of userIdList) {
      await unfollow(userId)
      await sleep(Math.floor(Math.random() * 1000) + 1)
    }
  } catch (e) {
    console.log('List ERR: ' + e)
  }
}

const unfollow = async (userId) => {
  try {
    const url = 'https://api.juejin.cn/interact_api/v1/follow/undo'
    const query = {
      aid: 2608,
      uuid: 6945683283674433054,
    }
    const body = {
      id: String(userId),
      type: 1,
    }
    const headers = {
      cookie: `_ga=GA1.2.1328972677.1617167915; n_mh=K5UPgQgCUF2WmdQC87YNYh1ZhXcOwkSjZg411UL4Wj0; passport_csrf_token_default=959d240229cb8850655e276e5cfacef0; passport_csrf_token=959d240229cb8850655e276e5cfacef0; sid_guard=696727b3fb146fd1a8a4ed2b0bfcf44f%7C1627639982%7C5184000%7CTue%2C+28-Sep-2021+10%3A13%3A02+GMT; uid_tt=3a90346df081f57dafbed394826ebfdf; uid_tt_ss=3a90346df081f57dafbed394826ebfdf; sid_tt=696727b3fb146fd1a8a4ed2b0bfcf44f; sessionid=696727b3fb146fd1a8a4ed2b0bfcf44f; sessionid_ss=696727b3fb146fd1a8a4ed2b0bfcf44f; SID_UCP=696727b3fb146fd1a8a4ed2b0bfcf44f; SSID_UCP=696727b3fb146fd1a8a4ed2b0bfcf44f; MONITOR_WEB_ID=6d887d8f-921b-423a-b649-ac266095586a; _tea_utm_cache_2608={%22utm_source%22:%22timeline_1%22%2C%22utm_medium%22:%22banner%22%2C%22utm_campaign%22:%22zhongqiu_hl_202109%22}; _gid=GA1.2.735882070.1631512063`,
    }
    const { data } = await axios.post(`${url}?${qs.stringify(query)}`, body, { headers })
    if (data.err_no == 0) console.log('取消成功', userId)
    else console.log('取消失败', userId, data.err_msg)
  } catch (e) {
    console.log('unfollow ERR: ' + e)
  }
}

/**
 * 主程序
 */
const main = async () => {
  console.log('==========================执行开始==========================')
  const count = Math.ceil(common.count / common.limit)
  for (let i = 0; i < count; i++) {
    await getList()
  }
  console.log('==========================执行完毕==========================')
}

main()
