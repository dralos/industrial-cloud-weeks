const dataset = {
    weekPrices_1: [1, 2, 3, 4, 5, 6],
    weekPrices_2: [6, 5, 4, 3, 2, 1],
    weekPrices_3: [1, 6, 5, 10, 8, 7],
    weekPrices_4: [1, 2, 10, 2, 4, 6],
    weekPrices_5: [1, 6, 5, 10, 2, 10],
    weekPrices_6: [10, 6, 5, 9, 2, 6]
};

//           18  16 26
// [1, 6, 5, 10, 2, 10]
    // 0          7  5  11
//  [10, 6, 5, 9, 2, 6]

const isOrdered = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}


const cal_profit = (arr) => {
    return arr.reduce((acc, cur, index, original) => {
        if (index === (original.length - 1)) {
            return (cur * index) - acc;
        }
        return acc + cur;
    }, 0);
}

const create_dic_ordered = (arr) => {
    const dict = {}

    arr.map((e, i) => {
        if (!dict[e]) {
            dict[e] = []
        }
        dict[e].push(i);
    })

    return Object.fromEntries(Object.entries(dict).sort(([a], [b]) => a - b));
}

const getMaxValueInfo = (ordered_dict) => {
    const keys = Object.keys(ordered_dict);
    const last_key = keys[keys.length - 1];
    const current_max_value = ordered_dict[last_key];
    const index_current_max_value = current_max_value[current_max_value.length - 1];
    return { index_current_max_value, last_key };
}

function getSlice(arr, current_index, index_current_max_value) {
    return arr.slice(current_index, index_current_max_value + 1);
}


const max_profit = (arr) => {

    if (arr.length === 0) return 0

    if (isOrdered(arr)) {
        return cal_profit(arr)
    } else {
        const is_reverse_week_ordered = isOrdered(arr.slice().reverse())
        if (is_reverse_week_ordered) {
            return 0
        } else {
            console.log('do calc')
            const ordered_dict = create_dic_ordered(arr);
            console.log(JSON.stringify(ordered_dict))

            let profit = 0
            let current_index = 0
            let hold = false
            do {

                // handle case when the max_value is the first element of the array

                const { index_current_max_value, last_key } = getMaxValueInfo(ordered_dict);
                const slice_until_max = getSlice(arr, current_index, index_current_max_value);

                if (current_index < index_current_max_value &&
                    //  !hold &&
                      slice_until_max.length > 1) {
                    current_index = index_current_max_value
                    profit += cal_profit(slice_until_max)
                }
                
                const future_until_max = getSlice(arr, current_index + 1 , arr.length);
                if (isOrdered(future_until_max)) {
                    // hold = false
                } else {
                    // hold = true
                    console.log('not buying')
                }

                delete ordered_dict[last_key]
                current_index++

            } while (current_index < (arr.length - 1))

            return profit
        }
    }
}

module.exports = { max_profit } 
