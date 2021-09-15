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
      cookie: '',
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
