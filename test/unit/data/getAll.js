const { expect } = require('chai');

const BaseData = require('../../../data/base/base.data');

describe('Unit tests', () => {
    describe('BaseData.getAll()', () => {
        describe('when there are items in db', () => {
            const db = { collection: null };
            let ModelClass = null;
            let data = null;
            let items = null;

            beforeEach(() => {
                ModelClass = class {};
                items = [1, 2, 3];
                db.collection = () => {
                    return {
                        find: () => {
                            return {
                                toArray: () => {
                                    return Promise.resolve(items);
                                },
                            };
                        },
                    };
                };
                data = new BaseData(db, ModelClass);
            });

            it('expect to retrun items ()', () => {
                return data.getAll()
                    .then((models) => {
                        expect(models).to.deep.equal(items);
                    });
            });
        });
    });
});
