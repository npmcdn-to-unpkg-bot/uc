'use strict';

const express = require('express');
const request = require('supertest');
const assert = require('chai').assert;

describe('Array', () => {
  describe('#indexOf', () => {

    beforeEach(done => {
      console.log('before test..');
      // 不调用 done，则等待timeout哦
      done();
    });

    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1, 2, 3].indexOf(5));
    });
  });
});


const app = express();
app.get('/user', (req, res) => {
  res.status(200).json({ name: '宗熊' });
});

describe('Get /user', function(){
  it('respond with json', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done);
  });

  it('name should be "宗熊"', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect({
        name: '宗熊'
      })
      .end(done);
  });
});
