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
        describe('when there are no items in db', () => {
            const db = { collection: null };
            let ModelClass = null;
            let data = null;
            let items = null;

            beforeEach(() => {
                ModelClass = class {};
                items = [];
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
                        // eslint-disable-next-line no-unused-expressions
                        expect(models).to.be.an('array').that.is.empty;
                    });
            });
        });
    });
    describe('BaseData.filterBy(props)', () => {
        describe('when there are items in db', () => {
            const db = { collection: null };
            let ModelClass = null;
            let data = null;
            let items = null;

            beforeEach(() => {
                ModelClass = class {};
                items = [{ name: 'test' }, { name: 'pesho' }];
                db.collection = () => {
                    return {
                        find: (props) => {
                            return {
                                toArray: () => {
                                    const arr = items.filter((el) => {
                                        return el.name === props.name;
                                    });
                                    return Promise.resolve(arr);
                                },
                            };
                        },
                    };
                };
                data = new BaseData(db, ModelClass);
            });

            it('expect to retrun items that containt props', () => {
                return data.filterBy({ name: 'pesho' })
                    .then((models) => {
                        expect(models).to.be.an('array')
                            .that.deep.equals([{ name: 'pesho' }]);
                    });
            });
        });
    });
});
