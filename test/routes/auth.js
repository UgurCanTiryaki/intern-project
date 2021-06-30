const request = require('supertest');
const chai = require('chai');

const app = require('../../app');

describe('routes', function () {
  describe('auth', function () {
    describe('POST /register', function () {
      describe('validations', function () {
        describe('email', function () {
          let password;

          before(() => {
            password = '1Some1Valid1Password1.';
          });

          it('should not allow undefined', async function () {
            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                msg: 'email is required.',
                param: 'email',
                location: 'body'
              }
            );
          });

          it('should not allow null', async function () {
            const email = null;

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: email,
                msg: 'email must be a string.',
                param: 'email',
                location: 'body'
              }
            );
          });

          it('should not be any type other than String', async function () {
            const email = 1234;

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: email,
                msg: 'email must be a string.',
                param: 'email',
                location: 'body'
              }
            );
          });

          it('should throw error if email is not valid', async function () {
            const email = 'emailwithoutdomain';

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: email,
                msg: 'email is not valid.',
                param: 'email',
                location: 'body'
              }
            );
          });
        });

        describe('password', function () {
          let email;

          before(() => {
            email = 'test@domain.com';
          });

          it('should not allow undefined', async function () {
            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                msg: 'password is required.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not allow null', async function () {
            const password = null;

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must be a string.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not be any type other than String', async function () {
            const password = 1234;

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must be a string.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not allow less than 8 characters', async function () {
            const password = 'a'.repeat(7);

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must be minimum 8 characters long.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should allow 8 characters', async function () {
            const password = 'a'.repeat(8);

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email: null,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).not.to.deep.include(
              {
                value: password,
                msg: 'password must be minimum 8 characters long.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not allow more than 20 characters', async function () {
            const password = 'a'.repeat(21);

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must be maximum 20 characters long.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should allow 20 characters', async function () {
            const password = 'a'.repeat(20);

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email: null,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).not.to.deep.include(
              {
                value: password,
                msg: 'password must be maximum 20 characters long.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not contain any spaces', async function () {
            const password = 'Pass Word';

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must not contain any space character.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not contain any special spaces', async function () {
            const password = 'Pass\nWord';

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must not contain any space character.',
                param: 'password',
                location: 'body'
              }
            );
          });
        });
      });
    });

    describe('POST /login', function () {
      describe('validations', function () {
        describe('email', function () {
          let password;

          before(() => {
            password = '1Some1Valid1Password1.';
          });

          it('should not allow undefined', async function () {
            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                msg: 'email is required.',
                param: 'email',
                location: 'body'
              }
            );
          });

          it('should not allow null', async function () {
            const email = null;

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: email,
                msg: 'email must be a string.',
                param: 'email',
                location: 'body'
              }
            );
          });

          it('should not be any type other than String', async function () {
            const email = 1234;

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: email,
                msg: 'email must be a string.',
                param: 'email',
                location: 'body'
              }
            );
          });

          it('should throw error if email is not valid', async function () {
            const email = 'emailwithoutdomain';

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: email,
                msg: 'email is not valid.',
                param: 'email',
                location: 'body'
              }
            );
          });
        });

        describe('password', function () {
          let email;

          before(() => {
            email = 'test@domain.com';
          });

          it('should not allow undefined', async function () {
            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                msg: 'password is required.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not allow null', async function () {
            const password = null;

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must be a string.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not be any type other than String', async function () {
            const password = 1234;

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must be a string.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not allow less than 8 characters', async function () {
            const password = 'a'.repeat(7);

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must be minimum 8 characters long.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should allow 8 characters', async function () {
            const password = 'a'.repeat(8);

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email: null,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).not.to.deep.include(
              {
                value: password,
                msg: 'password must be minimum 8 characters long.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not allow more than 20 characters', async function () {
            const password = 'a'.repeat(21);

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must be maximum 20 characters long.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should allow 20 characters', async function () {
            const password = 'a'.repeat(20);

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email: null,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).not.to.deep.include(
              {
                value: password,
                msg: 'password must be maximum 20 characters long.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not contain any spaces', async function () {
            const password = 'Pass Word';

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must not contain any space character.',
                param: 'password',
                location: 'body'
              }
            );
          });

          it('should not contain any special spaces', async function () {
            const password = 'Pass\nWord';

            const res = await request(app)
              .post('/auth/register')
              .send(
                {
                  email,
                  password
                }
              );

            chai.expect(res.status).to.be.equal(422);
            chai.expect(res.body.errors).to.deep.include(
              {
                value: password,
                msg: 'password must not contain any space character.',
                param: 'password',
                location: 'body'
              }
            );
          });
        });
      });
    });
  });
});
