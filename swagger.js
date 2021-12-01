/**
 * @swagger
 *path:
 * /accounts:
 *   get:
 *     summary: Lists all the accounts
 *     tags: [Accounts]
 *     responses:
 *       "200":
 *         description: The list of accounts.
 *         content:
 *           application/json:
 *             schema:
 *              ArrayOfAccount:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  balance:
 *                    type: float
 *                  address:
 *                    type: text
 *                  mobile:
 *                    type: integer
 *                  idName:
 *                    type: string
 *                  idNumber:
 *                    type: string
 *                  type:
 *                    type: string
 *                  status:
 *                    type: boolean
 *   post:
 *     summary: Creates a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                balance:
 *                  type: float
 *                address:
 *                  type: text
 *                mobile:
 *                  type: integer
 *                idName:
 *                  type: string
 *                idNumber:
 *                  type: string
 *                type:
 *                  type: string
 *     responses:
 *       "200":
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   balance:
 *                     type: float
 *                   address:
 *                     type: text
 *                   mobile:
 *                     type: integer
 *                   idName:
 *                     type: string
 *                   idNumber:
 *                     type: string
 *                   type:
 *                     type: string
 *                   status:
 *                     type: boolean
 * /accounts/{id}:
 *   get:
 *     summary: Gets an account by id
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The account id
 *     responses:
 *       "200":
 *         description: Account details.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   balance:
 *                     type: float
 *                   address:
 *                     type: text
 *                   mobile:
 *                     type: integer
 *                   idName:
 *                     type: string
 *                   idNumber:
 *                     type: string
 *                   type:
 *                     type: string
 *                   status:
 *                     type: boolean
 *       "404":
 *         description: Account not found.
 * /transactions:
 *   post:
 *     summary: Creates a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                accountId:
 *                  type: integer
 *                amount:
 *                  type: float
 *                description:
 *                  type: string
 *     responses:
 *       "200":
 *         description: The created transaction.
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   id:
 *                     type: integer
 *                   accountId:
 *                     type: integer
 *                   amount:
 *                     type: float
 *                   balance:
 *                     type: float
 *                   transactionId:
 *                     type: string
 *                   description:
 *                     type: string
 *                   type:
 *                     type: string
 *                   account:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       balance:
 *                         type: float
 *                       address:
 *                         type: text
 *                       mobile:
 *                         type: integer
 *                       idName:
 *                         type: string
 *                       idNumber:
 *                         type: string
 *                       type:
 *                         type: string
 *                       status:
 *                         type: boolean
 * /transactions/{accountId}:
 *   get:
 *     summary: List transaction by accountId
 *     tags: [Transactions]
 *     responses:
 *       "200":
 *         description: List of transaction.
 *         content:
 *           application/json:
 *             schema:
 *              ArrayOfTransaction:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                   id:
 *                     type: integer
 *                   accountId:
 *                     type: integer
 *                   amount:
 *                     type: float
 *                   balance:
 *                     type: float
 *                   transactionId:
 *                     type: string
 *                   description:
 *                     type: string
 *                   type:
 *                     type: string
 */
