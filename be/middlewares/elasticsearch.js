/**
 * elasticsearch 服务
 *
 * Created by chenjz on 2018/2/11.
 */
'use strict';

import elasticsearch from 'elasticsearch';

class ElasticsearchClient {
  constructor() {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace',
    });

    this.client.ping(
      {
        requestTimeout: 30000,
      },
      function (error) {
        if (error) {
          console.error('elasticsearch cluster is down!');
        } else {
          console.log('All is well');
        }
      }
    );
  }

  /**
   * 看如何再封装一下 api？
   *
   * @param params
   * @returns {Promise.<void>}
   */
  async search(params) {
    // 每一个参数都是必须的，因此，静态类型检测很重要！
    const { index, type, pageNo = 1, perPage = 10, query } = params;

    try {
      const resp = await this.client.search({
        index,
        type,
        from: (pageNo - 1) * perPage,
        size: perPage,
        body: {
          query: {
            match: {
              _all: query,
            },
          },
        },
      });

      return {
        result: resp.hits.hits,
        total: resp.hits.total,
        page: pageNo,
        pages: Math.ceil(resp.hits.total / perPage),
      };
    } catch (error) {
      console.trace(error.message);
    }
  }
}

export default new ElasticsearchClient();
