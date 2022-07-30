
/**
* @swagger
*    components:
*      schemas:
*        post:
*          type: object
*          properties:
*            title:
*              type: string 
*              description: 标题
*            avatar:
*              type: string
*              description: 头像.
*            image:
*              type: string
*              description: 图片
*            vote:
*              type: number
*              description: 点赞

*/



/**
 * @swagger
 * /lise/?pageSize=10&pageNo=1:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: pageSize
 *         description: 列表数量.
 *       - in: path
 *         name: pageNo
 *         description: 页码.
 */