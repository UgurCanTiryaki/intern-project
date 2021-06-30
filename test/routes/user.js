const request = require('supertest');
const chai = require('chai');
const jwt = require('jsonwebtoken');

const app = require('../../app');
const sequelizeInstance = require('../../config/database');
const { User } = require('../../models');

describe('routes', function () {
  describe('user', function () {
    describe('PUT /change-password', function () {
      let token = null;

      before(async () => {
        await sequelizeInstance.sync({ force: true });

        const user = await User.create({
          email: 'test@domain.com',
          password: 'a'.repeat(60)
        });

        token = jwt.sign(
          {
            sub: user.id
          },
          'secret',
          {
            expiresIn: '15m' // 15 min
          }
        );
      });
      describe('validations', function () {
        describe('newPassword', function () {
          it('should not allow undefined', async function () {
            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token);

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                msg: 'newPassword is required.',
                param: 'newPassword',
                location: 'body'
              }
            );
          });

          it('should not allow null', async function () {
            const newPassword = null;

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  newPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: newPassword,
                msg: 'newPassword must be a string.',
                param: 'newPassword',
                location: 'body'
              }
            );
          });

          it('should not be any type other than String', async function () {
            const newPassword = 1234;

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  newPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: newPassword,
                msg: 'newPassword must be a string.',
                param: 'newPassword',
                location: 'body'
              }
            );
          });

          it('should not allow less than 8 characters', async function () {
            const newPassword = 'a'.repeat(7);

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  newPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: newPassword,
                msg: 'newPassword must be minimum 8 characters long.',
                param: 'newPassword',
                location: 'body'
              }
            );
          });

          it('should allow 8 characters', async function () {
            const newPassword = 'a'.repeat(8);

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  newPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).not.to.deep.include(
              {
                value: newPassword,
                msg: 'newPassword must be minimum 8 characters long.',
                param: 'newPassword',
                location: 'body'
              }
            );
          });

          it('should not allow more than 20 characters', async function () {
            const newPassword = 'a'.repeat(21);

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  newPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: newPassword,
                msg: 'newPassword must be maximum 20 characters long.',
                param: 'newPassword',
                location: 'body'
              }
            );
          });

          it('should allow 20 characters', async function () {
            const newPassword = 'a'.repeat(20);

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  newPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).not.to.deep.include(
              {
                value: newPassword,
                msg: 'newPassword must be maximum 20 characters long.',
                param: 'newPassword',
                location: 'body'
              }
            );
          });

          it('should not contain any spaces', async function () {
            const newPassword = 'Pass Word';

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  newPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: newPassword,
                msg: 'newPassword must not contain any space character.',
                param: 'newPassword',
                location: 'body'
              }
            );
          });
        });

        describe('oldPassword', function () {
          it('should not allow undefined', async function () {
            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token);

            console.log(res.body.errors);
            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                msg: 'oldPassword is required.',
                param: 'oldPassword',
                location: 'body'
              }
            );
          });

          it('should not allow null', async function () {
            const oldPassword = null;

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  oldPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: oldPassword,
                msg: 'oldPassword must be a string.',
                param: 'oldPassword',
                location: 'body'
              }
            );
          });

          it('should not be any type other than String', async function () {
            const oldPassword = 1234;

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  oldPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: oldPassword,
                msg: 'oldPassword must be a string.',
                param: 'oldPassword',
                location: 'body'
              }
            );
          });

          it('should not allow less than 8 characters', async function () {
            const oldPassword = 'a'.repeat(7);

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  oldPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: oldPassword,
                msg: 'oldPassword must be minimum 8 characters long.',
                param: 'oldPassword',
                location: 'body'
              }
            );
          });

          it('should allow 8 characters', async function () {
            const oldPassword = 'a'.repeat(8);

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  oldPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).not.to.deep.include(
              {
                value: oldPassword,
                msg: 'oldPassword must be minimum 8 characters long.',
                param: 'oldPassword',
                location: 'body'
              }
            );
          });

          it('should not allow more than 20 characters', async function () {
            const oldPassword = 'a'.repeat(21);

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  oldPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: oldPassword,
                msg: 'oldPassword must be maximum 20 characters long.',
                param: 'oldPassword',
                location: 'body'
              }
            );
          });

          it('should allow 20 characters', async function () {
            const oldPassword = 'a'.repeat(20);

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  oldPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).not.to.deep.include(
              {
                value: oldPassword,
                msg: 'oldPassword must be maximum 20 characters long.',
                param: 'oldPassword',
                location: 'body'
              }
            );
          });

          it('should not contain any spaces', async function () {
            const oldPassword = 'Pass Word';

            const res = await request(app)
              .put('/user/change-password')
              .set('Authorization', 'Bearer ' + token)
              .send(
                {
                  oldPassword
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: oldPassword,
                msg: 'oldPassword must not contain any space character.',
                param: 'oldPassword',
                location: 'body'
              }
            );
          });
        });
      });
    });
  });
});
