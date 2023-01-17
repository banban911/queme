import {getMainLang, updateTs, kFormatter}  from '../format'

describe(`Format utils`, () => {
    it(`get main language`, () => {
        const langs = {
            nodes: [
                {
                    color: `#3178c6`,
                    name: `TypeScript`
                },
                {
                    color: `#f1e05a`,
                    name: `JavaScript`
                },
                {
                    color: `#563d7c`,
                    name: `CSS`
                }
            ],
            edges: [
                {
                    size: 32891
                },
                {
                    size: 5311
                },
                {
                    size: 7572
                }
            ],
            totalCount: 3,
            totalSize: 45774
        }

        const expected = {
            color: '#3178c6',
            name: 'TypeScript'
        }

        const actual = getMainLang(langs)
        expect(actual).toMatchObject(expected)
    })

    it(`get formatted time stamp - happy path`, () => {
        const ts = `2022-12-25T14:34:10Z`

        const expected = `12 25, 2022`

        const actual = updateTs(ts)
        expect(actual).toEqual(expected)
    })

    it(`get formatted time stamp - ago`, () => {
        const ts = `2023-01-16T23:41:10Z`

        const expected = `17 hours ago`

        const actual = updateTs(ts)
        expect(actual).toEqual(expected)
    })

    it(`get formatted thousand number - happy path`, () => {
        const num = 999

        const expected = 999

        const actual = kFormatter(num)
        expect(actual).toEqual(expected)
    })

    it(`get formatted thousand number`, () => {
        const num = 1100

        const expected = `1.1k`

        const actual = kFormatter(num)
        expect(actual).toEqual(expected)
    })
})
;
