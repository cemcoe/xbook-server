const { runSqlStatement } = require('../mysql/index.js')

const createPost = async (ctx) => {
  // console.log(ctx.request.body)
  // TODO: 从请求体中取出用户名校验用户名和密码
  // 借助 koa-body 解析body参数

  // 拿到登录用户的id
  const { id } = ctx.state.user
  // const { title = '默认标题', abstract, content } = ctx.request.body
  // 上面的语法有待商榷
  // 当要提取的对象对应属性解析为 undefined，变量就被赋予默认值。前端可能传过来空字符串
  // TODO: 生成摘要等，丰富文章信息
  const { content } = ctx.request.body
  const title = ctx.request.body.title || '默认标题'
  const abstract = ctx.request.body.abstract || content.slice(0, 20)

  // 根据内容生成摘要
  // const abstract = content.slice(0, 20)

  const statement = `INSERT INTO post(title, authorId, content, abstract) VALUES('${title}', '${id}', '${content}', '${abstract}');`
  const result = await runSqlStatement(statement)
  // console.log('--', result.insertId, '--')

  if (result) {
    const { insertId } = result
    ctx.body = {
      status: 200,
      data: {
        insertId,
      }
    }
  }
}

// 获取文章列表
const getPostList = async (ctx) => {
  const statement = `SELECT * FROM post`
  const result = await runSqlStatement(statement)
  // console.log(result)
  // TODO: 连表查询将用户id对应到用户名
  if (result) {
    ctx.body = {
      status: 200,
      data: {
        postList: result
      }
    }
  }


}


module.exports = {
  createPost,
  getPostList,
}
